import {
	FLEX_PCB_FAB_PAGE,
	PART_DETAILS_PAGE,
	PART_RESULTS_PAGE,
	PCB_ASSEMBLY_PAGE,
	RIGID_PCB_FAB_PAGE,
} from "@/lib/constants/page-routes";
import { expect, type Page } from "@playwright/test";
import path from "path";

const BASE_URL = "http://localhost:3000";

export async function searchComponent(props: { partNumber: string; page: Page }) {
	const { partNumber, page } = props;
	const testPartNumber = partNumber.toUpperCase();
	await page.goto(BASE_URL);
	await page.getByTestId("search-component-input").fill(testPartNumber);
	await expect(page.getByTestId("search-component-input")).toHaveValue(testPartNumber);
	await page.getByTestId("search-component-button").click();
	await expect(page).toHaveURL(BASE_URL + PART_RESULTS_PAGE + testPartNumber);
}

export async function viewNthComponentDetail(props: { nth: number; page: Page }) {
	const { nth, page } = props;
	const partNumber = await page
		.getByTestId("part-results-table-row")
		.nth(nth)
		.getByTestId("part-results-part-number")
		.innerText();
	await page.getByTestId("part-results-table-row").nth(nth).click(); // navigate to the detail page
	await expect(page).toHaveURL(BASE_URL + PART_DETAILS_PAGE + partNumber);
	await expect(page.getByTestId("part-name")).toHaveText(partNumber); // match the part number in the detail page
}

export async function navigateToPcbPage(props: { page: Page; pcbType: "rigid" | "flex" | "assembly" }) {
	const { page, pcbType } = props;
	await page.goto(BASE_URL);
	let pcbUrl = "";
	let navButtonTestId = "";
	let expectedTitle = "";
	switch (pcbType) {
		case "rigid":
			pcbUrl = RIGID_PCB_FAB_PAGE;
			navButtonTestId = "rigid-pcb-nav-link";
			expectedTitle = "Rigid Pcb Fabrication";
			break;
		case "flex":
			pcbUrl = FLEX_PCB_FAB_PAGE;
			navButtonTestId = "flex-pcb-nav-link";
			expectedTitle = "Flex Pcb Fabrication";
			break;
		case "assembly":
			pcbUrl = PCB_ASSEMBLY_PAGE;
			navButtonTestId = "pcb-assembly-nav-link";
			expectedTitle = "PCB Assembly";
			break;
	}
	await page.getByTestId(navButtonTestId).click();
	await expect(page).toHaveURL(BASE_URL + pcbUrl);
	await expect(page.getByTestId("pcb-title")).toHaveText(expectedTitle);
}

export async function setPcbNameAndQuantity(props: {
	pcbType: "rigid" | "flex" | "assembly";
	pcbName: string;
	quantity_1: number;
	quantity_2: number;
	expectedTotal: string;
	page: Page;
}) {
	const { pcbType, pcbName, quantity_1, quantity_2, expectedTotal, page } = props;
	await page.getByTestId("pcb-name").fill(pcbName);
	await expect(page.getByTestId("pcb-name")).toHaveValue(pcbName);

	// wait for the debounce to complete
	await page.waitForTimeout(2000);

	if (pcbType === "assembly") {
		// change quantity
		await page.getByTestId("pcb-assembly-quantity").fill(quantity_2.toString());
		await expect(page.getByTestId("pcb-assembly-quantity")).toHaveValue(quantity_2.toString());

		// check if price summary is updated.
		await expect(page.getByTestId("pcb-quantity")).toHaveText(quantity_2.toString()); //
		await expect(page.getByTestId("pcb-order-total")).toHaveText(expectedTotal);
	} else {
		// change quantity and see if the price is updated
		await page.getByTestId("pcb-quantity-dropdown").getByLabel(quantity_1.toString()).click();
		await page.getByRole("option", { name: quantity_2.toString(), exact: true }).click();
		await expect(page.getByTestId("pcb-quantity")).toHaveText(quantity_2.toString());
		await expect(page.getByTestId("pcb-order-total")).toHaveText(expectedTotal);
	}
}

export async function uploadPcbDesignFile(page: Page) {
	const fileChooserPromise = page.waitForEvent("filechooser");
	await page.getByTestId("upload-pcb-design-file-input").click();
	const fileChooser = await fileChooserPromise;
	await fileChooser.setFiles(path.join(__dirname, "test.zip"));
	await page.getByTestId("upload-pcb-design-file-button").click();
	await expect(page.getByTestId("toast-title")).toHaveText("File upload success");
}
