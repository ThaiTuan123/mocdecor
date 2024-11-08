import React, {useEffect, useState} from 'react';

interface HeadingProps {
    text: string;
    align?: 'left' | 'center' | 'right';
    textColor?: 'text-primary' | 'text-white';
    className?: string;
    marginBottom?: 'mb-8' | 'mb-6' | 'mb-4' | 'mb-2' | 'mb-1';
    classNameText?: string;
}

const Heading2: React.FC<HeadingProps> = ({
                                              text,
                                              align = 'center',
                                              textColor = 'text-primary',
                                              className = '',
                                              marginBottom = '',
                                              classNameText = '',
                                          }) => {
    const [formattedText, setFormattedText] = useState(text);

    const handleResize = () => {
        // Check if it's mobile
        const isMobile = window.innerWidth < 768;

        // Remove <br> tags if it's mobile
        if (isMobile) {
            setFormattedText(text.replace(/<br\s*\/?>/gi, ' ').replace(/\s+/g, ' ')); // Replace extra spaces with a single space
        } else {
            setFormattedText(text); // Keep original text with <br> for larger screens
        }
    };

    useEffect(() => {
        // Initial check
        handleResize();

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Clean up event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, [text]); // Dependency on text

    return (
        <div className={`flex flex-col ${className} ${marginBottom}`}>
            <h2
                className={`text-${align} ${classNameText} text-2xl md:text-4xl font-bold ${textColor} font-playfairBold`}
                dangerouslySetInnerHTML={{__html: formattedText}}
            />
        </div>
    );
};

export default Heading2;