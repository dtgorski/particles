<template>
    <fieldset v-show=groups.length>
        <legend>Rules</legend>
        <div>
            <div></div>
            <div v-show=rules.length>Group A</div>
            <div></div>
            <div>
                <button
                    v-show=rules.length
                    title="Flip all signs"
                    class="icon-button"
                    @click=flipSigns>
                    <Icon icon="mdi:plus-minus-variant" />
                </button>
            </div>
            <div v-show=rules.length>Gravity</div>
            <div></div>
            <div v-show=rules.length>Group B</div>
            <div :class="hasActiveGroups(groups) ? '' : 'disabled'">
                <button
                    title="Add rule"
                    class="icon-button"
                    @click=append>
                    <Icon icon="mdi:plus" />
                </button>
            </div>
        </div>
        <div v-for="(rule, i) in rules" :key=rule.id>
            <div>
                <button
                    title="On/Off"
                    class="icon-button"
                    @click=toggle(i)>
                    <Icon icon="mdi:checkbox-marked-outline" v-if=rule.active />
                    <Icon icon="mdi:checkbox-blank-outline" v-else />
                </button>
            </div>
            <div :class="rule.active ? '' : 'disabled'">
                <select @change="select(i, $event, 'A')">
                    <option
                        v-for="group in groups"
                        :key="rule.id + group.id + 'A'"
                        :selected="rule.actorA.groupId === group.id"
                        :disabled=!group.active
                        :value=group.id
                    >{{ group.label }}
                    </option>
                </select>
            </div>
            <div>
                <Icon icon="mdi:checkbox-blank-circle"
                      :style="{
                            color: getGroupById(rule.actorA.groupId).colorValue,
                            width: getGroupById(rule.actorA.groupId).particleSize * 2
                      }"
                />
            </div>
            <div>
                <button
                    title="Flip sign"
                    class="icon-button"
                    @click="flipSign(i)">
                    <Icon icon="mdi:plus-minus-variant" />
                </button>
            </div>
            <div>
                <input type="number" v-model=rule.gravity step="0.01" min="-1" max="1" />
            </div>
            <div>
                <Icon icon="mdi:checkbox-blank-circle"
                      :style="{
                            color: getGroupById(rule.actorB.groupId).colorValue,
                            width: getGroupById(rule.actorB.groupId).particleSize * 2
                      }"
                />
            </div>
            <div :class="rule.active ? '' : 'disabled'">
                <select @change="select(i, $event, 'B')">
                    <option
                        v-for="group in groups"
                        :key="rule.id + group.id + 'B'"
                        :selected="rule.actorB.groupId === group.id"
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
                    @click="remove(i)">
                    <Icon icon="mdi:delete-outline" />
                </button>
            </div>
        </div>
    </fieldset>
</template>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<script lang="ts">
    import { Icon } from "@iconify/vue";
    import { defineComponent } from "vue";

    import { Group, GroupCtx, GroupId } from "@/context/Group";
    import { RuleCtx } from "@/context/Rule";
    import { model } from "@/model";

    const PanelRulesEdit = defineComponent({
        components: { Icon },
        methods: {
            append: () => {
                const rule = RuleCtx.createRandomRule(model.groups);
                rule ? model.rules.push(rule) : null;
            },
            remove: (index: number) => {
                model.rules.splice(index, 1);
            },
            flipSign: (index: number) => {
                model.rules[index].gravity *= -1;
            },
            flipSigns: () => {
                model.rules.forEach(rule => rule.gravity *= -1);
            },
            toggle: (index: number) => {
                RuleCtx.toggleActive(model.rules[index], model.groups);
            },
            select: (index: number, ev: Event, groupName: string) => {
                const rule = model.rules[index];
                const elm = (ev.target as HTMLSelectElement);
                groupName == "A"
                    ? rule.actorA.groupId = elm.value
                    : rule.actorB.groupId = elm.value;
                elm.blur();
            },
            hasActiveGroups: (groups: Group[]): boolean => {
                return GroupCtx.hasActiveGroups(groups);
            },
            getGroupById: (groupId: GroupId): Group | undefined => {
                return GroupCtx.getGroupById(model.groups, groupId);
            }
        },
        setup: () => { return model; },
    });

    export default PanelRulesEdit;
</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<style scoped lang="scss">
@import "@/assets/css.scss";

fieldset {
    > div {
        display: flex;
        align-items: center;
        justify-content: flex-end;

        > div {
            @extend %text-shadow;
            color: $color-pri;
            font-size: smaller;
            margin: 0 2px;
            text-align: center;
        }

        > div:nth-child(1) { flex: 0; min-width: 24px; margin-left: 0; }
        > div:nth-child(2) { flex: 8; min-width: 96px; }
        > div:nth-child(3) { flex: 0; min-width: 24px;
            svg { max-width: 24px; }
        }
        > div:nth-child(4) { flex: 0; min-width: 24px; height: 18px;
            svg { width: 18px; height: 18px; }
        }
        > div:nth-child(5) { flex: 8; }
        > div:nth-child(6) { flex: 0; min-width: 24px;
            svg { max-width: 24px; }
        }
        > div:nth-child(7) { flex: 8; min-width: 96px; }
        > div:nth-child(8) { flex: 0; min-width: 24px; margin-right: 0;}
    }

    option {
        @extend %text-shadow;
        background: $bg-color-3;
        font-size: small;
        line-height: 125%;
        padding: 2px;

        &:disabled {
            background: $bg-color-4;
            color: #999;
        }
    }

    input[type=number] {
        font-family: monospace;
        text-align: right !important;
    }
}
</style>
