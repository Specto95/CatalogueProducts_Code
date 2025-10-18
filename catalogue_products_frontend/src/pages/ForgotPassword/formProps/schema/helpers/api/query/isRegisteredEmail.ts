import { gql } from "@apollo/client";

export const IS_REGISTERED_EMAIL = gql`
    query isRegisteredEmail($email: String!) {
        isRegisteredEmail(email: $email)
    }
`

