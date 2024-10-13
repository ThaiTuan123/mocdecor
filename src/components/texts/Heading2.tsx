import React, {useEffect, useState} from 'react';

interface HeadingProps {
    text: string;
    align?: 'left' | 'center' | 'right';
    textColor?: 'text-primary' | 'text-white';
    className?: string;
    marginBottom?: 'mb-8' | 'mb-6' | 'mb-4' | 'mb-2' | 'mb-1';
}

const Heading2: React.FC<HeadingProps> = ({
                                              text,
                                              align = 'center',
                                              textColor = 'text-primary',
                                              className = '',
                                              marginBottom = 'mb-8',
                                          }) => {
    const [formattedText, setFormattedText] = useState(text);

    useEffect(() => {
        // Check if it's mobile
        const isMobile = window.innerWidth < 768;

        // If it's mobile, remove <br> tags from the text
        if (isMobile) {
            setFormattedText(text.replace(/<br\s*\/?>/gi, '').replace(/\s+/g, '')); // replace extra spaces with a single space
        } else {
            setFormattedText(text); // Keep original text for larger screens
        }
    }, [text]);

    return (
        <div className={`flex flex-col ${className} ${marginBottom}`}>
            <h2
                className={`text-${align} text-2xl md:text-4xl font-bold ${textColor} font-playfairBold whitespace-pre-line`}
                dangerouslySetInnerHTML={{__html: formattedText}}
            />
        </div>
    );
};

export default Heading2;