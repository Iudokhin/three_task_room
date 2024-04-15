import { GLTFLoader } from "three/examples/jsm/Addons.js";

export class CustomModel {
    private _loader: GLTFLoader
    constructor() {
        this._loader = new GLTFLoader();
    }

    public async download(path: string) {
        return await this._loader.loadAsync(path)
    }
}