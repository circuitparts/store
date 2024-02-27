import { test, expect } from "@playwright/test";
import path from "path";

/* COMPONENT FLOW TEST -1
 * This test will check the component flow. It will search for a part, click on the first part in the list,
 * and then check if the part number in the detail page matches the part number that was clicked in the list.
 *
 * This test will confirm the following:
 * 1. Components API is working
 * 2. The returned data is displayed and accessible in the form of results and detail pages.
 */

test("component search and display flow", async ({ page }) => {
	const testPartNumber = "STM32MP1";
	await page.goto("http://localhost:3000/");
	await page.getByTestId("search-component-input").fill(testPartNumber);
	await expect(page.getByTestId("search-component-input")).toHaveValue(testPartNumber);
	await page.getByTestId("search-component-button").click();
	await expect(page).toHaveURL(`http://localhost:3000/products/part/result/${testPartNumber}`);
	await expect(page.getByTestId("part-results-title")).toHaveText(`Parts matching ${testPartNumber}`);

	// get the part number of the first part in the list
	const firstResultPartNumber = await page
		.getByTestId("part-results-table-row")
		.nth(0)
		.getByTestId("part-results-part-number")
		.innerText();
	await page.getByTestId("part-results-table-row").nth(0).click(); // navigate to the detail page
	await expect(page).toHaveURL(`http://localhost:3000/products/part/detail/${firstResultPartNumber}`);
	await expect(page.getByTestId("part-name")).toHaveText(firstResultPartNumber); // match the part number in the detail page
});

/* COMPONENT FLOW TEST -2
 * This test will check the component flow. It will search for a random not available part, and check if the part not found page is displayed.
 *
 * This test will confirm the following:
 * 1. Components API is working
 * 2. As no part is found, the part not found page is displayed.
 */
test("no component found flow", async ({ page }) => {
	const testPartNumber = "!THX@S8GKVSSEM"; // some random part number
	await page.goto("http://localhost:3000/");
	await page.getByTestId("search-component-input").fill(testPartNumber);
	await expect(page.getByTestId("search-component-input")).toHaveValue(testPartNumber);
	await page.getByTestId("search-component-button").click();
	await expect(page).toHaveURL(`http://localhost:3000/products/part/result/${testPartNumber}`);
	await expect(page.getByTestId("part-not-found-title")).toHaveText("Part not found");
});

/* RIGID PCB FLOW TEST
 * This test will check the rigid pcb flow. It will navigate to the rigid pcb page, fill name, change qty, and upload a design file.
 * It will then check if the file upload success toast is displayed.
 *
 * This test will confirm the following:
 * 1. Rigid PCB API is working (price updated)
 * 2. Upload design file is working
 */

test("rigid pcb flow", async ({ page }) => {
	await page.goto("http://localhost:3000/");
	await page.getByTestId("rigid-pcb-nav-link").click();
	await expect(page).toHaveURL("http://localhost:3000/products/pcb/rigid-pcb");
	await expect(page.getByTestId("rigid-pcb-fab-title")).toHaveText("Rigid Pcb Fabrication");

	// set pcb name and keep remaining fields default
	const testPcbName = "lalalala";
	await page.getByTestId("rigid-pcb-name").fill(testPcbName);
	await expect(page.getByTestId("rigid-pcb-name")).toHaveValue(testPcbName);

	// wait for the debounce to complete
	await page.waitForTimeout(2000);

	// change quantity and see if the price is updated
	await page.getByTestId("rigid-pcb-quantity-dropdown").getByLabel("5").click();
	await page.getByRole("option", { name: "10", exact: true }).click();
	await expect(page.getByTestId("rigid-pcb-quantity")).toHaveText("10");
	await expect(page.getByTestId("rigid-pcb-order-total")).toHaveText("₹5,258.88");

	// upload design file
	const fileChooserPromise = page.waitForEvent("filechooser");
	await page.getByTestId("rigid-pcb-fab-upload-design-file").click();
	const fileChooser = await fileChooserPromise;
	await fileChooser.setFiles(path.join(__dirname, "test.zip"));
	await page.getByTestId("rigid-pcb-fab-upload-design-file-button").click();
	await expect(page.getByTestId("toast-title")).toHaveText("File upload success");
});

/* Flex PCB FLOW TEST
 * This test will check the flex pcb flow. It will navigate to the flex pcb page, fill name, change qty, and upload a design file.
 * It will then check if the file upload success toast is displayed.
 *
 * This test will confirm the following:
 * 1. Flex PCB API is working (price updated)
 * 2. Upload design file is working
 */

test("flex pcb flow", async ({ page }) => {
	await page.goto("http://localhost:3000/");
	await page.getByTestId("flex-pcb-nav-link").click();
	await expect(page).toHaveURL("http://localhost:3000/products/pcb/flex-pcb");
	await expect(page.getByTestId("flex-pcb-fab-title")).toHaveText("Flex Pcb Fabrication");

	// set pcb name and keep remaining fields default
	const testPcbName = "lalalala";
	await page.getByTestId("flex-pcb-name").fill(testPcbName);
	await expect(page.getByTestId("flex-pcb-name")).toHaveValue(testPcbName);

	// wait for the debounce to complete
	await page.waitForTimeout(2000);

	// change quantity and see if the price is updated
	await page.getByTestId("flex-pcb-quantity-dropdown").getByLabel("5").click();
	await page.getByRole("option", { name: "10", exact: true }).click();
	await expect(page.getByTestId("flex-pcb-quantity")).toHaveText("10");
	await expect(page.getByTestId("flex-pcb-order-total")).toHaveText("₹2,357.20");

	// upload design file
	const fileChooserPromise = page.waitForEvent("filechooser");
	await page.getByTestId("flex-pcb-upload-design-file").click();
	const fileChooser = await fileChooserPromise;
	await fileChooser.setFiles(path.join(__dirname, "test.zip"));
	await page.getByTestId("flex-pcb-upload-design-file-button").click();
	await expect(page.getByTestId("toast-title")).toHaveText("File upload success");
});

/* PCB ASSEMBLY FLOW TEST
 * This test will check the pcb assembly flow. It will navigate to the pcb assembly page, fill name, change qty, and upload a design file.
 * It will then check if the file upload success toast is displayed.
 *
 * This test will confirm the following:
 * 1. PCB Assembly API is working (price updated)
 * 2. Upload design file is working
 */
test("pcb assembly flow", async ({ page }) => {
	await page.goto("http://localhost:3000/");
	await page.getByTestId("pcb-assembly-nav-link").click();
	await expect(page).toHaveURL("http://localhost:3000/products/pcb/assembly");
	await expect(page.getByTestId("pcb-assembly-fab-title")).toHaveText("PCB Assembly");

	// set pcb name and keep remaining fields default
	const testPcbName = "lalalala";
	await page.getByTestId("pcb-assembly-name").fill(testPcbName);
	await expect(page.getByTestId("pcb-assembly-name")).toHaveValue(testPcbName);

	// wait for the debounce to complete
	await page.waitForTimeout(2000);

	// change quantity and see if the price is updated
	await page.getByTestId("pcb-assembly-quantity").fill("15");
	await expect(page.getByTestId("pcb-assembly-quantity")).toHaveValue("15");
	await expect(page.getByTestId("price-summary-assembly-quantity")).toHaveText("15");
	await expect(page.getByTestId("pcb-assembly-order-total")).toHaveText("₹10,831.50");

	// upload design file
	const fileChooserPromise = page.waitForEvent("filechooser");
	await page.getByTestId("pcb-assembly-fab-upload-design-file").click();
	const fileChooser = await fileChooserPromise;
	await fileChooser.setFiles(path.join(__dirname, "test.zip"));
	await page.getByTestId("pcb-assembly-fab-upload-design-file-button").click();
	await expect(page.getByTestId("toast-title")).toHaveText("File upload success");
});
