'use client';

import { useEffect, useRef, useState } from 'react';
import type { Hashtag } from '@/types/kudos';

interface HashtagFieldProps {
  availableHashtags: Hashtag[];
  selectedHashtags: string[];
  onChange: (hashtags: string[]) => void;
  error?: string;
  label: string;
  addLabel: string;
  maxLabel: string;
}

const MAX_HASHTAGS = 5;

export default function HashtagField({
  availableHashtags,
  selectedHashtags,
  onChange,
  error,
  label,
  addLabel,
  maxLabel,
}: HashtagFieldProps): React.JSX.Element {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent): void {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  const unselectedHashtags = availableHashtags.filter(
    (h) => !selectedHashtags.includes(h.name),
  );

  function handleAdd(name: string): void {
    if (selectedHashtags.length < MAX_HASHTAGS) {
      onChange([...selectedHashtags, name]);
    }
    if (selectedHashtags.length + 1 >= MAX_HASHTAGS) {
      setIsDropdownOpen(false);
    }
  }

  function handleRemove(name: string): void {
    onChange(selectedHashtags.filter((h) => h !== name));
  }

  return (
    <div ref={containerRef} className="flex flex-col gap-2">
      <label
        className="text-sm font-bold"
        style={{ color: 'var(--color-text-dark)' }}
      >
        {label}
        <span
          className="ml-0.5"
          style={{ color: 'var(--color-text-required)' }}
        >
          *
        </span>
      </label>

      <div
        className="flex flex-wrap items-center gap-2"
        role="group"
        aria-required="true"
        aria-label={label}
      >
        {selectedHashtags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-opacity duration-150"
            style={{
              backgroundColor: 'var(--color-chip-bg)',
              color: 'var(--color-chip-text)',
            }}
          >
            #{tag}
            <button
              type="button"
              onClick={() => handleRemove(tag)}
              className="ml-0.5 text-xs leading-none"
              style={{ color: 'var(--color-text-hint)' }}
              aria-label={`Remove #${tag}`}
            >
              ×
            </button>
          </span>
        ))}

        {selectedHashtags.length < MAX_HASHTAGS && (
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium"
              style={{
                border: '1px dashed var(--color-community-link)',
                color: 'var(--color-community-link)',
                background: 'transparent',
              }}
              aria-expanded={isDropdownOpen}
              aria-haspopup="listbox"
            >
              {addLabel}
            </button>

            {isDropdownOpen && unselectedHashtags.length > 0 && (
              <div
                className="absolute left-0 top-full z-10 mt-1 max-h-48 w-48 overflow-y-auto rounded-lg"
                style={{
                  backgroundColor: 'var(--color-white)',
                  border: 'var(--border-input)',
                  boxShadow: 'var(--shadow-dropdown)',
                }}
              >
                <ul role="listbox" aria-label="Available hashtags">
                  {unselectedHashtags.map((hashtag) => (
                    <li key={hashtag.id}>
                      <button
                        type="button"
                        onClick={() => handleAdd(hashtag.name)}
                        className="w-full px-3 py-2 text-left text-sm transition-colors duration-100 hover:bg-gray-50"
                        style={{ color: 'var(--color-text-dark)' }}
                      >
                        #{hashtag.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <span
              className="ml-2 text-xs"
              style={{ color: 'var(--color-disabled-text)' }}
            >
              {maxLabel}
            </span>
          </div>
        )}
      </div>

      {error && (
        <p
          className="text-xs"
          role="alert"
          style={{ color: 'var(--color-text-required)' }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
