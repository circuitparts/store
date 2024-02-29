import {
	FLEX_PCB_FAB_PAGE,
	LOGIN_PAGE,
	PART_DETAILS_PAGE,
	PART_RESULTS_PAGE,
	PCB_ASSEMBLY_PAGE,
	RIGID_PCB_FAB_PAGE,
	SIGNUP_PAGE,
} from "@/lib/constants/page-routes";
import { expect, type Page } from "@playwright/test";
import path from "path";

export const BASE_URL = "http://localhost:3000";

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

export async function addRigidPcbToCart(props: { page: Page; cartSize: string | null }) {
	const { page, cartSize } = props;
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

	// add to cart
	await page.getByTestId("add-to-cart-button").click();
	await expect(page.getByTestId("toast-title")).toHaveText("Rigid PCB added to cart");

	// check if the cart size increased
	await expect(page.getByTestId("cart-qty")).toHaveText(`${Number(cartSize) + 1}`);
}

export async function addFlexPcbToCart(props: { page: Page; cartSize: string | null }) {
	const { page, cartSize } = props;
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

	// add to cart
	await page.getByTestId("add-to-cart-button").click();
	await expect(page.getByTestId("toast-title")).toHaveText("Flex PCB added to cart");

	// check if the cart size increased
	await expect(page.getByTestId("cart-qty")).toHaveText(`${Number(cartSize) + 1}`);
}

export async function addPcbAssemblyToCart(props: { page: Page; cartSize: string | null }) {
	const { page, cartSize } = props;
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

	// add to cart
	await page.getByTestId("add-to-cart-button").click();
	await expect(page.getByTestId("toast-title")).toHaveText("PCB Assembly added to cart");

	// check if the cart size increased
	await expect(page.getByTestId("cart-qty")).toHaveText(`${Number(cartSize) + 1}`);
}

export async function signup(props: { page: Page }) {
	const { page } = props;

	await page.goto(BASE_URL + SIGNUP_PAGE);

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
	await expect(page).toHaveURL(BASE_URL);
	await page.waitForTimeout(3000); // wait for the cart to load its value
}

//NOTE: make sure you have a user with the email and password in your database for this test to pass
export async function login(props: { page: Page }) {
	const { page } = props;

	await page.goto(BASE_URL + LOGIN_PAGE);

	// fill the login form with test user data
	await page.getByTestId("email-input").fill("test+clerk_test@test.com");
	await page.getByTestId("password-input").fill("TestPassword@123");
	await page.getByTestId("sign-in-button").click();

	await page.waitForTimeout(3000); // wait for the page to load
	await expect(page).toHaveURL(BASE_URL);
	await page.waitForTimeout(3000); // wait for the cart to load its value
}

export async function logout(props: { page: Page }) {
	const { page } = props;
	await page.getByTestId("user-menu-trigger-button").click();
	await page.getByTestId("logout-button").click();
}
