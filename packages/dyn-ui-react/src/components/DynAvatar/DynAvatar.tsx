import type { KeyboardEvent, SyntheticEvent } from 'react';
import { forwardRef, useMemo, useState } from 'react';

import { cn } from '../../utils/classNames';
import { generateInitials } from '../../utils/dynFormatters';
import { generateId } from '../../utils/accessibility';
import type { DynAvatarRef, DynAvatarProps } from './DynAvatar.types';
import {
  DYN_AVATAR_PIXEL_SIZES,
  DYN_AVATAR_STATUS_LABELS,
} from './DynAvatar.types';
import styles from './DynAvatar.module.css';

const DefaultFallbackIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
      fill="currentColor"
    />
  </svg>
);

export const DynAvatar = forwardRef<DynAvatarRef, DynAvatarProps>((props, ref) => {
  const {
    src,
    alt,
    size = 'medium',
    shape = 'circle',
    initials,
    status,
    loading = false,
    error = false,
    onClick,
    fallback,
    imageLoading = 'eager',
    imageProps,
    className,
    id,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    'aria-labelledby': ariaLabelledBy,
    'data-testid': dataTestId,
    role: roleProp,
    tabIndex,
    children,
    ...rest
  } = props;

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [internalId] = useState(() => id ?? generateId('dyn-avatar'));

  const isInteractive = typeof onClick === 'function';
  const isExplicitError = Boolean(error);
  const hasErrored = isExplicitError || imageError;
  const hasSource = Boolean(src);
  const canDisplayImage = hasSource && !hasErrored;
  const hasLoadedImage = canDisplayImage && imageLoaded;
  const isLoadingState = Boolean(loading || (canDisplayImage && !imageLoaded));

  const displayInitials = useMemo(() => {
    if (typeof initials === 'string' && initials.trim()) {
      return initials.trim().slice(0, 2).toUpperCase();
    }

    return generateInitials(alt).slice(0, 2);
  }, [initials, alt]);

  const statusLabel = status ? DYN_AVATAR_STATUS_LABELS[status] : undefined;
  const accessibleLabelBase = ariaLabel ?? (isInteractive ? `Avatar for ${alt}` : alt);
  const accessibleLabel = statusLabel
    ? `${accessibleLabelBase} (${statusLabel})`
    : accessibleLabelBase;
  const pixelSize =
    DYN_AVATAR_PIXEL_SIZES[size] ?? DYN_AVATAR_PIXEL_SIZES.medium;
  const imageTestId = dataTestId ? `${dataTestId}-image` : 'dyn-avatar-image';

  const sizeClassName =
    styles[`avatar--${size}` as keyof typeof styles] ?? styles['avatar--medium'];
  const shapeClassName = styles[`avatar--${shape}` as keyof typeof styles];
  const statusClassName = status
    ? styles[`avatar--${status}` as keyof typeof styles]
    : undefined;

  const avatarClassName = cn(
    styles.avatar,
    sizeClassName,
    shapeClassName,
    statusClassName,
    {
      [styles['avatar--clickable']!]: isInteractive,
      [styles['avatar--loading']!]: isLoadingState,
      [styles['avatar--error']!]: hasErrored,
    },
    className
  );

  const {
    className: imageClassName,
    onLoad: onImageLoad,
    onError: onImageError,
    'data-testid': imageDataTestId,
    ...restImageProps
  } = imageProps ?? {};

  const handleImageLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    setImageLoaded(true);
    setImageError(false);
    onImageLoad?.(event);
  };

  const handleImageError = (event: SyntheticEvent<HTMLImageElement>) => {
    setImageError(true);
    setImageLoaded(false);
    onImageError?.(event);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!isInteractive) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.currentTarget.click();
    }
  };

  const shouldRenderFallback = !hasLoadedImage;

  const srMessages: Array<{ text: string; live: 'polite' | 'assertive' }> = [];

  if (isLoadingState) {
    srMessages.push({ text: 'Loading avatar', live: 'polite' });
  }

  if (hasErrored) {
    srMessages.push({ text: 'Avatar failed to load', live: 'assertive' });
  }

  const computedRole = isInteractive ? 'button' : roleProp ?? 'img';
  const computedTabIndex = isInteractive ? 0 : tabIndex;

  return (
    <div
      ref={ref}
      id={internalId}
      className={avatarClassName}
      role={computedRole}
      tabIndex={computedTabIndex}
      aria-label={accessibleLabel}
      aria-describedby={ariaDescribedBy}
      aria-labelledby={ariaLabelledBy}
      aria-busy={isLoadingState ? 'true' : undefined}
      data-status={status}
      data-testid={dataTestId ?? 'dyn-avatar'}
      onClick={isInteractive ? onClick : undefined}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {src && (
        <img
          src={src}
          alt={hasLoadedImage ? alt : ''}
          loading={imageLoading}
          width={pixelSize}
          height={pixelSize}
          className={cn(
            styles['avatar__image'],
            {
              [styles['avatar__image--loading']!]: !imageLoaded,
              [styles['avatar__image--loaded']!]: imageLoaded,
            },
            imageClassName
          )}
          data-testid={imageDataTestId ?? imageTestId}
          onLoad={handleImageLoad}
          onError={handleImageError}
          {...restImageProps}
        />
      )}

      {shouldRenderFallback && (
        <div
          className={styles['avatar__fallback']}
          aria-hidden={hasLoadedImage ? 'true' : undefined}
        >
          {fallback ??
            children ??
            (displayInitials ? (
              <span className={styles['avatar__initials']}>{displayInitials}</span>
            ) : (
              <span className={styles['avatar__icon']} aria-hidden="true">
                <DefaultFallbackIcon />
              </span>
            ))}
        </div>
      )}

      {srMessages.map(({ text, live }) => (
        <span key={text} className="dyn-sr-only sr-only" aria-live={live}>
          {text}
        </span>
      ))}
    </div>
  );
});

DynAvatar.displayName = 'DynAvatar';

export default DynAvatar;
