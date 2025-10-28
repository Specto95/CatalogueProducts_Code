import { AUTH_API } from "../../../../context/helpers/api";

export async function validateIsEmailAvailable(
  email: string,
  token: string
): Promise<boolean> {
  try {
    const res = await fetch(AUTH_API.IS_EMAIL_AVAILABLE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      return false;
    }

    const data = await res.json();


    return data.message;
  } catch (error) {
    console.error("Error checking email availability:", error);
    return false;
  }
}
