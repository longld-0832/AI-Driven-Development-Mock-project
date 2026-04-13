'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import type { KudoUser } from '@/types/kudos';

interface RecipientFieldProps {
  users: KudoUser[];
  value: KudoUser | null;
  onChange: (user: KudoUser | null) => void;
  error?: string;
  label: string;
  placeholder: string;
  emptyLabel: string;
  startTypingLabel: string;
}

export default function RecipientField({
  users,
  value,
  onChange,
  error,
  label,
  placeholder,
  emptyLabel,
  startTypingLabel,
}: RecipientFieldProps): React.JSX.Element {
  const [query, setQuery] = useState(value?.name ?? '');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (value) {
      setQuery(value.name);
    }
  }, [value]);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent): void {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  const filteredResults = useMemo(() => {
    const normalized = debouncedQuery.trim().toLowerCase();
    if (normalized.length < 2) return [];
    return users.filter((user) =>
      [user.name, user.department, user.role]
        .join(' ')
        .toLowerCase()
        .includes(normalized),
    );
  }, [debouncedQuery, users]);

  const helperLabel = query.trim().length < 2 ? startTypingLabel : emptyLabel;

  function handleSelect(user: KudoUser): void {
    onChange(user);
    setQuery(user.name);
    setIsOpen(false);
  }

  function handleInputChange(newQuery: string): void {
    setQuery(newQuery);
    setIsOpen(true);
    if (value && newQuery !== value.name) {
      onChange(null);
    }
  }

  return (
    <div ref={containerRef} className="flex flex-col gap-2">
      <label
        className="text-sm font-bold"
        style={{ color: 'var(--color-text-dark)' }}
      >
        {label}
        <span
          className="ml-0.5 text-sm font-bold"
          style={{ color: 'var(--color-text-required)' }}
        >
          *
        </span>
      </label>

      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          aria-required="true"
          aria-invalid={!!error}
          className="h-14 w-full rounded-lg px-4 pr-10 text-sm outline-none transition-all duration-150"
          style={{
            border: error
              ? 'var(--border-input-error)'
              : 'var(--border-input)',
            color: 'var(--color-text-dark)',
            fontFamily: 'var(--font-montserrat)',
          }}
        />
        <span
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
          style={{ color: 'var(--color-text-hint)' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>

        {isOpen && (
          <div
            className="absolute left-0 right-0 z-20 mt-1 max-h-60 overflow-y-auto rounded-lg"
            style={{
              backgroundColor: 'var(--color-white)',
              border: 'var(--border-input)',
              boxShadow: 'var(--shadow-dropdown)',
            }}
          >
            {filteredResults.length > 0 ? (
              <ul role="listbox" aria-label={label}>
                {filteredResults.map((user) => (
                  <li key={user.id}>
                    <button
                      type="button"
                      onClick={() => handleSelect(user)}
                      className="flex min-h-11 w-full items-center gap-3 px-4 py-2 text-left transition-colors duration-100 hover:bg-gray-50"
                    >
                      <div
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255,234,158,0.2) 0%, rgba(255,234,158,0.08) 100%)',
                          color: 'var(--color-community-link)',
                        }}
                      >
                        {user.initials}
                      </div>
                      <div className="min-w-0">
                        <p
                          className="truncate text-sm font-bold"
                          style={{ color: 'var(--color-text-dark)' }}
                        >
                          {user.name}
                        </p>
                        <p
                          className="truncate text-xs"
                          style={{ color: 'var(--color-text-hint)' }}
                        >
                          {user.role} · {user.department}
                        </p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p
                className="px-4 py-3 text-sm"
                style={{ color: 'var(--color-text-hint)' }}
              >
                {helperLabel}
              </p>
            )}
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
