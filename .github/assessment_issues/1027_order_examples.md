## Task 1027
Hoagie Haven is interested in setting up alerting on its order data to ensure that sandwich orders are falling within expected business parameters. The parameters are as follows:
- Hoagie Haven expects at least 50 orders to be placed per day.
- Hoagie Haven expects no more than 1,000 sandwiches to be ordered on any given day.
- Hoagie Haven expects to have at least one of each of its offered sandwiches ordered per day.

## Setup 
Please seed the database with the order data found in `backend/fixtures/sample_orders_2023.sql`. In your codespace, you can run the following to seed the database:
```
mysql hoagie_helper < backend/fixtures/sample_orders_2023.sql
```

## Deliverable
Please provide a pull request with one or more SQL queries as .sql file(s) in a new backend/alerts directory that could be used to alert Hoagie Haven to situations that fall outside of these expected parameters. Your SQL should *only* return cases that fall outside of the expected parameters. Please provide in the description of the  pull request or in a comment in the SQL file (SQL comments can be made with either `/* comment here */` or `# comment here` syntax) any instances, if any, of the sample 2023 data that fall outside of the expected parameters and also a hypothesis for what may have triggered the unexpected outcome.
