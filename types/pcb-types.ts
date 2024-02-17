import type { FlexPcbFabSpecsType } from "@/types/flex-pcb-types";
import type { PcbAssemblyFabSpecsType } from "@/types/pcb-assembly-types";
import type { RigidPcbFabSpecsType } from "@/types/rigid-pcb-types";


export type PcbType = PcbAssemblyFabSpecsType | RigidPcbFabSpecsType | FlexPcbFabSpecsType;
