import { Group, GroupCtx } from "@/context/Group";
import { Rule, RuleCtx } from "@/context/Rule";

export const groups: Group[] = [];
export const rules: Rule[] = [];

groups.push(GroupCtx.createRandomGroup());
groups.push(GroupCtx.createRandomGroup([groups[0].colorName]));
groups.push(GroupCtx.createRandomGroup([groups[0].colorName, groups[1].colorName]));

groups.forEach(group => {
    rules.push(RuleCtx.createRule(group, group, RuleCtx.randomGravity()));
});

rules.push(RuleCtx.createRule(groups[0], groups[1], RuleCtx.randomGravity()));
rules.push(RuleCtx.createRule(groups[1], groups[2], RuleCtx.randomGravity()));
rules.push(RuleCtx.createRule(groups[2], groups[0], RuleCtx.randomGravity()));

// Different sizes and opposite attractions for the first group.
groups.forEach((_, i) => { groups[i].particleSize = (i + 1) * 2; });
rules.forEach((_, i) => { rules[i].gravity = i % 2 ? Math.abs(rules[i].gravity) : -Math.abs(rules[i].gravity);});