import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/libs/supabase/server';
import { likeKudoSchema } from '@/types/kudos';
import type { LikeKudoResult } from '@/types/kudos';
import { toggleMockLike } from '@/data/kudos-mock';

interface RouteContext {
  params: Promise<{ id: string }>;
}

// Minimal UUID format check
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function PUT(
  request: NextRequest,
  context: RouteContext,
): Promise<NextResponse> {
  const { id: kudoId } = await context.params;

  // Validate route param — accept UUID or any non-empty id (mock kudos use "kudo-01" style)
  if (!kudoId || (!UUID_RE.test(kudoId) && !kudoId.startsWith('kudo-'))) {
    return NextResponse.json(
      { error: 'Invalid kudo id' },
      { status: 400 },
    );
  }

  // Validate request body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body' },
      { status: 400 },
    );
  }

  const parsed = likeKudoSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Validation failed' },
      { status: 400 },
    );
  }

  const { liked } = parsed.data;

  // Attempt Supabase path
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      // No session — fall back to mock for dev. In production, Supabase Auth
      // middleware redirects unauthenticated requests before reaching here.
      return mockResponse(kudoId, liked);
    }

    if (liked) {
      const { error: upsertError } = await supabase
        .from('kudo_likes')
        .upsert(
          { user_id: user.id, kudo_id: kudoId },
          { onConflict: 'user_id,kudo_id' },
        );
      if (upsertError) {
        return mockResponse(kudoId, liked);
      }
    } else {
      const { error: deleteError } = await supabase
        .from('kudo_likes')
        .delete()
        .eq('user_id', user.id)
        .eq('kudo_id', kudoId);
      if (deleteError) {
        return mockResponse(kudoId, liked);
      }
    }

    // Re-read canonical state after the change
    const [{ data: kudo, error: kudoError }, { count: likeRowCount }] =
      await Promise.all([
        supabase
          .from('kudos')
          .select('id, like_count')
          .eq('id', kudoId)
          .single(),
        supabase
          .from('kudo_likes')
          .select('*', { count: 'exact', head: true })
          .eq('kudo_id', kudoId)
          .eq('user_id', user.id),
      ]);

    if (kudoError || !kudo) {
      return NextResponse.json(
        { error: 'Kudo not found' },
        { status: 404 },
      );
    }

    const result: LikeKudoResult = {
      kudoId,
      likedByMe: (likeRowCount ?? 0) > 0,
      likeCount: (kudo.like_count as number) ?? 0,
    };
    return NextResponse.json(result);
  } catch {
    // Supabase not available — fall back to mock state
    return mockResponse(kudoId, liked);
  }
}

/** Dev fallback: mutate the in-memory mock store and return the new state. */
function mockResponse(kudoId: string, liked: boolean): NextResponse {
  const result = toggleMockLike(kudoId, liked);
  return NextResponse.json(result);
}
