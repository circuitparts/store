"use client";
import { CurrencyContext } from "@/context/currency-context";
import {
	selectFlexPcbSpecsForQuote,
	selectNetPrice,
	selectOrderedQty,
	selectTentativeDispatchDate,
	selectUnitPrice,
} from "@/lib/redux/reducers/flex-pcb-slice";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { calculateFlexPcbPrice } from "@/lib/redux/thunks";
import { LineSkeleton } from "@/components/ui/line-skeleton";
import { convertAndFormatCurrency } from "@/lib/utils";
import { useContext, useEffect, useState } from "react";

export function FlexPcbPriceSummary() {
	const dispatch = useDispatch();
	const flexPcb = useSelector(selectFlexPcbSpecsForQuote);
	const orderedQuantity = useSelector(selectOrderedQty);
	const tentativeDispatchDate = useSelector(selectTentativeDispatchDate);
	const [isLoading, setIsLoading] = useState(false);
	const { currency } = useContext(CurrencyContext);
	const unitPrice = useSelector(selectUnitPrice);
	const unitPriceFormatted = convertAndFormatCurrency(unitPrice, currency);
	const pcbPrice = useSelector(selectNetPrice);
	const netPriceFormatted = convertAndFormatCurrency(pcbPrice, currency);

	// when a flex pcb form field updates, recalculate the price.
	useEffect(() => {
		setIsLoading(true);
		async function calculatePrice() {
			await dispatch(calculateFlexPcbPrice(flexPcb));
		}
		calculatePrice()
			.then(() => setIsLoading(false))
			.catch(console.error);
	}, [dispatch, flexPcb]);

	return (
		<div className="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:p-8">
			<h2 className="mb-8 text-xl font-semibold tracking-tight">Estimated Price</h2>
			<div className="flow-root">
				<div className="-my-4 divide-y divide-gray-300 text-sm">
					<div className="flex items-center justify-between py-4">
						<p>Unit Price</p>
						{isLoading ? <LineSkeleton /> : <p className="font-medium">{unitPriceFormatted}</p>}
					</div>
					<div className="flex items-center justify-between py-4">
						<p>Quantity</p>
						{isLoading ? (
							<LineSkeleton />
						) : (
							<p
								className="font-medium"
								data-testid="flex-pcb-quantity">
								{orderedQuantity}
							</p>
						)}
					</div>
					<div className="flex items-center justify-between py-4">
						<p className="text-base font-medium">Order total</p>
						{isLoading ? (
							<LineSkeleton />
						) : (
							<p
								className="text-base font-medium"
								data-testid="flex-pcb-order-total">
								{netPriceFormatted}
							</p>
						)}
					</div>
					<div className="flex items-center justify-between py-4">
						<p className="">Tentative Lead Time</p>
						{isLoading ? <LineSkeleton /> : <p className="font-medium">{tentativeDispatchDate}</p>}
					</div>
				</div>
			</div>
		</div>
	);
}
