import { useLoader } from "@react-three/fiber";
import { RepeatWrapping, TextureLoader, Vector2 } from "three";

export default function Ground() {
	const color = useLoader(TextureLoader, "/textures/ground/rubber_tiles_diff_1k.jpg");
	const arm = useLoader(TextureLoader, "/textures/ground/rubber_tiles_arm_1k.jpg");
	const nor = useLoader(TextureLoader, "/textures/ground/rubber_tiles_nor_gl_1k.jpg");

	color.wrapS = RepeatWrapping;
	arm.wrapS = RepeatWrapping;
	nor.wrapS = RepeatWrapping;
	color.wrapT = RepeatWrapping;
	arm.wrapT = RepeatWrapping;
	nor.wrapT = RepeatWrapping;
	color.repeat = new Vector2(10, 10);
	arm.repeat = new Vector2(10, 10);
	nor.repeat = new Vector2(10, 10);

	return (
		<mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow={true}>
			<planeGeometry args={[20, 20, 10, 10]} />
			<meshStandardMaterial map={color} aoMap={arm} roughnessMap={arm} metalnessMap={arm} normalMap={nor} />
		</mesh>
	);
}
