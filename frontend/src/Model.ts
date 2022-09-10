import { v4 as uuid } from "uuid";
import { reactive } from "vue";
import { Color, colors, Shades } from "@/Color";

export type GroupId = string;
export type RuleId = string;

export type Group = {
    id: GroupId,
    active: boolean,
    color: string,
    label: string,
    count: number,
    mass: number,
    size: number,
}

export type Rule = {
    id: RuleId,
    active: boolean,
    groupA: GroupId,
    groupB: GroupId,
    repulse: number,
}

// The maximum is exclusive and the minimum is inclusive.
export const randomIntExclusive = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
};

// The maximum is inclusive and the minimum is inclusive.
export const randomIntInclusive = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export const random = (): number => {
    return Math.random();
};

const randomId = (): string => {
    return uuid().substring(0, 6);
};

export const createRandomGroup = (): Group => {
    const keys = Object.keys(colors);
    const rnd = randomIntExclusive(0, keys.length);

    const key: string = keys[rnd];
    const shade: string = "" + randomIntInclusive(1, 7) * 100;

    return {
        id: randomId(),
        active: true,
        color: colors[key as Color][shade as Shades],
        label: key.toLowerCase().replace(/ /, "-") + "-" + shade,
        count: randomIntInclusive(20, 60) * 10,
        mass: 1,
        size: randomIntInclusive(1, 4) * 2
    };
};

// Returns undefined when no group is active.
export const createRandomRule = (groups: Group[]): Rule | undefined => {
    const groupA = pickRandomGroup(groups);
    const groupB = pickRandomGroup(groups);
    return groupA && groupB ? {
        id: randomId(),
        active: true,
        repulse: Math.floor((random() - 0.5) * 100) / 100,
        groupA: groupA.id,
        groupB: groupB.id,
    } : undefined;
};

// Returns undefined when no group is active.
export const pickRandomGroup = (groups: Group[]): Group | undefined => {
    const active: number[] = [];
    for (let i = 0; i < groups.length; i++) {
        groups[i].active ? active.push(i) : null;
    }
    return active.length
        ? groups[active[randomIntExclusive(0, active.length)]]
        : undefined;
};

export const getGroupById = (groups: Group[], groupId: GroupId): Group | undefined => {
    for (let i = 0; i < groups.length; i++) {
        if (groups[i].id === groupId) { return groups[i]; }
    }
    return undefined;
};

export const hasActiveGroups = (groups: Group[]): boolean => {
    for (let i = 0; i < groups.length; i++) {
        if (groups[i].active) { return true; }
    }
    return false;
};

export const getRuleGroupIds = (rule: Rule): [ GroupId, GroupId ] => {
    return [ rule.groupA, rule.groupB ];
};

export const ruleHasGroupId = (rule: Rule, groupId: GroupId): boolean => {
    return rule.groupA === groupId || rule.groupB === groupId;
};

const groups: Group[] = [
    createRandomGroup(),
    createRandomGroup(),
    createRandomGroup(),
];

/* eslint-disable */
const rules: Rule[] = [
    createRandomRule(groups)!,
    createRandomRule(groups)!,
    createRandomRule(groups)!,
    createRandomRule(groups)!,
    createRandomRule(groups)!,
    createRandomRule(groups)!,
    createRandomRule(groups)!,
    createRandomRule(groups)!,
];
/* eslint-enable */

// Different sizes for the first group cluster.
groups.forEach((_, i) => {
    groups[i].size = i * 2 + 2;
});

// Opposite attractions the first group cluster.
rules.forEach((_, i) => {
    rules[i].repulse = i % 2 ? Math.abs(rules[i].repulse) : -Math.abs(rules[i].repulse);
});

export type Model = {
    running: boolean
    groups: Group[]
    rules: Rule[]
}

export const model: Model = reactive({ running: false, groups, rules });
