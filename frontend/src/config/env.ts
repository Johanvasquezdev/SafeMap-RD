// Este modulo centraliza variables de entorno del frontend para evitar literales dispersos.
export const env = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "",
};
