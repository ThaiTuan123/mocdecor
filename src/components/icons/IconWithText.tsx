import Icon from './Icon';

interface IconWithTextProps {
    src: string;
    alt: string;
    size: 'small' | 'large';
    text: string;
}

const IconWithText = ({src, alt, size, text}: IconWithTextProps) => (
    <div className="flex items-center">
        <Icon src={src} alt={alt} size={size}/>
        <span className="font-raleway ml-4">{text}</span>
    </div>
);

export default IconWithText;
