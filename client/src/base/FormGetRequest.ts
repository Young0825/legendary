let FormGetRequest:FormGetRequestClass;
class FormGetRequestClass {
    public  _cb:any;
    public  _err:any;
    public _cmdErr:any;
    public rpcQueue = [];
    private urlLoader:egret.URLLoader;
    private urlRequest:egret.URLRequest;
    constructor() {
        this.urlLoader = new egret.URLLoader();
        //监听
        this.urlLoader.addEventListener(egret.Event.COMPLETE, this.urlLoadComplete, this);
        this.urlLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
        //设置加载方式
        this.urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;

        this.urlRequest = new egret.URLRequest();
    }
    public init(url:string, data:string, cb:any, err?:any, _cmdErr?:any):void {
        let options = {url: url, data: data, cb: cb, err: err, _cmdErr:_cmdErr};
        let empty = this.rpcQueue.length == 0;
        this.rpcQueue.push(options);
        if (empty) {
            this._rpc();
        }
    }

    public _rpc(options?:any) {
        if (!options) {
            if (this.rpcQueue.length == 0) return;
            options = this.rpcQueue[0];
        }
        if (options) {
            //console.log("_rpc发送事件 = " + options.msg.__action );
            this.sendAction(options.url, options.data, options.cb, options.err, options._cmdErr);
        }
    }

    public sendAction(url:string, data:string, cb:any, err?:any, _cmdErr?:any):void {
        FormGetRequest._cb = cb;
        FormGetRequest._err = err;
        FormGetRequest._cmdErr = _cmdErr;

        let _data = data;// + "&t=" + moment().unix();
        this.urlRequest.url = url;
        this.urlRequest.method = egret.URLRequestMethod.GET;
        this.urlRequest.data = new egret.URLVariables(_data);
        this.urlLoader.load(this.urlRequest);

    }

    private onLoadError(eve:egret.IOErrorEvent) {
        let _url = "";
        let self = this;
    }

    private  urlLoadComplete(e:egret.Event) {
        let self = this;
        var loader:egret.URLLoader = <egret.URLLoader>e.currentTarget;
        var data:any = JSON.parse(loader.data);

        if(data.errcode != 0) {
            console.log("出现问题 =>" + data.errmsg);
        } else {
            if (this._cb && typeof(this._cb) == "function") {
                this._cb(data.data);
            }
        }

        //继续下一个
        self.rpcQueue.shift();
        //console.log("数据返回之后 self.rpcQueue.length = " + self.rpcQueue.length);
        if (self.rpcQueue.length > 0) {
            self._rpc();
        }
    }
}