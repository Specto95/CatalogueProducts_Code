const bcrypt = require("bcryptjs");
// users.js
const users = [
  {
    id: 1,
    email: "test@test.com",
    password: bcrypt.hashSync("test1234", 10),
    role: "ADMIN",
  },
];

module.exports = {
  users,
};
