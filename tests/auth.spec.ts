import { test, expect } from "@playwright/test";
import path from "path";

test("signup flow test", async ({ page }) => {
	// add a pcb to cart to test cart porting after signup
	await page.goto("http://localhost:3000/");
	await page.getByTestId("rigid-pcb-nav-link").click();

	// set pcb name and keep remaining fields default
	const testPcbName = "bulbasaur";
	await page.getByTestId("rigid-pcb-name").fill(testPcbName);

	// wait for the debounce to complete
	await page.waitForTimeout(2000);

	// upload design file
	const fileChooserPromise = page.waitForEvent("filechooser");
	await page.getByTestId("rigid-pcb-fab-upload-design-file").click();
	const fileChooser = await fileChooserPromise;
	await fileChooser.setFiles(path.join(__dirname, "test.zip"));
	await page.getByTestId("rigid-pcb-fab-upload-design-file-button").click();
	await expect(page.getByTestId("toast-title")).toHaveText("File upload success");

	// wait for price to update
	await page.waitForTimeout(2000);

	// add to cart
	const cartSize = await page.getByTestId("cart-qty").textContent();
	await page.getByTestId("add-to-cart-button").click();
	await expect(page.getByTestId("toast-title")).toHaveText("Rigid PCB added to cart");

	// check if the cart size increased
	await expect(page.getByTestId("cart-qty")).toHaveText(`${Number(cartSize) + 1}`);

	// signup
	await page.goto("http://localhost:3000/auth/signup");

	// fill the signup form with random data
	const randomNumber = Math.floor(Math.random() * 100000); // to make the fields unique
	await page.getByTestId("fname-input").fill(`test_first_name_${randomNumber}`);
	await page.getByTestId("lname-input").fill(`test_last_name_${randomNumber}`);
	await page.getByTestId("email-input").fill(`test_email_${randomNumber}+clerk_test@domain.com`);
	await page.getByTestId("password-input").fill("TestPassword@123");
	await page.getByTestId("create-account-button").click();

	// verify email page
	await page.getByTestId("verify-email-code-input").fill("424242");
	await page.getByTestId("verify-email-submit-button").click();

	await page.waitForTimeout(3000); // wait for the page to load
	await expect(page).toHaveURL("http://localhost:3000/");
	await page.waitForTimeout(3000); // wait for the cart to load its value

	// check if the cart size is still the same
	await expect(page.getByTestId("cart-qty")).toHaveText(`${Number(cartSize) + 1}`);

	// logout
	await page.getByTestId("user-menu-trigger-button").click();
	await page.getByTestId("logout-button").click();

	// check if cart is reset
	await expect(page.getByTestId("cart-qty")).toHaveText("0");
});

//NOTE: make sure you have a user with the email and password in your database for this test to pass
test("login flow test", async ({ page }) => {
	// add a pcb to cart to test cart porting after signup
	await page.goto("http://localhost:3000/");
	await page.getByTestId("rigid-pcb-nav-link").click();

	// set pcb name and keep remaining fields default
	const testPcbName = "bulbasaur";
	await page.getByTestId("rigid-pcb-name").fill(testPcbName);

	// wait for the debounce to complete
	await page.waitForTimeout(2000);

	// upload design file
	const fileChooserPromise = page.waitForEvent("filechooser");
	await page.getByTestId("rigid-pcb-fab-upload-design-file").click();
	const fileChooser = await fileChooserPromise;
	await fileChooser.setFiles(path.join(__dirname, "test.zip"));
	await page.getByTestId("rigid-pcb-fab-upload-design-file-button").click();
	await expect(page.getByTestId("toast-title")).toHaveText("File upload success");

	// wait for price to update
	await page.waitForTimeout(2000);

	// add to cart
	const cartSize = await page.getByTestId("cart-qty").textContent();
	await page.getByTestId("add-to-cart-button").click();
	await expect(page.getByTestId("toast-title")).toHaveText("Rigid PCB added to cart");

	// check if the cart size increased
	await expect(page.getByTestId("cart-qty")).toHaveText(`${Number(cartSize) + 1}`);

	// signup
	await page.goto("http://localhost:3000/auth/login");

	// fill the login form with test user data
	await page.getByTestId("email-input").fill("test+clerk_test@test.com");
	await page.getByTestId("password-input").fill("TestPassword@123");
	await page.getByTestId("sign-in-button").click();

	await page.waitForTimeout(3000); // wait for the page to load
	await expect(page).toHaveURL("http://localhost:3000/");
	await page.waitForTimeout(3000); // wait for the cart to load its value

	// check if the cart size is still the same
	await expect(page.getByTestId("cart-qty")).toHaveText(`${Number(cartSize) + 1}`);

	// logout
	await page.getByTestId("user-menu-trigger-button").click();
	await page.getByTestId("logout-button").click();

	// check if cart is reset
	await expect(page.getByTestId("cart-qty")).toHaveText("0");
});
