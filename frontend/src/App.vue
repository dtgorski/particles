<template>
    <div id="container">
        <CanvasView />
        <div id="panel">
            <HeaderView />
            <EditorView />
        </div>
    </div>
    <div id="github">
        <a href="https://github.com/dtgorski/particles" target="_blank" title="Source on GitHub">GitHub</a>
    </div>
</template>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<script lang="ts">
    import { defineComponent } from "vue";
    import { model } from "@/Model";
    import CanvasView from "@/views/CanvasView.vue";
    import EditorView from "@/views/EditorView.vue";
    import HeaderView from "@/views/HeaderView.vue";

    export default defineComponent({
        name: "App",
        components: {
            HeaderView,
            CanvasView,
            EditorView
        },
        setup: () => {
            return {
                groups: model.groups,
            };
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
    flex-flow: row wrap;
    justify-content: center;
    padding: 8px;
    overflow-y: hidden;
    background: repeating-linear-gradient(0deg, #000 0, #000 1px, transparent 2px, transparent 2px);
}

#container {
    display: flex;
    height: 100%;
    gap: 8px;
}

#panel {
    @extend %outset;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 8px;
    max-height: 100vh;
    overflow-y: hidden;
    background-color: $bg-color-2;

    > div:first-child {
        padding: 4px 8px 8px 8px;
    }
    > div:not(:first-child) {
        padding: 8px;
    }
}

#github {
    position: fixed;
    top: 20px;
    right: 5px;
    transform: rotate(45deg);

    a {
        text-decoration: none;
        &:visited, &:hover, &:active, &:link {
            color: $color-pri;
            font-weight: bold;
            opacity: 0.6;
        }
    }
}
</style>
