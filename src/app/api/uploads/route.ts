import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/libs/supabase/server';

// TODO(Q3): confirm 5 MB limit with PM
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

export async function POST(request: NextRequest): Promise<NextResponse> {
  const formData = await request.formData();
  const file = formData.get('file');

  if (!file || !(file instanceof File)) {
    return NextResponse.json(
      { error: 'No file provided' },
      { status: 400 },
    );
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.' },
      { status: 415 },
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: 'File too large. Maximum size is 5 MB.' },
      { status: 413 },
    );
  }

  // Attempt real Supabase upload
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      // Dev fallback: if no auth session, return a mock URL
      return devFallbackUrl(file);
    }

    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const storagePath = `kudos/${user.id}/${timestamp}-${safeName}`;

    const { error: uploadError } = await supabase.storage
      .from('kudo-images')
      .upload(storagePath, file, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      // Storage bucket may not exist yet — fall back to mock URL in dev
      return devFallbackUrl(file);
    }

    const { data: publicUrlData } = supabase.storage
      .from('kudo-images')
      .getPublicUrl(storagePath);

    return NextResponse.json({ url: publicUrlData.publicUrl });
  } catch {
    // Supabase not available — fall back to mock URL
    return devFallbackUrl(file);
  }
}

/**
 * Dev fallback: convert the file to a data URL so the modal flow works
 * end-to-end without requiring Supabase Storage to be configured.
 * In production, this path should never be reached.
 */
async function devFallbackUrl(file: File): Promise<NextResponse> {
  const buffer = await file.arrayBuffer();
  const base64 = Buffer.from(buffer).toString('base64');
  const dataUrl = `data:${file.type};base64,${base64}`;

  return NextResponse.json({ url: dataUrl });
}
