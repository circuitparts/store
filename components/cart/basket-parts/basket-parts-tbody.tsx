import { PartNetPrice, PartUnitPrice } from "@/components/cart/basket-parts/basket-parts-price-breaks";
import { AvailabilityStatus } from "@/components/cart/basket-parts/part-availability-status";
import { PartInformationMobileView } from "@/components/cart/basket-parts/part-info-mobile-view";
import { DeleteCartItemButton } from "@/components/cart/delete-buttons";
import { UpdatePartQuantityForm } from "@/components/cart/update-part-qty-form";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { PartDataType } from "@/types/part-types";

export function BasketPartsTbody(props: { parts: PartDataType[] }) {
	const { parts } = props;

	if (!parts.length) {
		return (
			<TableBody>
				<TableRow>
					<TableCell
						className="text-center text-muted-foreground"
						colSpan={6}>
						You&apos;ve not added any components to your cart
					</TableCell>
				</TableRow>
			</TableBody>
		);
	}

	return (
		<TableBody>
			{parts.map((part, partIdx) => {
				const { Name, Type, Description } = part;
				const serialNum = partIdx + 1;

				return (
					<TableRow
						key={serialNum}
						data-testid="basket-parts-tbody-row">
						<TableCell>{serialNum}</TableCell>
						<TableCell>
							<p>{Name}</p>
							<p className="mt-1 text-muted-foreground">{Description}</p>
							<PartInformationMobileView
								parts={parts}
								part={part}
							/>
						</TableCell>
						<TableCell className="hidden lg:table-cell">
							<UpdatePartQuantityForm part={part} />
							<div className="mt-1 flex space-x-1 text-sm">
								<p className="text-muted-foreground">Availability:</p>
								<p>{part.Availability}</p>
							</div>
							<div className="mt-1 flex space-x-1 text-sm">
								<p className="text-muted-foreground">Status:</p>
								<AvailabilityStatus Availability={part.Availability} />
							</div>
						</TableCell>
						<TableCell className="hidden lg:table-cell">
							<PartUnitPrice
								Name={Name}
								parts={parts}
							/>
						</TableCell>
						<TableCell className="hidden lg:table-cell">
							<PartNetPrice part={part} />
						</TableCell>
						<TableCell>
							<DeleteCartItemButton
								itemName={Name}
								itemType={Type}
							/>
						</TableCell>
					</TableRow>
				);
			})}
		</TableBody>
	);
}
