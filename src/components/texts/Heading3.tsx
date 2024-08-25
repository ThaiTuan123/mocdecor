import React from 'react';

interface HeadingProps {
    text: string;
    size?: 'text-2xl' | 'text-6lg'; // Optional size prop
    color?: 'text-white' | 'text-primary'; // Optional color prop
}

const Heading3: React.FC<HeadingProps> = ({
                                              text,
                                              size = 'text-6lg',
                                              color = 'text-white', // Default color
                                          }) => (
    <div className="flex flex-col">
        <h3
            className={`font-bold font-playfairBold uppercase ${size} ${color}`}
            dangerouslySetInnerHTML={{__html: text}}
        />
    </div>
);

export default Heading3;