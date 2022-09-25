import { reactive } from "vue";
import { Group } from "@/context/Group";
import { Rule } from "@/context/Rule";
import { initial } from "@/init";
import { Picker } from "@/context/Picker";
import { Pulse } from "@/context/Pulse";

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

export const model = reactive(initial);
