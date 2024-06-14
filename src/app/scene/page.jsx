import Scene from "@/components/Scene/Scene";
import { Suspense } from "react";

export default function page() {
	return (
		<Suspense>
			<Scene />
		</Suspense>
	);
}
