// ---- Nested User Interfaces ----

export interface UserAvatar {
  url: string;
  publicId: string;
}

export interface GoogleAuthProvider {
  providerId?: string;
  email?: string;
  connected?: boolean;
}

export interface AuthProviders {
  google: GoogleAuthProvider;
}

export interface AIUsage {
  documentsUploaded: number;
  tokensUsed: number;
  questionsAsked: number;
  lastUsageReset: string;
}

export interface UserPreferences {
  theme: "light" | "dark";
  notifications: boolean;
}

// ---- Core User Type ----

export interface User {
  _id: string;
  fullName: string;
  username: string;
  email: string;
  avatar: UserAvatar;
  authProviders: AuthProviders;
  aiUsage: AIUsage;
  preferences: UserPreferences;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  role: string;
  accountStatus: string;
  createdAt: string;
  updatedAt?: string;
  lastLogin?: string;
}

// ---- Request Payloads ----

export interface RegisterPayload {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  identifier: string; // email or username
  password: string;
}

// ---- API Success Responses ----

export interface RegisterResponse {
  statusCode: number;
  data: User;
  message: string;
  success: boolean;
}

export interface LoginResponse {
  statusCode: number;
  data: {
    user: User;
    accessToken: string;
  };
  message: string;
  success: boolean;
}

export interface GetCurrentUserResponse {
  statusCode: number;
  data: {
    user: User;
  };
  message: string;
  success: boolean;
}

export interface LogoutResponse {
  statusCode: number;
  data: Record<string, never>;
  message: string;
  success: boolean;
}

export interface RefreshTokenResponse {
  statusCode: number;
  data: {
    accessToken: string;
  };
  message: string;
  success: boolean;
}

// ---- Error Response ----

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors: string[];
  stack?: string; // only in development, never show this to user
}