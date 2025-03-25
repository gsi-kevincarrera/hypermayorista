## Pending Development

### Accessibility Improvements

- [x] Add checkbox to the cart drawer to select all and unselect all products
- [x] Allow adding the same item with different variations to the cart
- [x] Improve cart functionality: when adding an identical item, increase the quantity instead of creating a duplicate entry
- [x] Improve error managment and display
- [x] Add loading status for the checkout
- [ ] Allow to add multiple products from the product cart

### Features to Implement

- [x] Add contract flow
- [x] Add cart to database
- [ ] Checkout integration with payment methods
- [ ] PDF generation functionality
- [ ] Download invoice capability
- [ ] Payment history tracking

### Bugs detected

- [ ] When changing the product options, the max and min quantity should change according to the variation stock
- [ ] When updating the quantity of a product, also update the price
- [ ] When deleting a product from the cart, use also the variation ID to delete the correct entry
