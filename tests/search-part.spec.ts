import { test, expect } from "@playwright/test";

test("search part", async ({ page }) => {
	await page.goto("http://localhost:3000/");
	await page.getByTestId("search-component-input").fill("stm32mp1");
	await expect(page.getByTestId("search-component-input")).toHaveValue("stm32mp1");
	await page.getByTestId("search-component-button").click();
	await expect(page).toHaveURL("http://localhost:3000/products/part/result/STM32MP1");
	await expect(page.getByTestId("part-results-title")).toHaveText("Parts matching STM32MP1");
	const partNumber = await page
		.getByTestId("part-results-table-row")
		.nth(0)
		.getByTestId("part-results-part-number")
		.innerText(); // get the part number of the first part in the list
	await page.getByTestId("part-results-table-row").nth(0).click();
	await expect(page).toHaveURL(`http://localhost:3000/products/part/detail/${partNumber}`);
	await expect(page.getByTestId("part-name")).toHaveText(partNumber); // match the part number in the detail page
});
