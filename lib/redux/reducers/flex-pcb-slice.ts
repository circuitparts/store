import { type ReduxState } from "@/lib/redux/store";
import { calculateFlexPcbPrice } from "@/lib/redux/thunks";
import { getFutureBusinessDate } from "@/lib/utils";
import type {
	FlexPcbBaseMaterialType,
	FlexPcbBoardOutlineToleranceType,
	FlexPcbBoardThicknessType,
	FlexPcbCopperType,
	FlexPcbCoverlayThicknessType,
	FlexPcbCoverlayType,
	FlexPcbCuttingMethodType,
	FlexPcbDesignFormatType,
	FlexPcbDifferentDesignsInPanelType,
	FlexPcbDispatchUnitType,
	FlexPcbEMIShieldingFilmType,
	FlexPcbEdgeRailSizeType,
	FlexPcbEdgeRailsType,
	FlexPcbFR4ThicknessType,
	FlexPcbFabSpecsType,
	FlexPcbGoldThicknessType,
	FlexPcbLayerType,
	FlexPcbLeadTimeType,
	FlexPcbOuterCuWeightType,
	FlexPcbPanelQtyType,
	FlexPcbPcbQtyType,
	FlexPcbPolyimideThicknessType,
	FlexPcbSilkscreenType,
	FlexPcbStainlessSteelThicknessType,
	FlexPcbStiffnerType,
	FlexPcbStoreStateType,
	FlexPcbSurfaceFinishType,
	FlexPcbThreeMTapeThicknessType,
} from "@/types/flex-pcb-types";
import type { PcbFabQuoteType } from "@/types/pcb-quote-types";
import { createSelector, createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: FlexPcbStoreStateType = {
	Type: "PCB",
	Category: "Flex PCB",
	Name: "",
	BaseMaterial: "Flex (Polyimide)",
	Layer: 1,
	BoardSizeX: 44,
	BoardSizeY: 44,
	PcbQty: 5,
	PanelQty: 5,
	SinglePiecesQty: 5,
	DesignFormat: "Single PCB",
	DifferentDesignsInPanel: 1,
	Columns: 1,
	Rows: 1,
	EdgeRails: "No",
	EdgeRailSize: "5mm",
	PanelSizeX: 44,
	PanelSizeY: 44,
	BoardThickness: 0.07,
	Coverlay: "Yellow",
	Silkscreen: "White",
	SurfaceFinish: "ENIG",
	CopperType: "Electro-deposited",
	GoldThickness: '1 U"',
	OuterCuWeight: "0.5 oz",
	PolyimideThickness: 0.1,
	ThreeMTapeThickness: "3M468 (0.13mm)",
	StainlessSteelThickness: 0.1,
	FR4Thickness: 0.1,
	EMIShieldingFilm: "Without",
	CuttingMethod: "Laser Cutting",
	CoverlayThickness: "PI:12.5um/AD:15um",
	BoardOutlineTolerance: "±0.1mm",
	DispatchUnit: "PCB",
	LeadTime: "3 Working days",
	ViaHoles: 4,
	NetPrice: 14.03,
	OrderedQty: 5,
	UnitPrice: 2.8,
	TentativeDispatchDate: getFutureBusinessDate(3),
	UploadedFileName: null,
	UploadedFileUrl: null,

	// dropdown menu options
	LayerOptions: [1, 2],
	BaseMaterialOptions: ["Flex (Polyimide)"],
	PcbQtyOptions: [
		5, 10, 15, 20, 25, 30, 50, 75, 100, 125, 150, 200, 250, 300, 400, 450, 500, 600, 700, 800, 900, 1000, 1500,
		2000,
	],
	PanelQtyOptions: [
		5, 10, 15, 20, 25, 30, 50, 75, 100, 125, 150, 200, 250, 300, 400, 450, 500, 600, 700, 800, 900, 1000, 1500,
		2000,
	],
	DesignFormatOptions: ["Single PCB", "Panel by Customer", "Panel by Manufacturer"],
	DifferentDesignsInPanelOptions: [1, 2, 3, 4],
	EdgeRailsOptions: ["No", "On 2 Sides", "On 4 Sides"],
	BoardThicknessOptions: [0.07, 0.11],
	CoverlayOptions: ["Yellow"],
	SilkscreenOptions: ["White"],
	SurfaceFinishOptions: ["ENIG"],
	CopperTypeOptions: ["Electro-deposited"],
	GoldThicknessOptions: ['1 U"', '2 U"'],
	OuterCuWeightOptions: ["0.5 oz"],
	CoverlayThicknessOptions: ["PI:12.5um/AD:15um"],
	Stiffner: ["Without"],
	StiffnerOptions: ["Without", "Polyimide", "FR4", "Stainless Steel", "3M Tape"],
	PolyimideThicknessOptions: [0.1, 0.15, 0.2, 0.225, 0.25],
	ThreeMTapeThicknessOptions: ["3M468 (0.13mm)", "3M9077 (HT, 0.05mm)"],
	StainlessSteelThicknessOptions: [0.1, 0.2, 0.3],
	FR4ThicknessOptions: [0.1, 0.2],
	EMIShieldingFilmOptions: ["Without", "Both sides (Black, 18um)", "Single side (Black, 18um)"],
	CuttingMethodOptions: ["Laser Cutting"],
	BoardOutlineToleranceOptions: ["±0.1mm", "±0.05mm"],
	DispatchUnitOptions: ["PCB", "Panel"],
	LeadTimeOptions: ["3 Working days", "5 Working days", "7 Working days", "10 Working days"],
	EdgeRailSizeOptions: ["5mm", "7mm", "10mm"],
};

const flexPcbSlice = createSlice({
	name: "flexPcb",
	initialState,
	reducers: {
		setName: (state, action: PayloadAction<string>) => {
			state.Name = action.payload;
		},
		setBaseMaterial: (state, action: PayloadAction<FlexPcbBaseMaterialType>) => {
			state.BaseMaterial = action.payload;
		},
		setLayer: (state, action: PayloadAction<FlexPcbLayerType>) => {
			state.Layer = action.payload;
			updatePcbThickness(state);
			updateOuterCuWeight(state);
			updateCoverlayThickness(state);
		},
		setBoardSizeX: (state, action: PayloadAction<number>) => {
			state.BoardSizeX = action.payload;
			updatePanelSize(state);
		},
		setBoardSizeY: (state, action: PayloadAction<number>) => {
			state.BoardSizeY = action.payload;
			updatePanelSize(state);
		},
		setPcbQty: (state, action: PayloadAction<FlexPcbPcbQtyType>) => {
			state.PcbQty = action.payload;
			updateOrderedQty(state);
		},
		setPanelQty: (state, action: PayloadAction<FlexPcbPanelQtyType>) => {
			state.PanelQty = action.payload;
			updateSinglePiecesQty(state);
			updateOrderedQty(state);
		},
		setDesignFormat: (state, action: PayloadAction<FlexPcbDesignFormatType>) => {
			state.DesignFormat = action.payload;
			updateDifferentDesignsInPanel(state);
		},
		setDifferentDesignsInPanel: (state, action: PayloadAction<FlexPcbDifferentDesignsInPanelType>) => {
			state.DifferentDesignsInPanel = action.payload;
			updateDesignFormatOption(state);
			updateOrderedQty(state);
		},
		setColumns: (state, action: PayloadAction<number>) => {
			state.Columns = action.payload;
			updateSinglePiecesQty(state);
			updateOrderedQty(state);
			updatePanelSize(state);
		},
		setRows: (state, action: PayloadAction<number>) => {
			state.Rows = action.payload;
			updateSinglePiecesQty(state);
			updatePanelSize(state);
			updateOrderedQty(state);
		},
		setEdgeRails: (state, action: PayloadAction<FlexPcbEdgeRailsType>) => {
			state.EdgeRails = action.payload;
			updatePanelSize(state);
		},
		setEdgeRailSize: (state, action: PayloadAction<FlexPcbEdgeRailSizeType>) => {
			state.EdgeRailSize = action.payload;
			updatePanelSize(state);
		},
		setBoardThickness: (state, action: PayloadAction<FlexPcbBoardThicknessType>) => {
			state.BoardThickness = action.payload;
			updateOuterCuWeight(state);
			updateCoverlayThickness(state);
		},
		setCoverlay: (state, action: PayloadAction<FlexPcbCoverlayType>) => {
			state.Coverlay = action.payload;
		},
		setSilkscreen: (state, action: PayloadAction<FlexPcbSilkscreenType>) => {
			state.Silkscreen = action.payload;
		},
		setSurfaceFinish: (state, action: PayloadAction<FlexPcbSurfaceFinishType>) => {
			state.SurfaceFinish = action.payload;
		},
		setCopperType: (state, action: PayloadAction<FlexPcbCopperType>) => {
			state.CopperType = action.payload;
		},
		setGoldThickness: (state, action: PayloadAction<FlexPcbGoldThicknessType>) => {
			state.GoldThickness = action.payload;
		},
		setOuterCuWeight: (state, action: PayloadAction<FlexPcbOuterCuWeightType>) => {
			state.OuterCuWeight = action.payload;
		},
		setCoverlayThickness: (state, action: PayloadAction<FlexPcbCoverlayThicknessType>) => {
			state.CoverlayThickness = action.payload;
		},
		setStiffner: (state, action: PayloadAction<FlexPcbStiffnerType[]>) => {
			state.Stiffner = action.payload;
		},
		setPolyimideThickness: (state, action: PayloadAction<FlexPcbPolyimideThicknessType>) => {
			state.PolyimideThickness = action.payload;
		},
		setThreeMTapeThickness: (state, action: PayloadAction<FlexPcbThreeMTapeThicknessType>) => {
			state.ThreeMTapeThickness = action.payload;
		},
		setStainlessSteelThickness: (state, action: PayloadAction<FlexPcbStainlessSteelThicknessType>) => {
			state.StainlessSteelThickness = action.payload;
		},
		setFr4Thickness: (state, action: PayloadAction<FlexPcbFR4ThicknessType>) => {
			state.FR4Thickness = action.payload;
		},
		setEmiShieldingFilm: (state, action: PayloadAction<FlexPcbEMIShieldingFilmType>) => {
			state.EMIShieldingFilm = action.payload;
		},
		setCuttingMethod: (state, action: PayloadAction<FlexPcbCuttingMethodType>) => {
			state.CuttingMethod = action.payload;
		},
		setBoardOutlineTolerance: (state, action: PayloadAction<FlexPcbBoardOutlineToleranceType>) => {
			state.BoardOutlineTolerance = action.payload;
		},
		setUploadedFileUrl: (state, action: PayloadAction<string | null>) => {
			state.UploadedFileUrl = action.payload;
		},
		setUploadedFileName: (state, action: PayloadAction<string | null>) => {
			state.UploadedFileName = action.payload;
		},
		setDispatchUnit: (state, action: PayloadAction<FlexPcbDispatchUnitType>) => {
			state.DispatchUnit = action.payload;
		},
		setLeadTime: (state, action: PayloadAction<FlexPcbLeadTimeType>) => {
			state.LeadTime = action.payload;
		},
		setViaHoles: (state, action: PayloadAction<number>) => {
			state.ViaHoles = action.payload;
		},
		setPcbPrice: (state, action: PayloadAction<PcbFabQuoteType>) => {
			state.UnitPrice = action.payload.unitPrice;
			state.NetPrice = action.payload.netPrice;
		},
		setTentativeDispatchDate: (state, action: PayloadAction<string>) => {
			state.TentativeDispatchDate = action.payload;
		},
	},
	extraReducers: builder => {
		builder.addCase(calculateFlexPcbPrice.fulfilled, (state, action) => {
			state.UnitPrice = action.payload.unitPrice;
			state.NetPrice = action.payload.netPrice;
		});
	},
});

export const {
	setName,
	setDesignFormat,
	setLayer,
	setBaseMaterial,
	setBoardOutlineTolerance,
	setBoardSizeX,
	setBoardSizeY,
	setBoardThickness,
	setColumns,
	setCopperType,
	setCoverlay,
	setCoverlayThickness,
	setCuttingMethod,
	setUploadedFileUrl,
	setUploadedFileName,
	setDifferentDesignsInPanel,
	setDispatchUnit,
	setEdgeRailSize,
	setEdgeRails,
	setEmiShieldingFilm,
	setFr4Thickness,
	setGoldThickness,
	setLeadTime,
	setOuterCuWeight,
	setPanelQty,
	setPcbQty,
	setPolyimideThickness,
	setRows,
	setSilkscreen,
	setStainlessSteelThickness,
	setStiffner,
	setSurfaceFinish,
	setThreeMTapeThickness,
	setViaHoles,
	setPcbPrice,
	setTentativeDispatchDate,
} = flexPcbSlice.actions;

export default flexPcbSlice.reducer;

/* Selectors */
export const selectFlexPcbState = (state: ReduxState) => state.flexPcb;
export const selectName = (state: ReduxState) => state.flexPcb.Name;
export const selectDesignFormat = (state: ReduxState) => state.flexPcb.DesignFormat;
export const selectLayer = (state: ReduxState) => state.flexPcb.Layer;
export const selectBaseMaterial = (state: ReduxState) => state.flexPcb.BaseMaterial;
export const selectBoardOutlineTolerance = (state: ReduxState) => state.flexPcb.BoardOutlineTolerance;
export const selectBoardSizeX = (state: ReduxState) => state.flexPcb.BoardSizeX;
export const selectBoardSizeY = (state: ReduxState) => state.flexPcb.BoardSizeY;
export const selectBoardThickness = (state: ReduxState) => state.flexPcb.BoardThickness;
export const selectColumns = (state: ReduxState) => state.flexPcb.Columns;
export const selectCopperType = (state: ReduxState) => state.flexPcb.CopperType;
export const selectCoverlay = (state: ReduxState) => state.flexPcb.Coverlay;
export const selectCoverlayThickness = (state: ReduxState) => state.flexPcb.CoverlayThickness;
export const selectCuttingMethod = (state: ReduxState) => state.flexPcb.CuttingMethod;
export const selectUploadedName = (state: ReduxState) => state.flexPcb.UploadedFileName;
export const selectUploadedFileUrl = (state: ReduxState) => state.flexPcb.UploadedFileUrl;
export const selectDifferentDesignsInPanel = (state: ReduxState) => state.flexPcb.DifferentDesignsInPanel;
export const selectDispatchUnit = (state: ReduxState) => state.flexPcb.DispatchUnit;
export const selectEdgeRailSize = (state: ReduxState) => state.flexPcb.EdgeRailSize;
export const selectEdgeRails = (state: ReduxState) => state.flexPcb.EdgeRails;
export const selectEmiShieldingFilm = (state: ReduxState) => state.flexPcb.EMIShieldingFilm;
export const selectFr4Thickness = (state: ReduxState) => state.flexPcb.FR4Thickness;
export const selectGoldThickness = (state: ReduxState) => state.flexPcb.GoldThickness;
export const selectLeadTime = (state: ReduxState) => state.flexPcb.LeadTime;
export const selectOuterCuWeight = (state: ReduxState) => state.flexPcb.OuterCuWeight;
export const selectPanelQty = (state: ReduxState) => state.flexPcb.PanelQty;
export const selectPcbQty = (state: ReduxState) => state.flexPcb.PcbQty;
export const selectPolyimideThickness = (state: ReduxState) => state.flexPcb.PolyimideThickness;
export const selectRows = (state: ReduxState) => state.flexPcb.Rows;
export const selectSilkscreen = (state: ReduxState) => state.flexPcb.Silkscreen;
export const selectSinglePiecesQty = (state: ReduxState) => state.flexPcb.SinglePiecesQty;
export const selectStainlessSteelThickness = (state: ReduxState) => state.flexPcb.StainlessSteelThickness;
export const selectStiffner = (state: ReduxState) => state.flexPcb.Stiffner;
export const selectSurfaceFinish = (state: ReduxState) => state.flexPcb.SurfaceFinish;
export const selectThreeMTapeThickness = (state: ReduxState) => state.flexPcb.ThreeMTapeThickness;
export const selectViaHoles = (state: ReduxState) => state.flexPcb.ViaHoles;
export const selectPcbPrice = (state: ReduxState) => state.flexPcb.NetPrice;
export const selectTentativeDispatchDate = (state: ReduxState) => state.flexPcb.TentativeDispatchDate;
export const selectPanelSizeX = (state: ReduxState) => state.flexPcb.PanelSizeX;
export const selectPanelSizeY = (state: ReduxState) => state.flexPcb.PanelSizeY;
export const selectCalculatedPrice = (state: ReduxState) => state.flexPcb.NetPrice;
export const selectOrderedQty = (state: ReduxState) => state.flexPcb.OrderedQty;
export const selectUnitPrice = (state: ReduxState) => state.flexPcb.UnitPrice;
export const selectNetPrice = (state: ReduxState) => state.flexPcb.NetPrice;

/* dropdown menu selectors */
export const selectDesignFormatOptions = (state: ReduxState) => state.flexPcb.DesignFormatOptions;
export const selectLayerOptions = (state: ReduxState) => state.flexPcb.LayerOptions;
export const selectBaseMaterialOptions = (state: ReduxState) => state.flexPcb.BaseMaterialOptions;
export const selectBoardOutlineToleranceOptions = (state: ReduxState) => state.flexPcb.BoardOutlineToleranceOptions;
export const selectBoardThicknessOptions = (state: ReduxState) => state.flexPcb.BoardThicknessOptions;
export const selectCopperTypeOptions = (state: ReduxState) => state.flexPcb.CopperTypeOptions;
export const selectCoverlayOptions = (state: ReduxState) => state.flexPcb.CoverlayOptions;
export const selectCoverlayThicknessOptions = (state: ReduxState) => state.flexPcb.CoverlayThicknessOptions;
export const selectCuttingMethodOptions = (state: ReduxState) => state.flexPcb.CuttingMethodOptions;
export const selectEdgeRailSizeOptions = (state: ReduxState) => state.flexPcb.EdgeRailSizeOptions;
export const selectEdgeRailsOptions = (state: ReduxState) => state.flexPcb.EdgeRailsOptions;
export const selectOuterCuWeightOptions = (state: ReduxState) => state.flexPcb.OuterCuWeightOptions;
export const selectLeadTimeOptions = (state: ReduxState) => state.flexPcb.LeadTimeOptions;
export const selectDispatchUnitOptions = (state: ReduxState) => state.flexPcb.DispatchUnitOptions;
export const selectStiffnerOptions = (state: ReduxState) => state.flexPcb.StiffnerOptions;
export const selectEmiShieldingFilmOptions = (state: ReduxState) => state.flexPcb.EMIShieldingFilmOptions;
export const selectSurfaceFinishOptions = (state: ReduxState) => state.flexPcb.SurfaceFinishOptions;
export const selectFr4ThicknessOptions = (state: ReduxState) => state.flexPcb.FR4ThicknessOptions;
export const selectGoldThicknessOptions = (state: ReduxState) => state.flexPcb.GoldThicknessOptions;
export const selectPolyimideThicknessOptions = (state: ReduxState) => state.flexPcb.PolyimideThicknessOptions;
export const selectStainlessSteelThicknessOptions = (state: ReduxState) => state.flexPcb.StainlessSteelThicknessOptions;
export const selectThreeMTapeThicknessOptions = (state: ReduxState) => state.flexPcb.ThreeMTapeThicknessOptions;
export const selectPanelQtyOptions = (state: ReduxState) => state.flexPcb.PanelQtyOptions;
export const selectPcbQtyOptions = (state: ReduxState) => state.flexPcb.PcbQtyOptions;
export const selectSilkscreenOptions = (state: ReduxState) => state.flexPcb.SilkscreenOptions;

// Memoized selector => transformation from store state to Fab specs
export const selectFlexPcb = createSelector([selectFlexPcbState], flexPcb => {
	const flexPcbFabSpecs: FlexPcbFabSpecsType = {
		Type: "PCB",
		Category: "Flex PCB",
		OrderedQty: flexPcb.OrderedQty,
		BaseMaterial: flexPcb.BaseMaterial,
		BoardOutlineTolerance: flexPcb.BoardOutlineTolerance,
		BoardSizeX: flexPcb.BoardSizeX,
		BoardSizeY: flexPcb.BoardSizeY,
		PanelSizeX: flexPcb.PanelSizeX,
		PanelSizeY: flexPcb.PanelSizeY,
		BoardThickness: flexPcb.BoardThickness,
		NetPrice: flexPcb.NetPrice,
		Columns: flexPcb.Columns,
		CopperType: flexPcb.CopperType,
		Coverlay: flexPcb.Coverlay,
		CoverlayThickness: flexPcb.CoverlayThickness,
		CuttingMethod: flexPcb.CuttingMethod,
		DesignFormat: flexPcb.DesignFormat,
		DifferentDesignsInPanel: flexPcb.DifferentDesignsInPanel,
		DispatchUnit: flexPcb.DispatchUnit,
		EdgeRails: flexPcb.EdgeRails,
		EdgeRailSize: flexPcb.EdgeRailSize,
		EMIShieldingFilm: flexPcb.EMIShieldingFilm,
		FR4Thickness: flexPcb.FR4Thickness,
		GoldThickness: flexPcb.GoldThickness,
		Layer: flexPcb.Layer,
		LeadTime: flexPcb.LeadTime,
		OuterCuWeight: flexPcb.OuterCuWeight,
		PanelQty: flexPcb.PanelQty,
		Name: flexPcb.Name,
		PcbQty: flexPcb.PcbQty,
		PolyimideThickness: flexPcb.PolyimideThickness,
		Rows: flexPcb.Rows,
		Silkscreen: flexPcb.Silkscreen,
		SinglePiecesQty: flexPcb.SinglePiecesQty,
		StainlessSteelThickness: flexPcb.StainlessSteelThickness,
		Stiffner: flexPcb.Stiffner,
		SurfaceFinish: flexPcb.SurfaceFinish,
		ThreeMTapeThickness: flexPcb.ThreeMTapeThickness,
		ViaHoles: flexPcb.ViaHoles,
		UploadedFileName: flexPcb.UploadedFileName,
		UploadedFileUrl: flexPcb.UploadedFileUrl,
		UnitPrice: flexPcb.UnitPrice,
	};
	return flexPcbFabSpecs;
});

// Memoized selector => transformation from store state to quote specs
export const selectFlexPcbSpecsForQuote = createSelector([selectFlexPcbState], flexPcb => {
	const flexPcbFabSpecs: FlexPcbFabSpecsType = {
		Type: "PCB",
		Category: "Flex PCB",
		OrderedQty: flexPcb.OrderedQty,
		BaseMaterial: flexPcb.BaseMaterial,
		BoardOutlineTolerance: flexPcb.BoardOutlineTolerance,
		BoardSizeX: flexPcb.BoardSizeX,
		BoardSizeY: flexPcb.BoardSizeY,
		PanelSizeX: flexPcb.PanelSizeX,
		PanelSizeY: flexPcb.PanelSizeY,
		BoardThickness: flexPcb.BoardThickness,
		NetPrice: flexPcb.NetPrice,
		Columns: flexPcb.Columns,
		CopperType: flexPcb.CopperType,
		Coverlay: flexPcb.Coverlay,
		CoverlayThickness: flexPcb.CoverlayThickness,
		CuttingMethod: flexPcb.CuttingMethod,
		DesignFormat: flexPcb.DesignFormat,
		DifferentDesignsInPanel: flexPcb.DifferentDesignsInPanel,
		DispatchUnit: flexPcb.DispatchUnit,
		EdgeRails: flexPcb.EdgeRails,
		EdgeRailSize: flexPcb.EdgeRailSize,
		EMIShieldingFilm: flexPcb.EMIShieldingFilm,
		FR4Thickness: flexPcb.FR4Thickness,
		GoldThickness: flexPcb.GoldThickness,
		Layer: flexPcb.Layer,
		LeadTime: flexPcb.LeadTime,
		OuterCuWeight: flexPcb.OuterCuWeight,
		PanelQty: flexPcb.PanelQty,
		Name: flexPcb.Name,
		PcbQty: flexPcb.PcbQty,
		PolyimideThickness: flexPcb.PolyimideThickness,
		Rows: flexPcb.Rows,
		Silkscreen: flexPcb.Silkscreen,
		SinglePiecesQty: flexPcb.SinglePiecesQty,
		StainlessSteelThickness: flexPcb.StainlessSteelThickness,
		Stiffner: flexPcb.Stiffner,
		SurfaceFinish: flexPcb.SurfaceFinish,
		ThreeMTapeThickness: flexPcb.ThreeMTapeThickness,
		ViaHoles: flexPcb.ViaHoles,
		UploadedFileName: flexPcb.UploadedFileName,
		UploadedFileUrl: flexPcb.UploadedFileUrl,
		UnitPrice: flexPcb.UnitPrice,
	};
	return flexPcbFabSpecs;
});

function updateOrderedQty(state: FlexPcbStoreStateType) {
	if (state.DesignFormat === "Single PCB") {
		state.OrderedQty = state.PcbQty;
	} else {
		state.OrderedQty = state.SinglePiecesQty;
	}
}

function updateDifferentDesignsInPanel(state: FlexPcbStoreStateType) {
	if (state.DesignFormat === "Panel by Manufacturer" || state.DesignFormat === "Single PCB") {
		state.DifferentDesignsInPanelOptions = [1];
	}
	if (state.DesignFormat === "Panel by Customer") {
		state.DifferentDesignsInPanelOptions = [1, 2, 3, 4];
	}
	state.DifferentDesignsInPanel = state.DifferentDesignsInPanelOptions[0] ?? 1;
}

function updatePanelSize(state: FlexPcbStoreStateType) {
	if (state.EdgeRails === "No") {
		state.PanelSizeX = state.BoardSizeX * state.Columns;
		state.PanelSizeY = state.BoardSizeY * state.Rows;
	} else if (state.EdgeRails === "On 2 Sides") {
		state.PanelSizeX = state.BoardSizeX * state.Columns + parseInt(state.EdgeRailSize, 10) * 2;
		state.PanelSizeY = state.BoardSizeY * state.Rows;
	} else {
		state.PanelSizeX = state.BoardSizeX * state.Columns + parseInt(state.EdgeRailSize, 10) * 2;
		state.PanelSizeY = state.BoardSizeY * state.Rows + parseInt(state.EdgeRailSize, 10) * 2;
	}
}

function updateSinglePiecesQty(state: FlexPcbStoreStateType) {
	state.SinglePiecesQty = state.PanelQty * state.Columns * state.Rows;
}

function updateDesignFormatOption(state: FlexPcbStoreStateType) {
	if (state.DifferentDesignsInPanel > 1) {
		state.DesignFormatOptions = ["Panel by Customer"];
	} else {
		state.DesignFormatOptions = ["Single PCB", "Panel by Customer", "Panel by Manufacturer"];
	}
	state.DesignFormat = state.DesignFormatOptions[0] ?? "Single PCB";
}

function updatePcbThickness(state: FlexPcbStoreStateType) {
	if (state.Layer === 1) {
		state.BoardThicknessOptions = [0.07, 0.11];
	} else {
		state.BoardThicknessOptions = [0.11, 0.12, 0.2];
	}
	state.BoardThickness = state.BoardThicknessOptions[0] ?? 0.07;
}

function updateOuterCuWeight(state: FlexPcbStoreStateType) {
	if (state.Layer === 1) {
		if (state.BoardThickness === 0.07) {
			state.OuterCuWeightOptions = ["0.5 oz"];
		} else {
			state.OuterCuWeightOptions = ["1.0 oz"];
		}
	}
	if (state.Layer === 2) {
		if (state.BoardThickness === 0.11) {
			state.OuterCuWeightOptions = ["1/3 oz"];
		}
		if (state.BoardThickness === 0.12) {
			state.OuterCuWeightOptions = ["0.5 oz"];
		}
		if (state.BoardThickness === 0.2) {
			state.OuterCuWeightOptions = ["1.0 oz"];
		}
	}
	state.OuterCuWeight = state.OuterCuWeightOptions[0] ?? "0.5 oz";
}

function updateCoverlayThickness(state: FlexPcbStoreStateType) {
	if (state.Layer === 1) {
		if (state.BoardThickness === 0.07) {
			state.CoverlayThicknessOptions = ["PI:12.5um/AD:15um"];
		} else {
			state.CoverlayThicknessOptions = ["PI:25um/AD:25um"];
		}
	}
	if (state.Layer === 2) {
		if (state.BoardThickness === 0.11 || state.BoardThickness === 0.12) {
			state.CoverlayThicknessOptions = ["PI:12.5um/AD:15um"];
		}
		if (state.BoardThickness === 0.2) {
			state.CoverlayThicknessOptions = ["PI:25um/AD:25um"];
		}
	}
	state.CoverlayThickness = state.CoverlayThicknessOptions[0] ?? "PI:12.5um/AD:15um";
}
