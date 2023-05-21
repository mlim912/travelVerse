import { motion } from 'framer-motion';
import { styles } from '../styles';
import { Canvas } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import * as THREE from 'three';

const ThreeAnimation = () => {
  const loaderRef = useRef();
  const mixerRef = useRef();
  const clockRef = useRef(new THREE.Clock());
  const modelRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('src/jsm/libs/draco/gltf/');

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    loader.load(
      '/assets/LittlestTokyo.glb',
      (gltf) => {
        const model = gltf.scene;
        model.position.set(1, 1, 0);
        model.scale.set(0.0075, 0.0075, 0.0075);
        modelRef.current = model;

        const mixer = new THREE.AnimationMixer(model);
        const action = mixer.clipAction(gltf.animations[0]);
        action.play();

        mixerRef.current = mixer;

        setIsLoaded(true);
      },
      undefined,
      (error) => {
        console.error(error);
      }
    );
  }, []);

  useEffect(() => {
    const animate = () => {
      requestAnimationFrame(animate);

      const delta = clockRef.current.getDelta();

      if (mixerRef.current) {
        mixerRef.current.update(delta);
      }
    };

    animate();
  }, []);

  return (
    <Canvas className="w-full h-full">
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls maxDistance={10} />
      {isLoaded && (
        <group ref={loaderRef}>
          {modelRef.current && <primitive object={modelRef.current} />}
        </group>
      )}
    </Canvas>
  );
};

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto">
      <div className="absolute inset-0 top-[100px]  max-w-7xl mx-auto flex flex-row items-start gap-5">
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#8EB7D5]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div className="w-1/3 flex flex-col items-start">
          <h1 className={`${styles.heroHeadText} text-white`}>
            Introducing<span className="text-[#8EB7D5]"> TravelVerse</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-gray-300 font-thin`}>
            Revolutionize your travel experience with our AI-powered app, offering smart features, personalized recommendations, and vibrant community engagement.
          </p>
        </div>

        <div className="w-full h-full flex items-center justify-center">
          <ThreeAnimation />
        </div>
      </div>

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'loop',
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
