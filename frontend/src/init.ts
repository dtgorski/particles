import { Group, GroupCtx } from "@/context/Group";
import { ColorPicker } from "@/context/ColorPicker";
import { Pulse } from "@/context/Pulse";
import { Rule, RuleCtx } from "@/context/Rule";
import { GroupPicker } from "@/context/GroupPicker";
import { Aspect, Jitter, Model, UI } from "@/model";
import { randomAttraction } from "@/util";

export const groups: Group[] = [];
export const rules: Rule[] = [];

// Groups.
groups.push(GroupCtx.createRandomGroup());
groups.push(GroupCtx.createRandomGroup(groups.map(group => group.colorName)));
groups.push(GroupCtx.createRandomGroup(groups.map(group => group.colorName)));

groups.forEach((_, i) => {
    groups[i].particleSize = i + 3;
});

// Rules
groups.forEach(group => {
    rules.push(RuleCtx.createRule(group, group, randomAttraction()));
});

rules.push(RuleCtx.createRule(groups[0], groups[1], randomAttraction()));
rules.push(RuleCtx.createRule(groups[1], groups[2], randomAttraction()));
rules.push(RuleCtx.createRule(groups[2], groups[0], randomAttraction()));

rules.forEach((_, i) => {
    rules[i].attraction = i % 2 ? Math.abs(rules[i].attraction) : -Math.abs(rules[i].attraction);
});

// First start.
export const initial: Required<Model> = {
    running: /*    */ false,
    distance: /*   */ 256,
    aspect: /*     */ <Aspect>{ w: 1024, h: 1024 },
    groups: /*     */ <Group[]>groups,
    rules: /*      */ <Rule[]>rules,
    jitter: /*     */ <Jitter>{ excitation: 0.2 * 100, attenuation: 0.5 * 100 },
    pulse: /*      */ new Pulse(-1,-1,0),
    colorPicker: /**/ new ColorPicker(""),
    groupPicker: /**/ new GroupPicker(""),
    ui: /*         */ <UI>{
        ruleLabelsVisible: false
    }
};
