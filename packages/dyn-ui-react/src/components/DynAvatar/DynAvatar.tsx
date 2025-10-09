import { forwardRef, useMemo, useState } from 'react';
import type { KeyboardEvent, MouseEvent } from 'react';
import type {
  AvatarSize,
  DynAvatarProps,
} from '../../types/avatar.types';
import { AVATAR_SIZES } from '../../types/avatar.types';
import { cn } from '../../utils/classNames';
import styles from './DynAvatar.module.css';

const sizeClassNameMap: Record<AvatarSize, string> = {
  xs: styles.sizeXs!,
  sm: styles.sizeSm!,
  md: styles.sizeMd!,
  lg: styles.sizeLg!,
  xl: styles.sizeXl!,
};

const generateInitials = (name: string): string =>
  name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);

export const DynAvatar = forwardRef<HTMLDivElement, DynAvatarProps>((props, ref) => {
  const {
    src,
    size = 'md',
    loading = 'eager',
    alt = 'Avatar',
    initials,
    className,
    onClick,
    children,
    'data-testid': dataTestId,
    ...rest
  } = props;

  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const pixelSize = AVATAR_SIZES[size] ?? AVATAR_SIZES.md;
  const isInteractive = typeof onClick === 'function';

  const fallbackInitials = useMemo(() => {
    if (typeof initials === 'string' && initials.trim().length > 0) {
      return initials.trim().slice(0, 2).toUpperCase();
    }

    if (alt && alt !== 'Avatar') {
      return generateInitials(alt);
    }

    return '';
  }, [initials, alt]);

  const containerClassName = cn(
    styles.root,
    sizeClassNameMap[size] ?? styles.sizeMd,
    {
      [styles.clickable!]: isInteractive,
      [styles.loading!]: Boolean(src) && !isLoaded && !hasError,
      [styles.error!]: hasError,
    },
    className
  );

  const handleImageLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleImageError = () => {
    setHasError(true);
    setIsLoaded(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!isInteractive) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick?.(event as unknown as MouseEvent<HTMLDivElement>);
    }
  };

  const shouldHidePlaceholderFromAccessibility = Boolean(src) && !hasError;

  return (
    <div
      ref={ref}
      className={containerClassName}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-label={isInteractive ? `Avatar - ${alt}` : alt}
      onClick={isInteractive ? onClick : undefined}
      onKeyDown={isInteractive ? handleKeyDown : undefined}
      data-testid={dataTestId ?? 'dyn-avatar'}
      {...rest}
    >
      {(!src || hasError || !isLoaded) && (
        <div
          className={styles.placeholder}
          aria-hidden={shouldHidePlaceholderFromAccessibility ? 'true' : undefined}
        >
          {children ??
            (fallbackInitials ? (
              <span className={styles.initials}>{fallbackInitials}</span>
            ) : (
              <span className={styles.icon} aria-hidden="true">
                👤
              </span>
            ))}
        </div>
      )}

      {src && !hasError ? (
        <img
          src={src}
          alt={alt}
          loading={loading}
          width={pixelSize}
          height={pixelSize}
          className={styles.image}
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{ opacity: isLoaded ? 1 : 0 }}
        />
      ) : null}
    </div>
  );
});

DynAvatar.displayName = 'DynAvatar';

export default DynAvatar;
