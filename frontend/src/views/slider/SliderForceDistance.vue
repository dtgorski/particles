<template>
    <fieldset id="distance">
        <legend>Force distance</legend>
        <SlidexSimplex
            :min=min
            :max=max
            :percent=true
            :value=model.distance
            @change="onSliderChange($event)" />
    </fieldset>
</template>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<script setup lang="ts">
    import { model } from "@/model";

    const min = 1;
    const max = Math.ceil(Math.sqrt(model.aspect.w ** 2 + model.aspect.h ** 2));

    const onSliderChange = (value: number) => {
        model.distance = Math.round(value);
    };
</script>

<script lang="ts">
    import { defineComponent } from "vue";
    import SlidexSimplex from "@/component/SlidexSimplex.vue";

    export default defineComponent({
        name: "SliderForceDistance",
        components: { SlidexSimplex },
    });
</script>
