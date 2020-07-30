import { OAuthModuleConfig } from 'angular-oauth2-oidc';

export const authModuleConfig: OAuthModuleConfig = {
  resourceServer: {
    allowedUrls: ['https://dev-qgsivlff.au.auth0.com/api/v2/'],
    sendAccessToken: true,
  }
};
