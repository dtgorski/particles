import { Pulse } from "@/model";
import { DrawGroup, Particle } from "@/engine/Driver";
import { randIntExc } from "@/util";

export class Universe {

    constructor(
        readonly w: number,
        readonly h: number
    ) { }

    createParticle(): Particle {
        return {
            x: randIntExc(0, this.w),
            y: randIntExc(0, this.h),
            vx: 0,
            vy: 0,
        };
    }

    calculate(groupA: DrawGroup, groupB: DrawGroup, pulse: Pulse | undefined, g: number, d: number): void {
        const particlesA = groupA.particles;
        const particlesB = groupB.particles;

        for (let i = 0; i < particlesA.length; i++) {
            const pA = particlesA[i];
            let fx = 0, fy = 0;

            for (let j = 0; j < particlesB.length; j++) {
                const pB = particlesB[j];

                const dx = pA.x - pB.x;
                const dy = pA.y - pB.y;
                const r = Math.sqrt(dx * dx + dy * dy);

                if (r > 0 && r <= d) {
                    const f = g / r;
                    // const f = g * ((groupA.mass * groupB.mass) / (r*r));
                    fx += f * dx * 0.1;
                    fy += f * dy * 0.1;
                }
            }

            if (pulse && pulse.x >= 0 && pulse.y >= 0) {
                const dx = pA.x - pulse.x;
                const dy = pA.y - pulse.y;
                const r = Math.sqrt(dx * dx + dy * dy);
                if (r > 0 && r <= d) {
                    const f = pulse.g / r;
                    fx += f * dx;
                    fy += f * dy;
                }
            }

            // @formatter:off
            const b = -1;
            if (pA.x < 0)       { pA.vx *= b; pA.x = -pA.x; }
            if (pA.x >= this.w) { pA.vx *= b; pA.x = 2 * this.w - pA.x; }
            if (pA.y < 0)       { pA.vy *= b; pA.y = -pA.y; }
            if (pA.y >= this.h) { pA.vy *= b; pA.y = 2 * this.h - pA.y; }
            // @formatter:on

            pA.vx = (pA.vx + fx) * 0.5;
            pA.vy = (pA.vy + fy) * 0.5;

            pA.x += pA.vx;
            pA.y += pA.vy;
        }
    }
}
