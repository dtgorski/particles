<template>
    <fieldset>
        <legend>Groups</legend>
        <div>
            <div></div>
            <div v-show="groups.length">Label</div>
            <div></div>
            <div v-show="groups.length">Particles</div>
            <div v-show="groups.length">Mass</div>
            <div v-show="groups.length">Size</div>
            <div>
                <button
                    title="Add random particle group"
                    class="icon-button"
                    @click="append()">
                    <Icon icon="mdi:plus" />
                </button>
            </div>
        </div>
        <div v-for="(group, i) in groups" :key=group.id>
            <div>
                <button
                    title="On/Off"
                    class="icon-button"
                    @click="toggle(i)">
                    <Icon icon="mdi:checkbox-marked-outline" v-if=group.active />
                    <Icon icon="mdi:checkbox-blank-outline" v-else />
                </button>
            </div>
            <div>
                <input spellcheck="false" type="text" v-model=group.label>
            </div>
            <div>
                <button
                    title="Change color"
                    class="icon-button disabled"
                    style="opacity: 1 !important;"
                    :style="{ color: group.color }">
                    <Icon icon="mdi:palette" />
                </button>
            </div>
            <div><input type="number" v-model=group.count min="1" step="1"></div>
            <div><input type="number" v-model=group.mass min="0" step="0.1"></div>
            <div><input type="number" v-model=group.size min="0" step="1"></div>
            <div>
                <button
                    title="Remove group"
                    class="icon-button"
                    @click="remove(i)">
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
    import { Chrome } from "vue-color";

    import { createRandomGroup, getGroupById, getRuleGroupIds, Group, model, ruleHasGroupId } from "@/Model";

    export default defineComponent({
        name: "GroupsEditView",
        components: { Icon, "chrome-picker": Chrome },
        methods: {
            append: () => {
                model.groups.push(createRandomGroup());
            },
            remove: (index: number) => {
                const removed = model.groups[index];
                model.groups.splice(index, 1);

                let i = model.rules.length;
                while (i--) {
                    if (model.rules[i].groupA == removed.id ||
                        model.rules[i].groupB == removed.id) {
                        model.rules.splice(i, 1);
                    }
                }
            },
            toggle: (index: number) => {
                const group: Group = model.groups[index];
                model.groups[index].active = !model.groups[index].active;

                // Deactivate rules depending on this group.
                if (!model.groups[index].active) {
                    for (let i = 0; i < model.rules.length; i++) {
                        if (ruleHasGroupId(model.rules[i], group.id)) {
                            model.rules[i].active = false;
                        }
                    }
                    return;
                }

                // Group has been activated, check if we can reactivate rules.
                for (let i = 0; i < model.rules.length; i++) {
                    if (ruleHasGroupId(model.rules[i], group.id)) {
                        const [ A, B ] = getRuleGroupIds(model.rules[i]);
                        const groupA = getGroupById(model.groups, A);
                        const groupB = getGroupById(model.groups, B);

                        if (groupA?.active && groupB?.active) {
                            model.rules[i].active = true;
                        }
                    }
                }
            },
        },
        setup: () => {
            return model;
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
        > div:nth-child(3) { width: 24px; }
        > div:nth-child(4) { width: 64px; }
        > div:nth-child(5) { width: 48px; }
        > div:nth-child(6) { width: 48px; }
        > div:nth-child(7) { width: 24px; }
    }
}
</style>
