import { Model, Pulse } from "@/model";
import { toRaw } from "vue";
import { randIntExc } from "@/random";
import { GroupCtx } from "@/model/GroupCtx";

export type Particle = {
    x: number
    y: number
    vx: number
    vy: number
}

export type DrawGroupMap = Record<string, DrawGroup>

export type DrawGroup = {
    active: boolean
    mass: number
    size: number
    color: string
    particles: Particle[]
    particleCount: number
}

export class Driver {
    private drawGroupMap: DrawGroupMap = {}

    constructor(
        readonly model: Model,
        readonly w = 1024,
        readonly h = 1024
    ) {}

    getModel(): Model {
        return this.model;
    }

    getDrawGroupMap(): DrawGroupMap {
        return this.drawGroupMap;
    }

    commit(updateCanvas: () => void): void {
        this.update();
        requestAnimationFrame(updateCanvas);
    }

    update(): void {
        const model: Model = toRaw(this.model);
        const groupIds = Object.keys(this.drawGroupMap);

        // Remove deleted groups.
        for (let i = 0; i < groupIds.length; i++) {
            if (!GroupCtx.getGroupById(model.groups, groupIds[i])) {
                delete (this.drawGroupMap[groupIds[i]]);
                groupIds.splice(i, 0);
            }
        }

        // Check modified group properties.
        for (let i = 0; i < groupIds.length; i++) {
            const groupId = groupIds[i];
            const group = GroupCtx.getGroupById(model.groups, groupId);
            if (!group) { continue; }

            const drawGroup = this.drawGroupMap[groupId];

            drawGroup.active = group.active;
            drawGroup.mass = group.mass;
            drawGroup.size = group.size;
            drawGroup.color = group.color;

            // Add missing particles.
            const diff = group.count - drawGroup.particleCount;
            if (diff > 0) {
                for (let i = 0; i < diff; i++) { drawGroup.particles.push(this.createParticle()); }
                drawGroup.particleCount = group.count;
            }
            // Remove superfluous particles.
            if (diff < 0) {
                drawGroup.particles.splice(0, -diff);
                drawGroup.particleCount = group.count;
            }
        }

        // Check if all active groups have particles.
        for (let i = 0; i < model.groups.length; i++) {

            const group = model.groups[i];
            if (!group.active) { continue; }
            if (this.drawGroupMap[group.id]) { continue; }

            const particles = [];
            for (let j = 0; j < group.count; j++) {
                particles.push(this.createParticle());
            }
            this.drawGroupMap[group.id] = <DrawGroup>{
                active: group.active,
                mass: group.mass,
                size: group.size,
                color: group.color,
                particles: particles,
                particleCount: particles.length,
            };
        }

        this.applyRules(model.distance, model.pulse);
        this.model.pulse.x = -1;
    }

    private applyRules(distance: number, pulse: Pulse): void {
        const rules = toRaw(this.model.rules);

        for (let i = 0; i < rules.length; i++) {
            const rule = rules[i];
            if (!rule.active) { continue; }

            const drawGroupA: DrawGroup = this.drawGroupMap[rule.actorA.groupId];
            const drawGroupB: DrawGroup = this.drawGroupMap[rule.actorB.groupId];
            const gravity = rule.gravity;

            this.applyRule(drawGroupA, drawGroupB, gravity, distance, pulse);
        }
    }

    private applyRule(
        drawGroupA: DrawGroup,
        drawGroupB: DrawGroup,
        g: number,
        d: number,
        pulse: Pulse
    ): void {
        const particlesA = drawGroupA.particles;
        const particlesB = drawGroupB.particles;

        for (let i = 0; i < particlesA.length; i++) {
            const pA = particlesA[i];
            let fx = 0, fy = 0;

            for (let j = 0; j < particlesB.length; j++) {
                const pB = particlesB[j];

                const dx = pA.x - pB.x;
                const dy = pA.y - pB.y;
                const r = Math.sqrt(dx * dx + dy * dy);

                if (r >= 1 && r <= d) {
                    const f = g / r;
                    //const f = g * ((drawGroupA.mass * drawGroupB.mass) / (r*r));
                    fx += f * dx * 0.1;
                    fy += f * dy * 0.1;
                }
            }

            if (pulse.x >= 0 && pulse.y >= 0) {
                const dx = pA.x - pulse.x;
                const dy = pA.y - pulse.y;
                const r = Math.sqrt(dx * dx + dy * dy);
                if (r >= 1 && r <= d) {
                    const f = 30 / r;
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

    private createParticle(): Particle {
        return {
            x: randIntExc(0, this.w),
            y: randIntExc(0, this.h),
            vx: 0,
            vy: 0,
        };
    }
}
