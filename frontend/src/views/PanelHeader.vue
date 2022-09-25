<template>
    <div id="header">
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
    import { Universe } from "@/engine/Universe";
    import { model } from "@/model";

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

#header {
    display: flex;

    #buttons {
        display: flex;
        flex-grow: 1;
        gap: 8px;
        justify-content: flex-start;

        button {
            @extend %outset;
            height: 48px;
            width: 48px;
        }
    }
    #logo {
        > div:nth-child(2) {
            display: flex;
            gap: 2px;
            justify-content: center;
        }
    }
}
</style>
