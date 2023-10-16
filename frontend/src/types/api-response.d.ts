declare type ApiResponse = {
  readonly tokens?: {
    accessToken?: string;
    refreshToken?: string;
  };
  readonly user?: User;
  readonly passwordResetToken?: string;
};
