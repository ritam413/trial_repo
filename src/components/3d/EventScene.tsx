"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface EventSceneProps {
  className?: string;
}

export default function EventScene({ className }: EventSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera & Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const blueLight = new THREE.PointLight(0x3b82f6, 40, 20);
    blueLight.position.set(-4, 3, 4);
    scene.add(blueLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 35, 20);
    cyanLight.position.set(4, -3, 3);
    scene.add(cyanLight);

    const purpleLight = new THREE.DirectionalLight(0xa855f7, 2);
    purpleLight.position.set(0, 6, 2);
    scene.add(purpleLight);

    // 3. 3D Deck of Cards Group
    const cardGroup = new THREE.Group();
    scene.add(cardGroup);

    // Card dimensions
    const cardWidth = 1.8;
    const cardHeight = 2.6;
    const cardDepth = 0.04;
    const cardGeometry = new THREE.BoxGeometry(cardWidth, cardHeight, cardDepth);

    // Materials
    const cardColors = [0x1e293b, 0x0f172a, 0x1e1b4b, 0x312e81, 0x0284c7];
    const cardCount = 7;
    const cards: THREE.Mesh[] = [];

    for (let i = 0; i < cardCount; i++) {
      const material = new THREE.MeshPhysicalMaterial({
        color: cardColors[i % cardColors.length],
        metalness: 0.7,
        roughness: 0.2,
        clearcoat: 0.8,
        clearcoatRoughness: 0.1,
        reflectivity: 0.9,
      });

      const mesh = new THREE.Mesh(cardGeometry, material);
      
      // Fan arrangement (Deck of cards)
      const angle = (i - (cardCount - 1) / 2) * 0.14;
      mesh.position.x = Math.sin(angle) * 2.2;
      mesh.position.y = -Math.abs(angle) * 0.8;
      mesh.position.z = -i * 0.12;
      mesh.rotation.z = -angle * 0.8;
      mesh.rotation.y = angle * 0.5;

      // Add a glowing holographic border edge
      const edges = new THREE.EdgesGeometry(cardGeometry);
      const edgeMaterial = new THREE.LineBasicMaterial({
        color: i % 2 === 0 ? 0x00f0ff : 0xa855f7,
        linewidth: 2,
      });
      const edgeLines = new THREE.LineSegments(edges, edgeMaterial);
      mesh.add(edgeLines);

      cardGroup.add(mesh);
      cards.push(mesh);
    }

    // 4. Stardust / Floating Particle Nebula
    const particleCount = 600;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 16;
      positions[i + 1] = (Math.random() - 0.5) * 16;
      positions[i + 2] = (Math.random() - 0.5) * 12;

      // Cosmic blue & cyan & violet hues
      const choice = Math.random();
      if (choice < 0.4) {
        colors[i] = 0.23; colors[i + 1] = 0.51; colors[i + 2] = 0.96; // Blue
      } else if (choice < 0.7) {
        colors[i] = 0.02; colors[i + 1] = 0.71; colors[i + 2] = 0.83; // Cyan
      } else {
        colors[i] = 0.66; colors[i + 1] = 0.33; colors[i + 2] = 0.97; // Violet
      }
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    particleGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 5. Interactive Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 6. Responsive Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);

    // 7. Render Loop with Smooth Damping
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const render = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Card group floating motion + mouse response
      cardGroup.rotation.y = Math.sin(elapsedTime * 0.6) * 0.15 + targetX * 0.35;
      cardGroup.rotation.x = Math.cos(elapsedTime * 0.5) * 0.1 - targetY * 0.25;
      cardGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.15;

      // Subtle breathing animation on individual cards
      cards.forEach((card, idx) => {
        card.position.y += Math.sin(elapsedTime * 1.5 + idx) * 0.0015;
      });

      // Slowly rotate particle field
      particles.rotation.y = elapsedTime * 0.03;
      particles.rotation.x = elapsedTime * 0.015;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // 8. Strict GPU Resource Disposal
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      // Clean scene graph
      cardGeometry.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();

      cards.forEach((card) => {
        if (Array.isArray(card.material)) {
          card.material.forEach((m) => m.dispose());
        } else {
          card.material.dispose();
        }
      });

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className || "webgl-canvas-container"}
      style={{ overflow: "hidden" }}
    />
  );
}

