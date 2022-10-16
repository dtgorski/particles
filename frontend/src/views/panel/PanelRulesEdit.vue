<template>
    <fieldset v-show=model.groups.length>
        <legend>Attraction rules</legend>
        <div id="header">
            <div></div>
            <div v-show=model.rules.length></div>
            <div v-show=model.rules.length>
                <div id="attraction">
                    <ButtonIcon icon="mdi:arrow-left-thin" title="Decrease all" />
                    <ButtonIcon icon="mdi:plus-minus-variant" title="Flip all signs" @click=flipSigns />
                    <ButtonIcon icon="mdi:arrow-right-thin" title="Increase all" />
                </div>
            </div>
            <div v-show=model.rules.length></div>
            <div>
                <ButtonIcon icon="mdi:plus" title="Add rule" :class=css.class.append() @click=append />
            </div>
        </div>

        <div v-for="(rule, i) in model.rules" :key=rule.id>
            <div>
                <ButtonIcon v-show=rule.active icon="mdi:checkbox-marked-outline" title="On/Off" @click=toggle(i) />
                <ButtonIcon v-show=!rule.active icon="mdi:checkbox-blank-outline" title="On/Off" @click=toggle(i) />
            </div>
            <div class="group-current" @click.stop="showGroupPicker($event, { actor: 'A', ruleId: rule.id }, false)">
                <div v-show="model.groups.length > 1 && model.ui.ruleLabelsVisible">
                    <Icon icon="mdi:chevron-down" />
                </div>
                <div v-show=model.ui.ruleLabelsVisible>{{ groupLabel(rule.actorA.groupId) }}</div>
                <div>
                    <Icon icon="mdi:checkbox-blank-circle" :style=css.style.particle(rule.actorA.groupId) />
                </div>
            </div>
            <div>
                <SlidexSimplex :value=rule.attraction :min=-1 :max=1 @change="changeAttraction($event, i)" />
            </div>
            <div class="group-current rtl" @click.stop="showGroupPicker($event, { actor: 'B', ruleId: rule.id }, true)">
                <div v-show="model.groups.length > 1 && model.ui.ruleLabelsVisible">
                    <Icon icon="mdi:chevron-down" />
                </div>
                <div v-show=model.ui.ruleLabelsVisible>{{ groupLabel(rule.actorB.groupId) }}</div>
                <div>
                    <Icon icon="mdi:checkbox-blank-circle" :style=css.style.particle(rule.actorB.groupId) />
                </div>
            </div>
            <div>
                <ButtonIcon icon="mdi:delete-outline" title="Remove rule" @click=remove(i) />
            </div>
        </div>
    </fieldset>

    <PopupGroupPicker id="popup-group-picker" v-show=model.groupPicker.active @groupPick=onGroupPick />
</template>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<script setup lang="ts">
    import { Popper } from "@/context/Popper";
    import { inject } from "vue";
    import { Group, GroupCtx, GroupId } from "@/context/Group";
    import { Actor, RuleCtx, RuleId } from "@/context/Rule";
    import { GroupPicker } from "@/context/GroupPicker";
    import { model } from "@/model";
    import { $ } from "@/util";

    type PoppedOutActor = { actor: "A" | "B", ruleId: RuleId }
    let currentActor: PoppedOutActor = { actor: "A", ruleId: "" };

    const popper = inject("popper") as Popper;

    const append = () => {
        const rule = RuleCtx.createRandomRule(model.groups);
        rule ? model.rules.push(rule) : null;
    };

    const remove = (index: number) => {
        model.rules.splice(index, 1);
    };

    const toggle = (index: number) => {
        RuleCtx.toggleActive(model.rules[index], model.groups);
    };

    const flipSigns = () => {
        model.rules.forEach(rule => rule.attraction *= -1);
    };

    const groupById = (groupId: GroupId): Group | undefined => {
        return GroupCtx.getGroupById(model.groups, groupId);
    };

    const groupLabel = (groupId: GroupId): string => {
        const group = groupById(groupId);
        return group ? group.label : "";
    };

    const showGroupPicker = (e: MouseEvent, actor: PoppedOutActor, rtl: boolean) => {
        const elm = $("#popup-group-picker");
        if (!elm) { return; }

        elm.style.top = (e.clientY - 8) + "px";
        elm.style.left = (e.clientX - 8) + "px";
        elm.style.direction = rtl ? "rtl" : "ltr";

        currentActor = actor;
        model.groupPicker = new GroupPicker("");
        popper.activate(model.groupPicker);
    };

    const onGroupPick = (groupId: GroupId) => {
        const rule = RuleCtx.getRuleById(model.rules, currentActor.ruleId);
        if (!rule) { return; }

        currentActor.actor == "A" ? rule.actorA = { groupId } as Actor : null;
        currentActor.actor == "B" ? rule.actorB = { groupId } as Actor : null;
    };

    const changeAttraction = (value: number, index: number) => {
        model.rules[index].attraction = value;
    };

    const css = {
        class: {
            append: (): string => GroupCtx.hasActiveGroups(model.groups) ? "" : "disabled"
        },
        style: {
            particle: (groupId: GroupId): Partial<CSSStyleDeclaration> => {
                const group = groupById(groupId);
                return group ? { color: group.colorValue, width: (group.particleSize * 2) + "px" } : {};
            },
        }
    };
</script>

<script lang="ts">
    import { Icon } from "@iconify/vue";
    import { defineComponent } from "vue";
    import ButtonIcon from "@/component/ButtonIcon.vue";
    import SlidexSimplex from "@/component/SlidexSimplex.vue";
    import PopupGroupPicker from "@/views/popup/PopupGroupPicker.vue";

    export default defineComponent({
        name: "PanelRulesEdit",
        components: {
            ButtonIcon,
            Icon,
            PopupGroupPicker,
            SlidexSimplex,
        },
    });
</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<style scoped lang="scss">
@import "@/assets/vars.scss";

fieldset {
    > div {
        align-items: center;
        display: flex;

        > div {
            @extend %text-shadow;
            color: $color-pri;
            text-align: center;
        }

        > div:nth-child(1) { width: 24px; }
        > div:nth-child(2) { margin-left: 4px; }
        > div:nth-child(3) { margin-left: 8px; flex: 1; }
        > div:nth-child(4) { margin-left: 8px;}
        > div:nth-child(5) { margin-left: 2px; width: 24px; height: 28px; }
    }

    #header {
        font-size: $font-small;
        justify-content: flex-end;

        #attraction {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 32px;
            padding-bottom: 4px;

            div {
                display: flex;
                justify-content: center;
            }
        }
    }

    .rtl { direction: rtl; }

    .group-current {
        @extend %outset;
        display: flex;
        background-color: $bg-color-4;
        cursor: pointer;

        &:hover { background-color: $color-hover; }
        &:active { background-color: $color-active; }

        svg {
            width: 24px;
            height: 24px;
        }
        > div:nth-child(1) {
            @extend %drop-shadow;
            align-items: center;
            color: $color-tri;
            display: flex;
            justify-content: center;
            scale: 0.85;

        }
        > div:nth-child(2) {
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
        > div:nth-child(3) {
            @extend %drop-shadow;
            align-items: center;
            display: flex;
            flex: 0;
            justify-content: center;
            min-width: 20px;
            max-width: 20px;
        }
    }
}
</style>
