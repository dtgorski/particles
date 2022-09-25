<template>
    <fieldset id="excitation">
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
    export default defineComponent({
        components: { Slider },
        setup: () => { return model; },
    });
</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<style lang="scss">
@import "@/assets/css.scss";

#excitation {
    padding: 16px;
    * { cursor: default !important; }
}
</style>
