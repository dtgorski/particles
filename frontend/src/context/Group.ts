import { ColorCtx, ColorData } from "@/context/Color";
import { RuleCtx } from "@/context/Rule";
import { groups } from "@/init";
import { model } from "@/model";
import { randId, randIntExc, randIntInc } from "@/util";

export type Group = {
    active: boolean,
    colorName: string,
    colorValue: string,
    id: GroupId,
    label: string,
    particleCount: number,
    particleMass: number,
    particleSize: number,
}

export type GroupId = string;

export const GroupCtx = {

    hasActiveGroups: (groups: Group[]): boolean => {
        for (let i = 0; i < groups.length; i++) {
            if (groups[i].active) {
                return true;
            }
        }
        return false;
    },

    toggleActive: (group: Group) => {
        group.active = !group.active;
    },

    getGroupById: (groups: Group[], groupId: GroupId): Group | undefined => {
        for (let i = 0; i < groups.length; i++) {
            if (groups[i].id == groupId) { return groups[i]; }
        }
        return undefined;
    },

    // Returns undefined when no group is active.
    getRandomActiveGroup: (groups: Group[]): Group | undefined => {
        const active: number[] = [];
        for (let i = 0; i < groups.length; i++) {
            groups[i].active ? active.push(i) : null;
        }
        return active.length
            ? groups[active[randIntExc(0, active.length)]]
            : undefined;
    },

    setGroupColor: (group: Group, color: ColorData) => {
        group.colorName = color.name;
        group.colorValue = color.value;
        group.label = ColorCtx.createLabel(color.name, color.shade);
    },

    // Random group is active by default.
    createRandomGroup: (burnedColorNames?: string[]): Group => {
        let color;
        do color = ColorCtx.createRandom(); while (burnedColorNames?.includes(color.name));
        const label = ColorCtx.createLabel(color.name, color.shade);

        return <Group>{
            active: true,
            colorName: color.name,
            colorValue: color.value,
            id: randId(),
            label: label,
            particleCount: randIntInc(30, 60) * 10,
            particleMass: 1,
            particleSize: randIntInc(2, 4),
        };
    },

    removeGroup: (groups: Group[], group: Group): void => {
        for (let i = 0; i < groups.length; i++) {
            if (groups[i] === group) {
                model.groups.splice(i, 1);
                return;
            }
        }
    },
};
