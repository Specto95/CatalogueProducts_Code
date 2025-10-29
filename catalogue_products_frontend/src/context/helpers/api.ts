// import { IS_USER_AUTHENTICATED } from "../api/isUserAuthenticated";


export const AUTH_API = {
  REGISTER: `${import.meta.env.VITE_API_URL}/auth/create-role`,
  LOGIN: `${import.meta.env.VITE_API_URL}/auth/login`,
  FORGOT_PASSWORD: `${import.meta.env.VITE_API_URL}/auth/forgot-password`,
  IS_VALID_OLDPASSWORD: `${import.meta.env.VITE_API_URL}/auth/is-valid-oldpassword`,
  CHANGE_PASSWORD: `${import.meta.env.VITE_API_URL}/auth/change-password`,
  IS_REGISTERED_EMAIL: `${import.meta.env.VITE_API_URL}/auth/is-registered-email`,
  IS_EMAIL_AVAILABLE: `${import.meta.env.VITE_API_URL}/auth/is-email-available`,
  IS_USER_AUTHENTICATED: `${import.meta.env.VITE_API_URL}/auth/is-user-authenticated`,
  LOGOUT: `${import.meta.env.VITE_API_URL}/auth/logout`,
};

export const PRODUCT_API = {
  LIST_PRODUCTS: `${import.meta.env.VITE_API_URL}/products`,
  CREATE_PRODUCT: `${import.meta.env.VITE_API_URL}/products`,
  UPDATE_PRODUCT: (id: number) => `${import.meta.env.VITE_API_URL}/products/${id}`,
  DELETE_PRODUCT: (id: number) => `${import.meta.env.VITE_API_URL}/products/${id}`,
};
