import React from 'react';

interface TextareaInputProps {
    label: string;
    placeholder: string;
}

const TextareaInput: React.FC<TextareaInputProps> = ({label, placeholder}) => (
    <div>
        <label className="block text-sm font-medium text-doveGray">{label}</label>
        <textarea
            className="mt-1 block w-full p-3 border border-stroke rounded-md"
            placeholder={placeholder}
        ></textarea>
    </div>
);

export default TextareaInput;
