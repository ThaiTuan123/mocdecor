import React from 'react';

interface HeadingProps {
    text: string;
    size?: 'text-2xl' | 'text-6lg'; // Optional size prop
    color?: 'text-white' | 'text-primary'; // Optional color prop
    className?: string;
    classNameAll?: string;
}

const Heading3: React.FC<HeadingProps> = ({
                                              text,
                                              size = 'text-6lg',
                                              color = 'text-white',
                                              className = '',// Default color
                                              classNameAll = '',// Default color
                                          }) => (
    <div className={`flex flex-col ${classNameAll}`}>
        <h3
            className={`font-bold font-playfairBold uppercase text-4xl md:${size} ${color} ${className}`}
            dangerouslySetInnerHTML={{__html: text}}
        />
    </div>
);

export default Heading3;