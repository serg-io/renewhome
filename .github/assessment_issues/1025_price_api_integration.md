## Task 1025

In an effort to cut costs, management wants us to track ingredient prices on the cold cuts real time market so we can find the best time to buy. There is an external API that we need to integrate with to do this.

We need to pull the last 7 days of price data from the Cold Cuts API. This job will eventually be set up as an hourly cron, but for now we can call it via the command line.

To Do:

- Write a class that calls this API
- Write a function that can be called via the command line that populates the last 7 days of price data, including the latest prices for today.
- For performance reasons, the function that inserts data into the database should be **written in raw SQL**

Here is the documentation we have received for this API:

## Cold Cuts Real Time Market API Docs

This API tracks the real time market prices of various hoagie cold cuts. It can be used to minimize production costs, maximize returns, and get a job at Renew Home.

This is a REST-ful API that accepts input and returns output in JSON.

## API URL

`https://beta.ohmconnect.com/api/cold_cuts`

## Authentication

This API uses OAuth access tokens for authentication. All API methods require a valid access token specified in the header:

```
Authorization: bearer [access token]
```

To generate an access token, a POST call is made to `/api/cold_cuts/authenticate` with the following JSON body:

```json
{
  "username": "[username]",
  "password": "[password]"
}
```

Upon successful authentication, this will return a token:

```json
{
  "accessToken": "[access token]",
  "expiresIn": 7200,
  "refreshToken": null,
  "tokenType": "bearer"
}
```

We highly recommend that you cache the access token on your side and re-use the token for subsequent calls.

## Tracking Real Time Prices

`/api/cold_cuts/get_prices`

Parameters

```
products    str     a comma separated list of products
date        str     date in yyyy-mm-dd format, default current date
```

This endpoint returns a price for each 15 minute interval in the specified day.

If no date is passed, prices will be returned for the current day.

New prices are published at 00, 15, 30 and 45 minutes after the hour.

Current valid products are:

- ham
- salami
- pepperoni

Sample call:

`GET /api/cold_cuts/get_prices?products=pepperoni`

```json
[
    {
        "dttm": "2024-05-13T00:00:00",
        "price": "87.88",
        "product": "pepperoni"
    },
    {
        "dttm": "2024-05-13T00:15:00",
        "price": "85.11",
        "product": "pepperoni"
    },
    {
        "dttm": "2024-05-13T00:30:00",
        "price": "89.16",
        "product": "pepperoni"
    },
    {
        "dttm": "2024-05-13T00:45:00",
        "price": "93.76",
        "product": "pepperoni"
    },
    ...
]
```
