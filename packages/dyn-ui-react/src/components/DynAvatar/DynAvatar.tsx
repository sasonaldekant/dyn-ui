import React, { forwardRef, useState, useMemo } from 'react';
import { cn } from '../../utils/classNames';
import { generateId } from '../../utils/accessibility';
import { DynAvatarProps, DynAvatarRef, DYN_AVATAR_STATUS_LABELS } from './DynAvatar.types';
import styles from './DynAvatar.module.css';

// Default fallback icon
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

/**
 * Generate initials from a name string
 * Optimized algorithm for proper initials extraction
 */
const generateInitials = (name: string): string => {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(word => word.charAt(0).toUpperCase())
    .join('');
};

export const DynAvatar = forwardRef<DynAvatarRef, DynAvatarProps>(
  (
    {
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
      role,
      children,
      ...rest
    },
    ref
  ) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [internalId] = useState(() => id || generateId('avatar'));

    const isInteractive = Boolean(onClick);
    
    // Generate initials from alt text or use provided initials
    const displayInitials = useMemo(() => {
      if (initials) return initials.slice(0, 2).toUpperCase();
      if (alt && alt !== 'Avatar') return generateInitials(alt);
      return '';
    }, [initials, alt]);

    // Determine what to show
    const showImage = src && !imageError && imageLoaded;
    const showFallback = !src || imageError || !imageLoaded;
    const isLoadingState = loading || (src && !imageLoaded && !imageError);

    const handleImageLoad = () => {
      setImageLoaded(true);
      setImageError(false);
    };

    const handleImageError = () => {
      setImageError(true);
      setImageLoaded(false);
    };

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (!isInteractive) return;
      onClick?.(event);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!isInteractive) return;
      
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onClick?.(event as any);
      }
    };

    // Generate CSS class names with proper type safety
    const sizeClass = styles[`avatar--${size}` as keyof typeof styles] || styles['avatar--medium'];
    const shapeClass = styles[`avatar--${shape}` as keyof typeof styles] || styles.avatar;
    const statusClass = status ? styles[`avatar--${status}` as keyof typeof styles] : undefined;

    // Generate accessibility attributes
    const statusLabel = status ? DYN_AVATAR_STATUS_LABELS[status] : undefined;
    const accessibleLabelBase = ariaLabel || (isInteractive ? `Avatar for ${alt}` : alt);
    const accessibleLabel = statusLabel
      ? `${accessibleLabelBase} (${statusLabel})`
      : accessibleLabelBase;

    const avatarClasses = cn(
      styles.avatar,
      sizeClass,
      shapeClass,
      statusClass,
      {
        [styles['avatar--clickable'] || '']: isInteractive,
        [styles['avatar--loading'] || '']: isLoadingState,
        [styles['avatar--error'] || '']: error || imageError,
      },
      className
    );

    // Generate image classes with proper type safety
    const imageClasses = cn(
      styles['avatar__image'] || styles.avatar__image,
      {
        [styles['avatar__image--loading'] || '']: !imageLoaded,
        [styles['avatar__image--loaded'] || '']: imageLoaded,
      }
    );

    // Accessibility props
    const accessibilityProps = {
      id: internalId,
      role: isInteractive ? ('button' as const) : (role || ('img' as const)),
      tabIndex: isInteractive ? 0 : undefined,
      'aria-label': accessibleLabel,
      'aria-describedby': ariaDescribedBy,
      'aria-labelledby': ariaLabelledBy,
      'aria-busy': isLoadingState ? ('true' as const) : undefined,
      'data-status': status,
      'data-testid': dataTestId || 'dyn-avatar',
    } as const;

    return (
      <div
        ref={ref}
        className={avatarClasses}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...accessibilityProps}
        {...rest}
      >
        {/* Image */}
        {src && (
          <img
            src={src}
            alt={showImage ? alt : ''}
            loading={imageLoading}
            className={imageClasses}
            onLoad={handleImageLoad}
            onError={handleImageError}
            {...imageProps}
          />
        )}

        {/* Fallback content */}
        {showFallback && (
          <div 
            className={styles['avatar__fallback'] || styles.avatar__fallback}
            aria-hidden={showImage ? 'true' : undefined}
          >
            {fallback || children || (
              displayInitials ? (
                <span className={styles['avatar__initials'] || styles.avatar__initials}>
                  {displayInitials}
                </span>
              ) : (
                <span className={styles['avatar__icon'] || styles.avatar__icon}>
                  <DefaultFallbackIcon />
                </span>
              )
            )}
          </div>
        )}

        {/* Loading announcement for screen readers */}
        {isLoadingState && (
          <span className="dyn-sr-only" aria-live="polite">
            Loading avatar
          </span>
        )}

        {/* Error announcement for screen readers */}
        {(error || imageError) && (
          <span className="dyn-sr-only" aria-live="assertive">
            Avatar failed to load
          </span>
        )}
      </div>
    );
  }
);

DynAvatar.displayName = 'DynAvatar';