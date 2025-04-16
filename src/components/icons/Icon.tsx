import Image from 'next/image';

interface IconProps {
  src: string; // Path to the image
  alt: string; // Alt text for accessibility
  size?: 'small' | 'large'; // Optional prop to specify size
  onClick?: () => void; // Optional click handler
}

const Icon: React.FC<{
  src: string;
  alt: string;
  onClick?: () => void;
  className?: string;
  size?: 'small' | 'large';
}> = ({ src, alt, onClick, className = '', size = 'large' }) => {
  const sizeClass = size === 'large' ? 'h-8 w-8' : 'h-6 w-6';
  return (
    <img
      src={src}
      alt={alt}
      onClick={onClick}
      className={`${sizeClass} cursor-pointer ${className}`}
    />
  );
};

export default Icon;
