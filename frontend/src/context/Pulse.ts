export type Pulse = {
    x: number
    y: number
    g: number
}

export const PulseCtx = {

    createPulse: (x: number, y: number, g: number): Pulse => {
        return { x, y, g };
    },

    createNullPulse: (): Pulse => {
        return { x: -1, y: -1, g: 0 };
    }
};
