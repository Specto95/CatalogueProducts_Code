import { users } from "../../users.mjs";

export function getUserByEmail(email) {
  return users.find((u) => u.email === email);
}
