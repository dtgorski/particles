import { DrawGroup, Particle } from "@/engine/Driver";
import { randIntExc } from "@/util";
import { Pulse } from "@/context/Pulse";

export type Variables = {
    groupA: DrawGroup,
    groupB: DrawGroup,
    pulse: Pulse,
    gravity: number,
    distance: number,
    factor: number
}

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

    calculate(v: Variables): void {
        const particlesA = v.groupA.particles;
        const particlesB = v.groupB.particles;

        const factor = (): number => {
            return (v.factor / 100)**2;
        };

        for (let i = 0; i < particlesA.length; i++) {
            const pA = particlesA[i];
            let fx = 0, fy = 0;

            for (let j = 0; j < particlesB.length; j++) {
                const pB = particlesB[j];

                const dx = pA.x - pB.x;
                const dy = pA.y - pB.y;
                const r = Math.sqrt(dx * dx + dy * dy);

                if (r > 0 && r <= v.distance) {
                    const f = v.gravity / r;
                    fx += f * dx * factor();
                    fy += f * dy * factor();
                }
            }

            if (v.pulse && v.pulse.x >= 0 && v.pulse.y >= 0) {
                const dx = pA.x - v.pulse.x;
                const dy = pA.y - v.pulse.y;
                const r = Math.sqrt(dx * dx + dy * dy);
                if (r > 0 && r <= v.distance) {
                    const f = v.pulse.g / r;
                    fx += f * dx;
                    fy += f * dy;
                }
            }

            // @formatter:off
            const bounce = -1;
            if (pA.x < 0)       { pA.vx *= bounce; pA.x = -pA.x; }
            if (pA.x >= this.w) { pA.vx *= bounce; pA.x = 2 * this.w - pA.x; }
            if (pA.y < 0)       { pA.vy *= bounce; pA.y = -pA.y; }
            if (pA.y >= this.h) { pA.vy *= bounce; pA.y = 2 * this.h - pA.y; }
            // @formatter:on

            const deflate = 0.5;
            pA.vx = (pA.vx + fx) * deflate;
            pA.vy = (pA.vy + fy) * deflate;

            pA.x += pA.vx;
            pA.y += pA.vy;
        }
    }
}
