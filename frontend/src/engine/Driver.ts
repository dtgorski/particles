import { Model } from "@/model";
import { toRaw } from "vue";
import { GroupCtx } from "@/context/Group";
import { Universe, Variables } from "@/engine/Universe";

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
    private map: DrawGroupMap = {}

    constructor(
        readonly model: Model,
        readonly universe: Universe,
    ) {}

    drawGroupMap(): DrawGroupMap {
        return this.map;
    }

    commit(updateCanvas: () => void): void {
        this.update();
        requestAnimationFrame(updateCanvas);
    }

    update(): void {
        const model: Model = toRaw(this.model);
        const groupIds = Object.keys(this.map);

        // Remove deleted groups.
        for (let i = 0; i < groupIds.length; i++) {
            if (!GroupCtx.getGroupById(model.groups, groupIds[i])) {
                delete (this.map[groupIds[i]]);
                groupIds.splice(i, 0);
            }
        }

        // Check modified group properties.
        for (let i = 0; i < groupIds.length; i++) {
            const groupId = groupIds[i];
            const group = GroupCtx.getGroupById(model.groups, groupId);
            if (!group) { continue; }

            const drawGroup = this.map[groupId];

            drawGroup.active = group.active;
            drawGroup.mass = group.particleMass;
            drawGroup.size = group.particleSize;
            drawGroup.color = group.colorValue;

            // Add missing particles.
            const diff = group.particleCount - drawGroup.particleCount;
            if (diff > 0) {
                for (let i = 0; i < diff; i++) {
                    drawGroup.particles.push(this.universe.createParticle());
                }
                drawGroup.particleCount = group.particleCount;
            }
            // Remove superfluous particles.
            if (diff < 0) {
                drawGroup.particles.splice(0, -diff);
                drawGroup.particleCount = group.particleCount;
            }
        }

        // Check if all active groups have particles.
        for (let i = 0; i < model.groups.length; i++) {

            const group = model.groups[i];
            if (!group.active) { continue; }
            if (this.map[group.id]) { continue; }

            const particles = [];
            for (let j = 0; j < group.particleCount; j++) {
                particles.push(this.universe.createParticle());
            }
            this.map[group.id] = <DrawGroup>{
                active: group.active,
                mass: group.particleMass,
                size: group.particleSize,
                color: group.colorValue,
                particles: particles,
                particleCount: particles.length,
            };
        }

        this.applyRules();
        this.model.pulse.x = -1;
    }

    private applyRules(): void {
        const rules = toRaw(this.model.rules);

        for (let i = 0; i < rules.length; i++) {
            const rule = rules[i];
            if (!rule.active) { continue; }

            this.universe.calculate(<Variables>{
                groupA: this.map[rule.actorA.groupId],
                groupB: this.map[rule.actorB.groupId],
                gravity: rule.gravity,
                pulse: this.model.pulse,
                factor: this.model.factor,
                distance: this.model.distance
            });
        }
    }
}
