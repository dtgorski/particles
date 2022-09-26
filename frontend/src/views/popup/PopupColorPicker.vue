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
    import { Icon } from "@iconify/vue";
    import { defineComponent } from "vue";

    import { ColorData, colors } from "@/context/Color";

    const PopupColorPicker = defineComponent({
        components: { Icon },
        emits: [ "colorPicked" ],
        setup: (props, { emit }) => {
            const colorPicked = (color: ColorData) => { emit("colorPicked", color); };
            return { colors, colorPicked };
        },
    });
    export default PopupColorPicker;
</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<style scoped lang="scss">
@import "@/assets/css.scss";

#picker {
    @extend %box-shadow;
    background-color: $bg-color-5;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    padding: 8px 8px 6px 8px;
    position: fixed;
    z-index: 1;

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
