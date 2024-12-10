// LabelValue.tsx
import React, { FC } from 'react';

interface LabelValueProps {
  label: string;
  value: React.ReactNode; // Allows for any valid React node (string, JSX, etc.)
  isStatus?: boolean; // Optional prop
}

const LabelValue: FC<LabelValueProps> = ({
  label,
  value,
  isStatus = false,
}) => (
  <div className="flex w-full flex-row items-center justify-between">
    <p className="font-raleway text-sm text-brown-900">{label}</p>
    {isStatus ? (
      <div className="rounded-2.5xl bg-done-background px-7 py-1">{value}</div>
    ) : (
      <span className="font-raleway font-semibold text-brown-900">{value}</span>
    )}
  </div>
);

export default LabelValue;
