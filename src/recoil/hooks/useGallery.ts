import { useEffect, useState } from "react";
import languages from "@/configs/languages";

export const useGallery = () => {
    // Extract constants for reusable text values
    const placeholderDefault = languages.get("galley.hero.input.place.holder");
    const placeholderMobile = languages.get("galley.hero.input.place.holder.mobile");

    // State variables for input value, validation message, and input state
    const [placeholder, setPlaceholder] = useState(placeholderDefault);
    const [inputValue, setInputValue] = useState('');
    const [isInputEmpty, setIsInputEmpty] = useState(false); // Tracks if input is empty
    const [isFound, setIsFound] = useState<boolean | null>(null); // Tracks search status (null: default, true: found, false: not found)

    useEffect(() => {
        // Function to update the placeholder based on screen size
        const updatePlaceholder = () => {
            if (window.innerWidth < 768) {
                setPlaceholder(placeholderMobile);
            } else {
                setPlaceholder(placeholderDefault);
            }
        };

        // Set initial placeholder on component mount
        updatePlaceholder();

        // Add event listener for window resize
        window.addEventListener("resize", updatePlaceholder);

        // Cleanup event listener on component unmount
        return () => window.removeEventListener("resize", updatePlaceholder);
    }, [placeholderDefault, placeholderMobile]);

    // Simulated function for checking if input is found (avoid hardcoding)
    const searchGallery = (query: string): boolean => {
        // Replace this with your actual search logic or API call
        const validInput = ['123456', 'abcdef']; // Example valid inputs
        return validInput.includes(query.trim().toLowerCase());
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        setIsInputEmpty(false); // Reset input state when user types
    };

    const handleButtonClick = () => {
        if (inputValue.trim() === '') {
            setIsInputEmpty(true); // Set state to true if input is empty
            setIsFound(null); // Reset found state
        } else {
            setIsInputEmpty(false); // Reset state if input has value
            setIsFound(searchGallery(inputValue)); // Check if input is found dynamically
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleButtonClick(); // Trigger search when pressing Enter
        }
    };

    return {
        placeholder,
        inputValue,
        isInputEmpty,
        isFound,
        handleInputChange,
        handleButtonClick,
        handleKeyPress
    };
};
