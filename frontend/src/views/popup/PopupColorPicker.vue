<template>
    <fieldset>
        <div v-for="(color, name) in colors" :key=name>
            <div v-for="(_, shade) in color" :key=shade>
                <Icon icon="mdi:circle"
                      :style="{ color: color[shade] }"
                      @click="emitColorPick({name: name, value: color[shade], shade: shade})"
                />
            </div>
        </div>
    </fieldset>
</template>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<script setup lang="ts">
    import { defineEmits } from "vue";
    import { ColorData, colors } from "@/context/Color";

    const emit = defineEmits([ "colorPick" ]);
    const emitColorPick = (color: ColorData) => { emit("colorPick", color); };
</script>

<script lang="ts">
    import { Icon } from "@iconify/vue";
    import { defineComponent } from "vue";

    export default defineComponent({
        name: "PopupColorPicker",
        components: { Icon },
    });
</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<style scoped lang="scss">
@import "@/assets/vars.scss";

fieldset {
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

        svg {
            @extend %drop-shadow;
            width: 16px;
            height: 16px;
        }
    }
}
</style>
