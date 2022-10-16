import { Popup } from "@/model";
import { on, un } from "@/util";

export class Popper {

    private current: Popup | undefined;

    activate(popup: Popup): void {

        const removeListeners = (): boolean => {
            un(document, "click", removeListeners);
            un(window, "resize", removeListeners);

            if (this.current) {
                this.current.active = false;
                this.current = undefined;
            }
            return true;
        };
        removeListeners();

        on(document, "click", removeListeners);
        on(window, "resize", removeListeners);

        this.current = popup;
        this.current.active = true;
    }
}
