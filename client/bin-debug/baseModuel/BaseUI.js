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
/**
 *
 * @author
 *
 */
var BaseUI = (function (_super) {
    __extends(BaseUI, _super);
    function BaseUI() {
        var _this = _super.call(this) || this;
        _this._groupName = "";
        _this.addEventListener(egret.Event.COMPLETE, _this.createCompleteEvent, _this);
        return _this;
    }
    BaseUI.prototype.onResourceLoadComplete = function (e) {
        if (e.groupName == this._groupName) {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            this.addEventListener(egret.Event.COMPLETE, this.createCompleteEvent, this);
            this.loadSkin();
        }
    };
    BaseUI.prototype.onResourceLoadError = function (e) {
        console.log("Group:" + e.groupName + "---load失败！");
    };
    BaseUI.prototype.loadSkin = function () {
    };
    BaseUI.prototype.addItem = function (child) {
        var index = this.numChildren;
        if (index < 1) {
            this.addChildAt(child, index);
        }
        else {
            this.addChildAt(child, index);
        }
    };
    BaseUI.prototype.createCompleteEvent = function (e) {
    };
    BaseUI.prototype.center = function () {
    };
    BaseUI.prototype.show = function () {
        this.visible = true;
    };
    BaseUI.prototype.hide = function () {
        this.visible = false;
    };
    BaseUI.prototype.dispose = function () {
    };
    return BaseUI;
}(eui.Component));
__reflect(BaseUI.prototype, "BaseUI");
