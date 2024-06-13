"use client";

import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import Agent1 from "../World/Agent1";
import Map from "../World/Map";
import { DirectionalLight, HemisphereLight } from "three";
import Agent2 from "../World/Agent2";

export default function Scene() {
	const cameraRef = useRef(null);
	const hemiLight = new HemisphereLight(0xffffff, 0xfffffff, 0.6);
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
		<Canvas shadows>
			<Environment preset="sunset" background backgroundBlurriness={0.2} />
			<hemisphereLight {...hemiLight} />/
			<directionalLight {...light} />
			<ambientLight intensity={0.1} />
			<PerspectiveCamera makeDefault position={[0, 1, -3]} ref={cameraRef} />
			<OrbitControls camera={cameraRef.current} />
			<Map />
			{/* <Agent1 camera={cameraRef.current} /> */}
			<Agent2 camera={cameraRef.current} />
		</Canvas>
	);
}
