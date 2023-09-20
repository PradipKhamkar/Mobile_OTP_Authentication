export const validatePassword = (password: any) => {
  const regexForPassword = /[A-Za-z\d]{5,}/;
  const isValid = regexForPassword.test(password);
  return isValid;
};

export const validateEmail = (email: any) => {
  const regexForEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const isValid = regexForEmail.test(email);
  return isValid;
};

export const validateName = (value: any) => {
  const nameRegex = /^[^\s]+$/;
  const isValid = nameRegex.test(value);
  return isValid;
};

export const validatePhoneNumber = (phoneNumber: any) => {
  const phoneRegex = /^\d{10}$/;
  const isValid = phoneRegex.test(phoneNumber);
  return isValid;
};
