import { randIntExc, randIntInc, randId } from "@/util";
import { ColorCtx, ColorData } from "@/context/Color";

export type Group = {
    id: GroupId,
    label: string,
    active: boolean,
    colorName: string,
    colorValue: string,
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

    getGroupById: (groups: Group[], groupId: GroupId): Group | undefined => {
        for (let i = 0; i < groups.length; i++) {
            if (groups[i].id == groupId) { return groups[i]; }
        }
        return undefined;
    },

    // Returns undefined when no group is active.
    getActiveGroupByRandom: (groups: Group[]): Group | undefined => {
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
        group.colorValue= color.value;
        group.label = ColorCtx.createLabel(color.name, color.shade);
    },

    createRandomGroup: (burnedColorNames?: string[]): Group => {
        let color;
        do color = ColorCtx.createRandom(); while (burnedColorNames?.includes(color.name));
        const label = ColorCtx.createLabel(color.name, color.shade);

        return <Group>{
            id: randId(),
            active: true,
            label: label,
            colorName: color.name,
            colorValue: color.value,
            particleCount: randIntInc(30, 60) * 10,
            particleSize: randIntInc(2, 4),
            particleMass: 1
        };
    }
};
