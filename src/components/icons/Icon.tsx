interface IconProps {
    src: string;
    alt: string;
    size?: 'small' | 'large'; // optional prop to specify size
}

const Icon = ({src, alt, size = 'small'}: IconProps) => {
    const sizeClasses = size === 'small' ? 'h-6 w-6' : 'h-12 w-12'; // 24px for small and 48px for large

    return (
        <img src={src} alt={alt} className={`${sizeClasses} text-black hover:opacity-85 cursor-pointer`}/>
    );
};

export default Icon;
