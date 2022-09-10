<template>
    <div id="arena">
        <canvas id="canvas" width="1024" height="1024"></canvas>
    </div>
</template>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<script lang="ts">
    import { defineComponent } from "vue";

    export default defineComponent({
        name: "ArenaView",
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
