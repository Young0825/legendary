var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var Mediator = (function () {
    /**
     *
     * @param name
     * @param viewComponent
     * @param scaleView  true 不需要弹出动画效果。 false或无 为弹出效果
     */
    function Mediator(name, viewComponent, scaleView) {
        this.callBackView = "";
        var self = this;
        this.name = name;
        this.viewComponent = viewComponent;
        this.init();
        this.onEventCenterRegister();
        this.onViewRegister();
        this.openPanel();
        this._viewComponent.center();
        // if (viewComponent && viewComponent["maskImage"]) {
        //     viewComponent["maskImage"].alpha = 0;
        //     var _tween = egret.Tween.get(viewComponent["maskImage"]).to({alpha: 1}, 200).call(function () {
        //         if(viewComponent["maskImage"]) {
        //             egret.Tween.removeTweens(viewComponent["maskImage"]);                    
        //         }
        //     })
        // }
        // if (scaleView) {
        //     this.viewComponent.anchorOffsetX = this.viewComponent.width / 2;
        //     this.viewComponent.anchorOffsetY = this.viewComponent.height / 2;
        //     this.viewComponent.x += this.viewComponent.width / 2;
        //     this.viewComponent.y += this.viewComponent.height / 2;
        //     this.viewComponent.scaleX = 0.8;
        //     this.viewComponent.scaleY = 0.8;
        //     egret.Tween.get(this.viewComponent).to({scaleX: 1, scaleY: 1}, 200, egret.Ease.bounceOut).call(()=>{
        //         if(self && self.viewComponent) {
        //             egret.Tween.removeTweens(self.viewComponent);                    
        //         }
        //     });
        // }
    }
    Mediator.prototype.init = function () {
    };
    Mediator.prototype.onViewRegister = function () {
    };
    Mediator.prototype.onViewRemove = function () {
    };
    Mediator.prototype.onEventCenterRegister = function () {
    };
    Mediator.prototype.onEventCenterRemove = function () {
    };
    Mediator.prototype.openPanel = function () {
    };
    Mediator.prototype.removeListener = function () {
        this.onEventCenterRemove();
        this.onViewRemove();
        this.viewComponent = null;
    };
    Object.defineProperty(Mediator.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mediator.prototype, "viewComponent", {
        get: function () {
            return this._viewComponent;
        },
        set: function (value) {
            this._viewComponent = value;
        },
        enumerable: true,
        configurable: true
    });
    Mediator.prototype.callback = function () {
    };
    //为主界面特殊使用->初始化选择的状态
    Mediator.prototype.initSelectedGroup = function () {
    };
    //为主界面特殊使用->控制打开大的面板，或小的面板
    Mediator.prototype.openPanelView = function (num) {
    };
    return Mediator;
}());
__reflect(Mediator.prototype, "Mediator");
