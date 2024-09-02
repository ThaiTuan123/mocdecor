import React, { MouseEvent, ReactElement } from 'react';

interface LayoutOpacityProps {
    isVisible: boolean
    children: ReactElement
    className?: string
    onClick?: () => void
}


const LayoutOpacity: React.FC<LayoutOpacityProps> = ({
    isVisible,
    children,
    className,
    onClick
}) => {

    const handleClickLayout = (event: MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget && onClick) {
            onClick();
        }
    };

    return isVisible ? <div className={`fixed inset-0 bg-layout z-50 flex justify-center items-center ${className}`} onClick={handleClickLayout}>
        {children}
    </div> : null
}

export default LayoutOpacity;