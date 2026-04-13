'use client';

interface AnonymousCheckboxProps {
  isAnonymous: boolean;
  onToggle: (checked: boolean) => void;
  label: string;
}

export default function AnonymousCheckbox({
  isAnonymous,
  onToggle,
  label,
}: AnonymousCheckboxProps): React.JSX.Element {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={isAnonymous}
        onChange={(e) => onToggle(e.target.checked)}
        className="h-[18px] w-[18px] shrink-0 cursor-pointer rounded"
        style={{
          borderRadius: 'var(--radius-checkbox)',
          accentColor: 'var(--color-accent-yellow)',
        }}
        id="anonymous-checkbox"
      />
      <label
        htmlFor="anonymous-checkbox"
        className="cursor-pointer text-sm"
        style={{
          color: 'var(--color-chip-text)',
          fontFamily: 'var(--font-montserrat)',
          fontWeight: 400,
        }}
      >
        {label}
      </label>
    </div>
  );
}
