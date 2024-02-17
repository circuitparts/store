import { OrderTotal, SalesTax, Shipping, Subtotal } from "@/components/checkout/pricing/checkout-price-breaks";
import { ShippingTip } from "@/components/checkout/pricing/shipping-tip";
import type { ShippingAddressType } from "@/types/address-types";
import type { CartDataType } from "@/types/cart-types";

export async function CheckoutPricingSummary(props: { cart: CartDataType | null; shipAddress: ShippingAddressType }) {
	const { cart } = props;
	return (
		<div className="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:p-8">
			<h2 className="text-xl mb-8 font-semibold tracking-tight">Order Summary</h2>
			<div className="flow-root">
				<div className="-my-4 divide-y divide-gray-300 text-sm">
					<div className="flex items-center justify-between py-4">
						<p className="font-medium">Subtotal</p>
						<Subtotal cart={cart} />
					</div>
					<div className="flex items-center justify-between py-4">
						<div>
							<p className="font-medium mb-2">
								Shipping <ShippingTip />
							</p>
							<p className="my-1">Components</p>
							<p className="my-1">PCBs</p>
						</div>
						<Shipping {...props} />
					</div>
					<div className="flex items-center justify-between py-4">
						<p className="font-medium">Sales Tax</p>
						<SalesTax {...props} />
					</div>
					<div className="flex items-center justify-between py-4">
						<p className="text-base font-medium">Order total</p>
						<OrderTotal {...props} />
					</div>
				</div>
			</div>
		</div>
	);
}
