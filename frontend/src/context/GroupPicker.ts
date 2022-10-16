import { GroupId } from "@/context/Group";
import { Popup } from "@/model";

export class GroupPicker implements Popup {

    public active = false;
    public groupId = "";

    constructor(groupId: GroupId) {
        this.groupId = groupId;
    }
}
