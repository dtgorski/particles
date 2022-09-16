<template>
    <div id="editor-view">
        <DistanceEditView />
        <GroupsEditView />
        <RulesEditView />
    </div>
</template>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<script lang="ts">
    import { defineComponent } from "vue";
    import GroupsEditView from "@/views/GroupsEditView.vue";
    import RulesEditView from "@/views/RulesEditView.vue";
    import DistanceEditView from "@/views/DistanceEditView.vue";

    export default defineComponent({
        name: "EditorView",
        components: {
            DistanceEditView,
            GroupsEditView,
            RulesEditView,
        }
    });
</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<style lang="scss">
@import "@/assets/css.scss";

#editor-view {
    width: 460px;
    overflow-x: hidden;
    overflow-y: auto;

    input, select {
        width: 100%;
        border-width: 1px;
        border-radius: 2px;
        padding: 5px 4px 2px 5px;
        margin-bottom: 4px;
        color: #fff;
        background-color: $bg-color-4;
        @extend %text-shadow;
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
}
</style>
