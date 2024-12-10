// LabelValue.tsx
import React, { FC } from 'react';

interface LabelValueProps {
  label: string;
  value: React.ReactNode; // Allows for any valid React node (string, JSX, etc.)
}

const LabelValueProductDetail: FC<LabelValueProps> = ({ label, value }) => (
  <div className="flex w-full flex-row items-center justify-between lg:justify-normal lg:gap-4">
    <p className="font-raleway text-sm text-brown-900">{label}</p>
    <span className="font-raleway font-semibold text-brown-900">{value}</span>
  </div>
);

export default LabelValueProductDetail;
