import { client } from "../../../../api/apolloClient";
import { IS_EMAIL_AVAILABLE } from "./query/isEmailAvailable";

export async function validateIsEmailAvailable(
  email: string
): Promise<boolean> {
  try {
    const { data } = await client.query<
      { isEmailAvailable: boolean },
      { email: string }
    >({
      query: IS_EMAIL_AVAILABLE,
      variables: { email },
      fetchPolicy: "network-only",
    });

    return !!data?.isEmailAvailable;
  } catch (error) {
    console.error("Error checking email availability:", error);
    return false; // assume unavailable on error
  }
}
