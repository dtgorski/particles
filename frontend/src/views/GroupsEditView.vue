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
                    @click=toggle(i)>
                    <Icon icon="mdi:checkbox-marked-outline" v-if=group.active />
                    <Icon icon="mdi:checkbox-blank-outline" v-else />
                </button>
            </div>
            <div>
                <input
                    type="text"
                    spellcheck="false"
                    v-model=group.label
                >
            </div>
            <div>
                <button
                    title="Change color"
                    class="icon-button"
                    style="opacity: 1 !important;"
                    :style="{ color: group.color }">
                    <Icon icon="mdi:palette" />
                </button>

            </div>
            <div><input type="number" v-model=group.count min="1" step="1"></div>
            <div><input v-model=group.mass min="0" step="0.1" class="disabled" style="text-align: center" tabindex="-1">
            </div>
            <div><input type="number" v-model=group.size min="0" step="1"></div>
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
</template>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<script lang="ts">
    import { Icon } from "@iconify/vue";
    import { defineComponent } from "vue";
    import { model } from "@/model";
    import { GroupCtx } from "@/model/GroupCtx";
    import { RuleCtx } from "@/model/RuleCtx";

    export default defineComponent({
        components: { Icon },
        methods: {
            append: () => {
                model.groups.push(GroupCtx.createRandomGroup());
            },
            remove: (index: number) => {
                const affected = model.groups[index];
                model.groups.splice(index, 1);

                let i = model.rules.length;
                while (i--) {
                    if (model.rules[i].actorA.groupId == affected.id ||
                        model.rules[i].actorB.groupId == affected.id) {
                        model.rules.splice(i, 1);
                    }
                }
            },
            toggle: (index: number) => {
                const affected = model.groups[index];
                model.groups[index].active = !affected.active;

                // Deactivate rules depending on this group.
                if (!model.groups[index].active) {
                    for (let i = 0; i < model.rules.length; i++) {
                        if (RuleCtx.hasActor(model.rules[i], affected.id)) {
                            model.rules[i].active = false;
                        }
                    }
                    return;
                }

                // Group has been activated, check if we can reactivate rules.
                for (let i = 0; i < model.rules.length; i++) {
                    if (RuleCtx.hasActor(model.rules[i], affected.id)) {
                        const [ a, b ] = RuleCtx.getActors(model.rules[i]);
                        const groupA = GroupCtx.getGroupById(model.groups, a.groupId);
                        const groupB = GroupCtx.getGroupById(model.groups, b.groupId);

                        if (groupA?.active && groupB?.active) {
                            model.rules[i].active = true;
                        }
                    }
                }
            },
        },
        setup: () => { return model; },
    });
</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<style scoped lang="scss">
@import "@/assets/css.scss";

fieldset {
    > div {
        display: flex;
        gap: 4px;
        align-items: center;
        justify-content: flex-end;

        > div {
            font-size: smaller;
            color: $color-pri;
            text-align: center;
            @extend %text-shadow;
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
#color-picker {
    background-color: #000 !important;
}
</style>
