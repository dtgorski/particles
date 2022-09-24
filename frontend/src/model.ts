import { reactive } from "vue";
import { Group } from "@/context/Group";
import { Rule } from "@/context/Rule";
import { rules, groups } from "@/init";
import { Picker, PickerCtx } from "@/context/Picker";
import { Pulse, PulseCtx } from "@/context/Pulse";

export type Aspect = {
    w: number
    h: number
}


export type Model = {
    aspect: Aspect,
    distance: number
    speed: number
    running: boolean
    groups: Group[]
    rules: Rule[],
    pulse: Pulse,
    picker: Picker
}

const initial: Required<Model> = {
    aspect: { w: 1024, h: 1024 },
    distance: 256,
    speed: 10,
    running: true,
    groups: groups,
    rules: rules,
    pulse: PulseCtx.createNullPulse(),
    picker: PickerCtx.createNullPicker()
};

export const model = reactive(initial);
