## Task 1029

Hoagie Haven is a platform now! We have lined up a string of strategic hoagie partners who want to help us bring our hoagies to the world. We're charging these partners an arm and a leg for access to our craveable creations. The first feature our well-funded partners are asking for is the ability to order our delicious sandwiches. It's critical to our business that we deliver on this objective so we can start taking their money!

## Background

One of our developers recently added an API for our partners to create orders (`/api/partner/order/create`) but we noticed that this endpoint is allowing partners to submit orders without any items!

## Deliverable

Update the partner order creation endpoint to prevent orders with no items from being created.

Add tests to verify the behavior of your change.
