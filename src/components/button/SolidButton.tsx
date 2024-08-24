// src/components/SolidButton.tsx

import React from 'react';
import SharedButton from './SharedButton';

interface SolidButtonProps {
    text: string;
    href: string;
}

const SolidButton: React.FC<SolidButtonProps> = ({ text, href }) => {
    return (
        <SharedButton
            text={text}
            href={href}
            borderColor="border-brown-500"
            textColor="text-brown-500"
            bgColor="bg-white"
            hoverBgColor="bg-bright-main"
            hoverTextColor="text-brown-500"
        />
    );
};

export default SolidButton;
