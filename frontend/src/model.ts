import { reactive } from "vue";
import { GroupCtx, Group } from "@/model/Group";
import { RuleCtx, Rule } from "@/model/Rule";

export type Model = {
    width: number,
    height: number,
    distance: number
    running: boolean
    groups: Group[]
    rules: Rule[]
}

const groups: Group[] = [
    GroupCtx.createRandomGroup(),
    GroupCtx.createRandomGroup(),
    GroupCtx.createRandomGroup(),
];
const rules: Rule[] = [];

groups.forEach(group => { rules.push(RuleCtx.createRule(group, group, RuleCtx.randomGravity())); });
rules.push(RuleCtx.createRule(groups[0], groups[1], RuleCtx.randomGravity()));
rules.push(RuleCtx.createRule(groups[1], groups[2], RuleCtx.randomGravity()));
rules.push(RuleCtx.createRule(groups[2], groups[0], RuleCtx.randomGravity()));

const w = 1024;
const h = 1024;

const initial: Required<Model> = {
    width: w,
    height: h,
    distance: 180,
    running: false,
    groups: groups,
    rules: rules
};

export const model = reactive(initial);

// Different sizes and opposite attractions for the first group cluster.
groups.forEach((_, i) => { groups[i].size = (i + 1) * 2; });
rules.forEach((_, i) => { rules[i].gravity = i % 2 ? Math.abs(rules[i].gravity) : -Math.abs(rules[i].gravity);});
