import React from 'react';

interface TextInputProps {
    label: string;
    placeholder: string;
    type?: string;
}

const TextInput: React.FC<TextInputProps> = ({label, placeholder, type = 'text'}) => (
    <div className='w-full'>
        <label className="block text-sm font-medium text-doveGray">{label}</label>
        <input
            type={type}
            className="mt-1 block w-full p-3 border border-stroke rounded-md"
            placeholder={placeholder}
        />
    </div>
);

export default TextInput;
