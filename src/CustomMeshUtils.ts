import { BoxGeometry, Color, DoubleSide, Mesh, MeshPhongMaterial, MeshStandardMaterial, PlaneGeometry, RepeatWrapping, Scene, SphereGeometry, TextureLoader, Vector3 } from 'three';
import { CustomTextureLoader } from './loaders/CustomTextureLoader';
import { CustomModel } from './loaders/CustomModel';

export class CustomMeshUtils {
    static async createGround(width: number, height: number, texturePath: string, position: Vector3) {
        const textureLoader = new CustomTextureLoader()
        const texture = await textureLoader.downloadTexture(texturePath)
        texture.wrapS = texture.wrapT = RepeatWrapping;
        const groundMaterial = new MeshPhongMaterial({
            map: texture,
            side: DoubleSide,
        });

        const groundMesh = new Mesh(
            new PlaneGeometry(width, height),
            groundMaterial
        );

        groundMesh.position.y = position.y;
        groundMesh.rotation.x = position.x;
        groundMesh.receiveShadow = true;
        return groundMesh
    }
    //______________________________________
    static async createWall(width: number, height: number, color: Color, position: Vector3, rotationY?: number) {
        const wallMaterail = new MeshPhongMaterial({ color: color })
        const wall = new Mesh(
            new PlaneGeometry(width, height),
            wallMaterail
        );

        wall.position.copy(position)
        if (rotationY) {
            wall.rotateY(rotationY)
        }
        return wall
    }
    //______________________________________
    static async createDoor(width: number, height: number, position?: Vector3) {
        const doorDepth = 0.2;
        const doorGeometry = new BoxGeometry(width, height, doorDepth);

        const textureLoader = new TextureLoader();
        const doorTexture = await textureLoader.load('textures/door.jpeg');

        const doorMaterial = new MeshStandardMaterial({
            map: doorTexture,
            roughness: 0.7,
            metalness: 0.2
        });

        const door = new Mesh(doorGeometry, doorMaterial);
        door.userData.type = 'door'
        if (position) {
            door.position.copy(position)
        }

        return door
    }
    //______________________________________
    static async updateDoorDimensions(scene: Scene, door: Mesh, width: number, height: number) {
        if (width > 6 || width < 2 || height > 6 || height < 4) return
        const lastPos = door.position.clone()
        scene.remove(door);

        const newDoor = await CustomMeshUtils.createDoor(width, height)
        newDoor.position.set(lastPos.x, height / 2, lastPos.z)
        scene.add(newDoor);
    }
    //______________________________________
    static async downloadCustomModel(path: string, position: Vector3, rotationY: number) {
        const model = await new CustomModel().download(path)
        const mesh = model.scene
        mesh.position.copy(position)
        if (rotationY) {
            mesh.rotateY(rotationY)
        }

        mesh.castShadow = true
        return mesh
    }
    //_____________________________________
    static async createSphereModel(path: string, radius: number, position: Vector3) {
        const textureBall = await new CustomTextureLoader().downloadTexture(path)
        const ballMaterail = new MeshPhongMaterial({
            map: textureBall
        });
        const sphere = new SphereGeometry(radius)
        const sphereMesh = new Mesh(sphere, ballMaterail)
        sphereMesh.position.copy(position)

        sphereMesh.castShadow = true
        return sphereMesh
    }
}