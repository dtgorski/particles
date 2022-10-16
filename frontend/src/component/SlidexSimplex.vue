<template>
    <div :id=id class="slidex-simplex">
        <div></div>
        <div class="below" />
        <div class="handle">
            <SliderHandle :value=sliderHandleValue() />
        </div>
        <div class="above" />
        <div></div>
    </div>
</template>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<script setup lang="ts">
    import { defineEmits, defineProps, onBeforeUnmount, onMounted, watch } from "vue";
    import SliderHandle from "@/component/SliderHandle.vue";
    import { $, on, randId, un } from "@/util";

    const id = "slider-" + randId();

    const props = defineProps({
        min: { type: Number, default: 0 },
        max: { type: Number, default: 100 },
        value: { type: Number },
        percent: { type: Boolean },
    });

    const emit = defineEmits([ "change" ]);

    const sliderHandleValue = () => {
        const value = props.value as number;
        return props.percent ? (normalize(value).toFixed(1) + "%") : value;
    };

    const normalize = (value: number): number => {
        return (value - props.min) / ((props.max - props.min) / 100);
    };

    const denormalize = (value: number): number => {
        return props.min + value / 100 * (props.max - props.min);
    };

    const onTrackClick = (e: Event) => {
        const rect = $("#" + id).getBoundingClientRect();
        const posx = (e as PointerEvent).clientX - rect.left;
        const norm = (posx / rect.width * 100);
        emit("change", Math.round(denormalize(norm) * 100) / 100);
    };

    const updateSlider = () => {
        const below = normalize(props.value as number) * 10;
        const above = 1000 - below;
        const slider = $("#" + id);

        $(slider, ".below").style.flex = below + "";
        $(slider, ".above").style.flex = above + "";
    };

    onMounted(() => {
        on($("#" + id), "click", onTrackClick);
        updateSlider();
    });

    onBeforeUnmount(() => {
        un($("#" + id), "click", onTrackClick);
    });

    watch(props, () => updateSlider());
</script>

<script lang="ts">
    import { defineComponent } from "vue";

    export default defineComponent({
        name: "SlidexSimplex"
    });
</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<style scoped lang="scss">
@import "@/assets/vars.scss";

.slidex-simplex {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    cursor: pointer;

    .below, .above {
        @extend %inset;
        border-radius: $border-radius;
        background-color: $bg-color-4;
        height: 4px;
        flex: 1;
    }
    .handle {
        flex: 0;
    }
}
</style>
