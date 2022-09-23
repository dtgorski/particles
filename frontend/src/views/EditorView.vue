<template>
    <div id="editor-view">
        <DistanceEditView />
        <GroupsEditView />
        <RulesEditView />
        <div>
            <div></div>
            <div class="emboss">No randomness at play - except the initialization.</div>
        </div>
    </div>
</template>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<script lang="ts">
    import { defineComponent } from "vue";
    import GroupsEditView from "@/views/GroupsEditView.vue";
    import RulesEditView from "@/views/RulesEditView.vue";
    import DistanceEditView from "@/views/DistanceEditView.vue";

    export default defineComponent({
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
    display: flex;
    flex-direction: column;
    height: 100%;
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

    > div:last-child {
        flex: 1;

        display: flex;
        flex-direction: column;
        align-items: center;

        > div:nth-child(1) { flex: 1; }
        > div:nth-child(2) { color: $bg-color-5; }
    }
}
</style>
