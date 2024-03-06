import {
	navigateToPcbPage,
	searchComponent,
	setPcbNameAndQuantity,
	uploadPcbDesignFile,
	viewNthComponentDetail,
} from "@/tests/test-functions";
import { expect, test } from "@playwright/test";

test("components", async ({ page }) => {
	const testPartNumbers = ["STM32MP1", "!THX@S8GKVSSEM"];
	for (const testPartNumber of testPartNumbers) {
		await searchComponent({ partNumber: testPartNumber, page });
		try {
			await expect(page.getByTestId("part-results-title")).toHaveText(`Parts matching ${testPartNumber}`);
			await viewNthComponentDetail({ nth: 0, page });
		} catch (error) {
			await expect(page.getByTestId("part-not-found-title")).toHaveText("Part not found");
		}
	}
});

test("rigid pcb", async ({ page }) => {
	await navigateToPcbPage({ page, pcbType: "rigid" });
	await setPcbNameAndQuantity({
		pcbType: "rigid",
		pcbName: "charmander",
		quantity_1: 5, // initial quantity
		quantity_2: 10, // new quantity
		expectedTotal: "₹5,258.88", // expected total after changing quantity
		page,
	});
	await uploadPcbDesignFile(page);
});

test("flex pcb", async ({ page }) => {
	await navigateToPcbPage({ page, pcbType: "flex" });
	await setPcbNameAndQuantity({
		pcbType: "flex",
		pcbName: "charmeleon",
		quantity_1: 5, // initial quantity
		quantity_2: 10, // new quantity
		expectedTotal: "₹2,357.20", // expected total after changing quantity
		page,
	});
	await uploadPcbDesignFile(page);
});

test("pcb assembly", async ({ page }) => {
	await navigateToPcbPage({ page, pcbType: "assembly" });
	await setPcbNameAndQuantity({
		pcbType: "assembly",
		pcbName: "charizard",
		quantity_1: 10, // initial quantity
		quantity_2: 15, // new quantity
		expectedTotal: "₹10,831.50", // expected total after changing quantity
		page,
	});
	await uploadPcbDesignFile(page);
});
