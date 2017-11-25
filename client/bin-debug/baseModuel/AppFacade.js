/**
 *
 * @author
 *
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AppFacade = (function () {
    function AppFacade() {
        this.mediatorDictionary = new Dictionary();
    }
    AppFacade.getInstance = function () {
        if (this.instance == null) {
            this.instance = new AppFacade();
        }
        return this.instance;
    };
    AppFacade.prototype.registerMediator = function (mediator) {
        this.mediatorDictionary[mediator.name] = mediator;
    };
    AppFacade.prototype.getMediatorByName = function (name) {
        return this.mediatorDictionary[name];
    };
    AppFacade.prototype.delMediatorByName = function (name) {
        var med = this.mediatorDictionary[name];
        if (med) {
            med.removeListener();
        }
        this.mediatorDictionary[name] = null;
        delete this.mediatorDictionary[name];
    };
    AppFacade.prototype.getMediatorDictionary = function () {
        return this.mediatorDictionary;
    };
    return AppFacade;
}());
__reflect(AppFacade.prototype, "AppFacade");
