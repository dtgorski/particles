// Due to the Reactivity of Vue 3 it is (AFAIK) not possible to
// observe a class instance properly and using its methods.
// Since we have no objects in the reactive model, we collect
// the object methods externally. The fubar smell is strong here.

import { randIntExc, randIntInc, randId } from "@/random";
import { colors, Color, Shades } from "@/Color";

export type Group = {
    id: GroupId,
    active: boolean,
    color: string,
    label: string,
    count: number,
    mass: number,
    size: number,
}

export type GroupId = string;

export const GroupCtx = {

    hasActiveGroups: (groups: Group[]): boolean => {
        for (let i = 0; i < groups.length; i++) {
            if (groups[i].active) { return true; }
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
    pickRandomGroup: (groups: Group[]): Group | undefined => {
        const active: number[] = [];
        for (let i = 0; i < groups.length; i++) {
            groups[i].active ? active.push(i) : null;
        }
        return active.length
            ? groups[active[randIntExc(0, active.length)]]
            : undefined;
    },

    createRandomGroup: (): Group => {
        const keys = Object.keys(colors);
        const rnd = randIntExc(0, keys.length);
        const name = keys[rnd];
        const shade = "" + randIntInc(1, 7) * 100;

        return <Group>{
            id: randId(),
            active: true,
            color: colors[name as Color][shade as Shades],
            label: name.toLowerCase().replace(/ /, "-") + "-" + shade.substring(0,1),
            count: randIntInc(50, 80) * 10,
            size: randIntInc(1, 4) * 2,
            mass: 1
        };
    }
};
