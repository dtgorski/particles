import { GroupId } from "@/context/Group";

export type Picker = {
    active: boolean
    groupId: GroupId
}

export const PickerCtx = {

    createPicker: (groupId: GroupId): Picker => {
        return { active: true, groupId: groupId };
    },

    createNullPicker: (): Picker => {
        return { active: false, groupId: "" };
    }
};
