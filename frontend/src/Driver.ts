import { getGroupById, Group, GroupId, Model, randomIntExclusive } from "@/Model";

export type Particle = {
    x: number
    y: number
    vx: number
    vy: number
}

export type DrawDataMap = Record<GroupId, DrawData>

export type DrawData = {
    active: boolean
    mass: number
    size: number
    color: string
    particles: Particle[]
    particleCount: number
}

export class Driver {
    private drawDataMap: DrawDataMap = {}

    constructor(
        readonly model: Model,
        readonly w: number = 1024,
        readonly h: number = 1024
    ) {}

    getModel(): Model {
        return this.model;
    }

    update(): void {
        const groupIds = Object.keys(this.drawDataMap);

        // Remove deleted groups.
        for (let i = 0; i < groupIds.length; i++) {
            if (!getGroupById(this.model.groups, groupIds[i])) {
                delete (this.drawDataMap[groupIds[i]]);
                groupIds.splice(i, 0);
            }
        }

        // Check modified group properties.
        for (let i = 0; i < groupIds.length; i++) {
            const groupId = groupIds[i];

            const group = getGroupById(this.model.groups, groupId);
            if (!group) { continue; }

            const drawData = this.drawDataMap[groupId];
            drawData.active = group.active;
            drawData.mass = group.mass;
            drawData.size = group.size;
            drawData.color = group.color;

            if (group.count > drawData.particleCount) {
            //     // Add more particles
            }
            if (group.count < drawData.particleCount) {
                 // Remove particles
            }
        }

        // Check if all active groups have particles.
        for (let i = 0; i < this.model.groups.length; i++) {

            const group = this.model.groups[i];
            if (!group.active) { continue; }
            if (this.drawDataMap[group.id]) { continue; }

            const particles = [];
            for (let j = 0; j < group.count; j++) {
                particles.push(this.createParticle(group));
            }
            this.drawDataMap[group.id] = <DrawData>{
                active: group.active,
                mass: group.mass,
                size: group.size,
                color: group.color,
                particles: particles,
                particleCount: particles.length,
            };
        }

        this.applyRules();
    }

    getDrawDataMap(): DrawDataMap {
        return this.drawDataMap;
    }

    commit(updateCanvas: () => void): void {
        this.update();
        requestAnimationFrame(updateCanvas);
    }

    private createParticle(group: Group): Particle {
        return {
            x: randomIntExclusive(0, this.w),
            y: randomIntExclusive(0, this.h),
            vx: 0,
            vy: 0,
        };
    }

    private applyRules(): void {
        const rules = this.model.rules;

        for (let i = 0; i < rules.length; i++) {
            const rule = rules[i];
            if (!rule.active) { continue; }

            this.applyRule(
                this.drawDataMap[rule.groupA],
                this.drawDataMap[rule.groupB],
                rule.repulse
            );
        }
    }

    private applyRule(data1: DrawData, data2: DrawData, g: number): void {
        const particles1 = data1.particles;
        const particles2 = data2.particles;

        for (let i = 0; i < particles1.length; i++) {
            const p1 = particles1[i];
            let fx = 0, fy = 0;

            for (let j = 0; j < particles2.length; j++) {
                const p2 = particles2[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const d = Math.sqrt(dx * dx + dy * dy);

                if (d > 0 && d < 80) {
                    const F = (g / d) * data1.mass * data2.mass;
                    fx += F * dx;
                    fy += F * dy;
                }
            }
            if (p1.x < 0) {
                p1.x = -p1.x;
                p1.vx *= -0.01;
            }
            if (p1.x >= this.w) {
                p1.x = 2 * this.w - p1.x;
                p1.vx *= -0.01;
            }
            if (p1.y < 0) {
                p1.y = -p1.y;
                p1.vy *= -0.01;
            }
            if (p1.y >= this.h) {
                p1.y = 2 * this.h - p1.y;
                p1.vy *= -0.01;
            }

            p1.vx = (p1.vx + fx) * 0.5;
            p1.vy = (p1.vy + fy) * 0.5;
            p1.x += p1.vx;
            p1.y += p1.vy;
        }
    }
}
