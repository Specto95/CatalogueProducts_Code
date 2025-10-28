import { AUTH_API } from "../../../../../context/helpers/api";

export async function validateOldPassword(
  email: string,
  oldPassword: string,
  token: string
): Promise<boolean> {
  try {
    const res = await fetch(AUTH_API.IS_VALID_OLDPASSWORD, {
      method: "POST",
      body: JSON.stringify({ email, oldPassword }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return res.ok;
  } catch (error) {
    console.error("Error validating old password:", error);
    return false;
  }
}
