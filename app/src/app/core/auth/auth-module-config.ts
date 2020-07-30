import { OAuthModuleConfig } from 'angular-oauth2-oidc';

export const authModuleConfig: OAuthModuleConfig = {
  resourceServer: {
    allowedUrls: ['https://dev-qgsivlff.au.auth0.com/api/v2/',
      'http://localhost:8080/api/',
      'http://localhost:9090/api/',
    ],
    sendAccessToken: true,
  }
};
