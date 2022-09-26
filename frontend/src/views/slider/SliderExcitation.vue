<template>
    <fieldset>
        <legend>Excitation</legend>
        <Slider
            v-model=excitation
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

    const SliderExcitation =  defineComponent({
        components: { Slider },
        setup: () => { return model; },
    });

    export default SliderExcitation;
</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<style lang="scss">
@import "@/assets/css.scss";

fieldset {
    padding: 16px;
    * { cursor: default !important; }
}
</style>
