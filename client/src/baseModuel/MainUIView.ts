/**
 *
 * @author
 *
 */

class MainUIView extends egret.DisplayObjectContainer {
    private static _instance:MainUIView;
    /*
     * 主界面按钮层
     * */
    public mainLayer:egret.DisplayObjectContainer;

    public winMap:Dictionary = new Dictionary();
    public currentShowView:string[] = [];

    public constructor() {
        super();
        this.mainLayer = new egret.DisplayObjectContainer();
        this.mainLayer.name = 'mainLayer';
        this.addChild(this.mainLayer);
    }

    public static getInstance():MainUIView {
        if (MainUIView._instance == null) {
            MainUIView._instance = new MainUIView();
        }
        return MainUIView._instance;
    }

    /**
     *
     * @param view  界面view
     * @param meadiatorName 界面mediator
     * @param show  是否显示
     * @param viewParent    是否自定义显示层级
     */
    public showView(view:BaseUI, meadiatorName:string, show:Boolean = false, viewParent?:string):void {
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
    }

    public showViewByMediatorName(meadiatorName:string):void {
        if (this.winMap.containsKey(meadiatorName)) {
            var win:BaseUI = this.winMap.getValue(meadiatorName);
            win.show();
        }
    }

    public closeAllView():void {
        var i:number;
        var m:number = this.currentShowView.length;
//        console.log("closeAllView 未删除之前面板数量 = " + m);
        for (i = 0; i < m; i++) {
            var name:string = this.currentShowView[i];
            //特殊的修改-》如果是主界面不删除
            if (name == "MainBottomMediator") continue;
            this.closeView(name);
            i--;
            m = this.currentShowView.length
        }
    }

    public getViewIsShow(meadiatorName:string):boolean {
        var win:BaseUI = this.winMap.getValue(meadiatorName);
        if (win) {
            return win.visible;
        }
        return false
    }

    public hideView(meadiatorName:string):void {
        var win:BaseUI = this.winMap.getValue(meadiatorName);
        if (win) {
            win.hide();
        }
    }

    public closeView(meadiatorName:string):void {
        //console.log("closeView = " + meadiatorName);
        var index:number = this.currentShowView.indexOf(meadiatorName);
        if (index !== -1) {
            this.currentShowView.splice(index, 1)
        }
        if (this.winMap.containsKey(meadiatorName)) {
            var win:BaseUI = this.winMap.getValue(meadiatorName);
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
    }

    public  destoryResource(meadiatorName:string):void {
        // switch (meadiatorName) {
        //     case "TaptitansMainMediator":
        //         RES.destroyRes("taptitans");
        //         break;
        // }
    }

    public isOpened(name:string):boolean {
        return this.winMap.containsKey(name);
    }
}