import { Driver } from "@/Driver";

export class Engine {

    readonly ctx: CanvasRenderingContext2D;
    readonly w: number;
    readonly h: number;
    private r = false;

    constructor(readonly canvas: HTMLCanvasElement, readonly driver: Driver) {
        const ctx = canvas.getContext("2d");
        if (!ctx) { throw new Error("2D context for canvas not available"); }

        this.ctx = ctx;
        this.w = this.canvas.width;
        this.h = this.canvas.height;
    }

    getDriver(): Driver {
        return this.driver;
    }

    start(): void {
        if (this.r) {return; }
        this.r = true;
        this.getDriver().getModel().running = this.r; // FIXME
        this.updateCanvas();
    }

    stop(): void {
        this.r = false;
        this.getDriver().getModel().running = this.r; // FIXME
    }

    running(): boolean {
        return this.r;
    }

    private drawParticle = (x: number, y: number, r: number, c: string) => {
        this.ctx.fillStyle = c;
        this.ctx.beginPath();
        this.ctx.arc(x, y, r / 2, 0, 6.283185307179586);
        this.ctx.fill();
    }

    private updateCanvas(): void {
        this.ctx.clearRect(0, 0, this.w, this.h);

        const drawGroupMap = this.driver.getDrawGroupMap();
        const groupIds = Object.keys(drawGroupMap);

        for (let i = 0; i < groupIds.length; i++) {
            const groupId = groupIds[i];

            const drawData = drawGroupMap[groupId];
            if (!drawData.active) { continue; }

            for (let j = 0; j < drawData.particles.length; j++) {
                const p = drawData.particles[j];
                this.drawParticle(p.x, p.y, drawData.size, drawData.color);
            }
        }
        if (this.r) {
            this.driver.commit(
                this.updateCanvas.bind(this)
            );
        }
    }
}
