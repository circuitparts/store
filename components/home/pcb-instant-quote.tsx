import { AssemblyBoardType } from "@/components/products/pcb/assembly/fields/assembly-board-type";
import { AssemblyQuantity } from "@/components/products/pcb/assembly/fields/assembly-quantity";
import { AssemblySides } from "@/components/products/pcb/assembly/fields/assembly-sides";
import { FlexBoardSize } from "@/components/products/pcb/flex/fields/flex-board-size";
import { FlexLayer } from "@/components/products/pcb/flex/fields/flex-layer";
import { FlexPcbQuantity } from "@/components/products/pcb/flex/fields/flex-pcb-quantity";
import { RigidBoardSize } from "@/components/products/pcb/rigid/fields/rigid-board-size";
import { RigidLayer } from "@/components/products/pcb/rigid/fields/rigid-layer";
import { RigidPcbQuantity } from "@/components/products/pcb/rigid/fields/rigid-pcb-quantity";
import { FLEX_PCB_FAB_PAGE, PCB_ASSEMBLY_PAGE, RIGID_PCB_FAB_PAGE } from "@/lib/constants/page-routes";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

const tabs = [
	{
		id: 1,
		value: "rigidPcb",
		label: "Rigid PCB",
		href: RIGID_PCB_FAB_PAGE,
		fields: [
			<RigidBoardSize key="rigidBoardSize" />,
			<RigidLayer key="rigidLayer" />,
			<RigidPcbQuantity key="rigidPcbQuantity" />,
		],
	},
	{
		id: 2,
		value: "flexPcb",
		label: "Flex PCB",
		href: FLEX_PCB_FAB_PAGE,
		fields: [
			<FlexBoardSize key="flexBoardSize" />,
			<FlexLayer key="flexLayer" />,
			<FlexPcbQuantity key="flexPcbQuantity" />,
		],
	},
	{
		id: 3,
		value: "pcbAssembly",
		label: "PCB Assembly",
		href: PCB_ASSEMBLY_PAGE,
		fields: [
			<AssemblyBoardType key="assemblyBoardType" />,
			<AssemblySides key="assemblySides" />,
			<AssemblyQuantity key="assemblyQuantity" />,
		],
	},
];

export function PcbInstantQuote() {
	return (
		<div className="my-6">
			<Tabs
				defaultValue="rigidPcb"
				className="my-4 xl:mx-36">
				<TabsList className="w-full">
					{tabs.map(tab => (
						<TabsTrigger
							key={tab.id}
							className="w-full text-xs sm:text-sm"
							value={tab.value}>
							{tab.label}
						</TabsTrigger>
					))}
				</TabsList>

				{tabs.map(tab => (
					<TabsContent
						key={tab.id}
						value={tab.value}>
						<Card>
							<CardContent className="my-2 lg:flex lg:items-center lg:justify-evenly lg:space-x-4">
								{tab.fields}
								<Button
									asChild
									className="mt-6 w-full xl:w-1/2">
									<Link href={tab.href}>Get Quote</Link>
								</Button>
							</CardContent>
						</Card>
					</TabsContent>
				))}
			</Tabs>
		</div>
	);
}
