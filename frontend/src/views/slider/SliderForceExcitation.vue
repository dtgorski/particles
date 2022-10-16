<template>
    <fieldset id="excitation">
        <legend>Force excitation</legend>
        <SlidexSimplex
            :min=min
            :max=max
            :percent=true
            :value=model.jitter.excitation
            @change="onSliderChange($event)" />
    </fieldset>
</template>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<script setup lang="ts">
    import { model } from "@/model";

    const min = 1;
    const max = 99;

    const onSliderChange = (value: number) => {
        model.jitter.excitation = Math.round(value);
    };
</script>

<script lang="ts">
    import { defineComponent } from "vue";
    import SlidexSimplex from "@/component/SlidexSimplex.vue";

    export default defineComponent({
        name: "SliderForceExcitation",
        components: { SlidexSimplex },
    });
</script>
