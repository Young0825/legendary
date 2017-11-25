/**
 *
 * @author
 *
 */

class Dictionary implements interfaces.IDictionary {

    _keys:any[] = [];
    _values:any[] = [];

    constructor() {
    }

    add(key:any, value:any) {
        this[key] = value;
        var keyIndex:number = this._keys.indexOf(key);
        if (keyIndex === -1) {
            this._keys.push(key);
            this._values.push(value);
        } else {
            this._keys[keyIndex] = key;
            this._values[keyIndex] = value;
        }
    }

    remove(key:any) {
        //console.debug(JSON.stringify(this._keys))
        var index = this._keys.indexOf(key, 0);
        this._keys.splice(index, 1);
        this._values.splice(index, 1);

        delete this[key];
    }

    clean():void {
        var i:number, m:number = this._keys.length;
        for (i = 0; i < m; i++) {
            var key:any = this._keys[i]
            delete this[key];
        }
        this._keys = [];
        this._values = [];
    }

    keys():any[] {
        return this._keys;
    }

    values():any[] {
        return this._values;
    }

    containsKey(key:any) {
        if (typeof this[key] === "undefined") {
            return false;
        }

        return true;
    }

    toLookup():interfaces.IDictionary {
        return this;
    }

    getValue(key:any):any {
        return this[key];
    }
}