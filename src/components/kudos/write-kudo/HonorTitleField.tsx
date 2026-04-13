'use client';

interface HonorTitleFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  label: string;
  placeholder: string;
  hint: string;
}

// TODO(Q1): confirm max 100 chars with PM
const MAX_LENGTH = 100;

export default function HonorTitleField({
  value,
  onChange,
  error,
  label,
  placeholder,
  hint,
}: HonorTitleFieldProps): React.JSX.Element {
  return (
    <div className="flex flex-col gap-2">
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

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={MAX_LENGTH}
        placeholder={placeholder}
        aria-required="true"
        aria-invalid={!!error}
        className="h-14 w-full rounded-lg px-4 text-sm outline-none transition-all duration-150"
        style={{
          border: error
            ? 'var(--border-input-error)'
            : 'var(--border-input)',
          color: 'var(--color-text-dark)',
          fontFamily: 'var(--font-montserrat)',
        }}
      />

      <p
        className="text-xs"
        style={{ color: 'var(--color-text-hint)' }}
      >
        {hint}
      </p>

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
