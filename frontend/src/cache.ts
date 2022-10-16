export enum Key { FPS }

export type FastCache = Record<Key, number>

export const cache = <FastCache>{
    [Key.FPS]: 0,
};
