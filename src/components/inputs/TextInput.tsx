import React from 'react';

interface TextInputProps {
    label: string;
    placeholder: string;
    type?: string;
    name?: string; // Add name prop
    value?: string; // Add value prop
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Add onChange prop
    required?: boolean; // Add optional required prop
}

const TextInput: React.FC<TextInputProps> = ({ label, placeholder, type = 'text', name, value, onChange, required = false }) => (
    <div className='w-full'>
        <label className="block text-smLh font-medium text-doveGray">{label}</label>
        <input
            type={type}
            name={name} // Bind name prop
            value={value} // Bind value prop
            onChange={onChange} // Bind onChange handler
            className="mt-1 block w-full p-3 border border-stroke rounded-md"
            placeholder={placeholder}
            required={required} // Bind required prop
        />
    </div>
);

export default TextInput;
