export const DATE_CONFIG = {
  DATE_FORMAT: (import.meta.env.APP_DATE_FORMAT as string) || 'yyyy-MM-dd',
  DATE_FORMAT_EN:
    (import.meta.env.APP_DATE_FORMAT_EN as string) || 'dd-MM-yyyy',
  DATE_FULL_FORMAT:
    (import.meta.env.APP_DATE_FULL_FORMAT as string) ||
    'yyyy-MM-dd HH:mm:ss.SSS',
};
