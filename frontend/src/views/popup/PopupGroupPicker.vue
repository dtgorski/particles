<template>
    <fieldset>
        <div v-for="(group, i) in model.groups" :key=i
             class="group-pick" :class="group.active ? '' : 'disabled'"
             @click="emitGroupPick(group.id)"
        >
            <div>{{ group.label }}</div>
            <div>
                <Icon icon="mdi:checkbox-blank-circle" :style=css.style.particle(group.id) />
            </div>
        </div>
    </fieldset>
</template>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<script setup lang="ts">
    import { GroupCtx, GroupId } from "@/context/Group";
    import { model } from "@/model";
    import { defineEmits } from "vue";

    const emit = defineEmits([ "groupPick" ]);
    const emitGroupPick = (groupId: GroupId) => { emit("groupPick", groupId); };

    const css = {
        style: {
            particle: (groupId: GroupId): Partial<CSSStyleDeclaration> => {
                const group = GroupCtx.getGroupById(model.groups, groupId);
                return group ? { color: group.colorValue, width: (group.particleSize * 2) + "px" } : {};
            },
        }
    };
</script>

<script lang="ts">
    import { Icon } from "@iconify/vue";
    import { defineComponent } from "vue";

    export default defineComponent({
        name: "PopupGroupPicker",
        components: { Icon },
    });
</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<style scoped lang="scss">
@import "@/assets/vars.scss";

fieldset {
    @extend %box-shadow;
    background-color: $bg-color-5;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 4px;
    position: fixed;
    z-index: 1;
}

.rtl { direction: rtl; }

.group-pick {
    display: flex;
    cursor: pointer;

    &:hover { background-color: $color-hover; }
    &:active { background-color: $color-active; }

    svg {
        height: 24px;
    }
    > div:nth-child(1) {
        display: flex;
        align-items: center;
        flex: 1;
        justify-content: flex-end;
        overflow: hidden;
        padding: 0 4px;
        text-align: right;
        white-space: nowrap;
        color: $color-tri;
        font-size: $font-medium;
        min-width: 64px;
        max-width: 64px;
    }
    > div:nth-child(2) {
        @extend %drop-shadow;
        align-items: center;
        display: flex;
        flex: 0;
        justify-content: center;
        min-width: 20px;
        max-width: 20px;
    }
}
</style>
