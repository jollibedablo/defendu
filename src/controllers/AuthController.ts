import type { LoginCredentials, AuthControllerCallbacks } from '../models';

export interface AuthControllerResult {
  success: boolean;
  error?: string;
}

/**
 * Handles login business logic. Wire to Firebase/API when backend is added.
 */
export async function login(
  credentials: LoginCredentials,
  callbacks?: AuthControllerCallbacks
): Promise<AuthControllerResult> {
  const { email, password } = credentials;
  if (!email?.trim() || !password?.trim()) {
    return { success: false, error: 'Please fill in all fields' };
  }

  try {
    // TODO: Replace with real API / Firebase when backend is added
    await new Promise((r) => setTimeout(r, 800));
    callbacks?.onLoginSuccess?.();
    return { success: true };
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Login failed. Please try again.';
    return { success: false, error: msg };
  }
}
