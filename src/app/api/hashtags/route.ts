import { NextResponse } from 'next/server';
import { createClient } from '@/libs/supabase/server';
import { getHashtags } from '@/services/write-kudo-service';

export async function GET(): Promise<NextResponse> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: 'Unauthenticated' },
      { status: 401 },
    );
  }

  const hashtags = await getHashtags();

  return NextResponse.json(hashtags, {
    headers: {
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
