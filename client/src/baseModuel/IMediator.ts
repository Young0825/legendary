/**
 *
 * @author
 *
 */
module interfaces {
    export interface IMediator {
        onViewRegister(): void;

        onViewRemove(): void;

        onEventCenterRegister(): void;

        onEventCenterRemove(): void;
    }
}