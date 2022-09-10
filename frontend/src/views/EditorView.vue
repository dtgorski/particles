<template>
    <div id="editor-view">
        <GroupsEditView />
        <RulesEditView />
    </div>
</template>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<script lang="ts">
    import { defineComponent } from "vue";
    import GroupsEditView from "@/views/GroupsEditView.vue";
    import RulesEditView from "@/views/RulesEditView.vue";

    export default defineComponent({
        name: "EditorView",
        components: { GroupsEditView, RulesEditView }
    });
</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<style lang="scss">
@import "@/assets/css.scss";

#editor-view {
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
    input[type=number] {
        text-align: center;
    }
    select {
        padding: 2px;
    }
}
</style>
