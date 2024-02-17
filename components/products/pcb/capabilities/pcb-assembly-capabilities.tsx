import { pcbAssemblyCapabilitiesContent } from "@/content/pcb-assembly-capabilities-content";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function PcbAssemblyCapabilities() {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="w-96 ">Features</TableHead>
					<TableHead>Capability</TableHead>
				</TableRow>
			</TableHeader>
			{Object.keys(pcbAssemblyCapabilitiesContent).map(spec => (
				<TableBody key={spec}>
					<TableRow>
						<TableCell>{spec}</TableCell>
						<TableCell>{pcbAssemblyCapabilitiesContent[spec]}</TableCell>
					</TableRow>
				</TableBody>
			))}
		</Table>
	);
}
