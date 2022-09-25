<template>
    <div id="editor-view">
        <div>
            <DistanceEditView />
            <FactorEditView />
        </div>
        <GroupsEditView />
        <RulesEditView />
        <div>
            <div></div>
            <div>
                <a href="https://github.com/dtgorski/particles" target="_blank">
                    Daniel T. Gorski · dtg [at] lengo [dot] org
                </a>
            </div>
        </div>
    </div>
</template>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<script lang="ts">
    import { defineComponent } from "vue";
    import GroupsEditView from "@/views/GroupsEditView.vue";
    import RulesEditView from "@/views/RulesEditView.vue";
    import DistanceEditView from "@/views/DistanceEditView.vue";
    import FactorEditView from "@/views/FactorEditView.vue";

    export default defineComponent({
        components: {
            DistanceEditView,
            FactorEditView,
            GroupsEditView,
            RulesEditView,
        }
    });
</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<style lang="scss">
@import "@/assets/css.scss";

#editor-view {
    height: 100%;
    display: flex;
    overflow-y: auto;
    overflow-x: hidden;
    flex-direction: column;

    input, select {
        width: 100%;
        color: #fff;
        border-width: 1px;
        border-radius: 2px;
        margin-bottom: 4px;
        @extend %text-shadow;
        padding: 5px 4px 2px 5px;
        background-color: $bg-color-4;
    }
    input {
        @extend %inset;
    }
    select {
        @extend %outset;
        padding: 2px;
    }

    input[type=number] {
        text-align: center;
    }

    > div:first-child {
        display: flex;
        * { flex: 1 }
    }

    > div:last-child {
        flex: 1;

        display: flex;
        font-size: smaller;
        align-items: center;
        flex-direction: column;

        > div:nth-child(1) { flex: 1; }
        > div:nth-child(2) { color: $bg-color-5; }
    }
}
</style>
