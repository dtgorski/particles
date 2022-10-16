<template>
    <div>
        <div id="buttons">
            <ButtonIconAction icon="mdi:pause" title="Pause" @click=stopEngine v-show="model.running" />
            <ButtonIconAction icon="mdi:play" title="Play" @click=startEngine v-show="!model.running" />
            <ButtonIconAction icon="mdi:reload" Restart="Restart" @click=restartEngine />
        </div>
        <div id="logo">
            <div><img src="@/assets/logo.png" alt="particles" width="132" height="50" /></div>
            <div>particles</div>
        </div>
    </div>
</template>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<script setup lang="ts">
    import { inject, onMounted } from "vue";
    import { FastCache, Key } from "@/cache";
    import { Driver } from "@/engine/Driver";
    import { Engine } from "@/engine/Engine";
    import { System } from "@/engine/System";
    import { model } from "@/model";

    const cache = inject("cache") as FastCache;

    // TODO: move elsewhere
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
        engine = createEngine(document.getElementById("panel-canvas"));
        startEngine();
    };
    const engineRunning = (): boolean => {
        return engine ? engine.running() : false;
    };

    const createEngine = (elm: HTMLElement | null): Engine => {
        if (!elm) { console.error("createEngine: element not found, bailing out"); }

        const canvas = elm as HTMLCanvasElement;
        const driver = new Driver(model, new System(canvas.width, canvas.height));

        return new Engine(canvas, driver, (e: Engine) => { cache[Key.FPS] = e.fps(); });
    };

    const exportModel = () => { /**/ };
    const importModel = () => { /**/ };

    onMounted(restartEngine);
</script>

<script lang="ts">
    import { Icon } from "@iconify/vue";
    import { defineComponent } from "vue";
    import ButtonIconAction from "@/component/ButtonIconAction.vue";

    export default defineComponent({
        name: "PanelHeader",
        components: {
            ButtonIconAction,
            Icon,
        },
    });
</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<style scoped lang="scss">
@import "@/assets/vars.scss";

div:first-child {
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
