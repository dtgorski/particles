import { Driver } from "@/engine/Driver";

export type OnUpdate = (engine: Engine) => void;

export class Engine {

    readonly ctx: CanvasRenderingContext2D;
    readonly w: number;
    readonly h: number;

    private f = 0;
    private t: number[] = [];
    private r = false;

    constructor(readonly canvas: HTMLCanvasElement, readonly driver: Driver, readonly onUpdate?: OnUpdate) {

        const ctx = canvas.getContext("2d");
        if (!ctx) { throw new Error("2D context for canvas not available"); }

        this.ctx = ctx;
        this.ctx.shadowColor = "#010101";
        this.ctx.shadowBlur = 1;

        this.w = this.canvas.width;
        this.h = this.canvas.height;
    }

    start(): void {
        this.stop();
        this.setRunning(true);
        this.updateCanvas();
    }

    stop(): void {
        this.setRunning(false);
    }

    running(): boolean {
        return this.r;
    }

    fps(): number {
        return this.f;
    }

    private setRunning = (flag: boolean) => {
        this.r = flag;
    }

    private drawParticle = (x: number, y: number, r: number, c: string) => {
        this.ctx.fillStyle = c;
        this.ctx.beginPath();
        this.ctx.arc(x, y, r / 2, 0, 2 * Math.PI);
        this.ctx.closePath();
        this.ctx.fill();
    }

    private clearRect = () => {
        this.ctx.clearRect(0, 0, this.w, this.h);
    }

    private updateCanvas(): void {
        this.clearRect();

        const drawGroupMap = this.driver.drawGroupMap();
        const groupIds = Object.keys(drawGroupMap);

        const n = groupIds.length;
        const a = 128; // alpha range 128-255

        for (let i = 0; i < n; i++) {
            const data = drawGroupMap[groupIds[i]];
            if (!data.active) { continue; }

            const m = data.particles.length;
            const alpha = a / m;

            for (let j = 0; j < m; j++) {
                const p = data.particles[j];
                const s = data.size;
                const c = data.color + (alpha * j + 255 - a).toString(16);

                this.drawParticle(p.x, p.y, s, c);
            }
        }

        this.running() ? this.updateFPS() : this.f = 0;
        this.onUpdate ? this.onUpdate(this) : null;

        if (this.running()) {
            this.driver.commit(
                this.updateCanvas.bind(this)
            );
        }
    }

    private updateFPS(): void {
        const now = performance.now();
        const before = now - 1000;
        while (this.t.length > 0 && this.t[0] <= before) { this.t.shift(); }
        this.t.push(now);

        // Don't overdo it.
        this.f = this.t.length > 60 ? 60 : this.t.length;
    }
}
