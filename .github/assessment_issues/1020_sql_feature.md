## Task 1020
Recently, we acquired a large amount of customer data which we have stored in the `customer` table in the database. Our email marketing system wants to send promo emails which will include the customer's two most frequently purchased sandwiches, so we need an API endpoint which returns an array with all of our customers with the following data for each:

- customer_id
- first_name
- last_name
- email
- phone_number
- sandwhiches (array)
  - sandwich_id
  - name
  - image_url

Due to requirements of our email marketing system, this endpoint must return very quickly, so please use **raw SQL** to gather this data as quickly as possible.

> 🚨 We currently do not have a database configured in our CI process, so don't be concerned if any tests you create for this task fail in CI
