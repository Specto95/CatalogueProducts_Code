

import { useContext } from "react";
import { SessionContext } from "../context/SessionContext";

export function useSessionProvider() {
  return useContext(SessionContext);
}
