import { FlexPcbCapabilities } from "@/components/products/pcb/capabilities/flex-pcb-capabilities";
import { PcbAssemblyCapabilities } from "@/components/products/pcb/capabilities/pcb-assembly-capabilities";
import { RigidPcbCapabilities } from "@/components/products/pcb/capabilities/rigid-pcb-capabilities";
import { PLATFORM_NAME } from "@/lib/constants/app";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: `Technical Capabilities | ${PLATFORM_NAME}`,
	description: "PCB Fabrication and Assembly Technical Capabilities",
};

export default function PcbFabricationAndAssemblyTechnicalCapabilities() {
	return (
		<div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-2 lg:px-8">
			<h1 className="text-3xl font-bold tracking-tight">PCB Fabrication & Assembly Technical Capabilities</h1>
			<div className="mt-8 space-y-10">
				<Tabs
					defaultValue="rigidPcb"
					className="my-4">
					<TabsList className="w-full">
						<TabsTrigger
							className="w-full text-xs sm:text-sm"
							value="rigidPcb">
							Rigid PCB Capabilities
						</TabsTrigger>
						<TabsTrigger
							className="w-full text-xs sm:text-sm"
							value="flexPcb">
							Flex PCB Capabilities
						</TabsTrigger>
						<TabsTrigger
							className="w-full text-xs sm:text-sm"
							value="pcbAssembly">
							PCB Assembly Capabilities
						</TabsTrigger>
					</TabsList>
					<TabsContent value="rigidPcb">
						<RigidPcbCapabilities />
					</TabsContent>
					<TabsContent value="flexPcb">
						<FlexPcbCapabilities />
					</TabsContent>
					<TabsContent value="pcbAssembly">
						<PcbAssemblyCapabilities />
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
