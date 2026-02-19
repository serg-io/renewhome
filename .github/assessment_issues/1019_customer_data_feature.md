## Task 1019

To better understand customer preferences and trends, we need a better sense of which customers are ordering which sandwiches. **Conveniently, we already have a table of some customer information in our database** however we have not had a use for it yet in our app, so we have not modeled this table in the backend. Additionally, **we already have a frontend modal for collecting customer information** in `frontend/src/components/customerDataEntryDialog.tsx`, but have not yet implemented it.

## User Stories:

- As a user making an order, I already have the opportunity to input my phone number when submitting my order. If I am a new user (i.e. my phone number does not match a current customer), I will then be presented with an opportunity to enter my first and last names, as well as my email; I may also opt to not supply my phone number should I wish to remain anonymous.
