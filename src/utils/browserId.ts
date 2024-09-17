// src/utils/browserId.ts
import { v4 as uuidv4 } from 'uuid';

export const getOrCreateBrowserId = (): string => {
    let browserId = localStorage.getItem('browserId');

    if (!browserId) {
        browserId = uuidv4();
        localStorage.setItem('browserId', browserId);
    }

    return browserId;
};
