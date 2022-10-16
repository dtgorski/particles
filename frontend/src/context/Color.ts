import { randIntExc } from "@/util";

// Castrated material colors.
export type Color = "Amber" | "Blue" | "Brown" | "Cyan" | "Green" | "Grey" | "Indigo" | "Purple" | "Red" | "Teal";
export type Colors = { [key in Color]: string[] };

export const colors: Colors = {
    Amber: /* */ [ "#ffecb3", "#ffe082", "#ffd54f", "#ffca28", "#ffc107", "#ffb300", "#ffa000", "#ff8f00" ],
    Blue: /*  */ [ "#bbdefb", "#90caf9", "#64b5f6", "#42a5f5", "#2196f3", "#1e88e5", "#1976d2", "#1565c0" ],
    Brown: /* */ [ "#d7ccc8", "#bcaaa4", "#a1887f", "#8d6e63", "#795548", "#6d4c41", "#5d4037", "#4e342e" ],
    Cyan: /*  */ [ "#b2ebf2", "#80deea", "#4dd0e1", "#26c6da", "#00bcd4", "#00acc1", "#0097a7", "#00838f" ],
    Green: /* */ [ "#c8e6c9", "#a5d6a7", "#81c784", "#66bb6a", "#4caf50", "#43a047", "#388e3c", "#2e7d32" ],
    Grey: /*  */ [ "#cfd8dc", "#b0bec5", "#90a4ae", "#78909c", "#607d8b", "#546e7a", "#455a64", "#37474f" ],
    Indigo: /**/ [ "#c5cae9", "#9fa8da", "#7986cb", "#5c6bc0", "#3f51b5", "#3949ab", "#303f9f", "#283593" ],
    Purple: /**/ [ "#e1bee7", "#ce93d8", "#ba68c8", "#ab47bc", "#9c27b0", "#8e24aa", "#7b1fa2", "#6a1b9a" ],
    Red: /*   */ [ "#ffcdd2", "#ef9a9a", "#e57373", "#ef5350", "#f44336", "#e53935", "#d32f2f", "#c62828" ],
    Teal: /*  */ [ "#b2dfdb", "#80cbc4", "#4db6ac", "#26a69a", "#009688", "#00897b", "#00796b", "#00695c" ],
};

export type ColorData = {
    name: string
    value: string
    shade: number
};

export const ColorCtx = {

    createRandomColor: (): ColorData => {
        const names = Object.keys(colors);

        const name = names[randIntExc(0, names.length)];
        const shade = randIntExc(0, name.length);
        const value = colors[name as Color][shade];

        return { name, shade, value };
    },

    createLabel: (colorName: string, colorShade: number): string => {
        return colorName.toLowerCase() + "-" + (colorShade + 1);
    }
};
