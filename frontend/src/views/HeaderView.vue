<template>
    <div id="header-view">
        <div id="buttons">
            <button class="action-button" title="Pause" @click=stop v-show="running === true">
                <Icon icon="mdi:pause" />
            </button>
            <button class="action-button" title="Play" @click=start v-show="running === false">
                <Icon icon="mdi:play" />
            </button>
            <button class="action-button" title="Restart" @click=restart>
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
    import { Driver } from "@/engine/Driver";
    import { Engine } from "@/engine/Engine";
    import { model } from "@/model";
    import { Universe } from "@/engine/Universe";

    let engine: Engine;

    const start /*  */ = () => {
        engine?.start();
        model.running = running();
    };
    const stop /*   */ = () => {
        engine?.stop();
        model.running = running();
    };
    const running /**/ = () => { return engine?.running(); };
    const restart /**/ = () => {
        stop();
        engine = createEngine(document.getElementById("canvas"));
        start();
    };

    const createEngine = (elm: HTMLElement | null): Engine => {
        if (!elm) { console.error("createEngine: element not found, bailing out"); }

        const canvas = elm as HTMLCanvasElement;
        const driver = new Driver(model, new Universe(canvas.width, canvas.height));

        return new Engine(canvas, driver);
    };

    export default defineComponent({
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
