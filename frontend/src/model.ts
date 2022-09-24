import { reactive } from "vue";
import { Group } from "@/context/Group";
import { Rule } from "@/context/Rule";
import { rules, groups } from "@/init";
import { Picker, PickerCtx } from "@/context/Picker";

export type Aspect = {
    w: number
    h: number
}

export type Pulse = {
    x: number
    y: number
    g: number
}

export type Model = {
    aspect: Aspect,
    distance: number
    running: boolean
    groups: Group[]
    rules: Rule[],
    pulse: Pulse | undefined,
    picker: Picker
}

const initial: Required<Model> = {
    aspect: { w: 1024, h: 1024 },
    distance: 256,
    running: true,
    groups: groups,
    rules: rules,
    pulse: undefined,
    picker: PickerCtx.createNullPicker()
};

export const model = reactive(initial);
