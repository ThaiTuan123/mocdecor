import React from 'react';

interface HeadingProps {
    text: string;
    align?: 'left' | 'center' | 'right';
    textColor?: 'text-primary' | 'text-white';
    className?: string;
    marginBottom?: 'mb-8' | 'mb-6';

}

const Heading2: React.FC<HeadingProps> = ({
                                              text,
                                              align = 'center',
                                              textColor = 'text-primary',
                                              className = '',
                                              marginBottom = 'mb-8'
                                          }) => (
    <div className={`flex flex-col ${className}`}>
        <h2
            className={`text-${align} text-4xl font-bold ${marginBottom} ${textColor} font-playfairBold`}
            dangerouslySetInnerHTML={{__html: text}}
        />
    </div>
);

export default Heading2;
