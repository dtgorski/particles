<template>
    <fieldset v-show="groups.length">
        <legend>Rules</legend>
        <div>
            <div></div>
            <div v-show="rules.length">Group A</div>
            <div v-show="rules.length">G force</div>
            <div v-show="rules.length">Group B</div>
            <div :class="hasActiveGroups(groups) ? '' : 'disabled'">
                <button
                    title="Add rule"
                    class="icon-button"
                    @click="append()">
                    <Icon icon="mdi:plus" />
                </button>
            </div>
        </div>
        <div v-for="(rule, ruleIndex) in rules" :key=rule.id>
            <div>
                <button
                    title="On/Off"
                    class="icon-button"
                    @click="toggle(ruleIndex)">
                    <Icon icon="mdi:checkbox-marked-outline" v-if="rule.active" />
                    <Icon icon="mdi:checkbox-blank-outline" v-else />
                </button>
            </div>
            <div :class="rule.active ? '' : 'disabled'">
                <select @change="select(ruleIndex, $event, 'A')">
                    <option
                        v-for="group in groups"
                        :key="rule.id + group.id + 'A'"
                        :selected="rule.groupA === group.id"
                        :disabled=!group.active
                        :value=group.id
                    >{{ group.label }}
                    </option>
                </select>
            </div>
            <div :class="rule.active ? '' : 'disabled'">
                <input type="number" v-model=rule.repulse step="0.01" min="-1" max="1">
            </div>
            <div :class="rule.active ? '' : 'disabled'">
                <select @change="select(ruleIndex, $event, 'B')">
                    <option
                        v-for="group in groups"
                        :key="rule.id + group.id + 'B'"
                        :selected="rule.groupB === group.id"
                        :disabled=!group.active
                        :value=group.id
                    >{{ group.label }}
                    </option>
                </select>
            </div>
            <div>
                <button
                    title="Remove rule"
                    class="icon-button"
                    @click="remove(ruleIndex)">
                    <Icon icon="mdi:delete" />
                </button>
            </div>
        </div>
    </fieldset>
</template>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<script lang="ts">
    import { Icon } from "@iconify/vue";
    import { defineComponent } from "vue";
    import { createRandomRule, getGroupById, getRuleGroupIds, Group, hasActiveGroups, model } from "@/Model";

    export default defineComponent({
        name: "RulesEditView",
        components: { Icon },
        methods: {
            append: () => {
                const rule = createRandomRule(model.groups);
                rule ? model.rules.push(rule) : null;
            },
            remove: (index: number) => {
                model.rules.splice(index, 1);
            },
            toggle: (index: number) => {
                if (!model.rules[index].active) {
                    const [ A, B ] = getRuleGroupIds(model.rules[index]);
                    const groupA = getGroupById(model.groups, A);
                    const groupB = getGroupById(model.groups, B);

                    if (groupA?.active && groupB?.active) {
                        model.rules[index].active = true;
                    }
                    return;
                }
                model.rules[index].active = false;
            },
            select: (index: number, ev: Event, groupName: string) => {
                let value: string = (ev.target as HTMLSelectElement).value;
                groupName == "A" ? model.rules[index].groupA = value : null;
                groupName == "B" ? model.rules[index].groupB = value : null;
            },
            hasActiveGroups: (groups: Group[]): boolean => {
                return hasActiveGroups(groups);
            },
        },
        setup: () => {
            return {
                groups: model.groups,
                rules: model.rules
            };
        },
    });
</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<style scoped lang="scss">
@import "@/assets/css.scss";

fieldset {
    width: 410px;

    > div {
        gap: 4px;
        display: flex;
        align-items: center;
        justify-content: flex-end;

        > div {
            font-size: smaller;
            color: $color-pri;
            text-align: center;
            @extend %user-select-none;
            @extend %text-shadow;
        }
        > div:nth-child(1) { width: 24px; }
        > div:nth-child(2) { width: 128px; }
        > div:nth-child(3) { width: 64px; }
        > div:nth-child(4) { width: 128px; }
        > div:nth-child(5) { width: 24px; }
    }

    option {
        @extend %text-shadow;
        padding: 2px;
        font-size: small;
        background: $bg-color-3;
        line-height: 125%;

        &:disabled {
            color: #999;
            background: $bg-color-4;
        }
    }
}
</style>
