import * as THREE from 'three';
import { CameraController } from './CameraController';
import { Color, WebGLRenderer } from 'three';

export class Environment {
    private _scene: THREE.Scene
    private _camera: CameraController
    private _renderer: WebGLRenderer
    constructor() {
        this._scene = new THREE.Scene()
        this._scene.background = new Color('grey');
        this._renderer = this.initRenderer()
        this._camera = new CameraController(this._renderer.domElement)
        this.addLight()
    }

    public get camera() {
        return this._camera
    }

    public get scene() {
        return this._scene
    }

    public get renderer() {
        return this._renderer
    }

    private initRenderer() {
        const renderer = new THREE.WebGLRenderer()
        renderer.shadowMap.enabled = true
        renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(renderer.domElement);
        renderer.setClearColor(0x000000, 1.0);
        renderer.setSize(window.innerWidth, window.innerHeight);
        return renderer
    }

    private addLight() {
        const light = new THREE.DirectionalLight(0xffffff, 2)
        light.castShadow = true

        light.position.set(2, 3, 4)
        light.lookAt(-3, 10, -3)
        this._scene.add(light)
    }

    public animate = () => {
        requestAnimationFrame(this.animate);
        this._renderer.render(this.scene, this.camera.camera);
    }
}