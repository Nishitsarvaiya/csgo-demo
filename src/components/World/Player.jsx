/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.18 public/models/Agent2/agent-2.gltf 
*/

import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useCallback, useEffect, useRef } from "react";
import { Quaternion, Vector3 } from "three";

export default function Player({ url, scale, ...restProps }) {
	const character = useRef();
	const { scene, nodes, materials, animations } = useGLTF(url);
	const { actions } = useAnimations(animations, character);

	scene.scale.setScalar(scale);
	scene.traverse((obj) => {
		if (obj.type === "Mesh") {
			obj.castShadow = true;
			obj.receiveShadow = true;
		}
	});

	let currAction = animations.find((anim) => anim.name === "Idle")[0];
	let prevAction;

	const activeAnimation = useRef({
		forward: false,
		backward: false,
		left: false,
		right: false,
		run: false,
		dance: false,
	});

	const currentPosition = new Vector3();
	const currentLookAt = new Vector3();
	const decceleration = new Vector3(-0.0005, -0.0001, -5.0);
	const acceleration = new Vector3(1, 0.125, 10.0);
	const velocity = new Vector3(0, 0, 0);

	// Controll Input
	const handleKeyPress = useCallback((event) => {
		switch (event.keyCode) {
			case 87: //w
				activeAnimation.current.forward = true;
				break;

			case 65: //a
				activeAnimation.current.left = true;
				break;

			case 83: //s
				activeAnimation.current.backward = true;
				break;

			case 68: // d
				activeAnimation.current.right = true;
				break;

			case 16: // shift
				activeAnimation.current.run = true;
				break;
		}
	}, []);

	const handleKeyUp = useCallback((event) => {
		switch (event.keyCode) {
			case 87: //w
				activeAnimation.current.forward = false;
				break;

			case 65: //a
				activeAnimation.current.left = false;
				break;

			case 83: //s
				activeAnimation.current.backward = false;
				break;

			case 68: // d
				activeAnimation.current.right = false;
				break;

			case 16: // shift
				activeAnimation.current.run = false;
				break;
		}
	}, []);

	const calculateIdealOffset = () => {
		const idealOffset = new Vector3(0, 2, -3);
		idealOffset.applyQuaternion(character.current.quaternion);
		idealOffset.add(character.current.position);
		return idealOffset;
	};

	const calculateIdealLookat = () => {
		const idealLookat = new Vector3(0, 1.4, 0);
		idealLookat.applyQuaternion(character.current.quaternion);
		idealLookat.add(character.current.position);
		return idealLookat;
	};

	const updateCameraTarget = (delta, camera) => {
		const idealOffset = calculateIdealOffset();
		const idealLookat = calculateIdealLookat();

		const t = 1.0 - Math.pow(0.001, delta);

		currentPosition.lerp(idealOffset, t);
		currentLookAt.lerp(idealLookat, t);
		camera.position.copy(currentPosition);
	};

	// movement
	const characterState = (delta, camera) => {
		const newVelocity = velocity;
		const frameDecceleration = new Vector3(
			newVelocity.x * decceleration.x,
			newVelocity.y * decceleration.y,
			newVelocity.z * decceleration.z
		);
		frameDecceleration.multiplyScalar(delta);
		frameDecceleration.z =
			Math.sign(frameDecceleration.z) * Math.min(Math.abs(frameDecceleration.z), Math.abs(newVelocity.z));

		newVelocity.add(frameDecceleration);

		const controlObject = character.current;
		const _Q = new Quaternion();
		const _A = new Vector3();
		const _R = controlObject.quaternion.clone();

		const acc = acceleration.clone();
		if (activeAnimation.current.run) {
			acc.multiplyScalar(3.25);
		}

		if (activeAnimation.current.forward) {
			newVelocity.z += acc.z * delta;
		}
		if (activeAnimation.current.backward) {
			newVelocity.z -= acc.z * delta;
		}
		if (activeAnimation.current.left) {
			_A.set(0, 1, 0);
			_Q.setFromAxisAngle(_A, 6.0 * Math.PI * delta * acceleration.y);
			_R.multiply(_Q);
		}
		if (activeAnimation.current.right) {
			_A.set(0, 1, 0);
			_Q.setFromAxisAngle(_A, 6.0 * -Math.PI * delta * acceleration.y);
			_R.multiply(_Q);
		}

		controlObject.quaternion.copy(_R);

		const oldPosition = new Vector3();
		oldPosition.copy(controlObject.position);

		const forward = new Vector3(0, 0, 1);
		forward.applyQuaternion(controlObject.quaternion);
		forward.normalize();

		const sideways = new Vector3(1, 0, 0);
		sideways.applyQuaternion(controlObject.quaternion);
		sideways.normalize();

		sideways.multiplyScalar(newVelocity.x * delta);
		forward.multiplyScalar(newVelocity.z * delta);

		controlObject.position.add(forward);
		controlObject.position.add(sideways);

		character.current.position.copy(controlObject.position);
		updateCameraTarget(delta, camera);
	};

	useFrame((state, delta) => {
		prevAction = currAction;

		if (activeAnimation.current.forward) {
			if (activeAnimation.current.run) {
				currAction = actions.Run;
			} else {
				currAction = actions.Walk;
			}
		} else if (activeAnimation.current.backward) {
			currAction = actions.Back;
		} else {
			currAction = actions.Idle;
		}
		if (prevAction !== currAction) {
			prevAction?.fadeOut(0.6);

			if (prevAction === actions.Walk) {
				const ratio = currAction.getClip().duration / prevAction.getClip().duration;
				currAction.time = prevAction.time * ratio;
			}

			currAction.reset().play();
		} else {
			currAction.play();
		}

		characterState(delta, state.camera);
		const idealLookat = calculateIdealLookat();
		state.camera.lookAt(idealLookat);
		state.camera.updateProjectionMatrix();
	});

	useEffect(() => {
		document.addEventListener("keydown", handleKeyPress);
		document.addEventListener("keyup", handleKeyUp);
		actions.Idle.play();

		return () => {
			document.removeEventListener("keydown", handleKeyPress);
			document.removeEventListener("keyup", handleKeyUp);
		};
	}, []);

	return <primitive object={scene} ref={character} {...restProps} />;
}

useGLTF.preload("/models/Soldier/soldier.gltf");
useGLTF.preload("/models/Eve/eve.gltf");