import React from 'react';

interface TextContentProps {
    text: string;
    textColor?: 'text-brown-900' | 'text-white';
    marginBottom?: 'mb-6'| 'mb-4';
    className?: string;
}

const TextContent: React.FC<TextContentProps> = ({text, textColor = 'text-brown-900', marginBottom = 'mb-6', className = ''}) => (
    <p
        className={`text-sm md:text-1.25lg font-raleway ${textColor} ${marginBottom} ${className} font-normal text-start`}
        dangerouslySetInnerHTML={{__html: text}}
    />
);

export default TextContent;
