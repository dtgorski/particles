<template>
    <div id="stage">
        <canvas id="canvas" :width=aspect.w :height=aspect.h @click=click></canvas>
    </div>
</template>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<script lang="ts">
    import { defineComponent } from "vue";

    import { PulseCtx } from "@/context/Pulse";
    import { model } from "@/model";

    const canvasAndCtx = (): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } => {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        if (!canvas) { throw new Error("canvas not available"); }

        const ctx = canvas.getContext("2d");
        if (!ctx) { throw new Error("2D context for canvas not available"); }

        return { canvas, ctx };
    };

    export default defineComponent({
        methods: {
            click: (e: PointerEvent) => {
                if (!model.running) { return; }

                const { canvas } = canvasAndCtx();
                const rect = canvas.getBoundingClientRect();

                model.pulse = PulseCtx.createPulse(
                    (e.clientX - rect.left) * (canvas.width / rect.width),
                    (e.clientY - rect.top) * (canvas.height / rect.height),
                    30
                );
            },
        },
        setup: () => { return model; },
    });
</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<style scoped lang="scss">
@import "@/assets/css.scss";

#stage {
    border-radius: $border-radius;
    border: 1px solid $bg-color-3;

    #canvas {
        background-color: $bg-color-0;
        border-radius: 4px;
        height: 100%;
        width: 100%;
    }
}
</style>
