import { v4 as uuid } from "uuid";

export const random = (): number => {
    return Math.random();
};

export const randomAttraction = (): number => {
    return Math.floor((random() - 0.5) * 100) / 100;
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

// -- --------------------------------------------------------------------------------------------------------------- --

export const on = (elm: EventTarget, event: keyof GlobalEventHandlersEventMap, l: EventListener, c = false): void =>
    elm ? elm.addEventListener(event, l, c) : undefined;

export const un = (elm: EventTarget, event: keyof GlobalEventHandlersEventMap, l: EventListener, c = false): void =>
    elm ? elm.removeEventListener(event, l, c) : undefined;

export const $ = (elm: HTMLElement | string, selectors?: string): HTMLElement => {
    let base: Document | HTMLElement = document;
    let sel = selectors;
    typeof elm == "string" ? sel = elm : base = elm;
    return <HTMLElement>base.querySelector(sel ? sel : "");
};

export const $$ = <T extends HTMLElement>(elm: HTMLElement | string, selectors?: string): NodeListOf<T> => {
    let base: Document | HTMLElement = document;
    let sel = selectors;
    typeof elm == "string" ? sel = elm : base = elm;
    return base.querySelectorAll(sel ? sel : "");
};
