/**
 *
 * @author
 *
 */
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
var MainUIView = (function (_super) {
    __extends(MainUIView, _super);
    function MainUIView() {
        var _this = _super.call(this) || this;
        _this.winMap = new Dictionary();
        _this.currentShowView = [];
        _this.mainLayer = new egret.DisplayObjectContainer();
        _this.mainLayer.name = 'mainLayer';
        _this.addChild(_this.mainLayer);
        return _this;
    }
    MainUIView.getInstance = function () {
        if (MainUIView._instance == null) {
            MainUIView._instance = new MainUIView();
        }
        return MainUIView._instance;
    };
    /**
     *
     * @param view  界面view
     * @param meadiatorName 界面mediator
     * @param show  是否显示
     * @param viewParent    是否自定义显示层级
     */
    MainUIView.prototype.showView = function (view, meadiatorName, show, viewParent) {
        if (show === void 0) { show = false; }
        if (!this.winMap.containsKey(meadiatorName)) {
            this.winMap.add(meadiatorName, view);
            this.mainLayer.addChild(view);
            this.currentShowView.push(meadiatorName);
            if (show) {
                view.show();
            }
            else {
                view.hide();
            }
            //this.isDealMainLogic(meadiatorName, true);
        }
    };
    MainUIView.prototype.showViewByMediatorName = function (meadiatorName) {
        if (this.winMap.containsKey(meadiatorName)) {
            var win = this.winMap.getValue(meadiatorName);
            win.show();
        }
    };
    MainUIView.prototype.closeAllView = function () {
        var i;
        var m = this.currentShowView.length;
        //        console.log("closeAllView 未删除之前面板数量 = " + m);
        for (i = 0; i < m; i++) {
            var name = this.currentShowView[i];
            //特殊的修改-》如果是主界面不删除
            if (name == "MainBottomMediator")
                continue;
            this.closeView(name);
            i--;
            m = this.currentShowView.length;
        }
    };
    MainUIView.prototype.getViewIsShow = function (meadiatorName) {
        var win = this.winMap.getValue(meadiatorName);
        if (win) {
            return win.visible;
        }
        return false;
    };
    MainUIView.prototype.hideView = function (meadiatorName) {
        var win = this.winMap.getValue(meadiatorName);
        if (win) {
            win.hide();
        }
    };
    MainUIView.prototype.closeView = function (meadiatorName) {
        //console.log("closeView = " + meadiatorName);
        var index = this.currentShowView.indexOf(meadiatorName);
        if (index !== -1) {
            this.currentShowView.splice(index, 1);
        }
        if (this.winMap.containsKey(meadiatorName)) {
            var win = this.winMap.getValue(meadiatorName);
            win.hide();
            AppFacade.getInstance().delMediatorByName(meadiatorName);
            this.winMap.remove(meadiatorName);
            if (win.parent) {
                win.parent.removeChild(win);
            }
            win.dispose();
            win = null;
            this.destoryResource(meadiatorName);
            // this.isDealMainLogic(meadiatorName, false);
        }
    };
    MainUIView.prototype.destoryResource = function (meadiatorName) {
        // switch (meadiatorName) {
        //     case "TaptitansMainMediator":
        //         RES.destroyRes("taptitans");
        //         break;
        // }
    };
    MainUIView.prototype.isOpened = function (name) {
        return this.winMap.containsKey(name);
    };
    return MainUIView;
}(egret.DisplayObjectContainer));
__reflect(MainUIView.prototype, "MainUIView");
