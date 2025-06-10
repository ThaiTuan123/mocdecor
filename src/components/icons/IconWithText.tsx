import Icon from './Icon';

interface IconWithTextProps {
  src: string;
  alt: string;
  size: 'small' | 'large';
  text: string;
}

const IconWithText = ({ src, alt, size, text }: IconWithTextProps) => (
  <div className="flex flex-col items-center md:flex-row">
    <Icon src={src} alt={alt} size={size} />
    <span className="mt-2 text-center font-raleway text-sm md:ml-4 md:mt-0 md:text-left md:text-lg">
      {text}
    </span>
  </div>
);

export default IconWithText;
