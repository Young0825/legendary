module ui {
    export class TestUIMediator extends Mediator {
        public static NAME: string = "TestUIMediator";

        constructor(viewCompont: egret.DisplayObjectContainer) {
            super(TestUIMediator.NAME, viewCompont);
        }

        public get view(): ui.TestUIView {
            return <ui.TestUIView>this.viewComponent;
        }

        public onViewRegister(): void {
            //注册事件
            this.view.getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getBtnFunc, this)
        }

        public onViewRemove(): void {
            this.view.getBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.getBtnFunc, this)
        }

        public onEventCenterRegister(): void {
        }

        public onEventCenterRemove(): void {
        }

        public openPanel(): void {

        }

        public getBtnFunc(e: egret.TouchEvent): void {
            let _view = this.view;

            FormGetRequest.init(`http://127.0.0.1:8080/${_view.inputEditor.text}`, ``, (data) => {
                console.log(JSON.stringify(data));
                _view.dataLabel.text = `${JSON.stringify(data)}`
            })
        }
    }
}