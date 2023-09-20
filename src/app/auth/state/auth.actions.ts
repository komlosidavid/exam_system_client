interface AuthActions {
  type: string;
  payload: {
    accesToken: string;
    refreshToken: string;
  };
}

export class Auth implements AuthActions {
  readonly type: string = '[AUTH] Set bearer tokens';
  payload: { accesToken: string; refreshToken: string };

  constructor(
    public requestPayload: { accessToken: string; refreshToken: string }
  ) {
    this.payload = {
      accesToken: requestPayload.accessToken,
      refreshToken: requestPayload.refreshToken,
    };
  }
}
