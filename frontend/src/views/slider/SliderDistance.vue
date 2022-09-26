<template>
    <fieldset>
        <legend>Force distance</legend>
        <Slider
            v-model=distance
            :min=1
            :max="Math.ceil(Math.sqrt(aspect.w*aspect.w + aspect.h*aspect.h))"
            :tooltips=false
            :options="{ animate: false }"
        />
    </fieldset>
</template>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<script lang="ts">
    import Slider from "@vueform/slider";
    import { defineComponent } from "vue";

    import { model } from "@/model";

    const SliderDistance = defineComponent({
        components: { Slider },
        setup: () => { return model; },
    });

    export default SliderDistance;
</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<style lang="scss">
@import "@/assets/css.scss";

fieldset {
    padding: 16px;
    * { cursor: default !important; }
}
</style>
