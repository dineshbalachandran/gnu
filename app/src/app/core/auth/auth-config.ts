import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'https://dev-qgsivlff.au.auth0.com/',
  clientId: 'CDUvO1SRNbBidMf82fZOe8k9z1oNiy8N', // The "Auth Code + PKCE" client
  responseType: 'code',
  redirectUri: window.location.origin + '/index.html',
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  logoutUrl: 'https://dev-qgsivlff.au.auth0.com/v2/logout',
  scope: 'openid profile email offline_access', // Ask offline_access to support refresh token refreshes
  useSilentRefresh: true, // Needed for Code Flow to suggest using iframe-based refreshes
  silentRefreshTimeout: 5000, // For faster testing
  timeoutFactor: 0.25, // For faster testing
  sessionChecksEnabled: true,
  showDebugInformation: true, // Also requires enabling "Verbose" level in devtools
  clearHashAfterLogin: false, // https://github.com/manfredsteyer/angular-oauth2-oidc/issues/457#issuecomment-431807040,
  nonceStateSeparator: 'semicolon', // Real semicolon gets mangled by IdentityServer's URI encoding
  customQueryParams: {
    audience:'http://localhost:8080'
  }
};

//AuthO specific
export const logOutParameters = {
  client_id: authConfig.clientId,
  returnTo: authConfig.redirectUri
};
