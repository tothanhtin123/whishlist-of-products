declare global {
  type UserJwtPayload = {
    id: string;
    email: string;
  };

  type JwtPayload = UserJwtPayload;
}
export {};
