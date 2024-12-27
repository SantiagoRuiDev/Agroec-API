import bcrypt from "bcrypt";

export const hashPassword = async (text) => {
  return await bcrypt.hash(text, 10);
};

export const comparePassword = async (text, hash) => {
  return await bcrypt.compare(text, hash);
};

export const generateRandomPassword = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>?";
  const passwordLength = 12;
  let password = "";

  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }

  return password;
};
