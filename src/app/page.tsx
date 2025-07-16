"use client";

import { useState, useEffect } from "react";
import SplashScreen from "./components/SplashScreen";
import TermsScreen from "./components/TermsScreen";
import LoginScreen from "./components/LoginScreen";
import OnboardingStep1 from "./components/OnboardingStep1";
import OnboardingStep2 from "./components/OnboardingStep2";
import OnboardingStep3 from "./components/OnboardingStep3";
import WelcomeComplete from "./components/WelcomeComplete";
import Dashboard from "./components/Dashboard";

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<
    | "splash"
    | "terms"
    | "login"
    | "onboarding1"
    | "onboarding2"
    | "onboarding3"
    | "welcome"
    | "dashboard"
  >("splash");

  const handleSplashComplete = () => {
    setCurrentScreen("terms");
  };

  const handleTermsAccept = () => {
    setCurrentScreen("login");
  };

  const handleTermsDecline = () => {
    setCurrentScreen("splash");
  };

  const handleLoginSuccess = () => {
    setCurrentScreen("onboarding1");
  };

  const handleOnboardingStep1Next = () => {
    setCurrentScreen("onboarding2");
  };

  const handleOnboardingStep2Next = () => {
    setCurrentScreen("onboarding3");
  };

  const handleOnboardingStep2Back = () => {
    setCurrentScreen("onboarding1");
  };

  const handleOnboardingSkip = () => {
    setCurrentScreen("dashboard");
  };

  const handleOnboardingStep3Next = () => {
    setCurrentScreen("welcome");
  };

  const handleOnboardingStep3Back = () => {
    setCurrentScreen("onboarding2");
  };

  const handleWelcomeComplete = () => {
    setCurrentScreen("dashboard");
  };

  const handleLogout = () => {
    setCurrentScreen("login");
  };

  return (
    <main className="app-container">
      {currentScreen === "splash" && (
        <SplashScreen
          onComplete={handleSplashComplete}
          onTermsDecline={handleTermsDecline}
          onTermsAccept={handleTermsAccept}
        />
      )}

      {currentScreen === "terms" && (
        <TermsScreen
          onAccept={handleTermsAccept}
          onDecline={handleTermsDecline}
          isVisible={currentScreen === "terms"}
        />
      )}

      {currentScreen === "login" && (
        <LoginScreen onLoginSuccess={handleLoginSuccess} />
      )}
      {currentScreen === "onboarding1" && (
        <OnboardingStep1 
          onNext={handleOnboardingStep1Next}
          onSkip={handleOnboardingSkip}
        />
      )}
      {currentScreen === "onboarding2" && (
        <OnboardingStep2
          onNext={handleOnboardingStep2Next}
          onBack={handleOnboardingStep2Back}
          onSkip={handleOnboardingSkip}
        />
      )}
      {currentScreen === "onboarding3" && (
        <OnboardingStep3
          onNext={handleOnboardingStep3Next}
          onBack={handleOnboardingStep3Back}
        />
      )}
      {currentScreen === "welcome" && (
        <WelcomeComplete onToDashboard={handleWelcomeComplete} />
      )}
      {currentScreen === "dashboard" && (
        <Dashboard onLogout={handleLogout} />
      )}
    </main>
  );
}
