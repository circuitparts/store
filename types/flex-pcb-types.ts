import type { Unwrap } from "@/types/unwrap";

export type FlexPcbBaseMaterialType = "Flex (Polyimide)";
export type FlexPcbLayerType = 1 | 2;
export type FlexPcbPcbQtyType =
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
export type FlexPcbDesignFormatType = "Single PCB" | "Panel by Customer" | "Panel by Manufacturer";
export type FlexPcbDifferentDesignsInPanelType = 1 | 2 | 3 | 4;
export type FlexPcbPanelQtyType =
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
export type FlexPcbBoardThicknessType = 0.07 | 0.11 | 0.12 | 0.2;
export type FlexPcbCoverlayType = "Yellow";
export type FlexPcbCoverlayThicknessType = "PI:12.5um/AD:15um" | "PI:25um/AD:25um";
export type FlexPcbSilkscreenType = "White";
export type FlexPcbSurfaceFinishType = "ENIG";
export type FlexPcbGoldThicknessType = '1 U"' | '2 U"';
export type FlexPcbEdgeRailsType = "No" | "On 2 Sides" | "On 4 Sides";
export type FlexPcbEdgeRailSizeType = "5mm" | "7mm" | "10mm";
export type FlexPcbOuterCuWeightType = "0.5 oz" | "1/3 oz" | "1.0 oz";
export type FlexPcbBoardOutlineToleranceType = "±0.1mm" | "±0.05mm";
export type FlexPcbLeadTimeType = "3 Working days" | "5 Working days" | "7 Working days" | "10 Working days";
export type FlexPcbDispatchUnitType = "PCB" | "Panel";
export type FlexPcbCopperType = "Electro-deposited";
export type FlexPcbStiffnerType = "Without" | "Polyimide" | "FR4" | "Stainless Steel" | "3M Tape";
export type FlexPcbPolyimideThicknessType = 0.1 | 0.15 | 0.2 | 0.225 | 0.25;
export type FlexPcbFR4ThicknessType = 0.1 | 0.2;
export type FlexPcbStainlessSteelThicknessType = 0.1 | 0.2 | 0.3;
export type FlexPcbThreeMTapeThicknessType = "3M468 (0.13mm)" | "3M9077 (HT, 0.05mm)";
export type FlexPcbEMIShieldingFilmType = "Without" | "Both sides (Black, 18um)" | "Single side (Black, 18um)";
export type FlexPcbCuttingMethodType = "Laser Cutting";

type BaseFlexPcbFabSpecsType = {
	Type: "PCB";
	Category: "Flex PCB";
	Name: string;
	BaseMaterial: FlexPcbBaseMaterialType;
	Layer: FlexPcbLayerType;
	BoardSizeX: number;
	BoardSizeY: number;
	PanelSizeX: number;
	PanelSizeY: number;
	PcbQty: FlexPcbPcbQtyType;
	SinglePiecesQty: number;
	DesignFormat: FlexPcbDesignFormatType;
	DifferentDesignsInPanel: FlexPcbDifferentDesignsInPanelType;
	PanelQty: FlexPcbPanelQtyType;
	Columns: number;
	Rows: number;
	BoardThickness: FlexPcbBoardThicknessType;
	Coverlay: FlexPcbCoverlayType;
	CoverlayThickness: FlexPcbCoverlayThicknessType;
	Silkscreen: FlexPcbSilkscreenType;
	SurfaceFinish: FlexPcbSurfaceFinishType;
	GoldThickness: FlexPcbGoldThicknessType;
	EdgeRails: FlexPcbEdgeRailsType;
	EdgeRailSize: FlexPcbEdgeRailSizeType;
	OuterCuWeight: FlexPcbOuterCuWeightType;
	BoardOutlineTolerance: FlexPcbBoardOutlineToleranceType;
	ViaHoles: number;
	LeadTime: FlexPcbLeadTimeType;
	DispatchUnit: FlexPcbDispatchUnitType;
	CopperType: FlexPcbCopperType;
	Stiffner: FlexPcbStiffnerType[];
	PolyimideThickness: FlexPcbPolyimideThicknessType;
	FR4Thickness: FlexPcbFR4ThicknessType;
	StainlessSteelThickness: FlexPcbStainlessSteelThicknessType;
	ThreeMTapeThickness: FlexPcbThreeMTapeThicknessType;
	EMIShieldingFilm: FlexPcbEMIShieldingFilmType;
	CuttingMethod: FlexPcbCuttingMethodType;
	UploadedFileName: string | null;
	UploadedFileUrl: string | null;
	UnitPrice: number;
	NetPrice: number;
	OrderedQty: number;
};

export type FlexPcbStoreStateType = Unwrap<
	BaseFlexPcbFabSpecsType & {
		TentativeDispatchDate: string;
		DesignFormatOptions: FlexPcbDesignFormatType[];
		LayerOptions: FlexPcbLayerType[];
		BaseMaterialOptions: FlexPcbBaseMaterialType[];
		DifferentDesignsInPanelOptions: FlexPcbDifferentDesignsInPanelType[];
		PanelQtyOptions: FlexPcbPanelQtyType[];
		PcbQtyOptions: FlexPcbPcbQtyType[];
		BoardThicknessOptions: FlexPcbBoardThicknessType[];
		CoverlayOptions: FlexPcbCoverlayType[];
		CoverlayThicknessOptions: FlexPcbCoverlayThicknessType[];
		SilkscreenOptions: FlexPcbSilkscreenType[];
		SurfaceFinishOptions: FlexPcbSurfaceFinishType[];
		GoldThicknessOptions: FlexPcbGoldThicknessType[];
		EdgeRailsOptions: FlexPcbEdgeRailsType[];
		EdgeRailSizeOptions: FlexPcbEdgeRailSizeType[];
		OuterCuWeightOptions: FlexPcbOuterCuWeightType[];
		BoardOutlineToleranceOptions: FlexPcbBoardOutlineToleranceType[];
		LeadTimeOptions: FlexPcbLeadTimeType[];
		DispatchUnitOptions: FlexPcbDispatchUnitType[];
		CopperTypeOptions: FlexPcbCopperType[];
		StiffnerOptions: FlexPcbStiffnerType[];
		PolyimideThicknessOptions: FlexPcbPolyimideThicknessType[];
		FR4ThicknessOptions: FlexPcbFR4ThicknessType[];
		StainlessSteelThicknessOptions: FlexPcbStainlessSteelThicknessType[];
		ThreeMTapeThicknessOptions: FlexPcbThreeMTapeThicknessType[];
		EMIShieldingFilmOptions: FlexPcbEMIShieldingFilmType[];
		CuttingMethodOptions: FlexPcbCuttingMethodType[];
	}
>;

export type FlexPcbFabSpecsType = Unwrap<
	BaseFlexPcbFabSpecsType & {
		PcbQty: null | FlexPcbPcbQtyType;
		SinglePiecesQty: null | number;
		Columns: null | number;
		Rows: null | number;
		EdgeRails: null | FlexPcbEdgeRailsType;
		EdgeRailSize: null | FlexPcbEdgeRailSizeType;
		GoldThickness: null | FlexPcbGoldThicknessType;
		PolyimideThickness: null | FlexPcbPolyimideThicknessType;
		ThreeMTapeThickness: null | FlexPcbThreeMTapeThicknessType;
		StainlessSteelThickness: null | FlexPcbStainlessSteelThicknessType;
		FR4Thickness: null | FlexPcbFR4ThicknessType;
		BoardOutlineTolerance: null | FlexPcbBoardOutlineToleranceType;
		ViaHoles: null | number;
		PanelQty: null | FlexPcbPanelQtyType;
		PanelSizeX: null | number;
		PanelSizeY: null | number;
	}
>;

export type FlexPcbQuoteSpecsType = Omit<
	FlexPcbFabSpecsType,
	"Name" | "UploadedFileName" | "UploadedFileUrl" | "UnitPrice" | "NetPrice"
>;
