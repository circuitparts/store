import { test, expect } from "@playwright/test";

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



