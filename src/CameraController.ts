import { PerspectiveCamera } from "three"
import { OrbitControls } from "three/examples/jsm/Addons.js"

export class CameraController {
    private _camera: PerspectiveCamera
    private _orbitController: OrbitControls
    constructor(rendererDomElement: HTMLElement) {
        this._camera = this.initCamera()
        this._orbitController = this.addOrbitController(rendererDomElement)
    }

    public get cameraController() {
        return this._orbitController
    }
    public get camera() {
        return this._camera
    }

    private initCamera() {
        const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        camera.position.set(4, 4, 4)
        return camera
    }
    private addOrbitController(rendererDomElement: HTMLElement) {
        return new OrbitControls(this._camera, rendererDomElement)
    }
}