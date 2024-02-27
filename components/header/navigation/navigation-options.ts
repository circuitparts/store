import { Icons } from "@/components/ui/icons";
import {
	DOCS_PAGE,
	FLEX_PCB_FAB_PAGE,
	HELP_CENTER_PAGE,
	HOME_PAGE,
	PCB_ASSEMBLY_PAGE,
	PCB_TECH_CAPABILITIES_PAGE,
	RIGID_PCB_FAB_PAGE,
} from "@/lib/constants/page-routes";

export const navigationOptions = [
	{
		id: 1,
		name: "Components",
		href: HOME_PAGE,
		icon: Icons.BsCpu,
		testid: "components-nav-link",
	},
	{
		id: 2,
		name: "Rigid PCB",
		href: RIGID_PCB_FAB_PAGE,
		icon: Icons.TfiLayers,
		testid: "rigid-pcb-nav-link",
	},
	{
		id: 3,
		name: "Flex PCB",
		href: FLEX_PCB_FAB_PAGE,
		icon: Icons.CgDisplayFlex,
		testid: "flex-pcb-nav-link",
	},
	{
		id: 4,
		name: "PCB Assembly",
		href: PCB_ASSEMBLY_PAGE,
		icon: Icons.GiFlexibleLamp,
		testid: "pcb-assembly-nav-link",
	},
	{
		id: 5,
		name: "Technical Capabilities",
		href: PCB_TECH_CAPABILITIES_PAGE,
		icon: Icons.BsRocket,
		testid: "tech-capabilities-nav-link",
	},
	{
		id: 6,
		name: "Help Center",
		href: HELP_CENTER_PAGE,
		icon: Icons.GiHelp,
		target: "_blank",
		testid: "help-center-nav-link",
	},
	{
		id: 7,
		name: "Docs",
		href: DOCS_PAGE,
		icon: Icons.IoMdDocument,
		target: "_blank",
		testid: "docs-nav-link",
	},
];
