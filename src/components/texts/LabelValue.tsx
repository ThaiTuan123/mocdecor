// LabelValue.tsx
import React, { FC } from 'react';

interface LabelValueProps {
    label: string;
    value: React.ReactNode; // Allows for any valid React node (string, JSX, etc.)
    isStatus?: boolean; // Optional prop
}

const LabelValue: FC<LabelValueProps> = ({ label, value, isStatus = false }) => (
    <div className='w-full flex flex-row justify-between items-center'>
        <p className="text-sm text-brown-900 font-raleway">{label}</p>
        {isStatus ? (
            <div className='py-1 px-7 bg-done-background rounded-2.5xl'>
                {value}
            </div>
        ) : (
            <span className="font-semibold text-brown-900 font-raleway">{value}</span>
        )}
    </div>
);

export default LabelValue;
