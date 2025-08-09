export const validatePassword = (pwd: string) => {
    // Example: minimum 8 chars, at least one number and letter (customize as needed)
    const minLength = 8;
    if (pwd.length < minLength) return `Password must be at least ${minLength} characters.`;
    if (!/[a-zA-Z]/.test(pwd) || !/\d/.test(pwd))
      return "Password must contain at least one letter and one number.";
    return "";
  };