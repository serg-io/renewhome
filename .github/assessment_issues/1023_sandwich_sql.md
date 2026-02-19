## Task 1023

Looks like somebody forgot to slash the budget of Hoagie Haven's mad food science department. Now, they're demanding to know how their creations are faring in the real world in order to better direct their efforts at creating the next great sandwich, and they want that data _fast_. They're looking for a high-performing class method on the `Sandwich` model that returns a list of all sandwiches, the number of customers who've ordered them, and the number of times they've been ordered. The method should return a list, with objects containing...

- sandwich_id
- sandwich_name
- number_customers_ordered
- number_sandwiches_ordered

This should be ordered in descending number of total orders -- that is, the most-ordered sandwich should come first. Each sandwich on the menu should appear in this list exactly once.

Due to the high demands and excessive madness of our food science department, this method must return very quickly, so please use **raw SQL** to create the list. Feel free to describe in your PR whatever other time- or overhead-saving measures you can think of to gather and return this data as quickly as possible, but

> ❕ This task is really looking at your ability to write complex SQL queries; We know that this problem can be solved in a number of ways in Python or by pre-calculating these metrics when orders are placed, but for the sake of the assessment we're looking for a block of SQL here.
