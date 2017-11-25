var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ui;
(function (ui) {
    var TestUIMediator = (function (_super) {
        __extends(TestUIMediator, _super);
        function TestUIMediator(viewCompont) {
            return _super.call(this, TestUIMediator.NAME, viewCompont) || this;
        }
        Object.defineProperty(TestUIMediator.prototype, "view", {
            get: function () {
                return this.viewComponent;
            },
            enumerable: true,
            configurable: true
        });
        TestUIMediator.prototype.onViewRegister = function () {
            //注册事件
            this.view.getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getBtnFunc, this);
        };
        TestUIMediator.prototype.onViewRemove = function () {
            this.view.getBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.getBtnFunc, this);
        };
        TestUIMediator.prototype.onEventCenterRegister = function () {
        };
        TestUIMediator.prototype.onEventCenterRemove = function () {
        };
        TestUIMediator.prototype.openPanel = function () {
        };
        TestUIMediator.prototype.getBtnFunc = function (e) {
            var _view = this.view;
            FormGetRequest.init("http://127.0.0.1:8080/" + _view.inputEditor.text, "", function (data) {
                console.log(JSON.stringify(data));
                _view.dataLabel.text = "" + JSON.stringify(data);
            });
        };
        TestUIMediator.NAME = "TestUIMediator";
        return TestUIMediator;
    }(Mediator));
    ui.TestUIMediator = TestUIMediator;
    __reflect(TestUIMediator.prototype, "ui.TestUIMediator");
})(ui || (ui = {}));
