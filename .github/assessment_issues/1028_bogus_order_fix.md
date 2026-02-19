## Task 1028

Whoops! A misplaced decimal point in our code accidentally recorded every order for a The King sandwich as 10 sandwiches! This error was introduced on 10/16/23 and resolved on 10/18/23. The order was fixed in production and no customers were affected, but our data is incorrect and the finance team is trying to explain why we were paid an order of magnitude less than their reporting suggests we should have been paid.

We need this data corrected immediately, as the books for fiscal year 2023 close next week! (Yes, Hoagie Helper's finance team is behind, and now it's your problem.)

## Setup

Please seed the database with the order data found in `backend/fixtures/bogus_orders.sql`. In your codespace, you can run the following to seed the database:

```
mysql hoagie_helper < backend/fixtures/bogus_orders.sql
```

You can run this more than once to reseed the bogus data after you have applied a fix or a partial fix.

## Deliverable

Please provide a pull request with a Python script in a new `backend/scripts` folder that will correct the affected data and leave unaffected data intact. The script should be written using the alembic models in Python to correct the data one record at a time. You may describe alternative methods for correcting the data in comments in the script or in the pull request if you so choose.
