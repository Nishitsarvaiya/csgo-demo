/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.18 public/models/Agent2/agent-2.gltf 
*/

import React, { useCallback, useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { Quaternion, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";

export default function Agent2({ camera, ...restProps }) {
	const character = useRef();
	const { nodes, materials, animations } = useGLTF("/models/Agent2/agent-2.gltf");
	const { actions } = useAnimations(animations, character);

	const currAction = useRef(actions?.Idle);
	const prevAction = useRef(null);

	const activeAnimation = useRef({
		forward: false,
		backward: false,
		left: false,
		right: false,
		run: false,
		dance: false,
	});
	nodes.Mesh.castShadow = true;
	nodes.Mesh.receiveShadow = true;

	const currentPosition = new Vector3();
	const currentLookAt = new Vector3();
	const decceleration = new Vector3(-0.0005, -0.0001, -5.0);
	const acceleration = new Vector3(1, 0.125, 5.5);
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
		const idealOffset = new Vector3(0, 1, -1.75);
		idealOffset.applyQuaternion(character.current.quaternion);
		idealOffset.add(character.current.position);
		return idealOffset;
	};

	const calculateIdealLookat = () => {
		const idealLookat = new Vector3(0, 0.8, 0);
		idealLookat.applyQuaternion(character.current.quaternion);
		idealLookat.add(character.current.position);
		return idealLookat;
	};

	const updateCameraTarget = (delta) => {
		const idealOffset = calculateIdealOffset();
		const idealLookat = calculateIdealLookat();

		const t = 1.0 - Math.pow(0.001, delta);

		currentPosition.lerp(idealOffset, t);
		currentLookAt.lerp(idealLookat, t);

		camera && camera.position.copy(currentPosition);
	};

	// movement
	const characterState = (delta) => {
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
			acc.multiplyScalar(2.0);
		}

		if (activeAnimation.current.forward) {
			newVelocity.z += acc.z * delta;
		}
		if (activeAnimation.current.backward) {
			newVelocity.z -= acc.z * delta;
		}
		if (activeAnimation.current.left) {
			_A.set(0, 1, 0);
			_Q.setFromAxisAngle(_A, 4.0 * Math.PI * delta * acceleration.y);
			_R.multiply(_Q);
		}
		if (activeAnimation.current.right) {
			_A.set(0, 1, 0);
			_Q.setFromAxisAngle(_A, 4.0 * -Math.PI * delta * acceleration.y);
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
		updateCameraTarget(delta);
	};

	useFrame((state, delta) => {
		prevAction.current = currAction.current;

		if (activeAnimation.current.forward) {
			if (activeAnimation.current.run) {
				currAction.current = actions.Run;
			} else {
				currAction.current = actions.Walk;
			}
		} else if (activeAnimation.current.left) {
			if (activeAnimation.current.run) {
				currAction.current = actions.Run;
			} else {
				currAction.current = actions.Walk;
			}
		} else if (activeAnimation.current.right) {
			if (activeAnimation.current.run) {
				currAction.current = actions.Run;
			} else {
				currAction.current = actions.Walk;
			}
		} else if (activeAnimation.current.backward) {
			currAction.current = actions.Back;
		} else {
			currAction.current = actions.Idle;
		}

		if (prevAction.current !== currAction.current) {
			prevAction.current.fadeOut(0.5);

			if (prevAction.current === actions.Walk) {
				const ratio = currAction.current.getClip().duration / prevAction.current.getClip().duration;
				currAction.current.time = prevAction.current.time * ratio;
			}

			currAction.current.reset().play();
		} else {
			currAction.current.play();
		}

		characterState(delta);
		const idealLookat = calculateIdealLookat();

		state.camera.lookAt(idealLookat);
		state.camera.updateProjectionMatrix();
		// mixer?.update(delta);
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

	return (
		<group ref={character} {...restProps} dispose={null}>
			<group name="Scene" scale={[0.006, 0.006, 0.006]}>
				<group name="Agent_2" rotation={[Math.PI / 2, 0, 0]}>
					<primitive object={nodes.mixamorigHips} />
					<skinnedMesh
						name="Mesh"
						geometry={nodes.Mesh.geometry}
						material={materials.SpacePirate_M}
						skeleton={nodes.Mesh.skeleton}
					/>
				</group>
			</group>
		</group>
	);
}

useGLTF.preload("/models/Agent2/agent-2.gltf");