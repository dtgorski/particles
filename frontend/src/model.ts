import { reactive } from "vue";

import { Group } from "@/context/Group";
import { Picker } from "@/context/Picker";
import { Pulse } from "@/context/Pulse";
import { Rule } from "@/context/Rule";
import { initial } from "@/init";

export type Aspect = {
    w: number
    h: number
}

export type Model = {
    aspect: Aspect,
    attenuation: number
    distance: number
    excitation: number
    groups: Group[]
    picker: Picker
    pulse: Pulse,
    rules: Rule[],
    running: boolean
}

export const model = reactive(initial);
