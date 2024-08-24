import React from 'react';

interface TextContentProps {
    text: string;
    textColor?: 'text-brown-900' | 'text-white';
    marginBottom?: 'mb-6'| 'mb-4';
}

const TextContent: React.FC<TextContentProps> = ({text, textColor = 'text-brown-900', marginBottom = 'mb-6'}) => (
    <p
        className={`text-1.25lg font-raleway ${textColor} ${marginBottom} font-normal text-start`}
        dangerouslySetInnerHTML={{__html: text}}
    />
);

export default TextContent;
