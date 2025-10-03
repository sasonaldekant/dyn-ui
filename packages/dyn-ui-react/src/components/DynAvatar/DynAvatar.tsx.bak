import { React, useState } from 'react';
import classNames from 'classnames';
import { DynAvatarProps, AVATAR_SIZES } from '../../types/avatar.types';
import { generateInitials } from '../../utils/dynFormatters';
import './DynAvatar.module.css';

export const DynAvatar: React.FC<DynAvatarProps> = ({
  src,
  size = 'md',
  loading = 'eager',
  alt = 'Avatar',
  initials,
  className,
  onClick
}: DynAvatarProps) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const hasClickEvent = !!onClick;
  const pixelSize = AVATAR_SIZES[size as keyof typeof AVATAR_SIZES];
  
  // Generate initials if not provided
  const displayInitials = initials || (alt !== 'Avatar' ? generateInitials(alt) : '');

  const avatarClasses = classNames(
    'dyn-avatar',
    `dyn-avatar-${size}`,
    hasClickEvent && 'dyn-avatar-clickable',
    imageError && 'dyn-avatar-error',
    !imageLoaded && !imageError && src && 'dyn-avatar-loading',
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

  const renderPlaceholder = () => (
    <div className="dyn-avatar-placeholder" style={{ width: pixelSize, height: pixelSize }}>
      {displayInitials ? (
        <span className="dyn-avatar-initials">{displayInitials}</span>
      ) : (
        <span className="dyn-avatar-placeholder-icon">👤</span>
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
          className="dyn-avatar-image"
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
      onClick={handleClick}
      role={hasClickEvent ? 'button' : undefined}
      tabIndex={hasClickEvent ? 0 : undefined}
      aria-label={hasClickEvent ? `Avatar - ${alt}` : alt}
    >
      {renderContent()}
    </div>
  );
};
