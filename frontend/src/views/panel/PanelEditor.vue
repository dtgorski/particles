<template>
    <div id="panel-editor">
        <div class="one-slider-row">
            <SliderForceDistance />
        </div>
        <div class="two-slider-row">
            <SliderForceExcitation />
            <SliderForceAttenuation />
        </div>
        <PanelGroupsEdit />
        <PanelRulesEdit />
        <div id="spacer" />
        <PanelSettingsEdit />
        <div id="footer">
            <div></div>
            <div>
                <div><span id="fps">0</span> fps</div>
                <div>·</div>
                <a href="https://github.com/dtgorski/particles" target="_blank">
                    Daniel T. Gorski · dtg [at] lengo [dot] org
                </a>
            </div>
        </div>
    </div>
</template>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<script setup lang="ts">
    import { inject, onBeforeUnmount, onMounted  } from "vue";
    import { FastCache, Key } from "@/cache";
    import { $ } from "@/util";

    const cache = inject("cache") as FastCache;
    let handle: number;

    onMounted(() => {
        handle = setInterval(() => { $("#fps").innerText = cache[Key.FPS] + ""; }, 1000);
    });

    onBeforeUnmount(() => {
        clearTimeout(handle);
    });
</script>

<script lang="ts">
    import { defineComponent } from "vue";
    import PanelGroupsEdit from "@/views/panel/PanelGroupsEdit.vue";
    import PanelRulesEdit from "@/views/panel/PanelRulesEdit.vue";
    import PanelSettingsEdit from "@/views/panel/PanelSettingsEdit.vue";
    import SliderForceAttenuation from "@/views/slider/SliderForceAttenuation.vue";
    import SliderForceDistance from "@/views/slider/SliderForceDistance.vue";
    import SliderForceExcitation from "@/views/slider/SliderForceExcitation.vue";

    export default defineComponent({
        name: "PanelEditor",
        components: {
            SliderForceDistance,
            SliderForceExcitation,
            SliderForceAttenuation,
            PanelSettingsEdit,
            PanelGroupsEdit,
            PanelRulesEdit,
        },
    });
</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<style scoped lang="scss">
@import "@/assets/vars.scss";

#panel-editor {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;

    > .one-slider-row {
        display: flex;
        * { flex: 1 }
    }
    > .two-slider-row {
        display: flex;
        * { flex: 1 }
    }

    #spacer { flex: 1; }

    #footer {
        align-items: center;
        display: flex;
        flex-direction: column;
        font-size: $font-small;

        > div:nth-child(1) { flex: 1; }
        > div:last-child {
            display: flex;
            gap: 8px;
            opacity: 0.4;
            color: $color-pri;
        }
    }
}
</style>
