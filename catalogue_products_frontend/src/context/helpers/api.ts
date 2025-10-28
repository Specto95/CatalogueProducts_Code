// import { IS_USER_AUTHENTICATED } from "../api/isUserAuthenticated";

export const DEV_API = "http://localhost:3000";

export const AUTH_API = {
  REGISTER: `${DEV_API}/auth/create-role`,
  LOGIN: `${DEV_API}/auth/login`,
  FORGOT_PASSWORD: `${DEV_API}/auth/forgot-password`,
  IS_VALID_OLDPASSWORD: `${DEV_API}/auth/is-valid-oldpassword`,
  CHANGE_PASSWORD: `${DEV_API}/auth/change-password`,
  IS_REGISTERED_EMAIL: `${DEV_API}/auth/is-registered-email`,
  IS_EMAIL_AVAILABLE: `${DEV_API}/auth/is-email-available`,
  IS_USER_AUTHENTICATED: `${DEV_API}/auth/is-user-authenticated`,
  LOGOUT: `${DEV_API}/auth/logout`,
};

export const PRODUCT_API = {
  LIST_PRODUCTS: `${DEV_API}/products`,
  CREATE_PRODUCT: `${DEV_API}/products`,
  UPDATE_PRODUCT: (id: number) => `${DEV_API}/products/${id}`,
  DELETE_PRODUCT: (id: number) => `${DEV_API}/products/${id}`,
};
