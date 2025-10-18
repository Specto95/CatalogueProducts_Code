import { client } from "../../../../../api/apolloClient";
import { IS_REGISTERED_EMAIL } from "./api/query/isRegisteredEmail";

export async function validateIsRegisteredEmail(
  email: string
): Promise<boolean> {
  try {
    const { data } = await client.query<
      { isRegisteredEmail: boolean },
      { email: string }
    >({
      query: IS_REGISTERED_EMAIL,
      variables: { email },
      fetchPolicy: "network-only",
    });

    return !!data?.isRegisteredEmail;
  } catch (error) {
    console.error("Error checking email availability:", error);
    return false; // assume unavailable on error
  }
}
