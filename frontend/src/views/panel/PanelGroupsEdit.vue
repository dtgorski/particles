<template>
    <fieldset>
        <legend>Groups</legend>
        <div>
            <div></div>
            <div v-show=groups.length>Label</div>
            <div></div>
            <div v-show=groups.length>Particles</div>
            <div v-show=groups.length>Mass</div>
            <div v-show=groups.length>Size</div>
            <div>
                <button
                    title="Add random particle group"
                    class="icon-button"
                    @click="append">
                    <Icon icon="mdi:plus" />
                </button>
            </div>
        </div>
        <div v-for="(group, i) in groups" :key=group.id>
            <div>
                <button
                    title="On/Off"
                    class="icon-button"
                    @click=toggle(i)>
                    <Icon icon="mdi:checkbox-marked-outline" v-if=group.active />
                    <Icon icon="mdi:checkbox-blank-outline" v-else />
                </button>
            </div>
            <div>
                <input type="text" spellcheck="false" v-model=group.label />
            </div>
            <div>
                <button
                    title="Change color"
                    class="icon-button"
                    style="opacity: 1 !important;"
                    :style="{ color: group.colorValue }">
                    <Icon icon="mdi:palette" @click.stop="pick(group.id, $event)" />
                </button>

            </div>
            <div><input type="number" v-model=group.particleCount min="1" step="1" /></div>
            <div><input
                v-model=group.particleMass
                min="0"
                step="0.1"
                class="disabled"
                style="text-align: center"
                tabindex="-1" />
            </div>
            <div><input type="number" v-model=group.particleSize min="0" step="1" /></div>
            <div>
                <button
                    title="Remove group"
                    class="icon-button"
                    @click="remove(i)">
                    <Icon icon="mdi:delete-outline" />
                </button>
            </div>
        </div>
    </fieldset>
    <PopupColorPicker v-show="picker.active" @colorPicked=picked />
</template>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<script lang="ts">
    import { Icon } from "@iconify/vue";
    import { defineComponent, nextTick } from "vue";

    import { ColorData } from "@/context/Color";
    import { GroupCtx, GroupId } from "@/context/Group";
    import { PickerCtx } from "@/context/Picker";
    import { RuleCtx } from "@/context/Rule";
    import { model } from "@/model";
    import { on, un } from "@/util";
    import PopupColorPicker from "@/views/popup/PopupColorPicker.vue";

    const PanelGroupEdit = defineComponent({
        components: { PopupColorPicker, Icon },
        methods: {
            append: () => {
                model.groups.push(GroupCtx.createRandomGroup());
            },
            remove: (index: number) => {
                const group = model.groups[index];
                GroupCtx.removeGroup(model.groups, group);
                RuleCtx.removeRulesWithGroup(model.rules, group);
            },
            toggle: (index: number) => {
                const group = model.groups[index];
                GroupCtx.toggleActive(group);
                RuleCtx.deactivateRules(model.rules, group);
                RuleCtx.reactivateRules(model.rules, model.groups, group);
            },
            pick: (groupId: GroupId, e: MouseEvent) => {
                const picker = document.getElementById("picker");
                if (!picker) { return; }

                model.picker = PickerCtx.createPicker(groupId);
                picker.style.left = (e.clientX - 8) + "px";
                picker.style.top = (e.clientY - 8) + "px";

                enablePicker();
            },
            picked: (color: ColorData) => {
                nextTick(() => disablePicker());

                const group = GroupCtx.getGroupById(model.groups, model.picker.groupId);
                if (group) { GroupCtx.setGroupColor(group, color); }
            }
        },
        setup: () => { return model; },
    });

    const enablePicker = () => {
        on(document.body, "click", disablePicker);
        on(window, "resize", disablePicker);
    };

    const disablePicker = (): boolean => {
        un(document.body, "click", disablePicker);
        un(window, "resize", disablePicker);
        model.picker = PickerCtx.createNullPicker();
        return true;
    };

    export default PanelGroupEdit;
</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<style scoped lang="scss">
@import "@/assets/css.scss";

fieldset {
    > div {
        align-items: center;
        display: flex;
        gap: 4px;
        justify-content: flex-end;

        > div {
            @extend %text-shadow;
            color: $color-pri;
            font-size: smaller;
            text-align: center;
        }

        > div:nth-child(1) { flex: 0; min-width: 24px; }
        > div:nth-child(2) { flex: 12; width: 96px; }
        > div:nth-child(3) { flex: 0; min-width: 24px; transform: translateX(1px); }
        > div:nth-child(4) { flex: 10; }
        > div:nth-child(5) { flex: 8; }
        > div:nth-child(6) { flex: 8; }
        > div:nth-child(7) { flex: 0;}
    }
}
</style>
