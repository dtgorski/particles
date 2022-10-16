import { reactive } from "vue";

import { Group } from "@/context/Group";
import { ColorPicker } from "@/context/ColorPicker";
import { Pulse } from "@/context/Pulse";
import { Rule } from "@/context/Rule";
import { GroupPicker } from "@/context/GroupPicker";
import { initial } from "@/init";

export type Popup = {
    active: boolean;
}

export type Aspect = {
    w: number
    h: number
}

export type Jitter = {
    attenuation: number
    excitation: number
}

export type UI = {
    ruleLabelsVisible: boolean
}

export type Model = {
    aspect: Aspect
    distance: number
    groups: Group[]
    jitter: Jitter
    colorPicker: ColorPicker
    groupPicker: GroupPicker
    pulse: Pulse
    rules: Rule[]
    running: boolean

    ui: UI
}

export const model: Model = reactive(initial);
