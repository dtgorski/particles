<template>
    <button class="button-icon" :title=title>
        <Icon :icon=icon />
    </button>
</template>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<script setup lang="ts">
    import { defineProps  } from "vue";

    const props = defineProps({
        title: String,
        icon: { type: String, default: "mdi:help-rhombus-outline" }
    });
</script>

<script lang="ts">
    import { Icon } from "@iconify/vue";
    import { defineComponent } from "vue";

    export default defineComponent({
        name: "ButtonIcon",
        components: { Icon },
    });
</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<style scoped lang="scss">
@import "@/assets/vars.scss";

.button-icon {
    background-color: transparent;
    border-radius: 2px;
    border: 0;
    color: $color-pri;
    max-height: 24px;
    margin: 0;
    padding: 0;

    &:hover { background-color: $color-hover; }
    &:active { background-color: $color-active; }

    > svg {
        @extend %drop-shadow;
        height: 24px;
        width: 24px;
    }
}
</style>
