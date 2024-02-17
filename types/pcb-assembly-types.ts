import type { Unwrap } from "@/types/unwrap";

export type PcbAssemblyBoardType = "Single PCB" | "Panel";
export type PcbAssemblySideType = "Top Side" | "Bottom Side" | "Both Sides";
export type PcbAssemblyTempHumiditySensitivityType = "Low" | "Medium" | "High";
export type PcbAssemblyDePanelType = "Yes" | "No";
export type PcbAssemblyConformalCoatingType = "Top Side" | "Bottom Side" | "Both Sides";
export type PcbAssemblyFunctionalTestType = "Yes" | "No";
export type PcbAssemblyComponentsProcurementType = "TurnKey" | "Consigned" | "Combo";
export type PcbAssemblyTurnaroundTimeType = "Standard 5-7 days" | "Expedited 3-4 days";

export type PcbAssemblyFabSpecsType = {
	Type: "PCB";
	Category: "PCB Assembly";
	Name: string;
	BoardType: PcbAssemblyBoardType;
	PcbsPerPanel: number;
	OrderedQty: number;
	AssemblySides: PcbAssemblySideType;
	NumOfUniqueComponents: number;
	NumOfSmdComponents: number;
	NumOfBgaComponents: number;
	NumOfThroughHoleComponents: number;
	TempHumiditySensitivity: PcbAssemblyTempHumiditySensitivityType;
	DePanel: PcbAssemblyDePanelType;
	ConformalCoating: PcbAssemblyConformalCoatingType;
	FunctionalTest: PcbAssemblyFunctionalTestType;
	ComponentsProcurement: PcbAssemblyComponentsProcurementType;
	TurnaroundTime: PcbAssemblyTurnaroundTimeType;
	UnitPrice: number;
	NetPrice: number;
	SetupCharges: number;
	TotalPrice: number;
	UploadedFileName: string | null;
	UploadedFileUrl: string | null;
};

export type PcbAssemblyStoreStateType = Unwrap<
	PcbAssemblyFabSpecsType & {
		TentativeDispatchDate: string;
		DePanelOptions: PcbAssemblyDePanelType[];
		BoardTypeOptions: PcbAssemblyBoardType[];
		AssemblySideOptions: PcbAssemblySideType[];
		TempHumiditySensitivityOptions: PcbAssemblyTempHumiditySensitivityType[];
		ConformalCoatingOptions: PcbAssemblyConformalCoatingType[];
		FunctionalTestOptions: PcbAssemblyFunctionalTestType[];
		ComponentsProcurementOptions: PcbAssemblyComponentsProcurementType[];
		TurnaroundTimeOptions: PcbAssemblyTurnaroundTimeType[];
	}
>;

export type PcbAssemblyQuoteSpecsType = Omit<
	PcbAssemblyFabSpecsType,
	"Name" | "UploadedFileName" | "UploadedFileUrl" | "UnitPrice" | "NetPrice" | "SetupCharges" | "TotalPrice"
>;
