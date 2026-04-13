'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/libs/supabase/server';
import { createKudo } from '@/services/write-kudo-service';
import type { WriteKudoResult } from '@/types/kudos';
import { writeKudoSchema } from '@/types/kudos';

interface SubmitKudoResponse {
  success: boolean;
  kudo?: WriteKudoResult;
  error?: string;
}

export async function submitKudo(
  formPayload: unknown,
): Promise<SubmitKudoResponse> {
  // 1. Validate auth
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: 'Unauthenticated' };
  }

  // 2. Validate payload with Zod
  const parsed = writeKudoSchema.safeParse(formPayload);

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? 'Validation failed';
    return { success: false, error: firstError };
  }

  // 3. Create kudo via service layer
  try {
    const kudo = await createKudo(user.id, parsed.data);

    // 4. Revalidate the kudos feed so the new kudo appears
    revalidatePath('/kudos');

    return { success: true, kudo };
  } catch {
    return { success: false, error: 'Server error' };
  }
}
