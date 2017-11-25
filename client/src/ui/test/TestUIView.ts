module ui {
    export class TestUIView extends BaseUI {
        public getBtn:eui.Button;
        public inputEditor:eui.EditableText;
        public dataLabel:eui.Label;

        public constructor() {
            super();
            this.skinName = TestUISkin;
        }

        public createCompleteEvent(e:egret.Event):void {
            AppFacade.getInstance().registerMediator(new TestUIMediator(this));
        }
    }
}