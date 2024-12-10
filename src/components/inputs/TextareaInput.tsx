import React from 'react';

interface TextareaInputProps {
  label: string;
  placeholder: string;
  name: string; // Add name prop
  value: string; // Add value prop
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; // Add onChange prop
  required?: boolean; // Add optional required prop
}

const TextareaInput: React.FC<TextareaInputProps> = ({
  label,
  placeholder,
  name,
  value,
  onChange,
  required = false,
}) => (
  <div>
    <label className="block text-sm font-medium text-doveGray">{label}</label>
    <textarea
      className="mt-1 block w-full rounded-md border border-stroke p-3 pb-20"
      placeholder={placeholder}
      name={name} // Bind the name prop
      value={value} // Bind the value prop
      onChange={onChange} // Bind the onChange handler
      required={required} // Bind the required prop
    ></textarea>
  </div>
);

export default TextareaInput;
