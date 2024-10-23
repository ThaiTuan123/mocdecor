// hooks/usePopupSuccess.ts
import { useEffect, useState } from "react";

const usePopupSuccess = (isVisible: boolean, onClose: () => void) => {
    const [timeRemaining, setTimeRemaining] = useState(5); // Rename countdown to timeRemaining

    useEffect(() => {
        if (!isVisible) return;

        const timer = setInterval(() => {
            setTimeRemaining((prev) => prev - 1);
        }, 1000);

        if (timeRemaining === 0) {
            clearInterval(timer);
            onClose();
        }

        return () => clearInterval(timer);
    }, [isVisible, timeRemaining, onClose]);

    return timeRemaining; // Return the new state
};

export default usePopupSuccess;