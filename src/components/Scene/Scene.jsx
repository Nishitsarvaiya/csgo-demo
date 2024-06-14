"use client";

import { Environment, OrbitControls, PerspectiveCamera, Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense, useRef } from "react";
import { DirectionalLight, HemisphereLight } from "three";
import Player from "../World/Player";
import Map from "../World/Map";
import { useSearchParams } from "next/navigation";

const CHARACTERS = {
	Soldier: {
		url: "/models/Soldier/soldier.gltf",
		scale: 0.0108,
	},
	Eve: {
		url: "/models/Eve/eve.gltf",
		scale: 1.2,
	},
};

export default function Scene() {
	const query = useSearchParams();
	const character = CHARACTERS[query.get("character")];

	const hemiLight = new HemisphereLight(0xffffff, 0xfffffff, 1.0);
	hemiLight.color.setHSL(0.6, 1, 0.6);
	hemiLight.groundColor.setHSL(0.095, 1, 0.75);

	const light = new DirectionalLight(0xfdb813, 5.0);
	light.position.set(-100, 100, 100);
	light.target.position.set(0, 0, 0);
	light.castShadow = true;
	light.shadow.bias = -0.001;
	light.shadow.mapSize.width = 2048;
	light.shadow.mapSize.height = 2048;
	light.shadow.camera.near = 0.1;
	light.shadow.camera.far = 500.0;
	light.shadow.camera.left = 100;
	light.shadow.camera.right = -100;
	light.shadow.camera.top = 100;
	light.shadow.camera.bottom = -100;

	return (
		<Canvas shadows gl={{ antialias: true, powerPreference: "high-performance" }} dpr={[1, 2]}>
			<Sky />
			<Environment preset="sunset" />
			<hemisphereLight {...hemiLight} />/
			<directionalLight {...light} />
			<ambientLight intensity={0.1} />
			<PerspectiveCamera makeDefault position={[0, 8, 10]} />
			<OrbitControls />
			<Suspense>
				{/* <Physics gravity={[0, 1, 0]} debug> */}
				<Map />
				<Player url={character.url} scale={character.scale} />
				{/* </Physics> */}
			</Suspense>
		</Canvas>
	);
}
