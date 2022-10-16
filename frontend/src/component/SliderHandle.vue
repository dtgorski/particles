<template>
    <div class="slider-handle">
        <div>{{ value }}</div>
    </div>
</template>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<script setup lang="ts">
    import { defineProps } from "vue";

    const props = defineProps({
        value: [Number, String]
    });
</script>

<script lang="ts">
    import { defineComponent } from "vue";

    export default defineComponent({
        name: "SliderHandle",
    });
</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<style scoped lang="scss">
@import "@/assets/vars.scss";

.slider-handle {
    display: flex;
    align-items: center;
    justify-content: center;
    @extend %outset;
    background-color: $bg-color-4;
    border-radius: $border-radius;
    color: $color-pri;
    height: 24px;
    margin: 0;
    padding: 0 4px;
    min-width: 48px;

    &:hover { background-color: $color-hover; }
    &:active { background-color: $color-active; }

    > div {
        scale: 0.9;
    }
}
</style>
