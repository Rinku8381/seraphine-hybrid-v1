import React, { useEffect, useState } from "react";
import "./ParticleEffects.css";

const TOTAL_PARTICLES = 40;

export default function ParticleEffects() {
  const [particles, setParticles] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const generatedParticles = Array.from({ length: TOTAL_PARTICLES }, (_, index) => {
      const x = Math.random() - 0.5;
      const y = Math.random() - 0.5;
      const duration = 10 + Math.random() * 10;
      return (
        <div
          key={index}
          className="particle"
          style={{
            "--x": x.toString(),
            "--y": y.toString(),
            animationDuration: `${duration}s`,
          } as React.CSSProperties}
        />
      );
    });
    setParticles(generatedParticles);
  }, []);

  return <div className="particles">{particles}</div>;
}
