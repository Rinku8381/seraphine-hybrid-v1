import React, { useState } from "react";
import SplashScreen from "./app/components/SplashScreen";

function TermsScreen() {
  return (
    <div>
      <h1>Terms & Conditions</h1>
      <p>Here are the rules and privacy policies of Seraphine Hybrid V1.</p>
    </div>
  );
}

export default function App() {
  const [showTerms, setShowTerms] = useState(false);

  return (
    <>
      {!showTerms ? (
        <SplashScreen onComplete={() => setShowTerms(true)} />
      ) : (
        <TermsScreen />
      )}
    </>
  );
}
