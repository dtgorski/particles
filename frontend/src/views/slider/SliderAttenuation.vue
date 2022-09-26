<template>
    <fieldset>
        <legend>Attenuation</legend>
        <Slider
            v-model=attenuation
            :min=1
            :max=99
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

    const SliderAttenuation = defineComponent({
        components: { Slider },
        setup: () => { return model; },
    });

    export default SliderAttenuation;
</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<style lang="scss">
@import "@/assets/css.scss";

fieldset {
    padding: 16px;
    * { cursor: default !important; }
}
</style>
