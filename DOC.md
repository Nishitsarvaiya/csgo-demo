# R3f Character Controller

A Character controller created using Three.js, React-Three-Fiber & Next.js

#### Programming Languages

-   Javascript

#### Frameworks / Libraries

-   `Next.js`

-   `Three.js` - A cross-browser JavaScript library and application programming interface used to create and display animated 3D computer graphics in a web browser using WebGL.

-   `React Three Fiber` - A React renderer for three.js.

-   `React Three Drei` - A collection of useful helpers and fully functional, ready-made abstractions for @react-three/fiber.

-   `React Three PostProcessing` - A postprocessing wrapper for @react-three/fiber.

-   `TailwindCSS` - A utility-first CSS framework for rapidly building modern websites without ever leaving your HTML.

#### IDE / Text Editor

-   Visual Studio Code

#### Other Tools

-   `Mixamo` for downloading characters and its animations.

-   `Blender` for combining animations of the character and other various 3d modelling related tasks.

-   `Sketchfab` for downloading the map used in the project.

-   `Polyhaven` for downloading the textures used for creating the ground in Player selection screen.

# Project Structure

### This project contains 2 screens

1. `Home Page` - Player Selection Screen
2. `Scene Page` - Playground Screen

### Root Directory

-   `.next/`: This directory is generated automatically by Next.js and contains the compiled output of the application. It is usually not included in version control.

-   `node_modules/`: Contains all the dependencies and packages required for the project. Managed by npm or yarn.

-   `.gitignore`: Specifies files and directories that should be ignored by Git.

-   `next.config.js`: The configuration file for Next.js, allowing custom settings for the build and runtime environment.

-   `package.json`: Contains metadata about the project, including dependencies, scripts, and other configurations.

-   `README.md`: Provides an overview of the project, including how to install and run it.

### `/public`

The public directory is used to store static files such as images, fonts, and other assets that need to be served directly. These files can be accessed in the project via a relative URL path.

### `/src`

The src directory contains the core source code of the application. It is organized into several subdirectories to maintain a clean and manageable codebase.

### `/components`

This directory holds all the React components used in the application. Components can be further organized into subdirectories if they are part of larger modules or features.

### `/app`

This directory holds all the pages that are actually rendered on the screen. Each folder becomes a new route and the url is the name of the folder.

-   `page.jsx` - The page file is where we define the page and its contents that the user will see and interact with.
-   `layout.jsx` - the layout file is for defining a shared layout across multiple routes or segments that are children of it.

## Key Components

There are 2 folders that contains the respective kind of components in the `/components` folder.

### 1. `Scene`

-   `Scene.jsx` - The Component which wraps the `Canvas` that displays the actual playground and the Player.

-   `Home.jsx` - The Component which lets the user select one of the two characters to play.

### 2. `World`

-   `Character.jsx` - A reusable component that loads a GLTF model with the given url and displays it in the scene.

-   `Ground.jsx` - the component which creates the ground in the Player Selection Screen.

-   `Map.jsx` - the component which loads the 3d Map into the scene.

-   `Player.jsx` - a reusable component that loads the selected 3d player into the scene and contains all the logic and functionality to move the Player and control its animations.

## Dependencies

-   `next`: Framework for server-rendered React applications.
-   `react`: JavaScript library for building user interfaces.
-   `react-dom`: React package for working with the DOM.
-   `@react-three/fiber`: React renderer for Three.js.
-   `three`: JavaScript 3D library.
-   `@react-three/drei`: Essential utilities and components for simplifying 3D scenes in React Three Fiber.
-   `@react-three/postprocessing`: Post-processing effects like bloom and depth of field for React Three Fiber.
-   `@react-three/rapier`: Physics simulations for React Three Fiber using the Rapier engine.
-   `@types/three`: TypeScript definitions for Three.js, providing type safety and IntelliSense.

## Future Goals

-   Add Physics to the scene
-   Add Collision detection for the character and the 3d models
-   Add more post-processing like depth of field, motion blur, bloom, etc.
-   Optimising the 3d models and application for performance
-   Make it responsive for mobile screens

## Approach

### 1. Setup the Development Environment

-   I chose to go with Next.js as I am very much familiar with the workflow.

### 2. Setup 3D Characters for Animations

-   I downloaded the 3d characters as well as animations from Mixamo and combined those animations into the character using Blender.

### 3. Define Project Structure

-   Organize Files and Folders: I created a clear and logical folder structure to separate concerns keeping in mind the reusability and modularity of components, especially when dealing with complex 3D scenes.

### 4. Integrate React Three Fiber

-   Basic Setup: I started with the integration of React Three Fiber into the Next.js environment. This involves setting up a Canvas component and ensuring proper rendering within the Next.js pages.

-   Scene Creation: I developed the main 3D scene by adding various objects and setting up lighting, cameras, and controls using React Three Fiber components.

### 5. Utilize @react-three/drei for Simplified 3D Scene Management

-   Leverage Utilities: I used @react-three/drei to simplify the addition of common 3D functionalities like OrbitControls, Sky, and model loaders, reducing boilerplate code and speeding up development.

### 6. Enhance Visuals with @react-three/postprocessing

-   Post-Processing Effects: I integrated @react-three/postprocessing to add advanced visual effects like Vignette to the 3D scene, enhancing the overall visual appeal.

### 7. Deploy the Application

-   Deployment: I deployed the application to Vercel, which is optimized for Next.js applications, ensuring seamless deployment and updates.
