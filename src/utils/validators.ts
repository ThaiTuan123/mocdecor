import { VIETNAM_PHONE_REGEX } from './constants';

export const isValidVietnamPhoneNumber = (phone: string): boolean => {
  return VIETNAM_PHONE_REGEX.test(phone);
};
