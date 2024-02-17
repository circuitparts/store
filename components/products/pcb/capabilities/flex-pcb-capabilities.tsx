import { flexPcbCapabilitiesContent } from "@/content/flex-pcb-capabilities-content";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function FlexPcbCapabilities() {
	const flexPcbCapabilities = Object.entries(flexPcbCapabilitiesContent);
	return (
		<>
			{flexPcbCapabilities.map(([specName, specValue]) => (
				<div key={specName}>
					<Accordion
						type="single"
						collapsible
						className="w-full">
						<AccordionItem
							value="item-1"
							className="bg-gray-50 px-2 rounded-md">
							<AccordionTrigger className="text-md">{specName}</AccordionTrigger>
							<AccordionContent>
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead className="w-96 ">Features</TableHead>
											<TableHead>Capability</TableHead>
										</TableRow>
									</TableHeader>
									{Object.entries(specValue).map(([subSpec, subSpecValue]) => (
										<TableBody key={subSpec}>
											<TableRow>
												<TableCell>{subSpec}</TableCell>
												<TableCell>{subSpecValue}</TableCell>
											</TableRow>
										</TableBody>
									))}
								</Table>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>
			))}
		</>
	);
}
