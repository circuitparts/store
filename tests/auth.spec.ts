import { BASE_URL, addRigidPcbToCart, login, logout, signup } from "@/tests/test-functions";
import { expect, test } from "@playwright/test";

const EMPTY_CART_SIZE = "0";

// Add a pcb to cart to test cart porting after signup
test("signup", async ({ page }) => {
	await page.goto(BASE_URL);
	const initialCartSize = await page.getByTestId("cart-qty").textContent(); // initial cart size
	await addRigidPcbToCart({ page });
	const newCartSize = `${Number(initialCartSize) + 1}`;
	await expect(page.getByTestId("cart-qty")).toHaveText(newCartSize); // check if the cart size increased

	await signup({ page });

	// expect cart size to be the same
	await expect(page.getByTestId("cart-qty")).toHaveText(newCartSize);

	await logout({ page });

	// check if cart is reset
	await expect(page.getByTestId("cart-qty")).toHaveText(EMPTY_CART_SIZE);
});

// Add a pcb to cart to test cart porting after login
test("login", async ({ page }) => {
	await page.goto(BASE_URL);
	const initialCartSize = await page.getByTestId("cart-qty").textContent(); // initial cart size
	await addRigidPcbToCart({ page });
	const newCartSize = `${Number(initialCartSize) + 1}`;
	await expect(page.getByTestId("cart-qty")).toHaveText(newCartSize); // check if the cart size increased

	await login({ page });

	// expect cart size to be the same
	await expect(page.getByTestId("cart-qty")).toHaveText(newCartSize);

	await logout({ page });

	// check if cart is reset
	await expect(page.getByTestId("cart-qty")).toHaveText(EMPTY_CART_SIZE);
});
