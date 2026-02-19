## Task 1030

Hoagie Haven is a platform now! We have lined up a string of strategic hoagie partners who want to help us bring our hoagies to the world. We're charging these partners an arm and a leg for access to our craveable creations and we need a way to secure our platform and authenticate our known partners and keep out would-be sandwich stealers.

## Background

We have a list of partners available in the table `hoagie_partner`. We should use this table to build out our authentication scheme.

We'll want to use a bearer token to authenticate API calls coming from partners. The flow for partners will be

- Work with our team to set up credentials with us -- _after_ agreeing to our exorbitant fee structure. These credentials will be in the form of a client token and a client secret in our `hoagie_partner` table. This work is already done and our existing partners have tokens.
- Customers exchange these credentials for an access token by passing them to our partner authentication endpoint. This token will expire in 1 hour.
- Authenticate further calls to our API using the access token provided.
- When the token expires, create a new one via the partner authentication endpoint. Repeat as necessary.

## Deliverable

To get us started, we need to do the following:

- Create the authentication endpoint. This endpoint should accept a client token and client secret and return a body like the following:

```
{
  "access_token": "[access token]",
  "expires_in": 7200,
  "refresh_token": null,
  "token_type": "bearer"
}
```

- Store the tokens somewhere

- Add authentication that checks for a valid access token to the partner order creation endpoint

- Add tests for your changes

- Optionally, provide some commentary in the associated pull request regarding the benefits or drawbacks of your approach or of Hoagie Haven's management's ideas on authentication.
