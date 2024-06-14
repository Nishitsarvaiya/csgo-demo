/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.18 public/models/Agent2/agent-2.gltf 
*/

import { useAnimations, useGLTF } from "@react-three/drei";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Character({ name, url, scale, ...restProps }) {
	const router = useRouter();
	const character = useRef();
	const { scene, nodes, materials, animations } = useGLTF(url);
	const { actions } = useAnimations(animations, character);

	scene.scale.setScalar(scale);
	scene.traverse((obj) => {
		if (obj.type === "SkinnedMesh") {
			obj.castShadow = true;
			obj.receiveShadow = true;
		}
	});

	useEffect(() => {
		actions?.Idle.play();
	}, []);

	const onCharacterClick = () => {
		router.push("/scene?character=" + name);
	};

	return <primitive object={scene} ref={character} {...restProps} onPointerDown={onCharacterClick} />;
}

useGLTF.preload("/models/Soldier/soldier.gltf");
useGLTF.preload("/models/Eve/eve.gltf");
