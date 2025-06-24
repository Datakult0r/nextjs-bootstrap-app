"use client";

import type React from "react";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useNotification } from "@/components/video-platform/notification";
import { AuthForm } from "@/components/auth-form";
import { useAuth } from "@/providers/auth-provider";
import Link from "next/link";

function LoginContent() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const router = useRouter();
  const notification = useNotification();
  const { login, signup, googleLogin, discordLogin, isAuthenticated } =
    useAuth();
  const searchParams = useSearchParams();

  // Check for authentication and error parameters
  useEffect(() => {
    // Get the intended destination from URL params or use default
    const redirectTo = searchParams.get("redirectTo") || "/";
    
    // Store the redirect URL in localStorage for use after login
    if (redirectTo && redirectTo !== "/" && typeof window !== 'undefined') {
      localStorage.setItem('auth_redirect_url', redirectTo);
    }
    
    // If user is already authenticated, redirect to intended destination
    if (isAuthenticated) {
      router.push(redirectTo);
      return;
    }

    // Check for error in URL parameters (from auth callbacks)
    const error = searchParams.get("error");
    if (error) {
      notification.error("Authentication Failed", decodeURIComponent(error));
    }
  }, [isAuthenticated, router, searchParams, notification]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (activeTab === "login") {
        // Perform login
        const { success, error, redirectUrl } = await login({ 
          email, 
          password,
          captchaToken
        });

        if (success) {
          notification.success(
            "Welcome back!",
            "You've successfully logged in to your account.",
          );
          // Use the redirectUrl from the login response if available
          router.push(redirectUrl || "/");
        } else {
          notification.error(
            "Login Failed",
            error || "Please check your credentials and try again.",
          );
        }
      } else {
        // Perform sign up
        const { success, error } = await signup({ 
          email, 
          password, 
          name,
          captchaToken
        });

        if (success) {
          notification.success(
            "Account created!",
            "Please check your email to verify your account.",
          );
          setActiveTab("login");
        } else {
          notification.error(
            "Signup Failed",
            error || "Please check your information and try again.",
          );
        }
      }
    } catch (error) {
      notification.error(
        "Authentication failed",
        "An unexpected error occurred. Please try again.",
      );
      console.error("Auth error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { success, error } = await googleLogin();
      
      if (!success) {
        notification.error(
          "Google login failed",
          error || "Unable to start Google authentication."
        );
      }
      // If successful, redirect will happen automatically
    } catch (error) {
      notification.error(
        "Google login failed",
        "Unable to start Google authentication."
      );
      console.error("Google login error:", error);
    }
  };

  const handleDiscordLogin = async () => {
    try {
      const { success, error } = await discordLogin();
      
      if (!success) {
        notification.error(
          "Discord login failed",
          error || "Unable to start Discord authentication."
        );
      }
      // If successful, redirect will happen automatically
    } catch (error) {
      notification.error(
        "Discord login failed",
        "Unable to start Discord authentication."
      );
      console.error("Discord login error:", error);
    }
  };

  const handleCaptchaVerify = (token: string) => {
    setCaptchaToken(token);
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gray-50 transition-colors duration-300 dark:bg-[hsl(222.2,84%,4.9%)]">
      {/* Static background pattern */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-[length:50px_50px] opacity-[0.03] dark:opacity-[0.03]" />

      {/* Static gradient blobs */}
      <div
        className="absolute h-[500px] w-[500px] rounded-full bg-gradient-to-br from-purple-700/30 via-violet-600/20 to-transparent blur-3xl"
        style={{
          top: `calc(50% - 250px)`,
          left: `calc(50% - 250px)`,
        }}
      />
      <div className="absolute right-1/4 top-1/4 h-[600px] w-[600px] animate-pulse rounded-full bg-gradient-to-r from-cyan-500/20 via-blue-500/10 to-transparent blur-3xl" />
      <div className="absolute bottom-1/4 left-1/3 h-[500px] w-[500px] animate-pulse rounded-full bg-gradient-to-r from-fuchsia-600/20 via-pink-600/10 to-transparent blur-3xl [animation-delay:2s]" />

      {/* Enhanced particles with multiple shapes and patterns */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Small dots */}
        {[
          {
            top: "20%",
            left: "15%",
            opacity: 0.4,
            duration: 12,
            delay: 2,
            size: "w-1 h-1",
          },
          {
            top: "30%",
            left: "85%",
            opacity: 0.5,
            duration: 15,
            delay: 1,
            size: "w-1 h-1",
          },
          {
            top: "45%",
            left: "25%",
            opacity: 0.6,
            duration: 18,
            delay: 3,
            size: "w-1 h-1",
          },
          {
            top: "60%",
            left: "75%",
            opacity: 0.3,
            duration: 14,
            delay: 4,
            size: "w-1 h-1",
          },
          {
            top: "75%",
            left: "35%",
            opacity: 0.5,
            duration: 16,
            delay: 2,
            size: "w-1 h-1",
          },
          {
            top: "85%",
            left: "65%",
            opacity: 0.4,
            duration: 13,
            delay: 1,
            size: "w-1 h-1",
          },
          {
            top: "25%",
            left: "45%",
            opacity: 0.5,
            duration: 17,
            delay: 3,
            size: "w-1 h-1",
          },
          {
            top: "40%",
            left: "55%",
            opacity: 0.3,
            duration: 11,
            delay: 2,
            size: "w-1 h-1",
          },
          {
            top: "55%",
            left: "15%",
            opacity: 0.4,
            duration: 14,
            delay: 1,
            size: "w-1 h-1",
          },
          {
            top: "70%",
            left: "85%",
            opacity: 0.5,
            duration: 16,
            delay: 4,
            size: "w-1 h-1",
          },
        ].map((config, i) => (
          <div
            key={`dot-${i}`}
            className={`absolute ${config.size} rounded-full bg-gray-800/50 dark:bg-white/50`}
            style={{
              top: config.top,
              left: config.left,
              opacity: config.opacity,
              animation: `staticFloat ${config.duration}s linear infinite`,
              animationDelay: `${config.delay}s`,
            }}
          />
        ))}

        {/* Medium circles with glow */}
        {[
          {
            top: "15%",
            left: "25%",
            opacity: 0.3,
            duration: 20,
            delay: 0,
            size: "w-2 h-2",
          },
          {
            top: "35%",
            left: "75%",
            opacity: 0.4,
            duration: 18,
            delay: 1,
            size: "w-2 h-2",
          },
          {
            top: "50%",
            left: "35%",
            opacity: 0.5,
            duration: 22,
            delay: 2,
            size: "w-2 h-2",
          },
          {
            top: "65%",
            left: "65%",
            opacity: 0.3,
            duration: 19,
            delay: 3,
            size: "w-2 h-2",
          },
          {
            top: "80%",
            left: "15%",
            opacity: 0.4,
            duration: 21,
            delay: 4,
            size: "w-2 h-2",
          },
        ].map((config, i) => (
          <div
            key={`circle-${i}`}
            className={`absolute ${config.size} rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-500/30 shadow-[0_0_10px_rgba(8,112,184,0.3)] dark:from-cyan-400/30 dark:to-blue-400/30`}
            style={{
              top: config.top,
              left: config.left,
              opacity: config.opacity,
              animation: `floatAndGlow ${config.duration}s ease-in-out infinite`,
              animationDelay: `${config.delay}s`,
            }}
          />
        ))}

        {/* Large hexagons */}
        {[
          {
            top: "10%",
            left: "45%",
            opacity: 0.3,
            duration: 25,
            delay: 0,
            size: "w-3 h-3",
          },
          {
            top: "45%",
            left: "55%",
            opacity: 0.4,
            duration: 23,
            delay: 1,
            size: "w-3 h-3",
          },
          {
            top: "60%",
            left: "25%",
            opacity: 0.5,
            duration: 27,
            delay: 2,
            size: "w-3 h-3",
          },
          {
            top: "75%",
            left: "75%",
            opacity: 0.3,
            duration: 24,
            delay: 3,
            size: "w-3 h-3",
          },
        ].map((config, i) => (
          <div
            key={`hex-${i}`}
            className={`absolute ${config.size} clip-hexagon bg-gradient-to-r from-purple-500/20 to-pink-500/20 dark:from-purple-400/20 dark:to-pink-400/20`}
            style={{
              top: config.top,
              left: config.left,
              opacity: config.opacity,
              animation: `floatAndRotate ${config.duration}s ease-in-out infinite`,
              animationDelay: `${config.delay}s`,
            }}
          />
        ))}

        {/* Sparkles */}
        {[
          { top: "20%", left: "60%", opacity: 0.6, duration: 2, delay: 0 },
          { top: "40%", left: "20%", opacity: 0.5, duration: 2.5, delay: 0.5 },
          { top: "60%", left: "80%", opacity: 0.7, duration: 3, delay: 1 },
          { top: "80%", left: "40%", opacity: 0.4, duration: 2.2, delay: 1.5 },
        ].map((config, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute h-1 w-1 bg-white dark:bg-cyan-400"
            style={{
              top: config.top,
              left: config.left,
              opacity: config.opacity,
              animation: `sparkle ${config.duration}s ease-in-out infinite`,
              animationDelay: `${config.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        {/* Logo with glow effect */}
        <div className="mb-8 flex justify-center">
          <div className="relative flex items-center">
            <div className="absolute inset-0 bg-cyan-500/30 blur-xl"></div>
            <div className="relative flex items-center">
              <div className="mr-1 rounded-tl-[20px] bg-[#00d2e6] px-4 pb-[0.2rem] pt-[0.3rem] text-[2rem] font-bold text-white">
                Clinic
              </div>
              <div className="ml-1 flex items-start text-[2rem] font-bold text-gray-800 dark:text-white">
                <span>of</span>
                <span className="relative ml-2">
                  AI
                  <span className="absolute right-[-0.7rem] top-[0.1rem] flex">
                    <span className="ml-0.5 h-[0.4rem] w-[0.4rem] rounded-full border border-gray-800 bg-gray-800 dark:border-white dark:bg-black" />
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <AuthForm
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          email={email}
          password={password}
          name={name}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onNameChange={setName}
          rememberMe={rememberMe}
          onRememberMeChange={setRememberMe}
          onGoogleLogin={handleGoogleLogin}
          onDiscordLogin={handleDiscordLogin}
          onCaptchaVerify={handleCaptchaVerify}
        />
      </div>

      {/* Add keyframes for enhanced animations */}
      <style jsx global>{`
        @keyframes staticFloat {
          0% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-10px) translateX(10px);
          }
          50% {
            transform: translateY(0px) translateX(20px);
          }
          75% {
            transform: translateY(10px) translateX(10px);
          }
          100% {
            transform: translateY(0px) translateX(0px);
          }
        }

        @keyframes floatAndGlow {
          0% {
            transform: translateY(0px) translateX(0px);
            box-shadow: 0 0 10px rgba(8, 112, 184, 0.3);
          }
          25% {
            transform: translateY(-15px) translateX(15px);
            box-shadow: 0 0 20px rgba(8, 112, 184, 0.5);
          }
          50% {
            transform: translateY(0px) translateX(30px);
            box-shadow: 0 0 10px rgba(8, 112, 184, 0.3);
          }
          75% {
            transform: translateY(15px) translateX(15px);
            box-shadow: 0 0 20px rgba(8, 112, 184, 0.5);
          }
          100% {
            transform: translateY(0px) translateX(0px);
            box-shadow: 0 0 10px rgba(8, 112, 184, 0.3);
          }
        }

        @keyframes floatAndRotate {
          0% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) translateX(20px) rotate(90deg);
          }
          50% {
            transform: translateY(0px) translateX(40px) rotate(180deg);
          }
          75% {
            transform: translateY(20px) translateX(20px) rotate(270deg);
          }
          100% {
            transform: translateY(0px) translateX(0px) rotate(360deg);
          }
        }

        @keyframes sparkle {
          0% {
            transform: scale(1) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 1;
          }
          100% {
            transform: scale(1) rotate(360deg);
            opacity: 0;
          }
        }

        .clip-hexagon {
          clip-path: polygon(
            50% 0%,
            100% 25%,
            100% 75%,
            50% 100%,
            0% 75%,
            0% 25%
          );
        }
      `}</style>
      <div className="px-8 pb-8">
        <p className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
          By continuing, you agree to our{" "}
          <Link
            href="/login"
            className="text-cyan-600 transition-colors hover:text-cyan-500 dark:text-cyan-400 dark:hover:text-cyan-300"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/login"
            className="text-cyan-600 transition-colors hover:text-cyan-500 dark:text-cyan-400 dark:hover:text-cyan-300"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}

// Loading fallback
function LoginFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-[hsl(222.2,84%,4.9%)]">
      <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-cyan-500"></div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginContent />
    </Suspense>
  );
}
