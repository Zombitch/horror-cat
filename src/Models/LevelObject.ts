export default class LevelObject {
    private _name: string;
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }

    private _x: number;
    public get x(): number {
        return this._x;
    }
    public set x(value: number) {
        this._x = value;
    }

    private _y: number;
    public get y(): number {
        return this._y;
    }
    public set y(value: number) {
        this._y = value;
    }

    private _hasCollider: boolean;
    public get hasCollider(): boolean {
        return this._hasCollider;
    }
    public set hasCollider(value: boolean) {
        this._hasCollider = value;
    }

    constructor(name, x, y, hasCollider){
        this.name = name;
        this.x = x;
        this.y = y;
        this.hasCollider = hasCollider;
    }
}