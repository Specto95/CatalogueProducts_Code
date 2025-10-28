// import { client } from "../../../../../api/apolloClient";
// import { IS_REGISTERED_EMAIL } from "./api/query/isRegisteredEmail";

import { AUTH_API } from "../../../../../context/helpers/api";

export async function validateIsEmailUnavailable(
  email: string
): Promise<boolean> {
  try {
    const response = await fetch(AUTH_API.IS_REGISTERED_EMAIL, {
      method: "POST",
      body: JSON.stringify({email}),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`NOT FOUND`);
    }
    return data.message || false;
  } catch (error) {
    console.error("Error checking email availability:", error);
    return false; // assume unavailable on error
  }
}
