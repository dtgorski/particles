<template>
    <button class="button-icon-action" :title=title>
        <Icon :icon=icon />
    </button>
</template>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<script setup lang="ts">
    import { defineProps } from "vue";

    const props = defineProps({
        title: String,
        icon: String
    });
</script>

<script lang="ts">
    import { Icon } from "@iconify/vue";
    import { defineComponent } from "vue";

    export default defineComponent({
        name: "ButtonIconAction",
        components: { Icon },
    });
</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<style scoped lang="scss">
@import "@/assets/vars.scss";

.button-icon-action {
    background-color: transparent;
    border-radius: 2px;
    border: 0;
    color: $color-pri;
    max-height: 48px;
    margin: 0;
    padding: 0;

    &:hover { background-color: $color-hover; }
    &:active { background-color: $color-active; }

    > svg {
        @extend %drop-shadow;
        height: 32px; width: 32px;
    }
}
</style>
