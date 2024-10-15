import Icon from './Icon';

interface IconWithTextProps {
    src: string;
    alt: string;
    size: 'small' | 'large';
    text: string;
}

const IconWithText = ({src, alt, size, text}: IconWithTextProps) => (
    <div className="flex flex-col items-center md:flex-row">
        <Icon src={src} alt={alt} size={size}/>
        <span className="font-raleway text-sm md:text-lg mt-2 md:mt-0 md:ml-4 text-center md:text-left">{text}</span>
    </div>
);

export default IconWithText;
