import React, {useEffect, useState} from 'react';

interface TextContentProps {
    text: string;
    textColor?: 'text-brown-900' | 'text-white';
    marginBottom?: 'mb-6' | 'mb-4';
    className?: string;
}

const TextContent: React.FC<TextContentProps> = ({
                                                     text,
                                                     textColor = 'text-brown-900',
                                                     marginBottom = 'mb-6',
                                                     className = '',
                                                 }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const cleanText = isMobile ? text.replace(/<br\s*\/?>/gi, '') : text;

    return (
        <p
            className={`text-sm md:text-lg lg:text-1.25lg font-raleway ${textColor} ${marginBottom} ${className} font-normal text-start`}
            dangerouslySetInnerHTML={{__html: cleanText}}
        />
    );
};

export default TextContent;
