/**
 *
 * @author
 *
 */
class BaseUI extends eui.Component {
    private _groupName:string = "";

    public constructor() {
        super();
        this.addEventListener(egret.Event.COMPLETE, this.createCompleteEvent, this);
    }

    public onResourceLoadComplete(e:RES.ResourceEvent):void {
        if (e.groupName == this._groupName) {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            this.addEventListener(egret.Event.COMPLETE, this.createCompleteEvent, this);
            this.loadSkin();
        }
    }

    public onResourceLoadError(e:RES.ResourceEvent):void {
        console.log("Group:" + e.groupName + "---load失败！");
    }

    public loadSkin():void {
    }

    public addItem(child:egret.DisplayObject):void {
        var index:number = this.numChildren;
        if (index < 1) {
            this.addChildAt(child, index);
        } else {
            this.addChildAt(child, index);
        }

    }

    public createCompleteEvent(e:egret.Event):void {
    }

    public center():void {
    }

    public show():void {
        this.visible = true;
    }

    public hide():void {
        this.visible = false;
    }

    public dispose():void {

    }
}
