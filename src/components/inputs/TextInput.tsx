import React, { FocusEventHandler } from 'react';

interface TextInputProps {
  label: string;
  placeholder: string;
  type?: string;
  name?: string; // Add name prop
  value?: string; // Add value prop
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Add onChange prop
  onBlur?: FocusEventHandler<HTMLInputElement>;
  required?: boolean; // Add optional required prop
}

const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
  e.target.setAttribute('readonly', 'true'); // Hack để kích hoạt bàn phím
  e.target.removeAttribute('readonly');
};

const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  type = 'text',
  name,
  value,
  onChange,
  required = false,
  onBlur,
}) => (
  <div className="w-full">
    <label className="block text-smLh font-medium text-doveGray">{label}</label>
    <input
      type={type}
      name={name} // Bind name prop
      value={value} // Bind value prop
      onChange={onChange} // Bind onChange handler
      className="mt-1 block w-full rounded-md border border-stroke p-3 placeholder-gray-400 focus:outline-none focus:ring"
      placeholder={placeholder}
      required={required} // Bind required prop
      onBlur={onBlur}
      onFocus={handleFocus}
    />
  </div>
);

export default TextInput;
