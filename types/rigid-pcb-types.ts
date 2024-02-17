import type { Unwrap } from "@/types/unwrap";

export type RigidPcbLayerType = 1 | 2 | 4 | 6 | 8 | 10;
export type RigidPcbBaseMaterialType = "FR4" | "Aluminum" | "CopperCore" | "Rogers";
export type RigidPcbDesignFormatType = "Single PCB" | "Panel by Customer" | "Panel by Manufacturer";
export type RigidPcbDifferentDesignsInPanelType = 1 | 2 | 3 | 4;
export type RigidPcbMaterialType =
	| "FR4-Standard TG 135-140"
	| "FR-4 TG155"
	| "RO4350B (Dk=3.48, Df=0.0037)"
	| "FR-4 TG170";
export type RigidPcbPanelQtyType =
	| 5
	| 10
	| 15
	| 20
	| 25
	| 30
	| 50
	| 75
	| 100
	| 125
	| 150
	| 200
	| 250
	| 300
	| 400
	| 450
	| 500
	| 600
	| 700
	| 800
	| 900
	| 1000
	| 1500
	| 2000;
export type RigidPcbPcbQtyType =
	| 5
	| 10
	| 15
	| 20
	| 25
	| 30
	| 50
	| 75
	| 100
	| 125
	| 150
	| 200
	| 250
	| 300
	| 400
	| 450
	| 500
	| 600
	| 700
	| 800
	| 900
	| 1000
	| 1500
	| 2000;
export type RigidPcbBoardThicknessType = 0.51 | 0.76 | 1.52 | 0.4 | 0.6 | 0.8 | 1.0 | 1.2 | 1.6 | 2.0;
export type RigidPcbSoldermaskType = "Green" | "Purple" | "Red" | "Yellow" | "Blue" | "Black" | "White";
export type RigidPcbSilkscreenType = "White" | "Black";
export type RigidPcbSurfaceFinishType = "HASL(with lead)" | "LeadFree HASL" | "ENIG" | "OSP";
export type RigidPcbGoldFingersType = "Yes" | "No";
export type RigidPcbGoldThicknessType = '1 U"' | '2 U"';
export type RigidPcbEdgeRailsType = "No" | "On 2 Sides" | "On 4 Sides";
export type RigidPcbEdgeRailSizeType = "5mm" | "7mm" | "10mm";
export type RigidPcbOuterCuWeightType = "1 oz" | "2 oz";
export type RigidPcbCopperStructureType = "Direct Heatsink";
export type RigidPcbThermalConductivityType = 1 | 380;
export type RigidPcbBreakDownVoltageType = 3000;
export type RigidPcbInnerCuWeightType = "0.5 oz" | "1 oz" | "2 oz";
export type RigidPcbImpedanceControlType = "Yes" | "No";
export type RigidPcbViaCoveringType =
	| "Tented"
	| "Untented"
	| "Plugged"
	| "Epoxy Filled & Capped"
	| "Epoxy Filled & Untented"
	| "Copper paste Filled & Capped";

export type RigidPcbMinViaHoleSizeAndDiameterType =
	| "0.3mm/(0.4/0.45mm)"
	| "0.25mm/(0.35/0.40mm)"
	| "0.2mm/(0.3/0.35mm)"
	| "0.15mm/(0.25/0.3mm)";
export type RigidPcbBoardOutlineToleranceType = "±0.2mm(Regular)" | "±0.1mm(Precision)";
export type RigidPcbCastellatedHolesType = "Yes" | "No";
export type RigidPcbCastellatedHolesEdgesType = 1 | 2 | 3 | 4;
export type RigidPcbChamferedGoldFingersType = "Yes" | "No";
export type RigidPcbLeadTimeType = "3 Working days" | "5 Working days" | "7 Working days" | "10 Working days";
export type RigidPcbDispatchUnitType = "PCB" | "Panel";
export type RigidPcbUploadedFileNameType = string | null;
export type RigidPcbUploadedFileUrlType = string | null;

type BaseRigidPcbFabSpecsType = {
	Type: "PCB";
	Category: "Rigid PCB";
	Name: string;
	Layer: RigidPcbLayerType;
	BaseMaterial: RigidPcbBaseMaterialType;
	DesignFormat: RigidPcbDesignFormatType;
	DifferentDesignsInPanel: RigidPcbDifferentDesignsInPanelType;
	Material: RigidPcbMaterialType;
	BoardSizeX: number;
	BoardSizeY: number;
	PanelQty: RigidPcbPanelQtyType;
	Columns: number;
	Rows: number;
	SinglePiecesQty: number;
	PcbQty: RigidPcbPcbQtyType;
	BoardThickness: RigidPcbBoardThicknessType;
	Soldermask: RigidPcbSoldermaskType;
	Silkscreen: RigidPcbSilkscreenType;
	SurfaceFinish: RigidPcbSurfaceFinishType;
	GoldFingers: RigidPcbGoldFingersType;
	GoldThickness: RigidPcbGoldThicknessType;
	EdgeRails: RigidPcbEdgeRailsType;
	EdgeRailSize: RigidPcbEdgeRailSizeType;
	PanelSizeX: number;
	PanelSizeY: number;
	OuterCuWeight: RigidPcbOuterCuWeightType;
	CopperStructure: RigidPcbCopperStructureType;
	ThermalConductivity: RigidPcbThermalConductivityType;
	BreakDownVoltage: RigidPcbBreakDownVoltageType;
	InnerCuWeight: RigidPcbInnerCuWeightType;
	ImpedanceControl: RigidPcbImpedanceControlType;
	ViaCovering: RigidPcbViaCoveringType;
	MinViaHoleSizeAndDiameter: RigidPcbMinViaHoleSizeAndDiameterType;
	BoardOutlineTolerance: RigidPcbBoardOutlineToleranceType;
	ViaHoles: number;
	CastellatedHoles: RigidPcbCastellatedHolesType;
	CastellatedHolesEdges: RigidPcbCastellatedHolesEdgesType;
	ChamferedGoldFingers: RigidPcbChamferedGoldFingersType;
	LeadTime: RigidPcbLeadTimeType;
	DispatchUnit: RigidPcbDispatchUnitType;
	UploadedFileName: RigidPcbUploadedFileNameType;
	UploadedFileUrl: RigidPcbUploadedFileUrlType;
	UnitPrice: number;
	NetPrice: number;
	OrderedQty: number;
};

export type RigidPcbStoreStateType = Unwrap<
	BaseRigidPcbFabSpecsType & {
		TentativeDispatchDate: string;
		LayerOptions: RigidPcbLayerType[];
		BaseMaterialOptions: RigidPcbBaseMaterialType[];
		DesignFormatOptions: RigidPcbDesignFormatType[];
		DifferentDesignsInPanelOptions: RigidPcbDifferentDesignsInPanelType[];
		MaterialOptions: RigidPcbMaterialType[];
		PanelQtyOptions: RigidPcbPanelQtyType[];
		PcbQtyOptions: RigidPcbPcbQtyType[];
		BoardThicknessOptions: RigidPcbBoardThicknessType[];
		SoldermaskOptions: RigidPcbSoldermaskType[];
		SilkscreenOptions: RigidPcbSilkscreenType[];
		SurfaceFinishOptions: RigidPcbSurfaceFinishType[];
		GoldFingersOptions: RigidPcbGoldFingersType[];
		GoldThicknessOptions: RigidPcbGoldThicknessType[];
		EdgeRailsOptions: RigidPcbEdgeRailsType[];
		EdgeRailSizeOptions: RigidPcbEdgeRailSizeType[];
		OuterCuWeightOptions: RigidPcbOuterCuWeightType[];
		CopperStructureOptions: RigidPcbCopperStructureType[];
		ThermalConductivityOptions: RigidPcbThermalConductivityType[];
		BreakDownVoltageOptions: RigidPcbBreakDownVoltageType[];
		InnerCuWeightOptions: RigidPcbInnerCuWeightType[];
		ImpedanceControlOptions: RigidPcbImpedanceControlType[];
		ViaCoveringOptions: RigidPcbViaCoveringType[];
		MinViaHoleSizeAndDiameterOptions: RigidPcbMinViaHoleSizeAndDiameterType[];
		BoardOutlineToleranceOptions: RigidPcbBoardOutlineToleranceType[];
		CastellatedHolesOptions: RigidPcbCastellatedHolesType[];
		CastellatedHolesEdgesOptions: RigidPcbCastellatedHolesEdgesType[];
		LeadTimeOptions: RigidPcbLeadTimeType[];
		ChamferedGoldFingersOptions: RigidPcbChamferedGoldFingersType[];
		DispatchUnitOptions: RigidPcbDispatchUnitType[];
	}
>;

export type RigidPcbFabSpecsType = Unwrap<
	BaseRigidPcbFabSpecsType & {
		// override specific props in base to be nullable
		Material: null | RigidPcbMaterialType;
		PcbQty: null | RigidPcbPcbQtyType;
		PanelQty: null | RigidPcbPanelQtyType;
		Columns: null | number;
		Rows: null | number;
		SinglePiecesQty: null | number;
		GoldThickness: null | RigidPcbGoldThicknessType;
		EdgeRails: null | RigidPcbEdgeRailsType;
		EdgeRailSize: null | RigidPcbEdgeRailSizeType;
		PanelSizeX: null | number;
		PanelSizeY: null | number;
		CopperStructure: null | RigidPcbCopperStructureType;
		ThermalConductivity: null | RigidPcbThermalConductivityType;
		BreakDownVoltage: null | RigidPcbBreakDownVoltageType;
		InnerCuWeight: null | RigidPcbInnerCuWeightType;
		ImpedanceControl: null | RigidPcbImpedanceControlType;
		ViaCovering: null | RigidPcbViaCoveringType;
		MinViaHoleSizeAndDiameter: null | RigidPcbMinViaHoleSizeAndDiameterType;
		BoardOutlineTolerance: null | RigidPcbBoardOutlineToleranceType;
		ViaHoles: null | number;
		CastellatedHolesEdges: null | RigidPcbCastellatedHolesEdgesType;
		ChamferedGoldFingers: null | RigidPcbChamferedGoldFingersType;
	}
>;

export type RigidPcbQuoteSpecsType = Omit<
	RigidPcbFabSpecsType,
	"Name" | "UploadedFileName" | "UploadedFileUrl" | "UnitPrice" | "NetPrice"
>;