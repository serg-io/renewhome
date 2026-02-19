## Task 1031

Hoagie Haven is a platform now! We have lined up a string of strategic hoagie partners who want to help us bring our hoagies to the world. We're charging these partners an arm and a leg for access to our craveable creations and they're addicted to our service. We can start charging these partners -- time to make that bread!

## Background

We have a list of partners available in the table `hoagie_partner`. This partner list includes the negotiated terms of our deal -- the dollar amount the partner has to pay for each API request.

It's time to start tracking how often our partner apis are being used so we can start billing our partners when they use them.

## Deliverable

Building on your work from Task 1029 and Task 1030\*, log partner access to our partner API (both authentication and order creation). We want to log

- the partner id
- the API endpoint requested
- the time of the request

Then, expose an invoicing endpoint that partners can query, which returns a downloadable CSV of all API endpoint requests between two dates that that partner has made, and a summary total of the bill.

The request should take the following optional parameters:

- start_dt
- end_dt

Absence of one or both of these parameters should make the request unbounded on that side.

The CSV can be in the format:

- endpoint
- dttm
- charge (USD)

with a bottom line of Total, N/A, [total charge]

Should the request to this endpoint count against our partners' bills? Hoagie Haven's greedy finance department says "absolutely!"

You can issue a pull request against your branch from 1030.
