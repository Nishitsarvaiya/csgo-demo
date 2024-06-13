'use client';

import { Environment, PerspectiveCamera, Sky } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { Suspense, useRef } from 'react';
import { DirectionalLight, HemisphereLight } from 'three';
import Character from '../World/Character';
import Pine from '../World/Pine';

export default function Scene() {
	const cameraRef = useRef(null);
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
		<Canvas shadows gl={{ antialias: true }}>
			<Sky />
			<Environment preset='sunset' />
			<hemisphereLight {...hemiLight} />/
			<directionalLight {...light} />
			<ambientLight intensity={0.1} />
			<PerspectiveCamera makeDefault position={[0, 1, -3]} ref={cameraRef} />
			{/* <OrbitControls camera={cameraRef.current} /> */}
			<Suspense>
				<Physics gravity={[0, 1, 0]} debug>
					<Pine />
					<Character camera={cameraRef.current} />
				</Physics>
			</Suspense>
		</Canvas>
	);
}
