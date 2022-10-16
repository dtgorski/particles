<template>
    <fieldset>
        <legend>Particle groups</legend>
        <div class="header">
            <div></div>
            <div v-show=model.groups.length>Label</div>
            <div></div>
            <div v-show=model.groups.length>Particles</div>
            <div v-show=model.groups.length class="disabled">Mass</div>
            <div v-show=model.groups.length>Size</div>
            <div>
                <ButtonIcon icon="mdi-plus" title="Add random particle group" @click="appendGroup" />
            </div>
        </div>

        <div v-for="(group, i) in model.groups" :key=group.id>
            <div>
                <ButtonIcon
                    v-show="group.active"
                    title="On/Off"
                    icon="mdi:checkbox-marked-outline"
                    @click=toggleGroupActive(i) />
                <ButtonIcon
                    v-show="!group.active"
                    title="On/Off"
                    icon="mdi:checkbox-blank-outline"
                    @click=toggleGroupActive(i) />
            </div>
            <div>
                <input type="text" spellcheck="false" v-model=group.label />
            </div>
            <div>
                <ButtonIcon
                    icon="mdi:palette"
                    title="Change color"
                    :style="{ color: group.colorValue }"
                    @click.stop="showColorPicker($event, i)" />
            </div>
            <div><input type="number" v-model=group.particleCount min="1" step="1" /></div>
            <div><input type="text" value="n/a" class="disabled" style="text-align: center"></div>
            <div><input type="number" v-model=group.particleSize min="0" step="1" /></div>
            <div>
                <ButtonIcon icon="mdi:delete-outline" title="Remove group" @click="removeGroup(i)" />
            </div>
        </div>
    </fieldset>

    <PopupColorPicker id="popup-color-picker" v-show=model.colorPicker.active @colorPick=onColorPick />
</template>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<script setup lang="ts">
    import { Popper } from "@/context/Popper";
    import { inject } from "vue";
    import { ColorData } from "@/context/Color";
    import { GroupCtx } from "@/context/Group";
    import { ColorPicker } from "@/context/ColorPicker";
    import { RuleCtx } from "@/context/Rule";
    import { model } from "@/model";
    import { $ } from "@/util";

    const popper = inject("popper") as Popper;

    const appendGroup = () => {
        model.groups.push(GroupCtx.createRandomGroup());
    };

    const removeGroup = (index: number) => {
        const group = model.groups[index];
        GroupCtx.removeGroup(model.groups, group);
        RuleCtx.removeRulesWithGroup(model.rules, group);
    };

    const toggleGroupActive = (index: number) => {
        const group = model.groups[index];
        GroupCtx.toggleActive(group);
        RuleCtx.deactivateRules(model.rules, group);
        RuleCtx.reactivateRules(model.rules, model.groups, group);
    };

    const showColorPicker = (e: MouseEvent, index: number) => {
        const elm = $("#popup-color-picker");
        if (!elm) { return; }

        elm.style.top = (e.clientY - 8) + "px";
        elm.style.left = (e.clientX - 8) + "px";

        model.colorPicker = new ColorPicker(model.groups[index].id);
        popper.activate(model.colorPicker);
    };

    const onColorPick = (color: ColorData) => {
        const group = GroupCtx.getGroupById(model.groups, model.colorPicker.groupId);
        group ? GroupCtx.setGroupColor(group, color) : null;
    };
</script>

<script lang="ts">
    import { Icon } from "@iconify/vue";
    import { defineComponent } from "vue";
    import ButtonIcon from "@/component/ButtonIcon.vue";
    import PopupColorPicker from "@/views/popup/PopupColorPicker.vue";

    export default defineComponent({
        name: "PanelGroupEdit",
        components: {
            ButtonIcon,
            Icon,
            PopupColorPicker,
        },
    });
</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<style scoped lang="scss">
@import "@/assets/vars.scss";

fieldset {
    input[type=number] { text-align: center; }

    > div {
        align-items: center;
        display: flex;

        > div {
            @extend %text-shadow;
            color: $color-pri;
            text-align: center;
        }

        > div:nth-child(1) { width: 24px; }
        > div:nth-child(2) { margin-left: 4px; flex: 12; }
        > div:nth-child(3) { margin-left: 4px; width: 24px; }
        > div:nth-child(4) { margin-left: 4px; flex: 8; }
        > div:nth-child(5) { margin-left: 8px; flex: 6; }
        > div:nth-child(6) { margin-left: 8px; flex: 6; }
        > div:nth-child(7) { margin-left: 2px; width: 24px; }
    }

    .header {
        font-size: $font-small;
        justify-content: flex-end;
    }
}
</style>
