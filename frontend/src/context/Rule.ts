import { Group, GroupCtx, GroupId } from "@/context/Group";
import { groups } from "@/init";
import { randId, random, randomAttraction } from "@/util";

export type Rule = {
    id: RuleId,
    active: boolean,
    actorA: Actor,
    actorB: Actor,
    attraction: number,
}

export type RuleId = string;

export type Actor = {
    groupId: string
}

export const RuleCtx = {

    actors: (rule: Rule): [ Actor, Actor ] => {
        return [ rule.actorA, rule.actorB ];
    },

    hasActor: (rule: Rule, groupId: string): boolean => {
        return rule.actorA.groupId === groupId || rule.actorB.groupId === groupId;
    },

    toggleActive: (rule: Rule, groups: Group[]) => {
        if (rule.active) {
            rule.active = false;
            return;
        }

        const [ actorA, actorB ] = RuleCtx.actors(rule);
        const groupA = GroupCtx.getGroupById(groups, actorA.groupId);
        const groupB = GroupCtx.getGroupById(groups, actorB.groupId);

        if (groupA?.active && groupB?.active) {
            rule.active = true;
        }
    },

    getRuleById: (rules: Rule[], ruleId: RuleId): Rule | undefined => {
        for (let i = 0; i < rules.length; i++) {
            if (rules[i].id == ruleId) { return rules[i]; }
        }
        return undefined;
    },

    createRule: (groupA: Group, groupB: Group, attraction: number): Rule => {
        return {
            id: randId(),
            active: true,
            attraction: attraction,
            actorA: { groupId: groupA.id },
            actorB: { groupId: groupB.id }
        };
    },

    createRandomRule: (groups: Group[]): Rule | undefined => {
        const groupA = GroupCtx.getRandomActiveGroup(groups);
        const groupB = GroupCtx.getRandomActiveGroup(groups);

        return groupA && groupB ? <Rule>{
            id: randId(),
            active: true,
            attraction: randomAttraction(),
            actorA: { groupId: groupA.id },
            actorB: { groupId: groupB.id }
        } : undefined;
    },

    removeRulesWithGroup: (rules: Rule[], group: Group): void => {
        let i = rules.length;
        while (i--) {
            if (rules[i].actorA.groupId == group.id ||
                rules[i].actorB.groupId == group.id) {
                rules.splice(i, 1);
            }
        }
    },

    // Deactivate rules depending on this group.
    deactivateRules: (rules: Rule[], group: Group) => {
        for (let i = 0; i < rules.length; i++) {
            if (RuleCtx.hasActor(rules[i], group.id)) {
                rules[i].active = false;
            }
        }
    },

    // When group has been activated, check if we can reactivate rules.
    reactivateRules: (rules: Rule[], groups: Group[], group: Group) => {
        for (let i = 0; i < rules.length; i++) {
            if (RuleCtx.hasActor(rules[i], group.id)) {
                const [ actorA, actorB ] = RuleCtx.actors(rules[i]);

                const groupA = GroupCtx.getGroupById(groups, actorA.groupId);
                const groupB = GroupCtx.getGroupById(groups, actorB.groupId);

                if (groupA?.active && groupB?.active) {
                    rules[i].active = true;
                }
            }
        }
    }
};
