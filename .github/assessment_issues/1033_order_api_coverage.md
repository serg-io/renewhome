## Task 1033

For an upcoming fixit, we'd like to be able to fail when our test coverage is below 100%. Some of the backend modules aren't compliant with this. The biggest concern is the order API code - it's overall coverage percentage is pretty good, but it has the most unique lines that aren't exercised by the backend tests.

We'll certainly need to add some tests here, but we're open to refactoring or justification where reasonable.

## Deliverable

Make sure the python `coverage` module reports 100% statement coverage for api/order.py.
