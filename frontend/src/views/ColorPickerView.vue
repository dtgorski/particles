<template>
    <fieldset id="picker">
        <div v-for="(color, name) in colors" :key=name>
            <div v-for="(_, shade) in color" :key=shade class="icon-button">
                <Icon
                    icon="mdi:circle"
                    :style="{ color: color[shade] }"
                    @click="colorPicked({name: name, value: color[shade], shade: shade})" />
            </div>
        </div>
    </fieldset>
</template>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<script lang="ts">
    import { defineComponent } from "vue";
    import { colors, ColorData } from "@/context/Color";
    import { Icon } from "@iconify/vue";

    export default defineComponent({
        components: { Icon },
        emits: [ "colorPicked" ],
        setup: (props, { emit }) => {
            const colorPicked = (color: ColorData) => { emit("colorPicked", color); };
            return { colors, colorPicked };
        },
    });
</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<style scoped lang="scss">
@import "@/assets/css.scss";

#picker {
    z-index: 999;
    display: flex;
    position: fixed;
    border-radius: 4px;
    @extend %box-shadow;
    flex-direction: column;
    padding: 8px 8px 6px 8px;
    background-color: $bg-color-5;

    > div {
        display: flex;
        gap: 2px;

        > div {
            max-height: 17px;
            svg { width: 16px; height: 16px; }
        }
    }
}
</style>
