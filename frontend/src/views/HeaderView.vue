<template>
    <div id="header-view">
        <div id="buttons">
            <button class="action-button" title="Pause" @click="stop" v-show="running === true">
                <Icon icon="mdi:pause" />
            </button>
            <button class="action-button" title="Play" @click="start" v-show="running === false">
                <Icon icon="mdi:play" />
            </button>
            <button class="action-button" title="Restart" @click="restart">
                <Icon icon="mdi:reload" />
            </button>
        </div>
        <div id="logo">
            <div><img src="@/assets/logo.png" alt="particles" width="132" height="50" /></div>
            <div>particles</div>
        </div>
    </div>
</template>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<script lang="ts">
    import { Icon } from "@iconify/vue";
    import { defineComponent } from "vue";
    import { Driver } from "@/Driver";
    import { Engine } from "@/Engine";
    import { model } from "@/model";

    // FIXME
    declare global { interface Window {engine: Engine;} }
    const sim: Window = window;

    const createEngine = (): Engine => {
        const canvas = document.getElementById("canvas");
        if (!canvas) { console.error("Element with id 'canvas' not found, bailing out"); }

        let elm = canvas as HTMLCanvasElement;
        const driver = new Driver(model, elm.width, elm.height);

        return new Engine(elm, driver);
    };

    const start = () => { sim.engine?.start(); };
    const stop = () => { sim.engine?.stop(); };
    const running = (): boolean => { return sim.engine?.running(); };
    const restart = () => {
        stop();
        sim.engine = createEngine();
        start();
    };

    export default defineComponent({
        name: "HeaderView",
        components: { Icon },
        methods: { start, stop, running, restart },
        mounted() { restart(); },
        setup: () => { return model; },
    });
</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<style scoped lang="scss">
@import "@/assets/css.scss";

#header-view {
    display: flex;

    #buttons {
        display: flex;
        gap: 8px;
        flex-grow: 1;
        align-items: flex-start;

        button {
            width: 48px;
            height: 48px;
            @extend %outset;
        }
    }
    #logo {
        @extend %user-select-none;
        > div:nth-child(2) {
            display: flex;
            gap: 2px;
            justify-content: center;
        }
    }
}
</style>
