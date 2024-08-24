// src/components/OutlineButton.tsx

import React from 'react';
import SharedButton from './SharedButton';

interface OutlineButtonProps {
    text: string;
    href: string;
}

const OutlineButton: React.FC<OutlineButtonProps> = ({ text, href }) => {
    return (
        <SharedButton
            text={text}
            href={href}
            borderColor="border-brown-900"
            textColor="text-brown-900"
            bgColor="bg-white"
            hoverBgColor="bg-bright-main"
            hoverTextColor="text-brown-500"
        />
    );
};

export default OutlineButton;
