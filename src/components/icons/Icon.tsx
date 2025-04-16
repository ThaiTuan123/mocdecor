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
}> = ({ src, alt, onClick, className = '' }) => {
  return (
    <img
      src={src}
      alt={alt}
      onClick={onClick}
      className={`h-6 w-6 cursor-pointer ${className}`}
    />
  );
};

export default Icon;
