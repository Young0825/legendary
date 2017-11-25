let FormPostRequest:FormPostRequestClass;
class FormPostRequestClass {
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

    public init(url:string, data:string, cb:any, err?:any, cmdErr?:any):void {
        let options = {url: url, data: data, cb: cb, err: err, cmdErr: cmdErr};
        let empty = this.rpcQueue.length == 0;
        this.rpcQueue.push(options);
        if (empty) {
            this._rpc();
            //this.request(route, msg, cb, fail, noRefresh);
        }
    }

    public _rpc(options?:any) {
        if (!options) {
            if (this.rpcQueue.length == 0) return;
            options = this.rpcQueue[0];
        }
        if (options) {
            //console.log("_rpc发送事件 = " + options.msg.__action );
            this.sendAction(options.url, options.data, options.cb, options.err, options.cmdErr);
        }
    }

    private sendAction(url:string, data:string, cb:any, err?:any, cmdErr?:any):void {
        
        FormPostRequest._cb = cb;
        FormPostRequest._err = err;
        FormPostRequest._cmdErr = cmdErr;

        let _data = data //+ "&t=" + moment().unix();
        this.urlRequest.url = url;
        this.urlRequest.method = egret.URLRequestMethod.POST;
        this.urlRequest.data = new egret.URLVariables(_data);
        this.urlLoader.load(this.urlRequest);
    }

    private onLoadError(e:egret.Event) {
        console.log(e);
        
    }

    private urlLoadComplete(e:egret.Event) {
        let self = this;
        var loader:egret.URLLoader = <egret.URLLoader>e.currentTarget;
        if(!loader.data) {
            let _postData = self.rpcQueue[0];
            alert("发送请求失败\n错误url:" + _postData.url);
            self.rpcQueue.shift();
            return;
        }
        var data:any = JSON.parse(loader.data);
        if (data.errcode != 0) {
            console.log("出现问题 =>" + data.errmsg);
        } else {
            if (FormPostRequest._cb && typeof(FormPostRequest._cb) == "function") {
                FormPostRequest._cb(data.data);
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