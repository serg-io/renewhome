## Task 1021

When updating an order's quantity of a sandwich, we are getting multiple OrderItems with the same sandwich and are ending up with the wrong overall quantity of sandwiches. It's also not possible to remove an OrderItem by setting it's quantity to 0.

To Do:

- [ ] add tests which reproduce the bug
- [ ] fix the updating of order item quantities to prevent duplicates
- [ ] fix the removal of order items by setting quantity to 0
- [ ] add a migration to:
  - [ ] fix existing (hypothetical) production data
  - [ ] add a constraint to the `order_item` table to prevent future bad data

> 🚨 We currently do not have a database configured in our CI process, so don't be concerned if any tests you create for this task fail in CI
