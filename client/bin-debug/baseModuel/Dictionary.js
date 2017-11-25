/**
 *
 * @author
 *
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Dictionary = (function () {
    function Dictionary() {
        this._keys = [];
        this._values = [];
    }
    Dictionary.prototype.add = function (key, value) {
        this[key] = value;
        var keyIndex = this._keys.indexOf(key);
        if (keyIndex === -1) {
            this._keys.push(key);
            this._values.push(value);
        }
        else {
            this._keys[keyIndex] = key;
            this._values[keyIndex] = value;
        }
    };
    Dictionary.prototype.remove = function (key) {
        //console.debug(JSON.stringify(this._keys))
        var index = this._keys.indexOf(key, 0);
        this._keys.splice(index, 1);
        this._values.splice(index, 1);
        delete this[key];
    };
    Dictionary.prototype.clean = function () {
        var i, m = this._keys.length;
        for (i = 0; i < m; i++) {
            var key = this._keys[i];
            delete this[key];
        }
        this._keys = [];
        this._values = [];
    };
    Dictionary.prototype.keys = function () {
        return this._keys;
    };
    Dictionary.prototype.values = function () {
        return this._values;
    };
    Dictionary.prototype.containsKey = function (key) {
        if (typeof this[key] === "undefined") {
            return false;
        }
        return true;
    };
    Dictionary.prototype.toLookup = function () {
        return this;
    };
    Dictionary.prototype.getValue = function (key) {
        return this[key];
    };
    return Dictionary;
}());
__reflect(Dictionary.prototype, "Dictionary", ["interfaces.IDictionary"]);
