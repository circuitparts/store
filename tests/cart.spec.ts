import { test, expect } from "@playwright/test";

const testPartNumber = "STM32MP1";

// add components to cart
test("add components to cart", async ({ page }) => {
	await page.goto("http://localhost:3000/");
	await page.getByTestId("search-component-input").fill(testPartNumber);
	await page.getByTestId("search-component-button").click();

	// let's add the first 3 parts to the cart
	for (let i = 0; i < 3; i++) {
		await page.getByTestId("part-results-table-row").nth(i).click(); // navigate to the detail page
		await page.getByTestId("add-part-to-cart-button").click();
		await expect(page.getByTestId("toast-title")).toHaveText("Added to cart");
		await expect(page.getByTestId("cart-qty")).toHaveText(`${i + 1}`); // cart size should increase
		await page.goBack();
	}

	// check if the cart size is 3
	await expect(page.getByTestId("cart-qty")).toHaveText("3");
});
