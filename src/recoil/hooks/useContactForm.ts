// hooks/useContactForm.ts
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { contactFormState } from "@/recoil/atoms/contactFormAtom";
import { submitContactForm } from "@/services/api";
import languages from "@/configs/languages";

export const useContactForm = () => {
    const [formData, setFormData] = useRecoilState(contactFormState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await submitContactForm(formData);
            setSuccess(true);
        } catch (err) {
            setError(languages.get('error.response.title'));
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        loading,
        error,
        success,
        handleChange,
        handleSubmit,
    };
};
