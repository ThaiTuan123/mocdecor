// recoil/atoms/contactFormAtom.ts
import {atom} from 'recoil';
import {ContactFormModel} from "@/types/ContactFormModel";

export const contactFormState = atom<ContactFormModel>({
    key: 'contactFormState',
    default: {
        fullName: '',
        email: '',
        phone: '',
        message: '',
    },
});
