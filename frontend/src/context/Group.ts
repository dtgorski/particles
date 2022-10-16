import { ColorCtx, ColorData } from "@/context/Color";
import { randId, randIntExc, randIntInc } from "@/util";

export type Group = {
    id: GroupId,
    active: boolean,
    colorName: string,
    colorValue: string,
    label: string,
    particleCount: number,
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
        do color = ColorCtx.createRandomColor(); while (burnedColorNames?.includes(color.name));
        const label = ColorCtx.createLabel(color.name, color.shade);

        return <Group>{
            active: true,
            colorName: color.name,
            colorValue: color.value,
            id: randId(),
            label: label,
            particleCount: randIntInc(30, 60) * 10,
            particleSize: randIntInc(2, 4),
        };
    },

    removeGroup: (groups: Group[], group: Group): void => {
        for (let i = 0; i < groups.length; i++) {
            if (groups[i] === group) {
                groups.splice(i, 1);
                return;
            }
        }
    }
};
