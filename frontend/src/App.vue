<template>
    <div id="arena">
        <CanvasView />
    </div>
    <div id="sidebar">
        <HeaderView />
        <EditorView />
    </div>
    <div id="github">
        <a href="https://github.com/dtgorski/particles" target="_blank" title="Source on GitHub">GitHub</a>
    </div>
</template>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<script lang="ts">
    import { defineComponent } from "vue";
    import CanvasView from "@/views/CanvasView.vue";
    import EditorView from "@/views/EditorView.vue";
    import HeaderView from "@/views/HeaderView.vue";

    export default defineComponent({
        components: {
            HeaderView,
            CanvasView,
            EditorView
        },
    });
</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<style lang="scss">
@import "@/assets/css.scss";

#app {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-flow: nowrap;
    gap: 8px;
    justify-content: center;
    padding: 8px;
    overflow-y: hidden;
    background: repeating-linear-gradient(0deg, $bg-color-0 0, $bg-color-0 1px, transparent 2px, transparent 2px);
}

#sidebar {
    @extend %outset;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 4px;
    width: 460px;
    max-width: 460px;
    max-height: 100vh;
    overflow-y: hidden;
    background-image: linear-gradient(to right, rgb($bg-color-2, 100%), rgb($bg-color-2, 0%));

    > div:first-child {
        padding: 4px 8px 8px 8px;
    }
    > div:not(:first-child) {
        padding: 8px;
    }
}

#arena {
    display: flex;
    height: 100%;
    gap: 8px;
}

#github {
    position: fixed;
    top: 22px;
    right: 2px;
    transform: rotate(45deg);

    a {
        color: $color-pri;
        font-size: larger;
        opacity: 0.6;
    }
}
</style>
