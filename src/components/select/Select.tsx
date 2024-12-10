import { Select } from 'antd';
import React from 'react';

interface SelectCustomProps {
  label: string;
  handleChange: (value: string) => void;
  option: any[];
  placeholder: string;
  value: string | null;
  disable: boolean;
}

const SelectCustom: React.FC<SelectCustomProps> = ({
  label,
  handleChange,
  option,
  placeholder,
  value,
  disable,
}) => (
  <div className="w-full">
    <label className="block text-sm font-medium text-doveGray">{label}</label>
    <Select
      placeholder={placeholder}
      style={{ width: '100%', height: 50, marginTop: 4 }}
      onChange={handleChange}
      options={option}
      className="custom-select"
      value={value}
      disabled={disable}
    />
  </div>
);

export default SelectCustom;
