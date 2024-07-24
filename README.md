# 3D Interactive Experience with React Three Fiber

This project is a 3D interactive experience built using React Three Fiber (R3F), Three.js, Jotai for state management, and Leva for parameter control. The application allows users to navigate between different 3D models with smooth camera transitions and interactive UI elements.

## Features

- **Interactive 3D Models**: View and interact with different 3D models.
- **Smooth Camera Transitions**: Smooth transitions and animations between different slides.
- **User Interface Overlay**: UI overlay with navigation controls and descriptions for each slide.
- **Clickable Spheres**: Clickable spheres to switch between different slides.
- **Responsive Design**: Adapts to different viewport sizes and maintains consistent visual quality.

## Getting Started

### Prerequisites

- threejs
- react three fiber
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/snigdhasv/Teleportation-threejs.git
   cd Teleportation-threejs
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Application

To start the development server:

```bash
npm start
# or
npm run dev
# or
yarn start
```

Open dedicated localhost to view it in the browser.

## Project Structure

- `App.jsx`: The main entry point of the application. Sets up the Canvas, Leva, Overlay, and Experience components.
- `components/Experience.jsx`: Contains the main 3D experience logic, including scenes, camera controls, and clickable spheres.
- `components/Scene.jsx`: Handles loading and rendering of individual 3D models and their environments.
- `components/Overlay.jsx`: Manages the UI overlay, including navigation buttons and slide descriptions.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## Acknowledgements

- [React](https://reactjs.org/)
- [React Three Fiber](https://github.com/pmndrs/react-three-fiber)
- [Three.js](https://threejs.org/)
- [@react-three/drei](https://github.com/pmndrs/drei)
- [jotai](https://github.com/pmndrs/jotai)
- [react-spring](https://github.com/pmndrs/react-spring)
- [leva](https://github.com/pmndrs/leva)
