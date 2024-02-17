import { CartComponentsTotal, CartPcbsTotal, CartTotal } from "@/components/cart/price-summary/cart-price-breaks";
import type { CartDataType } from "@/types/cart-types";


export async function CartPricingSummary(props: { cart: CartDataType | null }) {
	const { cart } = props;

	return (
		<div className="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:p-8">
			<h2 className="text-xl mb-8 font-semibold tracking-tight">Order Summary</h2>
			<div className="flow-root">
				<div className="-my-4 divide-y divide-gray-300 text-sm">
					<div className="flex items-center justify-between py-4">
						<p>Components</p>
						<CartComponentsTotal cart={cart} />
					</div>
					<div className="flex items-center justify-between py-4">
						<p>PCB Fabrication/Assembly</p>
						<CartPcbsTotal cart={cart} />
					</div>
					<div className="flex items-center justify-between py-4">
						<p className="text-base font-medium">Cart Total</p>
						<CartTotal cart={cart} />
					</div>
				</div>
			</div>
		</div>
	);
}
