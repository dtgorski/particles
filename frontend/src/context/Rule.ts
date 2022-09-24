import { Group, GroupCtx } from "@/context/Group";
import { randId, random } from "@/util";

export type Rule = {
    id: string,
    active: boolean,
    actorA: Actor,
    actorB: Actor,
    gravity: number,
}

export type Actor = {
    groupId: string
}

export const RuleCtx = {

    getActors: (rule: Rule): [ Actor, Actor ] => {
        return [ rule.actorA, rule.actorB ];
    },

    hasActor: (rule: Rule, groupId: string): boolean => {
        return rule.actorA.groupId === groupId || rule.actorB.groupId === groupId;
    },

    createRule: (groupA: Group, groupB: Group, gravity: number): Rule => {
        return {
            id: randId(),
            active: true,
            gravity: gravity,
            actorA: { groupId: groupA.id },
            actorB: { groupId: groupB.id }
        };
    },

    createRandomRule: (groups: Group[]): Rule | undefined => {
        const groupA = GroupCtx.getActiveGroupByRandom(groups);
        const groupB = GroupCtx.getActiveGroupByRandom(groups);

        return groupA && groupB ? <Rule>{
            id: randId(),
            active: true,
            gravity: RuleCtx.randomGravity(),
            actorA: { groupId: groupA.id },
            actorB: { groupId: groupB.id }
        } : undefined;
    },

    randomGravity: (): number => {
        return Math.floor((random() - 0.5) * 100) / 100;
    }
};
