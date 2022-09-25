<template>
    <div id="editor">
        <div>
            <SliderDistance />
            <SliderExcitation />
            <SliderAttenuation />
        </div>
        <PanelGroupsEdit />
        <PanelRulesEdit />
        <div>
            <div></div>
            <div>
                <a href="https://github.com/dtgorski/particles" target="_blank">
                    Daniel T. Gorski · dtg [at] lengo [dot] org
                </a>
            </div>
        </div>
    </div>
</template>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<script lang="ts">
    import { defineComponent } from "vue";

    import PanelGroupsEdit from "@/views/PanelGroupsEdit.vue";
    import PanelRulesEdit from "@/views/PanelRulesEdit.vue";
    import SliderAttenuation from "@/views/SliderAttenuation.vue";
    import SliderDistance from "@/views/SliderDistance.vue";
    import SliderExcitation from "@/views/SliderExcitation.vue";

    export default defineComponent({
        components: {
            SliderDistance,
            SliderExcitation,
            SliderAttenuation,
            PanelGroupsEdit,
            PanelRulesEdit,
        }
    });
</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<style lang="scss">
@import "@/assets/css.scss";

#editor {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;

    input, select {
        @extend %text-shadow;
        background-color: $bg-color-4;
        border-radius: 2px;
        border-width: 1px;
        color: #fff;
        margin-bottom: 4px;
        padding: 5px 4px 2px 5px;
        width: 100%;
    }
    input { @extend %inset; }
    input[type=number] { text-align: center; }

    select {
        @extend %outset;
        padding: 2px;
    }

    > div:first-child {
        display: flex;
        * { flex: 1 }
    }
    > div:last-child {
        align-items: center;
        display: flex;
        flex-direction: column;
        flex: 1;
        font-size: smaller;

        > div:nth-child(1) { flex: 1; }
        > div:nth-child(2) { color: $bg-color-5; }
    }
}
</style>
