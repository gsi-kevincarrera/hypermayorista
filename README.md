## Pending Development

## Todays Plan

- [x] Fix BD !!Urgent
- [ ] Use SKU as identifier for product variants. Priority: Low

### Accessibility Improvements

- [x] Add checkbox to the cart drawer to select all and unselect all products
- [x] Allow adding the same item with different variations to the cart
- [x] Improve cart functionality: when adding an identical item, increase the quantity instead of creating a duplicate entry
- [x] Improve error managment and display
- [x] Add loading status for the checkout
- [x] Allow to add multiple products from the product card
- [ ] Find a way to improve product quantity selection when updating the quantity of a product, beacause each product has a minQuantity, but it does not consider, the quantity already in the cart

### Features to Implement

- [x] Add contract flow
- [x] Add cart to database
- [x] Add user personal info to database
- [ ] Checkout integration with payment methods
- [ ] PDF generation functionality
- [ ] Download invoice capability
- [ ] Payment history tracking

### Bugs detected

- [ ] When changing the product options, the max and min quantity should change according to the variation stock
- [ ] When updating the product quantity, the request should be rejected if the new quantity is greater than the variation stock
- [ ] Price cache is not being applied when the product has no variants
- [x] When updating the quantity of a product, also update the price(note the price breaks)
- [x] When deleting a product from the cart, use also the variation ID to delete the correct entry
