<template>
    <div id="arena">
        <canvas id="canvas" :width=aspect.w :height=aspect.h @click="click"></canvas>
    </div>
</template>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<script lang="ts">
    import { defineComponent, toRaw } from "vue";
    import { model } from "@/model";

    export default defineComponent({
        name: "CanvasView",
        methods: {
            click: (e: PointerEvent) => {
                const elm = document.getElementById("canvas") as HTMLCanvasElement;
                if (!elm) { return; }

                let rect = elm.getBoundingClientRect();

                model.pulse.x = (e.clientX - rect.left) * (elm.width / rect.width);
                model.pulse.y = (e.clientY - rect.top) * (elm.height / rect.height);
            }
        },
        setup: () => {
            return model;
        },
    });
</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<style scoped lang="scss">
@import "@/assets/css.scss";

#arena {
    border: 1px solid $bg-color-3;
    border-radius: $border-radius;

    #canvas {
        width: 100%;
        height: 100%;
        background-color: $bg-color-0;
    }
}
</style>
