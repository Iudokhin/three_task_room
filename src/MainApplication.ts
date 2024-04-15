import './style.css'
import { Environment } from './Environment'
import { Color, Group, Mesh, Object3D, Vector3 } from 'three';
import { DEG2RAD } from 'three/src/math/MathUtils.js';
import { CustomMeshUtils } from './CustomMeshUtils';

export class MainApplication {
    private SCENE_ENVIRONMENT: Environment
    private PARTS_CONTAINER: Array<Mesh | Group | Object3D> = []

    constructor() {
        this.SCENE_ENVIRONMENT = new Environment()
        this.init()
        this.createEnvObjects()
    }
    //___________________________________
    private init() {
        const width = document.getElementById('width') as HTMLInputElement
        const height = document.getElementById('height') as HTMLInputElement
        const generate = document.getElementById('generate')
        generate?.addEventListener('click', () => {

            if (width?.value !== '' && height?.value !== '') {
                const doorOnScene = this.SCENE_ENVIRONMENT.scene.children.find(el => el.userData.type === 'door') as Mesh
                if (doorOnScene) {
                    CustomMeshUtils.updateDoorDimensions(this.SCENE_ENVIRONMENT.scene, doorOnScene, +width.value, +height.value)
                }

            }
        })
    }
    //___________________________________
    private async createEnvObjects() {
        await this.downloadAll()
        this.renderParts()
    }
    //____________________________________
    private async downloadAll() {
        this.PARTS_CONTAINER = await Promise.all([
            CustomMeshUtils.createGround(15, 15, 'textures/wood.jpg', new Vector3(-Math.PI / 2, 0, 0)),
            CustomMeshUtils.createWall(15, 7, new Color('#8A9A5B'), new Vector3(0, 3.5, -7.5)),
            CustomMeshUtils.createWall(15, 7, new Color('#8A9A5B'), new Vector3(-7.5, 3.5, 0), DEG2RAD * 90),
            CustomMeshUtils.downloadCustomModel('models/shiba.glb', new Vector3(-2, 1, -1), DEG2RAD * 70),
            CustomMeshUtils.createSphereModel('textures/ball.jpeg', 0.2, new Vector3(0, 1, 0)),
            CustomMeshUtils.createDoor(2.5, 5, new Vector3(-4, 2.5, -7.5))
        ])
    }
    //____________________________________
    private renderParts() {
        for (let part of this.PARTS_CONTAINER) {
            this.SCENE_ENVIRONMENT.scene.add(part)
        }
    }
    //____________________________________
    public animate() {
        this.SCENE_ENVIRONMENT.animate()
    }
}
