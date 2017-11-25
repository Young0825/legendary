var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var FormPostRequest;
var FormPostRequestClass = (function () {
    function FormPostRequestClass() {
        this.rpcQueue = [];
        this.urlLoader = new egret.URLLoader();
        //监听
        this.urlLoader.addEventListener(egret.Event.COMPLETE, this.urlLoadComplete, this);
        this.urlLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
        //设置加载方式
        this.urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        this.urlRequest = new egret.URLRequest();
    }
    FormPostRequestClass.prototype.init = function (url, data, cb, err, cmdErr) {
        var options = { url: url, data: data, cb: cb, err: err, cmdErr: cmdErr };
        var empty = this.rpcQueue.length == 0;
        this.rpcQueue.push(options);
        if (empty) {
            this._rpc();
            //this.request(route, msg, cb, fail, noRefresh);
        }
    };
    FormPostRequestClass.prototype._rpc = function (options) {
        if (!options) {
            if (this.rpcQueue.length == 0)
                return;
            options = this.rpcQueue[0];
        }
        if (options) {
            //console.log("_rpc发送事件 = " + options.msg.__action );
            this.sendAction(options.url, options.data, options.cb, options.err, options.cmdErr);
        }
    };
    FormPostRequestClass.prototype.sendAction = function (url, data, cb, err, cmdErr) {
        FormPostRequest._cb = cb;
        FormPostRequest._err = err;
        FormPostRequest._cmdErr = cmdErr;
        var _data = data; //+ "&t=" + moment().unix();
        this.urlRequest.url = url;
        this.urlRequest.method = egret.URLRequestMethod.POST;
        this.urlRequest.data = new egret.URLVariables(_data);
        this.urlLoader.load(this.urlRequest);
    };
    FormPostRequestClass.prototype.onLoadError = function (e) {
        console.log(e);
    };
    FormPostRequestClass.prototype.urlLoadComplete = function (e) {
        var self = this;
        var loader = e.currentTarget;
        if (!loader.data) {
            var _postData = self.rpcQueue[0];
            alert("发送请求失败\n错误url:" + _postData.url);
            self.rpcQueue.shift();
            return;
        }
        var data = JSON.parse(loader.data);
        if (data.errcode != 0) {
            console.log("出现问题 =>" + data.errmsg);
        }
        else {
            if (FormPostRequest._cb && typeof (FormPostRequest._cb) == "function") {
                FormPostRequest._cb(data.data);
            }
        }
        //继续下一个
        self.rpcQueue.shift();
        //console.log("数据返回之后 self.rpcQueue.length = " + self.rpcQueue.length);
        if (self.rpcQueue.length > 0) {
            self._rpc();
        }
    };
    return FormPostRequestClass;
}());
__reflect(FormPostRequestClass.prototype, "FormPostRequestClass");
