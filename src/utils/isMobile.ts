export const isMobile = (): boolean => {
    if (typeof window !== 'undefined') {
        return window.innerWidth <= 768; // Adjust the width as needed
    }
    return false;
};