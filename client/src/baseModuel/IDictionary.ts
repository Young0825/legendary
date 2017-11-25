/**
 *
 * @author
 *
 */
module interfaces {
    export interface IDictionary {
        add(key:number, value:any): void;
        remove(key:number): void;
        containsKey(key:number): boolean;
        keys(): number[];
        values(): any[];
        getValue(key:number): any;
    }
}
