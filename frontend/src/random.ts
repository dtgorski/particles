import { v4 as uuid } from "uuid";

export const random = (): number => {
    return Math.random();
};

// The maximum is exclusive and the minimum is inclusive.
export const randIntExc = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(random() * (max - min) + min);
};

// The maximum is inclusive and the minimum is inclusive.
export const randIntInc = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(random() * (max - min + 1) + min);
};

export const randId = (): string => {
    return uuid().substring(0, 6);
};
