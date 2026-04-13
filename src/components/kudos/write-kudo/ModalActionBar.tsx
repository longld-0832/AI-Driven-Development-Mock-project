'use client';

interface ModalActionBarProps {
  isFormValid: boolean;
  isSubmitting: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  cancelLabel: string;
  submitLabel: string;
  submittingLabel: string;
}

export default function ModalActionBar({
  isFormValid,
  isSubmitting,
  onCancel,
  onSubmit,
  cancelLabel,
  submitLabel,
  submittingLabel,
}: ModalActionBarProps): React.JSX.Element {
  return (
    <div className="flex items-center justify-center gap-4 pt-6">
      <button
        type="button"
        onClick={onCancel}
        disabled={isSubmitting}
        className="flex h-12 min-w-[100px] items-center justify-center gap-2 rounded-lg px-6 text-sm font-semibold transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50"
        style={{
          border: 'var(--border-input)',
          backgroundColor: 'var(--color-white)',
          color: 'var(--color-text-dark)',
          fontFamily: 'var(--font-montserrat)',
        }}
      >
        {cancelLabel}
        <span aria-hidden="true">✕</span>
      </button>

      <button
        type="button"
        onClick={onSubmit}
        disabled={!isFormValid || isSubmitting}
        className="flex h-12 min-w-[200px] items-center justify-center gap-2 rounded-lg px-8 text-sm font-bold transition-all duration-150 disabled:cursor-not-allowed"
        style={{
          backgroundColor: isFormValid && !isSubmitting
            ? 'var(--color-accent-yellow)'
            : 'var(--color-disabled-bg)',
          color: isFormValid && !isSubmitting
            ? 'var(--color-btn-secret-box-text)'
            : 'var(--color-disabled-text)',
          fontFamily: 'var(--font-montserrat)',
          border: 'none',
        }}
      >
        {isSubmitting ? (
          <>
            <span
              className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
              aria-hidden="true"
            />
            {submittingLabel}
          </>
        ) : (
          <>
            {submitLabel}
            <span aria-hidden="true">▷</span>
          </>
        )}
      </button>
    </div>
  );
}
