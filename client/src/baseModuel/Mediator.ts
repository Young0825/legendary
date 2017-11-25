/**
 *
 * @author
 *
 */
class Mediator {
    private _viewComponent:egret.DisplayObjectContainer;
    private _name:string;
    public callBackView:string = "";

    /**
     *
     * @param name
     * @param viewComponent
     * @param scaleView  true 不需要弹出动画效果。 false或无 为弹出效果
     */
    public constructor(name:string, viewComponent:egret.DisplayObjectContainer, scaleView?:boolean) {

        let self = this;
        this.name = name;
        this.viewComponent = viewComponent;
        this.init();
        this.onEventCenterRegister();
        this.onViewRegister();
        this.openPanel();
        (<BaseUI>this._viewComponent).center();

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

    public init():void{

    }

    public onViewRegister():void {

    }

    public onViewRemove():void {

    }

    public onEventCenterRegister():void {

    }

    public onEventCenterRemove():void {

    }

    public openPanel():void {

    }

    public removeListener():void {
        this.onEventCenterRemove();
        this.onViewRemove();
        this.viewComponent = null;
    }

    public get name():string {
        return this._name;
    }

    public set name(value:string) {
        this._name = value;
    }

    public get viewComponent():egret.DisplayObjectContainer {
        return this._viewComponent;
    }

    public set viewComponent(value:egret.DisplayObjectContainer) {
        this._viewComponent = value;
    }

    public callback():void {

    }

    //为主界面特殊使用->初始化选择的状态
    public initSelectedGroup():void {

    }

    //为主界面特殊使用->控制打开大的面板，或小的面板
    public openPanelView(num:number):void {

    }
}
