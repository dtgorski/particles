<template>
    <fieldset>
        <legend>Settings</legend>
        <div id="settings">
            <div id="setting-1">
                <div>
                    <ButtonIcon v-show=model.ui.ruleLabelsVisible icon="mdi:checkbox-marked-outline" title="On/Off"
                                @click=toggleDisplayRuleNames() id="1" />
                    <ButtonIcon v-show=!model.ui.ruleLabelsVisible icon="mdi:checkbox-blank-outline" title="On/Off"
                                @click=toggleDisplayRuleNames() id="1" />
                </div>
                <label for="1">Attraction rule labels</label>
            </div>
        </div>
    </fieldset>
</template>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<script setup lang="ts">
    import { model } from "@/model";

    const toggleDisplayRuleNames = () => {
        model.ui.ruleLabelsVisible = !model.ui.ruleLabelsVisible;
    };
</script>

<script lang="ts">
    import { defineComponent } from "vue";
    import ButtonIcon from "@/component/ButtonIcon.vue";

    export default defineComponent({
        name: "PanelSettingsEdit",
        components: { ButtonIcon },
    });
</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->

<style scoped lang="scss">
@import "@/assets/vars.scss";

fieldset {
    padding-top: 8px;
    Xalign-self: flex-end;

    #settings {
        display: flex;
        align-items: center;

        #setting-1 {
            display: flex;
            align-items: center;
            gap: 8px;
            width: 50%;

            > :nth-child(1) {
                width: 24px;
            }
        }
    }
}
</style>
