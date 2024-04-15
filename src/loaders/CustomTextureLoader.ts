import { TextureLoader } from "three"


export class CustomTextureLoader {
    private _loader: TextureLoader
    constructor() {
        this._loader = new TextureLoader()
    }
    public async downloadTexture(path: string) {
        const texture = await this._loader.load(path)
        return texture
    }
}