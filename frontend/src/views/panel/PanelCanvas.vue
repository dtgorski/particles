<template>
    <div>
        <canvas id="panel-canvas" :width=model.aspect.w :height=model.aspect.h @click=click></canvas>
    </div>
</template>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<script setup lang="ts">
    import { Pulse, PulseCtx } from "@/context/Pulse";
    import { model } from "@/model";

    const canvasAndCtx = (): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } => {
        const canvas = document.getElementById("panel-canvas") as HTMLCanvasElement;
        if (!canvas) { throw new Error("canvas not available"); }

        const ctx = canvas.getContext("2d");
        if (!ctx) { throw new Error("2D context for canvas not available"); }

        return { canvas, ctx };
    };

    const click = (e: PointerEvent) => {
        if (!model.running) { return; }

        const { canvas } = canvasAndCtx();
        const rect = canvas.getBoundingClientRect();

        model.pulse = new Pulse(
            (e.clientX - rect.left) * (canvas.width / rect.width),
            (e.clientY - rect.top) * (canvas.height / rect.height),
            30
        );
    };
</script>

<script lang="ts">
    import { defineComponent } from "vue";

    export default defineComponent({ name: "PanelCanvas" });
</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<style scoped lang="scss">
@import "@/assets/vars.scss";

div {
    border-radius: $border-radius;
    border: 1px solid $bg-color-3;

    #panel-canvas {
        background-color: $bg-color-0;
        border-radius: 4px;
        height: 100%;
        width: 100%;
    }
}
</style>
