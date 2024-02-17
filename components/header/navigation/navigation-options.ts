import { Icons } from "@/components/ui/icons";
import {
	FLEX_PCB_FAB_PAGE,
	HOME_PAGE,
	PCB_ASSEMBLY_PAGE,
	PCB_TECH_CAPABILITIES_PAGE,
	RIGID_PCB_FAB_PAGE
} from "@/lib/constants/page-routes";

export const navigationOptions = [
	{
		id: 1,
		name: "Components",
		href: HOME_PAGE,
		icon: Icons.BsCpu,
	},
	{
		id: 2,
		name: "Rigid PCB",
		href: RIGID_PCB_FAB_PAGE,
		icon: Icons.TfiLayers,
	},
	{
		id: 3,
		name: "Flex PCB",
		href: FLEX_PCB_FAB_PAGE,
		icon: Icons.CgDisplayFlex,
	},
	{
		id: 4,
		name: "PCB Assembly",
		href: PCB_ASSEMBLY_PAGE,
		icon: Icons.GiFlexibleLamp,
	},
	{
		id: 5,
		name: "Technical Capabilities",
		href: PCB_TECH_CAPABILITIES_PAGE,
		icon: Icons.BsRocket,
	},
];
