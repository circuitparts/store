"use client";
import { CurrencyContext } from "@/context/currency-context";
import {
	selectNetPrice,
	selectOrderedQty,
	selectPcbAssemblySpecsForQuote,
	selectSetupCharges,
	selectTentativeDispatchDate,
	selectTotalPrice,
	selectUnitPrice,
} from "@/lib/redux/reducers/pcb-assembly-slice";
import { useDispatch } from "@/lib/redux/store";
import { calculatePcbAssemblyPrice } from "@/lib/redux/thunks";
import { LineSkeleton } from "@/components/ui/line-skeleton";
import { convertAndFormatCurrency } from "@/lib/utils";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function AssemblyPcbPriceSummary() {
	const dispatch = useDispatch();
	const pcbAssembly = useSelector(selectPcbAssemblySpecsForQuote);
	const orderedQuantity = useSelector(selectOrderedQty);
	const tentativeDispatchDate = useSelector(selectTentativeDispatchDate);
	const [isLoading, setIsLoading] = useState(false);
	const { currency } = useContext(CurrencyContext);
	const unitPrice = useSelector(selectUnitPrice);
	const unitPriceFormatted = convertAndFormatCurrency(unitPrice, currency);
	const pcbPrice = useSelector(selectNetPrice);
	const netPriceFormatted = convertAndFormatCurrency(pcbPrice, currency);
	const setupCharges = useSelector(selectSetupCharges);
	const setupChargesFormatted = convertAndFormatCurrency(setupCharges, currency);
	const totalPrice = useSelector(selectTotalPrice);
	const totalPriceFormatted = convertAndFormatCurrency(totalPrice, currency);

	// when a assembly form field updates, recalculate the price.
	useEffect(() => {
		setIsLoading(true);
		async function calculatePrice() {
			await dispatch(calculatePcbAssemblyPrice(pcbAssembly));
		}
		calculatePrice()
			.then(() => setIsLoading(false))
			.catch(console.error);
	}, [dispatch, pcbAssembly]);

	return (
		<div className="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:p-8">
			<h2 className="text-xl mb-8 font-semibold tracking-tight">Estimated Price</h2>
			<div className="flow-root">
				<div className="-my-4 divide-y divide-gray-300 text-sm">
					<div className="flex items-center justify-between py-4">
						<p>Unit Price</p>
						{isLoading ? <LineSkeleton /> : <p className="font-medium">{unitPriceFormatted}</p>}
					</div>
					<div className="flex items-center justify-between py-4">
						<p>Quantity</p>
						{isLoading ? <LineSkeleton /> : <p className="font-medium">{orderedQuantity}</p>}
					</div>
					<div className="flex items-center justify-between py-4">
						<p className="text-base font-medium">Net Price</p>
						{isLoading ? <LineSkeleton /> : <p className="text-base font-medium">{netPriceFormatted}</p>}
					</div>
					<div className="flex items-center justify-between py-4">
						<p>Setup Charges</p>
						{isLoading ? (
							<LineSkeleton />
						) : (
							<p className="text-base font-medium">{setupChargesFormatted}</p>
						)}
					</div>
					<div className="flex items-center justify-between py-4">
						<p>Total Price</p>
						{isLoading ? <LineSkeleton /> : <p className="text-base font-medium">{totalPriceFormatted}</p>}
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
