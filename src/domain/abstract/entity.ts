export class Entity {
    private _key?: number;
    constructor(key?: number) {
        this._key = key
    }

    get key(): number {
        if(this._key == null) {
            throw new Error(`${this.toString()} was not saved at stable storage yet`)
        }
        return this._key
    }
}