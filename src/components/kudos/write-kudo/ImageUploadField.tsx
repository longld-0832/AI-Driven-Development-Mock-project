'use client';

import { useCallback, useEffect, useRef } from 'react';

interface ImageItem {
  file: File;
  previewUrl: string;
  cdnUrl: string | null;
  status: 'uploading' | 'done' | 'error';
}

type ImagesSetter = ImageItem[] | ((prev: ImageItem[]) => ImageItem[]);

interface ImageUploadFieldProps {
  images: ImageItem[];
  onImagesChange: (images: ImagesSetter) => void;
  onUploadingCountChange: (count: number) => void;
  label: string;
  addLabel: string;
  maxLabel: string;
  typeErrorMessage: string;
  uploadFailMessage: string;
  onToast: (message: string) => void;
}

const MAX_IMAGES = 5;
// TODO(Q3): confirm 5 MB limit with PM
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

export type { ImageItem };

export default function ImageUploadField({
  images,
  onImagesChange,
  onUploadingCountChange,
  label,
  addLabel,
  maxLabel,
  typeErrorMessage,
  uploadFailMessage,
  onToast,
}: ImageUploadFieldProps): React.JSX.Element {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Derive uploading count from images array and sync to parent via useEffect
  const currentUploadingCount = images.filter((img) => img.status === 'uploading').length;

  useEffect(() => {
    onUploadingCountChange(currentUploadingCount);
  }, [currentUploadingCount, onUploadingCountChange]);

  const handleFileSelect = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files ?? []);
      if (files.length === 0) return;

      const slotsAvailable = MAX_IMAGES - images.length;
      const filesToProcess = files.slice(0, slotsAvailable);

      const newItems: ImageItem[] = [];

      for (const file of filesToProcess) {
        if (!ALLOWED_TYPES.includes(file.type)) {
          onToast(typeErrorMessage);
          continue;
        }
        if (file.size > MAX_FILE_SIZE) {
          onToast(uploadFailMessage);
          continue;
        }

        const previewUrl = URL.createObjectURL(file);
        newItems.push({ file, previewUrl, cdnUrl: null, status: 'uploading' });
      }

      if (newItems.length === 0) return;

      const updatedImages = [...images, ...newItems];
      onImagesChange(updatedImages);

      // Upload each image in background
      // The uploading count is derived from images with status 'uploading'
      // and synced to parent via useEffect — no manual counter needed.
      for (const item of newItems) {
        const formData = new FormData();
        formData.append('file', item.file);

        try {
          const response = await fetch('/api/uploads', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            throw new Error(`Upload failed: ${response.status}`);
          }

          const data = (await response.json()) as { url: string };

          onImagesChange((prev: ImageItem[]) =>
            prev.map((img) =>
              img.previewUrl === item.previewUrl
                ? { ...img, cdnUrl: data.url, status: 'done' as const }
                : img,
            ),
          );
        } catch {
          onToast(uploadFailMessage);
          onImagesChange((prev: ImageItem[]) =>
            prev.map((img) =>
              img.previewUrl === item.previewUrl
                ? { ...img, status: 'error' as const }
                : img,
            ),
          );
        }
      }

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [images, onImagesChange, onToast, typeErrorMessage, uploadFailMessage],
  );

  function handleRemove(previewUrl: string): void {
    URL.revokeObjectURL(previewUrl);
    onImagesChange(images.filter((img) => img.previewUrl !== previewUrl));
  }

  return (
    <div className="flex flex-col gap-2">
      <label
        className="text-sm font-bold"
        style={{ color: 'var(--color-text-dark)' }}
      >
        {label}
      </label>

      <div className="flex flex-wrap items-center gap-2">
        {images.map((img) => (
          <div
            key={img.previewUrl}
            className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg"
            style={{ borderRadius: 'var(--radius-thumbnail)' }}
          >
            <img
              src={img.previewUrl}
              alt=""
              className="h-full w-full object-cover"
            />
            {img.status === 'uploading' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              </div>
            )}
            {img.status === 'error' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <span className="text-xs text-white">!</span>
              </div>
            )}
            <button
              type="button"
              onClick={() => handleRemove(img.previewUrl)}
              className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px]"
              style={{
                backgroundColor: 'var(--color-remove-icon)',
                color: 'var(--color-white)',
              }}
              aria-label="Remove image"
            >
              ×
            </button>
          </div>
        ))}

        {images.length < MAX_IMAGES && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex h-14 w-14 items-center justify-center rounded-lg text-lg"
              style={{
                border: '1px dashed var(--color-community-link)',
                color: 'var(--color-community-link)',
                borderRadius: 'var(--radius-thumbnail)',
              }}
              aria-label={addLabel}
            >
              +
            </button>
            <span
              className="text-xs"
              style={{ color: 'var(--color-disabled-text)' }}
            >
              {addLabel}
              <br />
              {maxLabel}
            </span>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp"
        multiple
        className="hidden"
        onChange={handleFileSelect}
      />
    </div>
  );
}
