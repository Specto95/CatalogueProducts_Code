import bcrypt from 'bcryptjs';
// users.js
export const users = [
  {
    id: 1,
    email: "test@test.com",
    password: bcrypt.hashSync("test1234", 10),
    role: "ADMIN",
  },
];

export const activeTokens = new Set();