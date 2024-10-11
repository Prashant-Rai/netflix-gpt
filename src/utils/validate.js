export const validateFormInput = ({ name, email, password, isSignUp }) => {
  const isNameValid = isSignUp ? /[a-z A-Z][a-z A-Z]+$/.test(name) : true;
  const isEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
  if (isSignUp && !name.length) return "Name is required";
  if (!isNameValid) return "Name should not contain special character.";
  if (!isEmailValid) return "Invalid email address";
  if (password.length < 8)
    return "Password should be at least 8 characters long.";
  if (!isPasswordValid)
    return "Password must contain  at least one uppercase letter, one lowercase letter, one digit and one special character.";

  return null;
};
