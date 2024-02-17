import { type ReduxState } from "@/lib/redux/store";
import { calculateRigidPcbPrice } from "@/lib/redux/thunks";
import { getFutureBusinessDate } from "@/lib/utils";
import type { PcbFabQuoteType } from "@/types/pcb-quote-types";
import type {
	RigidPcbBaseMaterialType,
	RigidPcbBoardOutlineToleranceType,
	RigidPcbBoardThicknessType,
	RigidPcbBreakDownVoltageType,
	RigidPcbCastellatedHolesEdgesType,
	RigidPcbCastellatedHolesType,
	RigidPcbChamferedGoldFingersType,
	RigidPcbCopperStructureType,
	RigidPcbDesignFormatType,
	RigidPcbDifferentDesignsInPanelType,
	RigidPcbDispatchUnitType,
	RigidPcbEdgeRailSizeType,
	RigidPcbEdgeRailsType,
	RigidPcbFabSpecsType,
	RigidPcbGoldFingersType,
	RigidPcbGoldThicknessType,
	RigidPcbImpedanceControlType,
	RigidPcbInnerCuWeightType,
	RigidPcbLayerType,
	RigidPcbLeadTimeType,
	RigidPcbMaterialType,
	RigidPcbMinViaHoleSizeAndDiameterType,
	RigidPcbOuterCuWeightType,
	RigidPcbPanelQtyType,
	RigidPcbPcbQtyType,
	RigidPcbQuoteSpecsType,
	RigidPcbSilkscreenType,
	RigidPcbSoldermaskType,
	RigidPcbStoreStateType,
	RigidPcbSurfaceFinishType,
	RigidPcbThermalConductivityType,
	RigidPcbViaCoveringType,
} from "@/types/rigid-pcb-types";
import { createSelector, createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: RigidPcbStoreStateType = {
	/* mandatory fields */
	Type: "PCB",
	Category: "Rigid PCB",
	Name: "",
	BaseMaterial: "FR4",
	Layer: 1,
	BoardSizeX: 44,
	BoardSizeY: 44,
	DifferentDesignsInPanel: 1,
	DesignFormat: "Single PCB",
	BoardThickness: 0.8,
	Soldermask: "Green",
	Silkscreen: "White",
	SurfaceFinish: "HASL(with lead)",
	OuterCuWeight: "1 oz",
	GoldFingers: "No",
	CastellatedHoles: "No",
	LeadTime: "7 Working days",
	DispatchUnit: "PCB",
	TentativeDispatchDate: getFutureBusinessDate(7),
	NetPrice: 31.8,
	OrderedQty: 5,
	UnitPrice: 6.36, // net price / ordered qty
	UploadedFileName: null,
	UploadedFileUrl: null,

	/* conditional fields */
	PcbQty: 5,
	ViaCovering: "Tented",
	Material: "FR4-Standard TG 135-140",
	BoardOutlineTolerance: "±0.2mm(Regular)",
	ViaHoles: 10,
	PanelQty: 5,
	Columns: 1,
	Rows: 1,
	SinglePiecesQty: 5,
	GoldThickness: '1 U"',
	EdgeRails: "No",
	EdgeRailSize: "5mm",
	PanelSizeX: 44,
	PanelSizeY: 44,
	ThermalConductivity: 1,
	BreakDownVoltage: 3000,
	InnerCuWeight: "0.5 oz",
	ImpedanceControl: "No",
	MinViaHoleSizeAndDiameter: "0.3mm/(0.4/0.45mm)",
	CastellatedHolesEdges: 1,
	ChamferedGoldFingers: "No",

	/* dropdown menu options */
	LayerOptions: [1, 2, 4, 6, 8, 10],
	BaseMaterialOptions: ["FR4", "Aluminum", "CopperCore", "Rogers"],
	DesignFormatOptions: ["Single PCB", "Panel by Customer", "Panel by Manufacturer"],
	DifferentDesignsInPanelOptions: [1, 2, 3, 4],
	MaterialOptions: ["FR4-Standard TG 135-140", "FR-4 TG155"],
	PanelQtyOptions: [
		5, 10, 15, 20, 25, 30, 50, 75, 100, 125, 150, 200, 250, 300, 400, 450, 500, 600, 700, 800, 900, 1000, 1500,
		2000,
	],
	PcbQtyOptions: [
		5, 10, 15, 20, 25, 30, 50, 75, 100, 125, 150, 200, 250, 300, 400, 450, 500, 600, 700, 800, 900, 1000, 1500,
		2000,
	],
	BoardThicknessOptions: [0.4, 0.6, 0.8, 1.0, 1.2, 1.6, 2.0],
	SoldermaskOptions: ["Green", "Purple", "Red", "Yellow", "Blue", "Black", "White"],
	SilkscreenOptions: ["White"],
	SurfaceFinishOptions: ["HASL(with lead)", "LeadFree HASL", "ENIG"],
	GoldFingersOptions: ["No", "Yes"],
	GoldThicknessOptions: ['1 U"', '2 U"'],
	EdgeRailsOptions: ["No", "On 2 Sides", "On 4 Sides"],
	EdgeRailSizeOptions: ["5mm", "7mm", "10mm"],
	OuterCuWeightOptions: ["1 oz", "2 oz"],
	CopperStructure: "Direct Heatsink",
	CopperStructureOptions: ["Direct Heatsink"],
	ThermalConductivityOptions: [1],
	BreakDownVoltageOptions: [3000],
	InnerCuWeightOptions: ["0.5 oz", "1 oz", "2 oz"],
	ImpedanceControlOptions: ["No", "Yes"],
	ViaCoveringOptions: ["Tented", "Untented", "Plugged", "Epoxy Filled & Capped"],
	MinViaHoleSizeAndDiameterOptions: [
		"0.3mm/(0.4/0.45mm)",
		"0.25mm/(0.35/0.40mm)",
		"0.2mm/(0.3/0.35mm)",
		"0.15mm/(0.25/0.3mm)",
	],
	BoardOutlineToleranceOptions: ["±0.2mm(Regular)", "±0.1mm(Precision)"],
	CastellatedHolesOptions: ["No", "Yes"],
	CastellatedHolesEdgesOptions: [1, 2, 3, 4],
	ChamferedGoldFingersOptions: ["No", "Yes"],
	LeadTimeOptions: ["3 Working days", "5 Working days", "7 Working days", "10 Working days"],
	DispatchUnitOptions: ["PCB", "Panel"],
};

const rigidPcbSlice = createSlice({
	name: "rigidPcb",
	initialState,
	reducers: {
		setName: (state, action: PayloadAction<string>) => {
			state.Name = action.payload;
		},
		setLayer: (state, action: PayloadAction<RigidPcbLayerType>) => {
			state.Layer = action.payload;
			updateBoardThickness(state);
			updateSurfaceFinish(state);
			updateOuterCuWeight(state);
			updateInnerCuWeight(state);
			updateViaCovering(state);
			updateCastellatedHoles(state);
		},
		setBaseMaterial: (state, action: PayloadAction<RigidPcbBaseMaterialType>) => {
			state.BaseMaterial = action.payload;
			updateLayer(state);
			updateBoardThickness(state);
			updateSurfaceFinish(state);
			updateSoldermask(state);
			updateSilkscreen(state);
			updateGoldFingers(state);
			updateOuterCuWeight(state);
			updateThermalConductivity(state);
			updateCastellatedHoles(state);
			updateMaterial(state);
			updateViaCovering(state);
		},
		setDesignFormat: (state, action: PayloadAction<RigidPcbDesignFormatType>) => {
			state.DesignFormat = action.payload;
			updateDifferentDesignsInPanel(state);
			updateChamferedGoldFingers(state);
		},
		setDifferentDesignsInPanel: (state, action: PayloadAction<RigidPcbDifferentDesignsInPanelType>) => {
			state.DifferentDesignsInPanel = action.payload;
			updateDesignFormatOption(state);
			updateOrderedQty(state);
		},
		setMaterial: (state, action: PayloadAction<RigidPcbMaterialType>) => {
			state.Material = action.payload;
		},
		setBoardSizeX: (state, action: PayloadAction<number>) => {
			state.BoardSizeX = action.payload;
			updatePanelSize(state);
		},
		setBoardSizeY: (state, action: PayloadAction<number>) => {
			state.BoardSizeY = action.payload;
			updatePanelSize(state);
		},
		setPanelQty: (state, action: PayloadAction<RigidPcbPanelQtyType>) => {
			state.PanelQty = action.payload;
			updateSinglePiecesQty(state);
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
			updateOrderedQty(state);
			updatePanelSize(state);
		},
		setPcbQty: (state, action: PayloadAction<RigidPcbPcbQtyType>) => {
			state.PcbQty = action.payload;
			updateOrderedQty(state);
		},
		setBoardThickness: (state, action: PayloadAction<RigidPcbBoardThicknessType>) => {
			state.BoardThickness = action.payload;
		},
		setSoldermask: (state, action: PayloadAction<RigidPcbSoldermaskType>) => {
			state.Soldermask = action.payload;
			updateSilkscreen(state);
		},
		setSilkscreen: (state, action: PayloadAction<RigidPcbSilkscreenType>) => {
			state.Silkscreen = action.payload;
		},
		setSurfaceFinish: (state, action: PayloadAction<RigidPcbSurfaceFinishType>) => {
			state.SurfaceFinish = action.payload;
		},
		setGoldFingers: (state, action: PayloadAction<RigidPcbGoldFingersType>) => {
			state.GoldFingers = action.payload;
			updateSurfaceFinish(state);
			updateSoldermask(state);
		},
		setGoldThickness: (state, action: PayloadAction<RigidPcbGoldThicknessType>) => {
			state.GoldThickness = action.payload;
		},
		setEdgeRails: (state, action: PayloadAction<RigidPcbEdgeRailsType>) => {
			state.EdgeRails = action.payload;
			updatePanelSize(state);
		},
		setEdgeRailSize: (state, action: PayloadAction<RigidPcbEdgeRailSizeType>) => {
			state.EdgeRailSize = action.payload;
			updatePanelSize(state);
		},
		setOuterCuWeight: (state, action: PayloadAction<RigidPcbOuterCuWeightType>) => {
			state.OuterCuWeight = action.payload;
		},
		setCopperStructure: (state, action: PayloadAction<RigidPcbCopperStructureType>) => {
			state.CopperStructure = action.payload;
		},
		setThermalConductivity: (state, action: PayloadAction<RigidPcbThermalConductivityType>) => {
			state.ThermalConductivity = action.payload;
		},
		setBreakdownVoltage: (state, action: PayloadAction<RigidPcbBreakDownVoltageType>) => {
			state.BreakDownVoltage = action.payload;
		},
		setInnerCuWeight: (state, action: PayloadAction<RigidPcbInnerCuWeightType>) => {
			state.InnerCuWeight = action.payload;
		},
		setImpedenceControl: (state, action: PayloadAction<RigidPcbImpedanceControlType>) => {
			state.ImpedanceControl = action.payload;
		},
		setViaCovering: (state, action: PayloadAction<RigidPcbViaCoveringType>) => {
			state.ViaCovering = action.payload;
		},
		setMinViaHoleSizeAndDiameter: (state, action: PayloadAction<RigidPcbMinViaHoleSizeAndDiameterType>) => {
			state.MinViaHoleSizeAndDiameter = action.payload;
		},
		setBoardOutlineTolerance: (state, action: PayloadAction<RigidPcbBoardOutlineToleranceType>) => {
			state.BoardOutlineTolerance = action.payload;
		},
		setViaHoles: (state, action: PayloadAction<number>) => {
			state.ViaHoles = action.payload;
		},
		setCastellatedHoles: (state, action: PayloadAction<RigidPcbCastellatedHolesType>) => {
			state.CastellatedHoles = action.payload;
		},
		setCastellatedHolesEdges: (state, action: PayloadAction<RigidPcbCastellatedHolesEdgesType>) => {
			state.CastellatedHolesEdges = action.payload;
		},
		setChamferedGoldFingers: (state, action: PayloadAction<RigidPcbChamferedGoldFingersType>) => {
			state.ChamferedGoldFingers = action.payload;
		},
		setLeadTime: (state, action: PayloadAction<RigidPcbLeadTimeType>) => {
			state.LeadTime = action.payload;
		},
		setDispatchUnit: (state, action: PayloadAction<RigidPcbDispatchUnitType>) => {
			state.DispatchUnit = action.payload;
		},
		setPcbPrice: (state, action: PayloadAction<PcbFabQuoteType>) => {
			state.UnitPrice = action.payload.unitPrice;
			state.NetPrice = action.payload.netPrice;
		},
		setTentativeDispatchDate: (state, action: PayloadAction<string>) => {
			state.TentativeDispatchDate = action.payload;
		},
		setUploadedFileUrl: (state, action: PayloadAction<string | null>) => {
			state.UploadedFileUrl = action.payload;
		},
		setUploadedFileName: (state, action: PayloadAction<string | null>) => {
			state.UploadedFileName = action.payload;
		},
	},
	extraReducers: builder => {
		builder.addCase(calculateRigidPcbPrice.fulfilled, (state, action) => {
			state.UnitPrice = action.payload.unitPrice;
			state.NetPrice = action.payload.netPrice;
		});
	},
});

export const {
	setName,
	setLayer,
	setBaseMaterial,
	setDesignFormat,
	setDifferentDesignsInPanel,
	setMaterial,
	setBoardSizeX,
	setBoardSizeY,
	setPanelQty,
	setColumns,
	setRows,
	setPcbQty,
	setBoardThickness,
	setSoldermask,
	setSilkscreen,
	setSurfaceFinish,
	setGoldFingers,
	setGoldThickness,
	setEdgeRails,
	setEdgeRailSize,
	setOuterCuWeight,
	setCopperStructure,
	setThermalConductivity,
	setBreakdownVoltage,
	setInnerCuWeight,
	setImpedenceControl,
	setViaCovering,
	setMinViaHoleSizeAndDiameter,
	setBoardOutlineTolerance,
	setViaHoles,
	setCastellatedHoles,
	setCastellatedHolesEdges,
	setChamferedGoldFingers,
	setLeadTime,
	setDispatchUnit,
	setPcbPrice,
	setTentativeDispatchDate,
	setUploadedFileUrl,
	setUploadedFileName,
} = rigidPcbSlice.actions;

export default rigidPcbSlice.reducer;

// Selectors
export const selectRigidPcbState = (state: ReduxState) => state.rigidPcb;
export const selectPanelSizeX = (state: ReduxState) => state.rigidPcb.PanelSizeX;
export const selectPanelSizeY = (state: ReduxState) => state.rigidPcb.PanelSizeY;
export const selectCalculatedPrice = (state: ReduxState) => state.rigidPcb.NetPrice;
export const selectPanelQty = (state: ReduxState) => state.rigidPcb.PanelQty;
export const selectUploadedName = (state: ReduxState) => state.rigidPcb.UploadedFileName;
export const selectUploadedFileUrl = (state: ReduxState) => state.rigidPcb.UploadedFileUrl;
export const selectName = (state: ReduxState) => state.rigidPcb.Name;
export const selectBaseMaterial = (state: ReduxState) => state.rigidPcb.BaseMaterial;
export const selectLayer = (state: ReduxState) => state.rigidPcb.Layer;
export const selectBoardSizeX = (state: ReduxState) => state.rigidPcb.BoardSizeX;
export const selectBoardSizeY = (state: ReduxState) => state.rigidPcb.BoardSizeY;
export const selectDifferentDesignsInPanel = (state: ReduxState) => state.rigidPcb.DifferentDesignsInPanel;
export const selectDesignFormat = (state: ReduxState) => state.rigidPcb.DesignFormat;
export const selectBoardThickness = (state: ReduxState) => state.rigidPcb.BoardThickness;
export const selectSoldermask = (state: ReduxState) => state.rigidPcb.Soldermask;
export const selectSilkscreen = (state: ReduxState) => state.rigidPcb.Silkscreen;
export const selectSurfaceFinish = (state: ReduxState) => state.rigidPcb.SurfaceFinish;
export const selectOuterCuWeight = (state: ReduxState) => state.rigidPcb.OuterCuWeight;
export const selectGoldFingers = (state: ReduxState) => state.rigidPcb.GoldFingers;
export const selectCastellatedHoles = (state: ReduxState) => state.rigidPcb.CastellatedHoles;
export const selectLeadTime = (state: ReduxState) => state.rigidPcb.LeadTime;
export const selectDispatchUnit = (state: ReduxState) => state.rigidPcb.DispatchUnit;
export const selectPcbQty = (state: ReduxState) => state.rigidPcb.PcbQty;
export const selectSinglePiecesQty = (state: ReduxState) => state.rigidPcb.SinglePiecesQty;
export const selectViaCovering = (state: ReduxState) => state.rigidPcb.ViaCovering;
export const selectViaHoles = (state: ReduxState) => state.rigidPcb.ViaHoles;
export const selectBoardOutlineTolerance = (state: ReduxState) => state.rigidPcb.BoardOutlineTolerance;
export const selectMaterial = (state: ReduxState) => state.rigidPcb.Material;
export const selectGoldThickness = (state: ReduxState) => state.rigidPcb.GoldThickness;
export const selectEdgeRails = (state: ReduxState) => state.rigidPcb.EdgeRails;
export const selectThermalConductivity = (state: ReduxState) => state.rigidPcb.ThermalConductivity;
export const selectBreakDownVoltage = (state: ReduxState) => state.rigidPcb.BreakDownVoltage;
export const selectInnerCuWeight = (state: ReduxState) => state.rigidPcb.InnerCuWeight;
export const selectImpedenceControl = (state: ReduxState) => state.rigidPcb.ImpedanceControl;
export const selectMinViaHoleSizeAndDiameter = (state: ReduxState) => state.rigidPcb.MinViaHoleSizeAndDiameter;
export const selectCastellatedHolesEdges = (state: ReduxState) => state.rigidPcb.CastellatedHolesEdges;
export const selectChamferedGoldFingers = (state: ReduxState) => state.rigidPcb.ChamferedGoldFingers;
export const selectEdgeRailSize = (state: ReduxState) => state.rigidPcb.EdgeRailSize;
export const selectCopperStructure = (state: ReduxState) => state.rigidPcb.CopperStructure;
export const selectColumns = (state: ReduxState) => state.rigidPcb.Columns;
export const selectRows = (state: ReduxState) => state.rigidPcb.Rows;
export const selectTentativeDispatchDate = (state: ReduxState) => state.rigidPcb.TentativeDispatchDate;
export const selectOrderedQty = (state: ReduxState) => state.rigidPcb.OrderedQty;
export const selectUnitPrice = (state: ReduxState) => state.rigidPcb.UnitPrice;
export const selectNetPrice = (state: ReduxState) => state.rigidPcb.NetPrice;

// dropdown menu selectors
export const selectBaseMaterialOptions = (state: ReduxState) => state.rigidPcb.BaseMaterialOptions;
export const selectBoardOutlineToleranceOptions = (state: ReduxState) => state.rigidPcb.BoardOutlineToleranceOptions;
export const selectCastellatedHolesOptions = (state: ReduxState) => state.rigidPcb.CastellatedHolesOptions;
export const selectChamferedGoldFingersOptions = (state: ReduxState) => state.rigidPcb.ChamferedGoldFingersOptions;
export const selectEdgeRailsOptions = (state: ReduxState) => state.rigidPcb.EdgeRailsOptions;
export const selectEdgeRailSizeOptions = (state: ReduxState) => state.rigidPcb.EdgeRailSizeOptions;
export const selectMaterialOptions = (state: ReduxState) => state.rigidPcb.MaterialOptions;
export const selectThermalConductivityOptions = (state: ReduxState) => state.rigidPcb.ThermalConductivityOptions;
export const selectViaCoveringOptions = (state: ReduxState) => state.rigidPcb.ViaCoveringOptions;
export const selectCastellatedHolesEdgesOptions = (state: ReduxState) => state.rigidPcb.CastellatedHolesEdgesOptions;
export const selectCopperStructureOptions = (state: ReduxState) => state.rigidPcb.CopperStructureOptions;
export const selectBoardThicknessOptions = (state: ReduxState) => state.rigidPcb.BoardThicknessOptions;
export const selectBreakDownVoltageOptions = (state: ReduxState) => state.rigidPcb.BreakDownVoltageOptions;
export const selectDesignFormatOptions = (state: ReduxState) => state.rigidPcb.DesignFormatOptions;
export const selectDifferentDesignsInPanelOptions = (state: ReduxState) =>
	state.rigidPcb.DifferentDesignsInPanelOptions;
export const selectDispatchUnitOptions = (state: ReduxState) => state.rigidPcb.DispatchUnitOptions;
export const selectGoldThicknessOptions = (state: ReduxState) => state.rigidPcb.GoldThicknessOptions;
export const selectImpedenceControlOptions = (state: ReduxState) => state.rigidPcb.ImpedanceControlOptions;
export const selectInnerCuWeightOptions = (state: ReduxState) => state.rigidPcb.InnerCuWeightOptions;
export const selectLayerOptions = (state: ReduxState) => state.rigidPcb.LayerOptions;
export const selectMinViaHoleSizeAndDiameterOptions = (state: ReduxState) =>
	state.rigidPcb.MinViaHoleSizeAndDiameterOptions;
export const selectOuterCuWeightOptions = (state: ReduxState) => state.rigidPcb.OuterCuWeightOptions;
export const selectLeadTimeOptions = (state: ReduxState) => state.rigidPcb.LeadTimeOptions;
export const selectPcbQtyOptions = (state: ReduxState) => state.rigidPcb.PcbQtyOptions;
export const selectSilkscreenOptions = (state: ReduxState) => state.rigidPcb.SilkscreenOptions;
export const selectSurfaceFinishOptions = (state: ReduxState) => state.rigidPcb.SurfaceFinishOptions;
export const selectSoldermaskOptions = (state: ReduxState) => state.rigidPcb.SoldermaskOptions;
export const selectGoldFingersOptions = (state: ReduxState) => state.rigidPcb.GoldFingersOptions;

export const selectPanelQtyOptions = (state: ReduxState) => state.rigidPcb.PanelQtyOptions;

// Memoized selector => transformation from store state to Fab specs
export const selectRigidPcb = createSelector(selectRigidPcbState, rigidPcb => {
	const pcb: RigidPcbFabSpecsType = {
		Type: "PCB",
		Category: "Rigid PCB",
		Name: rigidPcb.Name,
		BaseMaterial: rigidPcb.BaseMaterial,
		Layer: rigidPcb.Layer,
		BoardSizeX: rigidPcb.BoardSizeX,
		BoardSizeY: rigidPcb.BoardSizeY,
		DifferentDesignsInPanel: rigidPcb.DifferentDesignsInPanel,
		DesignFormat: rigidPcb.DesignFormat,
		BoardThickness: rigidPcb.BoardThickness,
		Soldermask: rigidPcb.Soldermask,
		Silkscreen: rigidPcb.Silkscreen,
		SurfaceFinish: rigidPcb.SurfaceFinish,
		OuterCuWeight: rigidPcb.OuterCuWeight,
		GoldFingers: rigidPcb.GoldFingers,
		CastellatedHoles: rigidPcb.CastellatedHoles,
		LeadTime: rigidPcb.LeadTime,
		DispatchUnit: rigidPcb.DispatchUnit,
		NetPrice: rigidPcb.NetPrice,
		OrderedQty: rigidPcb.OrderedQty,
		UnitPrice: rigidPcb.UnitPrice,
		UploadedFileName: rigidPcb.UploadedFileName,
		UploadedFileUrl: rigidPcb.UploadedFileUrl,
		PcbQty: rigidPcb.PcbQty,
		ViaCovering: rigidPcb.ViaCovering,
		Material: rigidPcb.Material,
		CopperStructure: rigidPcb.CopperStructure,
		BoardOutlineTolerance: rigidPcb.BoardOutlineTolerance,
		ViaHoles: rigidPcb.ViaHoles,
		PanelQty: rigidPcb.PanelQty,
		Columns: rigidPcb.Columns,
		Rows: rigidPcb.Rows,
		SinglePiecesQty: rigidPcb.SinglePiecesQty,
		GoldThickness: rigidPcb.GoldThickness,
		EdgeRails: rigidPcb.EdgeRails,
		EdgeRailSize: rigidPcb.EdgeRailSize,
		PanelSizeX: rigidPcb.PanelSizeX,
		PanelSizeY: rigidPcb.PanelSizeY,
		ThermalConductivity: rigidPcb.ThermalConductivity,
		BreakDownVoltage: rigidPcb.BreakDownVoltage,
		InnerCuWeight: rigidPcb.InnerCuWeight,
		ImpedanceControl: rigidPcb.ImpedanceControl,
		MinViaHoleSizeAndDiameter: rigidPcb.MinViaHoleSizeAndDiameter,
		CastellatedHolesEdges: rigidPcb.CastellatedHolesEdges,
		ChamferedGoldFingers: rigidPcb.ChamferedGoldFingers,
	};
	return pcb;
});

// Memoized selector => transformation from store state to quote specs
export const selectRigidPcbSpecsForQuote = createSelector(selectRigidPcbState, rigidPcb => {
	const pcb: RigidPcbQuoteSpecsType = {
		Type: "PCB",
		Category: "Rigid PCB",
		BaseMaterial: rigidPcb.BaseMaterial,
		Layer: rigidPcb.Layer,
		BoardSizeX: rigidPcb.BoardSizeX,
		BoardSizeY: rigidPcb.BoardSizeY,
		DifferentDesignsInPanel: rigidPcb.DifferentDesignsInPanel,
		DesignFormat: rigidPcb.DesignFormat,
		BoardThickness: rigidPcb.BoardThickness,
		Soldermask: rigidPcb.Soldermask,
		Silkscreen: rigidPcb.Silkscreen,
		SurfaceFinish: rigidPcb.SurfaceFinish,
		OuterCuWeight: rigidPcb.OuterCuWeight,
		GoldFingers: rigidPcb.GoldFingers,
		CastellatedHoles: rigidPcb.CastellatedHoles,
		LeadTime: rigidPcb.LeadTime,
		DispatchUnit: rigidPcb.DispatchUnit,
		OrderedQty: rigidPcb.OrderedQty,
		PcbQty: rigidPcb.PcbQty,
		ViaCovering: rigidPcb.ViaCovering,
		Material: rigidPcb.Material,
		CopperStructure: rigidPcb.CopperStructure,
		BoardOutlineTolerance: rigidPcb.BoardOutlineTolerance,
		ViaHoles: rigidPcb.ViaHoles,
		PanelQty: rigidPcb.PanelQty,
		Columns: rigidPcb.Columns,
		Rows: rigidPcb.Rows,
		SinglePiecesQty: rigidPcb.SinglePiecesQty,
		GoldThickness: rigidPcb.GoldThickness,
		EdgeRails: rigidPcb.EdgeRails,
		EdgeRailSize: rigidPcb.EdgeRailSize,
		PanelSizeX: rigidPcb.PanelSizeX,
		PanelSizeY: rigidPcb.PanelSizeY,
		ThermalConductivity: rigidPcb.ThermalConductivity,
		BreakDownVoltage: rigidPcb.BreakDownVoltage,
		InnerCuWeight: rigidPcb.InnerCuWeight,
		ImpedanceControl: rigidPcb.ImpedanceControl,
		MinViaHoleSizeAndDiameter: rigidPcb.MinViaHoleSizeAndDiameter,
		CastellatedHolesEdges: rigidPcb.CastellatedHolesEdges,
		ChamferedGoldFingers: rigidPcb.ChamferedGoldFingers,
	};
	return pcb;
});

// Dependent field update	functions
function updateMaterial(state: RigidPcbStoreStateType) {
	if (state.BaseMaterial === "FR4") {
		if (state.Layer <= 6) {
			state.MaterialOptions = ["FR4-Standard TG 135-140", "FR-4 TG155"];
			state.Material = state.MaterialOptions[0] ?? "FR4-Standard TG 135-140";
		} else if (state.Layer === 8) {
			state.MaterialOptions = ["FR-4 TG155"];
			state.Material = state.MaterialOptions[0] ?? "FR-4 TG155";
		} else {
			state.MaterialOptions = ["FR-4 TG170"];
			state.Material = state.MaterialOptions[0] ?? "FR-4 TG170";
		}
	} else if (state.BaseMaterial === "Rogers") {
		state.MaterialOptions = ["RO4350B (Dk=3.48, Df=0.0037)"];
	}
}

function updateSurfaceFinish(state: RigidPcbStoreStateType) {
	if (state.BaseMaterial === "FR4") {
		if (state.Layer >= 6 || state.GoldFingers === "Yes") {
			state.SurfaceFinishOptions = ["ENIG"];
			state.SurfaceFinish = state.SurfaceFinishOptions[0] ?? "ENIG";
		} else {
			state.SurfaceFinishOptions = ["HASL(with lead)", "LeadFree HASL", "ENIG"];
			state.SurfaceFinish = state.SurfaceFinishOptions[0] ?? "HASL(with lead)";
		}
	}
	if (state.BaseMaterial === "Aluminum") {
		state.SurfaceFinishOptions = ["HASL(with lead)", "LeadFree HASL"];
		state.SurfaceFinish = state.SurfaceFinishOptions[0] ?? "HASL(with lead)";
	}
	if (state.BaseMaterial === "CopperCore") {
		state.SurfaceFinishOptions = ["OSP"];
		state.SurfaceFinish = state.SurfaceFinishOptions[0] ?? "OSP";
	}
	if (state.BaseMaterial === "Rogers") {
		state.SurfaceFinishOptions = ["ENIG"];
		state.SurfaceFinish = state.SurfaceFinishOptions[0] ?? "ENIG";
	}
}

function updateBoardThickness(state: RigidPcbStoreStateType) {
	if (state.BaseMaterial === "FR4") {
		switch (state.Layer) {
			case 1:
			case 4:
			case 6:
			case 8:
				state.BoardThicknessOptions = [0.8, 1.0, 1.2, 1.6, 2.0];
				state.BoardThickness = state.BoardThicknessOptions[0] ?? 0.8;
				break;
			case 10:
				state.BoardThicknessOptions = [1.0, 1.2, 1.6, 2.0];
				state.BoardThickness = state.BoardThicknessOptions[0] ?? 1.0;
				break;
			case 2:
			default:
				state.BoardThicknessOptions = [0.4, 0.6, 0.8, 1.0, 1.2, 1.6, 2.0];
				state.BoardThickness = state.BoardThicknessOptions[0] ?? 0.4;
				break;
		}
	}
	if (state.BaseMaterial === "Aluminum" || state.BaseMaterial === "CopperCore") {
		state.BoardThicknessOptions = [1.0, 1.2, 1.6];
		state.BoardThickness = state.BoardThicknessOptions[0] ?? 1.0;
	}
	if (state.BaseMaterial === "Rogers") {
		state.BoardThicknessOptions = [0.51, 0.76, 1.52];
		state.BoardThickness = state.BoardThicknessOptions[0] ?? 0.51;
	}
}

function updateLayer(state: RigidPcbStoreStateType) {
	switch (state.BaseMaterial) {
		case "Aluminum":
		case "CopperCore":
			state.LayerOptions = [1];
			state.Layer = state.LayerOptions[0] ?? 1;
			break;
		case "Rogers":
			state.LayerOptions = [2];
			state.Layer = state.LayerOptions[0] ?? 2;
			break;
		default: // FR4
			state.LayerOptions = [1, 2, 4, 6, 8, 10];
			state.Layer = state.LayerOptions[0] ?? 1;
			break;
	}
}

function updateOrderedQty(state: RigidPcbStoreStateType) {
	switch (state.DesignFormat) {
		case "Panel by Manufacturer":
		case "Panel by Customer":
			state.OrderedQty = state.SinglePiecesQty;
			break;
		case "Single PCB":
			state.OrderedQty = state.PcbQty;
			break;
		default:
			break;
	}
}

function updateSoldermask(state: RigidPcbStoreStateType) {
	if (state.BaseMaterial === "FR4") {
		state.SoldermaskOptions = ["Green", "Purple", "Red", "Yellow", "Blue", "Black", "White"];
		state.Soldermask = state.SoldermaskOptions[0] ?? "Green";
	}
	if (state.BaseMaterial === "Aluminum") {
		state.SoldermaskOptions = ["White"];
		state.Soldermask = state.SoldermaskOptions[0] ?? "White";
	}
	if (state.BaseMaterial === "CopperCore") {
		state.SoldermaskOptions = ["White"];
		state.Soldermask = state.SoldermaskOptions[0] ?? "White";
	}
	if (state.BaseMaterial === "Rogers") {
		state.SoldermaskOptions = ["Green"];
		state.Soldermask = state.SoldermaskOptions[0] ?? "Green";
	}
}

function updateSilkscreen(state: RigidPcbStoreStateType) {
	if (state.BaseMaterial === "FR4") {
		state.SilkscreenOptions = ["White"];
		state.Silkscreen = state.SilkscreenOptions[0] ?? "White";
	}
	if (state.BaseMaterial === "Aluminum") {
		state.SilkscreenOptions = ["Black"];
		state.Silkscreen = state.SilkscreenOptions[0] ?? "Black";
	}
	if (state.BaseMaterial === "CopperCore") {
		state.SilkscreenOptions = ["Black"];
		state.Silkscreen = state.SilkscreenOptions[0] ?? "Black";
	}
	if (state.BaseMaterial === "Rogers") {
		state.SilkscreenOptions = ["White"];
		state.Silkscreen = state.SilkscreenOptions[0] ?? "White";
	}

	// based on Soldermask
	if (state.Soldermask !== "White") {
		state.SilkscreenOptions = ["White"];
		state.Silkscreen = state.SilkscreenOptions[0] ?? "White";
	} else {
		state.SilkscreenOptions = ["Black"];
		state.Silkscreen = state.SilkscreenOptions[0] ?? "Black";
	}
}

function updateGoldFingers(state: RigidPcbStoreStateType) {
	if (state.BaseMaterial === "FR4") {
		state.GoldFingersOptions = ["No", "Yes"];
		state.GoldFingers = state.GoldFingersOptions[0] ?? "No";
	}
	if (state.BaseMaterial === "Aluminum") {
		state.GoldFingersOptions = ["No"];
		state.GoldFingers = state.GoldFingersOptions[0] ?? "No";
	}
	if (state.BaseMaterial === "CopperCore") {
		state.GoldFingersOptions = ["No"];
		state.GoldFingers = state.GoldFingersOptions[0] ?? "No";
	}
	if (state.BaseMaterial === "Rogers") {
		state.GoldFingersOptions = ["No"];
		state.GoldFingers = state.GoldFingersOptions[0] ?? "No";
	}
}

function updateDifferentDesignsInPanel(state: RigidPcbStoreStateType) {
	if (state.DesignFormat === "Panel by Manufacturer" || state.DesignFormat === "Single PCB") {
		state.DifferentDesignsInPanelOptions = [1];
		state.DifferentDesignsInPanel = state.DifferentDesignsInPanelOptions[0] ?? 1;
	}
	if (state.DesignFormat === "Panel by Customer") {
		state.DifferentDesignsInPanelOptions = [1, 2, 3, 4];
		state.DifferentDesignsInPanel = state.DifferentDesignsInPanelOptions[0] ?? 1;
	}
}

function updateDesignFormatOption(state: RigidPcbStoreStateType) {
	if (state.DifferentDesignsInPanel > 1) {
		state.DesignFormatOptions = ["Panel by Customer"];
		state.DesignFormat = state.DesignFormatOptions[0] ?? "Panel by Customer";
	} else {
		state.DesignFormatOptions = ["Single PCB", "Panel by Customer", "Panel by Manufacturer"];
		state.DesignFormat = state.DesignFormatOptions[0] ?? "Single PCB";
	}
}

function updateSinglePiecesQty(state: RigidPcbStoreStateType) {
	state.SinglePiecesQty = state.PanelQty * state.Columns * state.Rows;
}

function updatePanelSize(state: RigidPcbStoreStateType) {
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

function updateOuterCuWeight(state: RigidPcbStoreStateType) {
	if (state.BaseMaterial === "FR4") {
		if (state.Layer === 2 || state.Layer === 4 || state.Layer === 6) {
			state.OuterCuWeightOptions = ["1 oz", "2 oz"];
		} else {
			state.OuterCuWeightOptions = ["1 oz"];
		}
	} else {
		state.OuterCuWeightOptions = ["1 oz"];
	}
	state.OuterCuWeight = state.OuterCuWeightOptions[0] ?? "1 oz";
}

function updateThermalConductivity(state: RigidPcbStoreStateType) {
	if (state.BaseMaterial === "Aluminum") {
		state.ThermalConductivityOptions = [1];
		state.ThermalConductivity = state.ThermalConductivityOptions[0] ?? 1;
	}
	if (state.BaseMaterial === "CopperCore") {
		state.ThermalConductivityOptions = [380];
		state.ThermalConductivity = state.ThermalConductivityOptions[0] ?? 380;
	}
}

function updateInnerCuWeight(state: RigidPcbStoreStateType) {
	if (state.Layer === 4 || state.Layer === 6) {
		state.InnerCuWeightOptions = ["0.5 oz", "1 oz", "2 oz"];
	} else {
		state.InnerCuWeightOptions = ["0.5 oz", "1 oz"];
	}
	state.InnerCuWeight = state.InnerCuWeightOptions[0] ?? "0.5 oz";
}

function updateViaCovering(state: RigidPcbStoreStateType) {
	if (state.BaseMaterial === "FR4") {
		if (state.Layer === 1) {
			state.ViaCoveringOptions = ["Tented", "Untented"];
			state.ViaCovering = state.ViaCoveringOptions[0] ?? "Tented";
		}
		if (state.Layer === 2) {
			state.ViaCoveringOptions = ["Tented", "Untented", "Plugged", "Epoxy Filled & Capped"];
			state.ViaCovering = state.ViaCoveringOptions[0] ?? "Tented";
		}
		if (state.Layer === 4) {
			state.ViaCoveringOptions = ["Tented", "Untented", "Epoxy Filled & Capped", "Copper paste Filled & Capped"];
			state.ViaCovering = state.ViaCoveringOptions[0] ?? "Tented";
		}
		if (state.Layer >= 6) {
			state.ViaCoveringOptions = [
				"Epoxy Filled & Untented",
				"Epoxy Filled & Capped",
				"Copper paste Filled & Capped",
			];
			state.ViaCovering = state.ViaCoveringOptions[0] ?? "Epoxy Filled & Untented";
		}
	}
	if (state.BaseMaterial === "Rogers") {
		state.ViaCoveringOptions = ["Tented", "Untented"];
		state.ViaCovering = state.ViaCoveringOptions[0] ?? "Tented";
	}
}

function updateCastellatedHoles(state: RigidPcbStoreStateType) {
	if (state.BaseMaterial === "FR4") {
		if (state.Layer < 2) {
			state.CastellatedHolesOptions = ["No"];
			state.CastellatedHoles = state.CastellatedHolesOptions[0] ?? "No";
		} else {
			state.CastellatedHolesOptions = ["Yes", "No"];
			state.CastellatedHoles = state.CastellatedHolesOptions[0] ?? "Yes";
		}
	} else {
		state.CastellatedHolesOptions = ["No"];
		state.CastellatedHoles = state.CastellatedHolesOptions[0] ?? "No";
	}
}

function updateChamferedGoldFingers(state: RigidPcbStoreStateType) {
	if (state.DesignFormat === "Panel by Customer") {
		state.ChamferedGoldFingersOptions = ["No"];
		state.ChamferedGoldFingers = state.ChamferedGoldFingersOptions[0] ?? "No";
	} else {
		state.ChamferedGoldFingersOptions = ["Yes", "No"];
		state.ChamferedGoldFingers = state.ChamferedGoldFingersOptions[0] ?? "Yes";
	}
}
