/**
 * Auth-related types
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthControllerCallbacks {
  onLoginSuccess?: () => void;
  onForgotPassword?: () => void;
  onRegister?: () => void;
}
