import { reactive } from "vue";
import { GroupCtx, Group } from "@/model/GroupCtx";
import { RuleCtx, Rule } from "@/model/RuleCtx";

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
    pulse: Pulse | undefined
}

const groups: Group[] = [];
const rules: Rule[] = [];

groups.push(GroupCtx.createRandomGroup());
groups.push(GroupCtx.createRandomGroup());
groups.push(GroupCtx.createRandomGroup());

groups.forEach(group => {
    rules.push(RuleCtx.createRule(group, group, RuleCtx.randomGravity()));
});

rules.push(RuleCtx.createRule(groups[0], groups[1], RuleCtx.randomGravity()));
rules.push(RuleCtx.createRule(groups[1], groups[2], RuleCtx.randomGravity()));
rules.push(RuleCtx.createRule(groups[2], groups[0], RuleCtx.randomGravity()));

const initial: Required<Model> = {
    aspect: { w: 1024, h: 1024 },
    distance: 256,
    running: false,
    groups: groups,
    rules: rules,
    pulse: undefined,
};

export const model = reactive(initial);

// Different sizes and opposite attractions for the first group cluster.
groups.forEach((_, i) => { groups[i].size = (i + 1) * 2; });
rules.forEach((_, i) => { rules[i].gravity = i % 2 ? Math.abs(rules[i].gravity) : -Math.abs(rules[i].gravity);});
