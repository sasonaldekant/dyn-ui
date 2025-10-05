import * as React from 'react';
import { useState } from 'react';
import { DynAvatarProps, AVATAR_SIZES } from '../../types/avatar.types';
import { cn } from '../../utils/classNames';
import styles from './DynAvatar.module.scss';

/**
 * DynAvatar - Avatar component with image fallback to initials
 * Supports different sizes, click handlers, and accessibility features
 */
export const DynAvatar: React.FC<DynAvatarProps> = ({
  src,
  size = 'md',
  loading = 'eager',
  alt = 'Avatar',
  initials,
  className,
  onClick,
  ...rest
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const hasClickEvent = !!onClick;
  const pixelSize = AVATAR_SIZES[size as keyof typeof AVATAR_SIZES];
  
  // Generate initials if not provided and alt is meaningful
  const displayInitials = initials || (alt !== 'Avatar' ? generateInitials(alt) : '');

  const avatarClasses = cn(
    styles.avatar,
    styles[`avatar--${size}`],
    {
      [styles['avatar--clickable']]: hasClickEvent,
      [styles['avatar--error']]: imageError,
      [styles['avatar--loading']]: !imageLoaded && !imageError && src,
    },
    className
  );

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (hasClickEvent) {
      onClick?.(event);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (hasClickEvent && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick?.(event as any);
    }
  };

  const renderPlaceholder = () => (
    <div 
      className={styles.placeholder} 
      style={{ width: pixelSize, height: pixelSize }}
    >
      {displayInitials ? (
        <span className={styles.initials}>{displayInitials}</span>
      ) : (
        <span className={styles.icon} aria-hidden="true">👤</span>
      )}
    </div>
  );

  const renderContent = () => {
    if (imageError || !src) {
      return renderPlaceholder();
    }

    return (
      <>
        {!imageLoaded && renderPlaceholder()}
        <img
          src={src}
          alt={alt}
          loading={loading}
          width={pixelSize}
          height={pixelSize}
          className={styles.image}
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{ display: imageLoaded ? 'block' : 'none' }}
        />
      </>
    );
  };

  return (
    <div
      className={avatarClasses}
      onClick={hasClickEvent ? handleClick : undefined}
      onKeyDown={hasClickEvent ? handleKeyDown : undefined}
      role={hasClickEvent ? 'button' : undefined}
      tabIndex={hasClickEvent ? 0 : undefined}
      aria-label={hasClickEvent ? `Avatar - ${alt}` : alt}
      data-testid="dyn-avatar"
      {...rest}
    >
      {renderContent()}
    </div>
  );
};

DynAvatar.displayName = 'DynAvatar';

export default DynAvatar;

// Helper function to generate initials from name
function generateInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);
}