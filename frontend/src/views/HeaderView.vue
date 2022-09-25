<template>
    <div id="header-view">
        <div id="buttons">
            <button class="action-button" title="Pause" @click=stopEngine v-show="running === true">
                <Icon icon="mdi:pause" />
            </button>
            <button class="action-button" title="Play" @click=startEngine v-show="running === false">
                <Icon icon="mdi:play" />
            </button>
            <button class="action-button" title="Restart" @click=restartEngine>
                <Icon icon="mdi:reload" />
            </button>
            <!--
            <button class="action-button" title="Export" @click=exportModel>
                <Icon icon="mdi:export" />
            </button>
            <button class="action-button" title="Import" @click=importModel>
                <Icon icon="mdi:import" />
            </button>
            -->
        </div>
        <div id="logo">
            <div><img src="@/assets/logo.png" alt="particles" width="132" height="48" /></div>
            <div>particles</div>
        </div>
    </div>
</template>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<script lang="ts">
    import { Icon } from "@iconify/vue";
    import { defineComponent } from "vue";
    import { Driver } from "@/engine/Driver";
    import { Engine } from "@/engine/Engine";
    import { model } from "@/model";
    import { Universe } from "@/engine/Universe";

    let engine: Engine;

    const startEngine = () => {
        engine?.start();
        model.running = engineRunning();
    };
    const stopEngine = () => {
        engine?.stop();
        model.running = engineRunning();
    };
    const restartEngine = () => {
        stopEngine();
        engine = createEngine(document.getElementById("canvas"));
        startEngine();
    };
    const engineRunning = () => {
        return engine?.running();
    };

    const createEngine = (elm: HTMLElement | null): Engine => {
        if (!elm) { console.error("createEngine: element not found, bailing out"); }

        const canvas = elm as HTMLCanvasElement;
        const driver = new Driver(model, new Universe(canvas.width, canvas.height));

        return new Engine(canvas, driver);
    };

    const exportModel = () => { /**/ };
    const importModel = () => { /**/ };

    export default defineComponent({
        components: { Icon },
        methods: { startEngine, stopEngine, engineRunning, restartEngine, exportModel, importModel },
        mounted() { restartEngine(); },
        setup: () => { return model; },
    });
</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<style scoped lang="scss">
@import "@/assets/css.scss";

#header-view {
    display: flex;

    #buttons {
        gap: 8px;
        display: flex;
        flex-grow: 1;
        justify-content: flex-start;

        button {
            width: 48px;
            height: 48px;
            @extend %outset;
        }
    }
    #logo {
        > div:nth-child(2) {
            gap: 2px;
            display: flex;
            justify-content: center;
        }
    }
}
</style>
