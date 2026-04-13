'use client';

import dynamic from 'next/dynamic';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocale } from '@/hooks/useLocale';
import { SUN_KUDOS_I18N } from '@/libs/i18n/sun-kudos';
import type { Hashtag, KudoItem, KudoUser, WriteKudoPayload } from '@/types/kudos';
import { writeKudoSchema } from '@/types/kudos';
import { submitKudo } from '@/app/(home)/kudos/actions';
import Toast from '@/components/kudos/Toast';
import RecipientField from './RecipientField';
import HonorTitleField from './HonorTitleField';
import HashtagField from './HashtagField';
import ImageUploadField from './ImageUploadField';
import type { ImageItem } from './ImageUploadField';
import AnonymousCheckbox from './AnonymousCheckbox';
import ModalActionBar from './ModalActionBar';

const KudoEditor = dynamic(() => import('./KudoEditor'), { ssr: false });

interface WriteKudoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (newKudo: KudoItem) => void;
  prefilledRecipient: KudoUser | null;
  hashtags: Hashtag[];
  users: KudoUser[];
}

export default function WriteKudoModal({
  isOpen,
  onClose,
  onSuccess,
  prefilledRecipient,
  hashtags,
  users,
}: WriteKudoModalProps): React.JSX.Element | null {
  const locale = useLocale();
  const t = SUN_KUDOS_I18N[locale].writeKudo;
  const searchT = SUN_KUDOS_I18N[locale].search;

  // Form state
  const [recipient, setRecipient] = useState<KudoUser | null>(prefilledRecipient);
  const [honorTitle, setHonorTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([]);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [uploadingCount, setUploadingCount] = useState(0);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toastMessage, setToastMessage] = useState('');

  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      setRecipient(prefilledRecipient);
      setHonorTitle('');
      setContent('');
      setSelectedHashtags([]);
      setImages([]);
      setUploadingCount(0);
      setIsAnonymous(false);
      setErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen, prefilledRecipient]);

  // Focus trap + Escape handler
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent): void {
      if (event.key === 'Escape' && !isSubmitting) {
        onClose();
        return;
      }

      if (event.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isSubmitting, onClose]);

  // Return focus on close
  useEffect(() => {
    if (!isOpen && previousActiveElement.current) {
      previousActiveElement.current.focus();
    }
  }, [isOpen]);

  const isFormValid = !!(
    recipient &&
    honorTitle.trim() &&
    content.trim() &&
    selectedHashtags.length >= 1
  );

  const handleSubmit = useCallback(async () => {
    if (isSubmitting) return;

    const completedUrls = images
      .filter((img) => img.status === 'done' && img.cdnUrl)
      .map((img) => img.cdnUrl as string);

    const payload: WriteKudoPayload = {
      recipientId: recipient?.id ?? '',
      honorTitle: honorTitle.trim(),
      content: content.trim(),
      hashtags: selectedHashtags,
      imageUrls: completedUrls.length > 0 ? completedUrls : undefined,
      isAnonymous,
    };

    // Client-side validation
    const parsed = writeKudoSchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? 'form');
        if (!fieldErrors[key]) {
          fieldErrors[key] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const result = await submitKudo(payload);

      if (result.success) {
        // Build an optimistic KudoItem for the feed
        if (onSuccess && recipient) {
          const newKudo: KudoItem = {
            id: result.kudo?.id ?? crypto.randomUUID(),
            sender: {
              id: 'current-user',
              name: isAnonymous ? 'An danh' : 'You',
              initials: isAnonymous ? '?' : 'Y',
              department: '',
              role: '',
              relationshipBadge: 'team',
            },
            receiver: recipient,
            createdAtLabel: new Date().toLocaleString(),
            category: payload.honorTitle,
            message: payload.content,
            images: completedUrls,
            hasVideo: false,
            hashtags: payload.hashtags,
            likeCount: 0,
            likedByMe: false,
            isHighlighted: false,
            department: recipient.department,
            permalink: '#',
          };
          onSuccess(newKudo);
        }
        setToastMessage(t.successToast);
        onClose();
      } else {
        setToastMessage(result.error ?? t.errorToast);
      }
    } catch {
      setToastMessage(t.errorToast);
    } finally {
      setIsSubmitting(false);
    }
  }, [
    recipient, honorTitle, content, selectedHashtags, images,
    isAnonymous, isSubmitting, onClose, t,
  ]);

  // TODO(Q6): confirm backdrop click closes modal
  function handleBackdropClick(event: React.MouseEvent): void {
    if (event.target === event.currentTarget && !isSubmitting) {
      onClose();
    }
  }

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay backdrop */}
      <div
        className="fixed inset-0 z-40"
        style={{ backgroundColor: 'var(--color-modal-overlay)' }}
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* Modal container */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="write-kudo-title"
        className="fixed left-1/2 top-1/2 z-50 flex w-full max-h-[90vh] -translate-x-1/2 -translate-y-1/2 flex-col overflow-y-auto md:max-w-[600px] xl:max-w-[640px]"
        style={{
          backgroundColor: 'var(--color-white)',
          borderRadius: 'var(--radius-modal)',
          border: '1px solid var(--color-border-btn)',
          boxShadow: 'var(--shadow-modal)',
          padding: '32px',
          fontFamily: 'var(--font-montserrat)',
        }}
      >
        {/* A — Modal Title */}
        <h2
          id="write-kudo-title"
          className="mb-6 text-center text-2xl font-bold"
          style={{ color: 'var(--color-text-dark)' }}
        >
          {t.title}
        </h2>

        {/* B — Recipient Field */}
        <RecipientField
          users={users}
          value={recipient}
          onChange={setRecipient}
          error={errors['recipientId']}
          label={t.recipientLabel}
          placeholder={t.recipientPlaceholder}
          emptyLabel={t.recipientEmpty}
          startTypingLabel={searchT.startTyping}
        />

        {/* Danh hieu — Honor Title Field */}
        <div className="mt-5">
          <HonorTitleField
            value={honorTitle}
            onChange={setHonorTitle}
            error={errors['honorTitle']}
            label={t.honorLabel}
            placeholder={t.honorPlaceholder}
            hint={t.honorHint}
          />
        </div>

        {/* C+D — Rich Text Editor (Tiptap) */}
        <div className="mt-5">
          <KudoEditor
            content={content}
            onUpdate={setContent}
            placeholder={t.contentPlaceholder}
            mentionHint={t.mentionHint}
            communityStandardsLabel={t.communityStandards}
            communityStandardsHref="/community-standards"
            error={errors['content']}
          />
        </div>

        {/* E — Hashtag Field */}
        <div className="mt-5">
          <HashtagField
            availableHashtags={hashtags}
            selectedHashtags={selectedHashtags}
            onChange={setSelectedHashtags}
            error={errors['hashtags']}
            label={t.hashtagLabel}
            addLabel={t.hashtagAdd}
            maxLabel={t.hashtagMax}
          />
        </div>

        {/* F — Image Upload Field */}
        <div className="mt-5">
          <ImageUploadField
            images={images}
            onImagesChange={setImages}
            onUploadingCountChange={setUploadingCount}
            label={t.imageLabel}
            addLabel={t.imageAdd}
            maxLabel={t.imageMax}
            typeErrorMessage={t.imageTypeError}
            uploadFailMessage={t.imageUploadFail}
            onToast={setToastMessage}
          />
        </div>

        {/* G — Anonymous Checkbox */}
        <div className="mt-5">
          <AnonymousCheckbox
            isAnonymous={isAnonymous}
            onToggle={setIsAnonymous}
            label={t.anonymousLabel}
          />
        </div>

        {/* H — Action Bar */}
        <ModalActionBar
          isFormValid={isFormValid}
          isSubmitting={isSubmitting}
          onCancel={onClose}
          onSubmit={handleSubmit}
          cancelLabel={t.cancel}
          submitLabel={t.submit}
          submittingLabel={t.submitting}
        />
      </div>

      {/* Toast feedback */}
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage('')} />
      )}
    </>
  );
}
