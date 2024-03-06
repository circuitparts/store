import { SHOPPING_CART_PAGE } from "@/lib/constants/page-routes";
import { fetchCartSizeAction } from "@/lib/server-actions/cart-actions";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export async function CartButton() {
	const cartItems = await fetchCartSizeAction();
	return (
		<Button
			data-testid="cart-button"
			variant={"ghost"}
			size={"icon"}
			asChild>
			<Link href={SHOPPING_CART_PAGE}>
				<div className="flex">
					<Icons.cart />
					<p data-testid="cart-qty">{cartItems}</p>
				</div>
			</Link>
		</Button>
	);
}
