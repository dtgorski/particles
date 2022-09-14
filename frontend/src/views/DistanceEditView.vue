<template>
    <fieldset>
        <legend>Force distance</legend>
        <Slider v-model=distance :min=1 :max="Math.ceil(Math.sqrt(width*width + height*height))" :tooltips=false />
    </fieldset>
</template>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<script lang="ts">
    import { defineComponent } from "vue";
    import { model } from "@/model";
    import Slider from '@vueform/slider';

    export default defineComponent({
        name: "DistanceEditView",
        components: { Slider },
        methods: {},
        setup: () => {
            return model;
        },
    });
</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<style scoped lang="scss">
@import "@/assets/css.scss";

fieldset {
    padding: 16px;
    * { cursor: default !important; }
}
</style>
