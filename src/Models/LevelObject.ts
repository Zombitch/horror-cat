export default class LevelObject {
    private _identifier: string;
    public get identifier(): string {
        return this._identifier;
    }
    public set identifier(value: string) {
        this._identifier = value;
    }
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

    private _objectRef: Phaser.GameObjects.GameObject;
    public get objectRef(): Phaser.GameObjects.GameObject {
        return this._objectRef;
    }
    public set objectRef(value: Phaser.GameObjects.GameObject) {
        this._objectRef = value;
    }

    constructor(identifier, name, x, y, hasCollider){
        this.identifier = identifier;
        this.name = name;
        this.x = x;
        this.y = y;
        this.hasCollider = hasCollider;
    }

    static find(identifier: string, objList: LevelObject[]): LevelObject{
        return objList.find(obj => obj.identifier === identifier);
    }
}