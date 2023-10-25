declare type ApiResponse = {
  readonly tokens?: {
    accessToken?: string;
    refreshToken?: string;
  };
  readonly user?: User;
  readonly total?: number;
  readonly tasks?: TaskType[];
  readonly passwordResetToken?: string;
};
