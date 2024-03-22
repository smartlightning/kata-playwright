// @ts-check
import { test, expect, selectors } from '@playwright/test';


// Navigate the page
test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test('add item to basket', async ({ page }) => {
    // Search for query
    const searchField = page.getByText('Wonach suchst Du?');
    const search = page.getByPlaceholder('Wonach suchst Du?');
    await searchField.click();
    await search.fill('Wanderschuhe');
    await search.press('Enter');
    // find the first item
    await page.locator('#product-list .product-item').first().click();
    // ensure a size is selected
    await page.getByTestId('available-true').first().click()
    // go to the basket
    await page.getByTestId('toBasket').click()
    await page.getByTestId('toBasketPopup').click()
    // ensure the item is in the basket
    await expect(page.getByTestId('miniBasket')).toHaveText('1')
    // check if the there is one item in the cart
    await page.goto('/warenkorb/')
    await expect(page.getByTestId('cartItemAmount')).toHaveValue("1")
})