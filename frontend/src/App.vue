<template>
    <div id="arena">
        <PanelCanvas />
    </div>
    <div id="sidebar">
        <PanelHeader />
        <PanelEditor />
    </div>
    <div id="github">
        <a href="https://github.com/dtgorski/particles" target="_blank" title="Source on GitHub">GitHub</a>
    </div>
</template>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<script lang="ts">
    import { defineComponent } from "vue";

    import PanelCanvas from "@/views/panel/PanelCanvas.vue";
    import PanelEditor from "@/views/panel/PanelEditor.vue";
    import PanelHeader from "@/views/panel/PanelHeader.vue";

    const App = defineComponent({
        components: {
            PanelCanvas,
            PanelHeader,
            PanelEditor
        },
    });

    export default App;
</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<style lang="scss">
@import "@/assets/css.scss";

#app {
    background: repeating-linear-gradient(0deg, $bg-color-0 0, $bg-color-0 1px, transparent 2px, transparent 2px);
    display: flex;
    flex-flow: nowrap;
    gap: 8px;
    height: 100vh;
    justify-content: center;
    overflow-y: hidden;
    padding: 8px;
    width: 100vw;
}

#sidebar {
    @extend %outset;
    background-image: linear-gradient(to right, rgb($bg-color-2, 100%), rgb($bg-color-2, 0%));
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    max-height: 100vh;
    max-width: 460px;
    overflow-y: hidden;
    padding-top: 4px;
    width: 460px;

    > div:first-child {
        padding: 4px 8px 8px 8px;
    }
    > div:not(:first-child) {
        padding: 8px;
    }
}

#arena {
    display: flex;
    gap: 8px;
    height: 100%;
}

#github {
    position: fixed;
    right: 2px;
    top: 22px;
    transform: rotate(45deg);

    a {
        color: $color-pri;
        font-size: larger;
        opacity: 0.6;
    }
}
</style>
