import React, { ReactElement } from 'react';

interface LayoutOpacityProps {
    isVisible: boolean
    children: ReactElement
    className?: string
}


const LayoutOpacity: React.FC<LayoutOpacityProps> = ({
    isVisible,
    children,
    className
}) => {
    return isVisible ? <div className={`fixed inset-0 bg-layout z-50 flex justify-center items-center ${className}`}>
        {children}
    </div> : null
}

export default LayoutOpacity;