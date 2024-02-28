import { test, expect } from "@playwright/test";
import path from "path";

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

// add rigid pcb to cart
test("add rigid pcb to cart", async ({ page }) => {
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
});

// add flex pcb to cart
test("add flex pcb to cart", async ({ page }) => {
	await page.goto("http://localhost:3000/");
	await page.getByTestId("flex-pcb-nav-link").click();

	// set pcb name and keep remaining fields default
	const testPcbName = "ivysaur";
	await page.getByTestId("flex-pcb-name").fill(testPcbName);

	// wait for the debounce to complete
	await page.waitForTimeout(2000);

	// upload design file
	const fileChooserPromise = page.waitForEvent("filechooser");
	await page.getByTestId("flex-pcb-upload-design-file").click();
	const fileChooser = await fileChooserPromise;
	await fileChooser.setFiles(path.join(__dirname, "test.zip"));
	await page.getByTestId("flex-pcb-upload-design-file-button").click();
	await expect(page.getByTestId("toast-title")).toHaveText("File upload success");

	// wait for price to update
	await page.waitForTimeout(2000);

	// add to cart
	const cartSize = await page.getByTestId("cart-qty").textContent();
	await page.getByTestId("add-to-cart-button").click();
	await expect(page.getByTestId("toast-title")).toHaveText("Flex PCB added to cart");

	// check if the cart size increased
	await expect(page.getByTestId("cart-qty")).toHaveText(`${Number(cartSize) + 1}`);
});

// add pcb assembly to cart
test("add pcb assembly to cart", async ({ page }) => {
	await page.goto("http://localhost:3000/");
	await page.getByTestId("pcb-assembly-nav-link").click();

	// set pcb name and keep remaining fields default
	const testPcbName = "venusaur";
	await page.getByTestId("pcb-assembly-name").fill(testPcbName);

	// wait for the debounce to complete
	await page.waitForTimeout(2000);

	// upload design file
	const fileChooserPromise = page.waitForEvent("filechooser");
	await page.getByTestId("pcb-assembly-fab-upload-design-file").click();
	const fileChooser = await fileChooserPromise;
	await fileChooser.setFiles(path.join(__dirname, "test.zip"));
	await page.getByTestId("pcb-assembly-fab-upload-design-file-button").click();
	await expect(page.getByTestId("toast-title")).toHaveText("File upload success");

	// wait for price to update
	await page.waitForTimeout(2000);

	// add to cart
	const cartSize = await page.getByTestId("cart-qty").textContent();
	await page.getByTestId("add-to-cart-button").click();
	await expect(page.getByTestId("toast-title")).toHaveText("PCB Assembly added to cart");

	// check if the cart size increased
	await expect(page.getByTestId("cart-qty")).toHaveText(`${Number(cartSize) + 1}`);
});
