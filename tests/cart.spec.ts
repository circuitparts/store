import {
	BASE_URL,
	addFlexPcbToCart,
	addNthComponentToCart,
	addPcbAssemblyToCart,
	addRigidPcbToCart,
	deleteAllCartComponents,
	deleteAllCartPcbs,
	deleteNthCartComponent,
	deleteNthCartPcb,
	searchComponent,
} from "@/tests/test-functions";
import { expect, test } from "@playwright/test";

const testPartNumber = "STM32MP1";

// add components to cart
test("add components to cart", async ({ page }) => {
	await page.goto(BASE_URL);
	await searchComponent({ partNumber: testPartNumber, page });
	const initialCartSize = await page.getByTestId("cart-qty").textContent(); // initial cart size

	// let's add the first 3 parts to the cart
	for (let i = 0; i < 3; i++) {
		await addNthComponentToCart({ nth: i, page });
	}

	const newCartSize = `${Number(initialCartSize) + 3}`;
	await expect(page.getByTestId("cart-qty")).toHaveText(newCartSize); // check if the cart size increased
});

// add rigid pcb to cart
test("add rigid pcb to cart", async ({ page }) => {
	await page.goto(BASE_URL);
	const initialCartSize = await page.getByTestId("cart-qty").textContent(); // initial cart size
	await addRigidPcbToCart({ page });
	const newCartSize = `${Number(initialCartSize) + 1}`;
	await expect(page.getByTestId("cart-qty")).toHaveText(newCartSize); // check if the cart size increased
});

// add flex pcb to cart
test("add flex pcb to cart", async ({ page }) => {
	await page.goto(BASE_URL);
	const initialCartSize = await page.getByTestId("cart-qty").textContent(); // initial cart size
	await addFlexPcbToCart({ page });
	const newCartSize = `${Number(initialCartSize) + 1}`;
	await expect(page.getByTestId("cart-qty")).toHaveText(newCartSize); // check if the cart size increased
});

// add pcb assembly to cart
test("add pcb assembly to cart", async ({ page }) => {
	await page.goto(BASE_URL);
	const initialCartSize = await page.getByTestId("cart-qty").textContent(); // initial cart size
	await addPcbAssemblyToCart({ page });
	const newCartSize = `${Number(initialCartSize) + 1}`;
	await expect(page.getByTestId("cart-qty")).toHaveText(newCartSize); // check if the cart size increased
});

// cart
test("cart functionality", async ({ page }) => {
	// test cart components table in cart page
	await page.goto(BASE_URL);
	const initialCartSize = await page.getByTestId("cart-qty").textContent(); // initial cart size
	await searchComponent({ partNumber: testPartNumber, page });

	// let's add the first 3 parts to the cart
	for (let i = 0; i < 3; i++) {
		await addNthComponentToCart({ nth: i, page });
	}

	let updatedCartSize = `${Number(initialCartSize) + 3}`;
	await expect(page.getByTestId("cart-qty")).toHaveText(updatedCartSize); // check if the cart size increased

	await deleteNthCartComponent({ nth: 0, page, cartSize: updatedCartSize });
	await deleteAllCartComponents({ page });
	updatedCartSize = "0";

	// test cart pcbs table in cart page
	await page.goto(BASE_URL);
	await addRigidPcbToCart({ page });
	updatedCartSize = `${Number(updatedCartSize) + 1}`;
	await expect(page.getByTestId("cart-qty")).toHaveText(updatedCartSize); // check if the cart size increased

	// flex pcb to cart
	await page.goto(BASE_URL);
	await addFlexPcbToCart({ page });
	updatedCartSize = `${Number(updatedCartSize) + 1}`;
	await expect(page.getByTestId("cart-qty")).toHaveText(updatedCartSize); // check if the cart size increased

	// pcb assembly to cart
	await page.goto(BASE_URL);
	await addPcbAssemblyToCart({ page });
	updatedCartSize = `${Number(updatedCartSize) + 1}`;
	await expect(page.getByTestId("cart-qty")).toHaveText(updatedCartSize); // check if the cart size increased

	// delete a pcb from cart
	await deleteNthCartPcb({ nth: 0, page, cartSize: updatedCartSize });
	await deleteAllCartPcbs({ page });
	updatedCartSize = "0";
});
