"use client";
import { CurrencyContext } from "@/context/currency-context";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { convertAndFormatCurrency } from "@/lib/utils";
import type { PartDataType } from "@/types/part-types";
import { useContext } from "react";

export function PartPricingTable({ partData }: { partData: PartDataType }) {
	const { currency } = useContext(CurrencyContext);
	return (
		<div className="lg:border-l p-4">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Quantity</TableHead>
						<TableHead>Unit Price</TableHead>
						<TableHead>Net Price</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{partData.PriceBreaks.map((priceBreak, index) => {
						const { Price, Quantity } = priceBreak;
						const unitPriceNum = Number(Price.slice(1).replace(/,/g, "")); // remove currency symbol and ,
						const netPriceNum = unitPriceNum * Number(Quantity);

						const unitPrice = convertAndFormatCurrency(unitPriceNum, currency);
						const netPrice = convertAndFormatCurrency(netPriceNum, currency);
						if (index < 6) {
							// limiting number of rows to 6.
							return (
								<TableRow key={index}>
									<TableCell>{Quantity}</TableCell>
									<TableCell>{unitPrice}</TableCell>
									<TableCell>{netPrice}</TableCell>
								</TableRow>
							);
						}
					})}
				</TableBody>
			</Table>
		</div>
	);
}
