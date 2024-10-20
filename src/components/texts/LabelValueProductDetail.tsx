// LabelValue.tsx
import React, {FC} from 'react';

interface LabelValueProps {
    label: string;
    value: React.ReactNode; // Allows for any valid React node (string, JSX, etc.)
}

const LabelValueProductDetail: FC<LabelValueProps> = ({label, value}) => (
    <div className='w-full flex flex-row justify-between lg:justify-normal lg:gap-4 items-center'>
        <p className="text-sm text-brown-900 font-raleway">{label}</p>
        <span className="font-semibold text-brown-900 font-raleway">{value}</span>
    </div>
);

export default LabelValueProductDetail;
