<template>
    <fieldset id="speed-edit">
        <legend>Speed factor</legend>
        <Slider
            v-model=speed
            :min=0
            :max=100
            :tooltips=false
            :options="{ animate: false }"
        />
    </fieldset>
</template>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<script lang="ts">
    import { defineComponent } from "vue";
    import { model } from "@/model";
    import Slider from '@vueform/slider';

    export default defineComponent({
        components: { Slider },
        methods: {},
        setup: () => { return model; },
    });
</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<style lang="scss">
@import "@/assets/css.scss";

#speed-edit {
    padding: 16px;
    * { cursor: pointer !important; }
}
</style>
