<template>
    <fieldset id="attenuation">
        <legend>Force attenuation</legend>
        <SlidexSimplex
            :min=min
            :max=max
            :percent=true
            :value=model.jitter.attenuation
            @change="onSliderChange($event)" />
    </fieldset>
</template>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<script setup lang="ts">
    import { model } from "@/model";

    const min = 1;
    const max = 99;

    const onSliderChange = (value: number) => {
        model.jitter.attenuation = Math.round(value);
    };
</script>

<script lang="ts">
    import { defineComponent } from "vue";
    import SlidexSimplex from "@/component/SlidexSimplex.vue";

    export default defineComponent({
        name: "SliderAttenuation",
        components: { SlidexSimplex },
    });
</script>
