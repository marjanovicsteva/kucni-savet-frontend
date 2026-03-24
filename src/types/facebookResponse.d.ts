export interface FacebookAuthResponse {
  accessToken: string;
  data_access_expiration_time: number;
  expiresIn: number;
  graphDomain: string;
  signedRequest: string;
  userID: string;
  reauthorize_required_in?: number;
}

export interface FacebookLoginResponse {
  authResponse: FacebookAuthResponse;
  status: 'connected' | 'not_authorized' | 'unknown';
}
