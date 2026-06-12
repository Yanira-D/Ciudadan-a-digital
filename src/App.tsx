import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart,
  Flame,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Lock,
  ArrowRight,
  ArrowLeft,
  Search,
  Filter,
  Trophy,
  User,
  HeartHandshake,
  Scale,
  Flag,
  Sparkles,
  Award,
  BookOpen,
  X,
  Send,
  HelpCircle,
  Coins,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  GraduationCap,
  MessageSquare,
  RefreshCw,
} from "lucide-react";

import {
  UserProfile,
  Badge,
  LessonNode,
  QuizScenario,
  LeaderboardEntry,
} from "./types";

import {
  initialUserProfile,
  initialBadges,
  initialLessons,
  quizScenarios,
  leaderboardEntries,
  schoolsList,
  gradesList,
  levelsFilterList,
} from "./data";

export default function App() {
  // Navigation: "inicio" | "lecciones" | "ranking" | "perfil"
  const [activeTab, setActiveTab] = useState<"inicio" | "lecciones" | "ranking" | "perfil">("inicio");

  // Google Authentication State
  const [googleAccount, setGoogleAccount] = useState<string | null>(null);
  const [isGoogleLoggedIn, setIsGoogleLoggedIn] = useState(false);

  // App States
  const [profile, setProfile] = useState<UserProfile>(initialUserProfile);
  const [lessons, setLessons] = useState<LessonNode[]>(initialLessons);
  const [badges, setBadges] = useState<Badge[]>(initialBadges);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(leaderboardEntries);

  // Login handler
  const handleGoogleLogin = (email: string) => {
    setGoogleAccount(email);
    setIsGoogleLoggedIn(true);
    
    if (email === "cursoia@unicatolicadelsur.edu.co") {
      setProfile((prev) => ({
        ...prev,
        name: "Líder Unicatólica",
        grade: "Estudiante de 6to - Directivo IA",
        city: "Pasto, Colombia",
        points: 1500,
        tenths: 5.0,
        level: 6,
        levelName: "Sabio de La Cocha",
        progressPercentage: 100,
        avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMjbcmsFwd38XkwEXFGKTvhY214nrPYERGfZiA_EIKFA_3NcZec8OvgGNnBN5uApmSPR1BQs1fCAGnqHEjxNWg3jbUNnmM9fqZzolfgGc_bNHKKhU2rSXDNVpgZ1gHgx8NX0mBpfuPwcZUf_wGWSNvht7phaSO1M4YYScqPnHq7X-ZsY_DSDineoXlQyABSs-9jIOPIa4-haGE-lQQkDuFuIdzrb0JbEfKyPGRFFBUmweDzVP61c0IBBwn47AvHCzdSGBk6GkIfSg"
      }));
      setLeaderboard((prev) => {
        return prev.map((entry) => {
          if (entry.id === "l3") {
            return {
              ...entry,
              name: "Líder Unicatólica (Tú)",
              school: "I.E.M. Liceo de la Universidad",
              grade: "Grado 6-1",
              points: 1500,
              tenths: 5.0,
              level: "Sabio de La Cocha"
            };
          }
          return entry;
        });
      });
      triggerToast("¡Bienvenido! Sesión iniciada con Google en @unicatolicadelsur.edu.co 🐻🎓");
    } else if (email === "sofia.rosero@normalsuperior.edu.co") {
      setProfile((prev) => ({
        ...prev,
        name: "Sofía Rosero",
        grade: "Grado 6-3",
        city: "Pasto, Colombia",
        points: 1410,
        tenths: 5.0,
        level: 6,
        levelName: "Sabio de La Cocha",
        progressPercentage: 95,
        avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMjbcmsFwd38XkwEXFGKTvhY214nrPYERGfZiA_EIKFA_3NcZec8OvgGNnBN5uApmSPR1BQs1fCAGnqHEjxNWg3jbUNnmM9fqZzolfgGc_bNHKKhU2rSXDNVpgZ1gHgx8NX0mBpfuPwcZUf_wGWSNvht7phaSO1M4YYScqPnHq7X-ZsY_DSDineoXlQyABSs-9jIOPIa4-haGE-lQQkDuFuIdzrb0JbEfKyPGRFFBUmweDzVP61c0IBBwn47AvHCzdSGBk6GkIfSg"
      }));
      triggerToast("¡Bienvenido! Sesión iniciada como Sofía Rosero en @normalsuperior.edu.co 🌸🎒");
    } else {
      setProfile((prev) => ({
        ...prev,
        name: "Juanito Pérez",
        grade: "Estudiante de 6to Grado",
        city: "Pasto, Colombia",
        points: 1250,
        tenths: 4.5,
        level: 5,
        levelName: "Guardián del Galeras",
        progressPercentage: 85,
        avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMjbcmsFwd38XkwEXFGKTvhY214nrPYERGfZiA_EIKFA_3NcZec8OvgGNnBN5uApmSPR1BQs1fCAGnqHEjxNWg3jbUNnmM9fqZzolfgGc_bNHKKhU2rSXDNVpgZ1gHgx8NX0mBpfuPwcZUf_wGWSNvht7phaSO1M4YYScqPnHq7X-ZsY_DSDineoXlQyABSs-9jIOPIa4-haGE-lQQkDuFuIdzrb0JbEfKyPGRFFBUmweDzVP61c0IBBwn47AvHCzdSGBk6GkIfSg"
      }));
      triggerToast("¡Sesión activa de Juanito Pérez en su correo de Google! ⛰️🎮");
    }
  };

  const handleGoogleLogout = () => {
    setGoogleAccount(null);
    setIsGoogleLoggedIn(false);
    triggerToast("Sesión cerrada. Seleccione cuenta de Google para reingresar.");
  };

  // Search & Filters state for Ranking Tab
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("Todas las IE");
  const [selectedGrade, setSelectedGrade] = useState("Todos los grados");
  const [selectedLevel, setSelectedLevel] = useState("Todos los niveles");

  // Interaction / Quiz States
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const [scenarioAttempts, setScenarioAttempts] = useState(0);

  // Free AI Sandbox State
  const [sandboxInput, setSandboxInput] = useState("");
  const [sandboxResponse, setSandboxResponse] = useState<any>(null);
  const [sandboxLoading, setSandboxLoading] = useState(false);
  const [sandboxError, setSandboxError] = useState("");

  // Tenths Redemption Modal State
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("Tecnología e Informática");
  const [tenthsToRedeem, setTenthsToRedeem] = useState(1.0);
  const [redemptionSuccess, setRedemptionSuccess] = useState(false);

  // Encouragement Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auto-trigger motivational overlay
  useEffect(() => {
    const timer = setTimeout(() => {
      setToastMessage("¡Santi, tu guía digital te saluda! Sigue sumando décimas en tu Senda Digital🎒");
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 5000);
  };

  // Handle option selection in Chat Quiz
  const handleSelectOption = (index: number) => {
    if (selectedOption !== null) return; // Prevent double select
    setSelectedOption(index);
    const scenario = quizScenarios[selectedScenarioIndex];
    const option = scenario.options[index];

    // Update Profile points and tenths dynamically based on student answer!
    const newPoints = Math.max(0, profile.points + option.points);
    const newTenths = parseFloat((profile.tenths + option.tenths).toFixed(1));

    setProfile((prev) => ({
      ...prev,
      points: newPoints,
      tenths: newTenths,
    }));

    // Trigger toast based on output correctness
    if (option.isCorrect) {
      triggerToast(`¡Increíble guagua! Sumaste +${option.points} puntos de Netiqueta 🎉`);
      // Progress lesson
      setLessons((prev) =>
        prev.map((les, idx) => {
          if (idx === selectedScenarioIndex) {
            return { ...les, progress: 100, status: "completed" };
          }
          if (idx === selectedScenarioIndex + 1) {
            return { ...les, status: "current" };
          }
          return les;
        })
      );

      // Unlock badge if it is the Cima del Galeras (index 3)
      if (selectedScenarioIndex === 3) {
        setBadges((prev) =>
          prev.map((b) => {
            if (b.id === "senda_secreta") {
              return {
                ...b,
                title: "Súper Ciudadano",
                subtitle: "Senda Completada",
                status: "unlocked",
                borderCol: "border-emerald-500",
                bgCol: "bg-emerald-500/15",
                iconCol: "text-emerald-500",
                icon: "CheckCircle2"
              };
            }
            return b;
          })
        );
        setProfile((prev) => ({
          ...prev,
          progressPercentage: 100,
          levelName: "Súper Ciudadano Digital",
        }));
        setTimeout(() => {
          setShowCertificateModal(true);
        }, 1500);
      }
    } else {
      triggerToast(`¡Ayayay! Santi te ha dejado una sugerencia de andamiaje`);
    }

    setScenarioAttempts((prev) => prev + 1);
  };

  // Reset quiz scenario for retry
  const handleResetScenario = () => {
    setSelectedOption(null);
  };

  // Move to next scenario
  const handleNextScenario = () => {
    setSelectedOption(null);
    if (selectedScenarioIndex < quizScenarios.length - 1) {
      setSelectedScenarioIndex((prev) => prev + 1);
    } else {
      setSelectedScenarioIndex(0);
      triggerToast("¡Has repasado todas las simulaciones de Netiqueta, excelente! 🎖️");
    }
  };

  // Free AI Sandbox evaluation trigger
  const handleEvaluateSandbox = async () => {
    if (!sandboxInput.trim()) return;
    setSandboxLoading(true);
    setSandboxError("");
    setSandboxResponse(null);

    try {
      const activeScenarioId = quizScenarios[selectedScenarioIndex].id;
      const res = await fetch("/api/evaluate-netiquette", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userMessage: sandboxInput,
          scenarioId: activeScenarioId,
        }),
      });

      if (!res.ok) {
        throw new Error("Lo sentimos, no pudimos evaluar tu mensaje.");
      }

      const data = await res.json();
      setSandboxResponse(data);

      // Perform dynamic rewards based on AI sandbox result
      if (data.isCorrect) {
        setProfile((prev) => ({
          ...prev,
          points: prev.points + data.points,
          tenths: parseFloat((prev.tenths + data.tenths).toFixed(1)),
        }));
        triggerToast("¡Santi ha avalado tu mensaje en el Sandbox con éxito ! 🌟");
      } else {
        triggerToast("Andamiaje de Netiqueta: Te invitamos a reescribir con mayor amabilidad.");
      }
    } catch (err: any) {
      setSandboxError(err.message || "Ocurrió un error inesperado.");
      triggerToast("Santi está operando con su brújula local de netiqueta temporalmente 🧭");
    } finally {
      setSandboxLoading(false);
    }
  };

  // Tenths redemption logic
  const handleRedeemTenths = () => {
    if (profile.tenths < tenthsToRedeem) {
      triggerToast("Achachay, no tienes suficientes décimas acumuladas para canjear de momento.");
      return;
    }

    setRedemptionSuccess(true);
    // Subtract tenths and trigger updates
    setProfile((prev) => ({
      ...prev,
      tenths: parseFloat((prev.tenths - tenthsToRedeem).toFixed(1)),
    }));

    setTimeout(() => {
      setRedemptionSuccess(false);
      setShowRedeemModal(false);
      triggerToast(`¡Éxito! Transferiste ${tenthsToRedeem} décimas a tu planilla de ${selectedSubject} 📖🎒`);
    }, 3000);
  };

  // Filtered Leaderboard logic
  const getFilteredLeaderboard = () => {
    const list = [...leaderboard];
    // Always map Juanito's points dynamically to current state
    const mapped = list.map((entry) => {
      if (entry.id === "l3") {
        return {
          ...entry,
          points: profile.points,
          tenths: profile.tenths,
        };
      }
      return entry;
    });

    return mapped
      .filter((elem) => {
        const matchesSearch = elem.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSchool = selectedSchool === "Todas las IE" || elem.school === selectedSchool;
        const matchesGrade = selectedGrade === "Todos los grados" || elem.grade === selectedGrade;
        const matchesLevel = selectedLevel === "Todos los niveles" || elem.level === selectedLevel;
        return matchesSearch && matchesSchool && matchesGrade && matchesLevel;
      })
      .sort((a, b) => b.points - a.points);
  };

  // Helper render of Lesson Icon
  const renderLessonIcon = (iconName: string, status: string) => {
    const style = status === "locked" ? "text-slate-400" : "text-brand-purple";
    switch (iconName) {
      case "HeartHandshake":
        return <Heart className={`w-6 h-6 ${style}`} />;
      case "Scale":
        return <Scale className={`w-6 h-6 ${style}`} />;
      case "ShieldAlert":
        return <Shield className={`w-6 h-6 ${style}`} />;
      default:
        return <Flag className={`w-6 h-6 ${style}`} />;
    }
  };

  return (
    <div className="min-h-screen pb-16 bg-brand-yellow/30 flex flex-col items-center">
      {/* Dynamic Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#8f4b41_1.5px,transparent_1.5px)] bg-[size:16px_16px]"></div>

      {/* Main Container framed representing clean mobile format on desktop and beautifully adaptive on tablets */}
      <div className="w-full max-w-md bg-white min-h-screen shadow-2xl flex flex-col relative z-10 border-x border-brand-purple/10">
        
        {/* Dynamic Encouragement Toast Floating Top */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 12, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={() => setToastMessage(null)}
              className="absolute top-16 left-4 right-4 bg-brand-purple text-white p-3 rounded-xl shadow-2xl z-55 flex items-start gap-2.5 cursor-pointer border border-brand-purple/20"
            >
              <div className="bg-brand-coral bg-opacity-20 p-1.5 rounded-lg text-brand-coral flex-shrink-0">
                <Sparkles className="w-4 h-4 animate-pulse" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-coral block">Aviso</span>
                <p className="text-xs font-medium text-brand-surface leading-snug">{toastMessage}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!isGoogleLoggedIn ? (
          /* PANTALLA COMPLETA DE BIENVENIDA / INTERFAZ DE INGRESO */
          <div className="flex-1 w-full flex flex-col justify-between py-8 px-6 bg-gradient-to-b from-brand-yellow/15 via-white to-brand-yellow/5 select-none animate-fadeIn">
            {/* Contenedor central superior */}
            <div className="flex-1 flex flex-col justify-center items-center text-center space-y-6 my-auto pt-4">
              {/* Ilustración de bienvenida tierna con efecto flotante */}
              <div className="relative">
                <div className="absolute inset-0 bg-brand-yellow rounded-full blur-2xl opacity-30 scale-125 animate-pulse"></div>
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-brand-yellow/60 to-brand-coral/30 flex items-center justify-center border-4 border-brand-purple/20 relative shadow-xl">
                  <img 
                    alt="Santi tu guía digital" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuuzyc6bMMWsN-kMq9S70pNsXAzbswB68j92pPDIeoXNYMzD6nK06ghY_AhFAjdfNhIQHRNbNaqjAkqxImdf5nLfAAkxAvpNQKgoA9Rc-nyeFCxJ9CACZ8rCBG0natBaAbZvl3-pL31AT90VUYZDCVpmDX2xxGlwdp0LmbitQMdsuykwlJHEuzpAgEo0JaDlIRkYpVY5FoY_ADdT1EhL4SltcOrQxgQjlvxPQFFmO45R4Fv37jxbdhkujUwi8lutAYZA2EX-ZwpPAi6Q"
                    className="w-22 h-22 object-cover rounded-full"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute -bottom-1 -right-1 bg-brand-purple text-white text-base p-2 rounded-full shadow-lg border-2 border-brand-yellow flex items-center justify-center">🐻</span>
                </div>
              </div>

              {/* Mensaje de bienvenida solicitado por el usuario */}
              <div className="space-y-1.5">
                <h2 className="font-display font-black text-3xl text-brand-purple tracking-tight leading-tight">
                  ¡Hola explorador!
                </h2>
                <p className="text-xs font-semibold text-slate-500 max-w-xs leading-relaxed">
                  Te damos la bienvenida a tu <span className="text-brand-purple font-bold">Senda Digital Nariño</span>. Aprende buenas prácticas y de Netiqueta de forma divertida.
                </p>
              </div>

              {/* Card de Inicio de sesión único */}
              <div className="w-full bg-brand-surface border border-brand-yellow rounded-2xl p-4.5 shadow-md space-y-4">
                <div className="space-y-1 text-center">
                  <span className="text-[10px] font-black uppercase text-brand-coral tracking-wider block font-display">Ingreso de Estudiantes</span>
                  <h3 className="font-display font-extrabold text-[#583B7E] text-xs">
                    Inicia sesión con tu Correo de Google
                  </h3>
                </div>

                {/* Cuentas escolares rápidas de Google */}
                <div className="space-y-2.5 text-left">
                  {/* Cuenta principal (cursoia@unicatolicadelsur.edu.co) */}
                  <button
                    id="google-login-unicatolica"
                    onClick={() => handleGoogleLogin("cursoia@unicatolicadelsur.edu.co")}
                    className="w-full p-3 bg-white border border-brand-purple hover:bg-brand-yellow/5 text-left rounded-xl transition-all shadow-sm flex items-center justify-between gap-3 group ring-2 ring-brand-purple/10 cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#EA4335]/15 flex items-center justify-center border border-[#EA4335]/30 flex-shrink-0 text-[#EA4335] font-display font-extrabold text-xs">
                        C
                      </div>
                      <div className="text-left">
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-display font-extrabold text-[11px] text-brand-purple leading-none">
                            cursoia@unicatolicadelsur.edu.co
                          </h4>
                          <span className="bg-emerald-100 text-emerald-800 text-[8px] font-extrabold px-1.5 py-0.5 rounded-full uppercase scale-90">TÚ</span>
                        </div>
                        <span className="text-[9px] font-semibold text-slate-400 mt-1 block">
                          I.E. Católica del Sur (Pasto)
                        </span>
                      </div>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-brand-purple/15 text-brand-purple flex items-center justify-center text-xs font-bold font-display opacity-85 group-hover:bg-[#EA4335] group-hover:text-white transition-all">
                      G
                    </div>
                  </button>

                  {/* Segunda cuenta escolar */}
                  <button
                    id="google-login-juanito"
                    onClick={() => handleGoogleLogin("juanito.perez@ciudadepasto.edu.co")}
                    className="w-full p-3 bg-white border border-brand-yellow/60 hover:bg-brand-yellow/5 text-left rounded-xl transition-all shadow-sm flex items-center justify-between gap-3 group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#4285F4]/15 flex items-center justify-center border border-[#4285F4]/30 flex-shrink-0 text-[#4285F4] font-display font-bold text-xs">
                        J
                      </div>
                      <div className="text-left">
                        <h4 className="font-display font-bold text-[11px] text-brand-purple leading-none">
                          juanito.perez@ciudadepasto.edu.co
                        </h4>
                        <span className="text-[9px] font-semibold text-slate-400 mt-1 block">
                          Colegio Municipal Ciudad de Pasto
                        </span>
                      </div>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-[10px] font-bold font-display opacity-80 group-hover:bg-[#4285F4] group-hover:text-white transition-all">
                      G
                    </div>
                  </button>

                  {/* Tercera cuenta escolar */}
                  <button
                    id="google-login-sofia"
                    onClick={() => handleGoogleLogin("sofia.rosero@normalsuperior.edu.co")}
                    className="w-full p-3 bg-white border border-brand-yellow/60 hover:bg-brand-yellow/5 text-left rounded-xl transition-all shadow-sm flex items-center justify-between gap-3 group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#34A853]/15 flex items-center justify-center border border-[#34A853]/30 flex-shrink-0 text-[#34A853] font-display font-bold text-xs">
                        S
                      </div>
                      <div className="text-left">
                        <h4 className="font-display font-bold text-[11px] text-brand-purple leading-none">
                          sofia.rosero@normalsuperior.edu.co
                        </h4>
                        <span className="text-[9px] font-semibold text-slate-400 mt-1 block">
                          I.E.M. Normal Superior de Pasto
                        </span>
                      </div>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-[10px] font-bold font-display opacity-80 group-hover:bg-[#34A853] group-hover:text-white transition-all">
                      G
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Pie de indicaciones del docente */}
            <div className="bg-brand-yellow/15 border border-brand-yellow/40 rounded-xl p-4 text-center space-y-1 mx-2">
              <p className="text-[10px] font-extrabold text-brand-purple uppercase tracking-wider font-display">
                🔑 Uso Escolar Autorizado
              </p>
              <p className="text-[11px] font-medium text-slate-600 leading-snug">
                Usa tu correo institucional dado por tu profesor para guardar tus logros y tus décimas reales.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* TOP APP BAR Header (Solo se muestra cuando isGoogleLoggedIn es verdadero) */}
            <header className="sticky top-0 z-40 bg-brand-surface/90 backdrop-blur-md px-4 h-16 border-b border-brand-yellow/60 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-brand-primary bg-brand-yellow/50">
                  <img
                    alt={profile.name}
                    src={profile.avatarUrl}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h1 className="font-display font-bold text-sm text-brand-purple leading-none">¡Hola, {profile.name.split(" ")[0]}!</h1>
                  <span className="text-[10px] font-semibold text-brand-primary uppercase tracking-wide">6to Grado • Pasto</span>
                </div>
              </div>
              
              <div 
                onClick={() => setShowRedeemModal(true)}
                className="bg-brand-coral/15 hover:bg-brand-coral/25 transition-colors cursor-pointer px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-brand-coral/30"
              >
                <Coins className="w-4 h-4 text-brand-coral animate-bounce" />
                <span className="font-display font-semibold text-[13px] text-brand-purple">
                  {profile.tenths} Décimas
                </span>
              </div>
            </header>

            {/* Google Connected Banner Pill */}
            <div className="mx-4 mt-4 bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] font-bold flex-shrink-0">
                  ✓
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold text-brand-purple leading-none">
                    {googleAccount}
                  </p>
                </div>
              </div>
              <button
                id="google-logout-btn"
                onClick={handleGoogleLogout}
                className="px-2 py-0.5 text-[9px] font-extrabold text-brand-rose bg-brand-rose/10 hover:bg-brand-rose hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                Cerrar Google
              </button>
            </div>

            {/* MAIN BODY AREA - Switch between screen tabs */}
            <main className="flex-1 px-4 py-5 overflow-y-auto space-y-6">

              {/* TAB 1: INICIO (Andean Path vertically) */}
              {activeTab === "inicio" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >

                  {/* Regional Atmos Banner */}
                  <div className="relative rounded-2xl overflow-hidden h-32 bg-brand-yellow/50 border border-brand-yellow shadow-md flex items-end">
                    <img 
                      alt="Volcán Galeras y Laguna de la Cocha" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuuzyc6bMMWsN-kMq9S70pNsXAzbswB68j92pPDIeoXNYMzD6nK06ghY_AhFAjdfNhIQHRNbNaqjAkqxImdf5nLfAAkxAvpNQKgoA9Rc-nyeFCxJ9CACZ8rCBG0natBaAbZvl3-pL31AT90VUYZDCVpmDX2xxGlwdp0LmbitQMdsuykwlJHEuzpAgEo0JaDlIRkYpVY5FoY_ADdT1EhL4SltcOrQxgQjlvxPQFFmO45R4Fv37jxbdhkujUwi8lutAYZA2EX-ZwpPAi6Q"
                      className="absolute inset-0 w-full h-full object-cover filter brightness-[0.85] contrast-[0.95]"
                      referrerPolicy="no-referrer"
                    />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-purple animate-pulse h-16"></div>
                <div className="relative z-10 p-4 text-white">
                  <span className="text-[10px] font-bold text-brand-coral uppercase tracking-wider block">Estación Activa</span>
                  <p className="font-display font-bold text-lg leading-tight text-brand-yellow">Lección: {quizScenarios[selectedScenarioIndex].title.split(": ")[1]}</p>
                </div>
              </div>

              {/* Progress and status header */}
              <div className="bg-brand-surface border border-brand-yellow/60 rounded-xl p-4 shadow-sm space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-brand-purple font-display uppercase">Tu Avance en la Senda</span>
                  <div className="flex items-center gap-1 bg-brand-purple/10 text-brand-purple px-2 py-0.5 rounded-full text-[11px] font-bold">
                    <span>Nivel {profile.level}</span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="w-full h-3 bg-brand-yellow/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-brand-rose to-brand-purple transition-all duration-700"
                      style={{ width: `${profile.progressPercentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-semibold text-brand-primary">
                    <span>Avances de ciudadanía</span>
                    <span>{profile.progressPercentage}% completado</span>
                  </div>
                </div>
              </div>

              {/* Character dialog */}
              <div className="bg-brand-yellow/15 border border-brand-yellow/50 rounded-2xl p-4 relative flex gap-3 shadow-inner">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-brand-coral bg-brand-yellow/50 flex-shrink-0 float-animation">
                  <img 
                    alt="Santi tu guía digital" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuuzyc6bMMWsN-kMq9S70pNsXAzbswB68j92pPDIeoXNYMzD6nK06ghY_AhFAjdfNhIQHRNbNaqjAkqxImdf5nLfAAkxAvpNQKgoA9Rc-nyeFCxJ9CACZ8rCBG0natBaAbZvl3-pL31AT90VUYZDCVpmDX2xxGlwdp0LmbitQMdsuykwlJHEuzpAgEo0JaDlIRkYpVY5FoY_ADdT1EhL4SltcOrQxgQjlvxPQFFmO45R4Fv37jxbdhkujUwi8lutAYZA2EX-ZwpPAi6Q"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-brand-purple uppercase tracking-wider font-display">Tutor Santi Dice:</p>
                  <p className="text-xs font-medium text-brand-purple leading-relaxed italic">
                    "¡Vea pues guagua! Cada reto resuelto con empatía nos protege de peligros y nos acerca a la cima del volcán Galeras."
                  </p>
                </div>
              </div>

              {/* The Andean Path (Vertical Timeline) */}
              <div className="space-y-4">
                <h3 className="font-display font-extrabold text-brand-purple text-base flex items-center gap-1.5">
                  <CompassIcon className="w-5 h-5 text-brand-coral" />
                  Tu Camino Digital
                </h3>

                <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-brand-yellow/80">
                  {lessons.map((les, index) => {
                    const isCompleted = les.status === "completed";
                    const isCurrent = les.status === "current";
                    const isLocked = les.status === "locked";

                    return (
                      <div key={les.id} className="relative group">
                        {/* Node marker */}
                        <div 
                          className={`absolute -left-6 top-1.5 w-6.5 h-6.5 rounded-full border-2 flex items-center justify-center transition-all z-10 ${
                            isCompleted 
                              ? "bg-brand-purple border-brand-purple text-white shadow-sm" 
                              : isCurrent 
                              ? "bg-white border-brand-coral text-brand-coral animate-pulse ring-4 ring-brand-coral/20" 
                              : "bg-slate-100 border-slate-300 text-slate-400"
                          }`}
                        >
                          {isCompleted ? (
                            <span className="text-[10px] font-bold">✓</span>
                          ) : (
                            <span className="text-[10px] font-bold">{index + 1}</span>
                          )}
                        </div>

                        {/* Node Card wrapper */}
                        <div 
                          onClick={() => {
                            if (!isLocked) {
                              setSelectedScenarioIndex(index);
                              setActiveTab("lecciones");
                              triggerToast(`Iniciando simulación de ${les.title}`);
                            } else {
                              triggerToast("¡Achachay! Este nodo está bloqueado hasta finalizar el anterior.");
                            }
                          }}
                          className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                            isCurrent 
                              ? "bg-white border-brand-coral shadow-md hover:border-brand-primary glow-selected" 
                              : isCompleted 
                              ? "bg-slate-50 border-brand-yellow/40 opacity-90 shadow-sm" 
                              : "bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-1.5 mb-1">
                                <h4 className={`font-display font-extrabold text-sm ${isLocked ? "text-slate-500" : "text-brand-purple"}`}>
                                  {les.title}
                                </h4>
                                {isCompleted && (
                                  <span className="bg-emerald-100 text-emerald-800 text-[9px] font-extrabold px-1.5 py-0.5 rounded">Listo</span>
                                )}
                                {isCurrent && (
                                  <span className="bg-brand-coral/20 text-brand-primary text-[9px] font-extrabold px-1.5 py-0.5 rounded animate-pulse">Ahora</span>
                                )}
                              </div>
                              <p className="text-[11px] font-medium text-slate-600 leading-snug">
                                {les.description}
                              </p>
                            </div>
                            <div className={`p-2 rounded-lg bg-opacity-20 flex-shrink-0 ${isLocked ? "bg-slate-200" : "bg-brand-yellow"}`}>
                              {renderLessonIcon(les.icon, les.status)}
                            </div>
                          </div>

                          {/* Progress inside card */}
                          {!isLocked && (
                            <div className="mt-3 pt-3 border-t border-brand-yellow/30 flex justify-between items-center">
                              <span className="text-[10px] font-bold text-slate-500">Avance de unidad</span>
                              <span className="text-[11px] font-extrabold text-brand-purple">{les.progress}%</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {lessons[3]?.status === "completed" && (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="p-5 rounded-2xl bg-gradient-to-r from-brand-yellow/30 via-brand-coral/25 to-brand-primary/20 border-2 border-brand-yellow text-center space-y-3.5 shadow-md"
                >
                  <Award className="w-12 h-12 text-brand-purple mx-auto animate-bounce" />
                  <div>
                    <h3 className="font-display font-extrabold text-brand-purple text-base">
                      ¡Felicidades, Súper Ciudadano Digital!
                    </h3>
                    <p className="text-xs font-semibold text-slate-700 leading-snug mt-1 text-center">
                      Has coronado la cima del volcán Galeras y completado toda la Senda Digital. Tu sabiduría e integridad brillan con luz propia.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowCertificateModal(true)}
                    className="w-full h-11 bg-brand-purple hover:bg-opacity-95 font-display font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all text-white cursor-pointer shadow-md tactile-press"
                  >
                    <Award className="w-4 h-4 text-brand-yellow animate-pulse" />
                    <span>Ver mi Diploma de Honor 🏆</span>
                  </button>
                </motion.div>
              )}

              {/* Big primary CTA to current lesson */}
              <button
                onClick={() => {
                  const currentIdx = lessons.findIndex((l) => l.status === "current");
                  setSelectedScenarioIndex(currentIdx !== -1 ? currentIdx : 0);
                  setActiveTab("lecciones");
                }}
                className="w-full text-center h-12 bg-brand-coral hover:bg-brand-primary font-display font-bold text-sm text-brand-purple hover:text-white rounded-xl shadow-lg border-b-4 border-brand-primary bg-opacity-95 transition-all text-white flex items-center justify-center gap-2 tactile-press cursor-pointer"
              >
                <span>Continuar mi Senda Digital</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* TAB 2: LECCIONES (Interactive simulator) */}
          {activeTab === "lecciones" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Navigation Back & Switcher Section */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-brand-surface rounded-xl p-3 border border-brand-yellow/50 shadow-sm">
                <button
                  onClick={() => setActiveTab("inicio")}
                  className="flex items-center gap-1.5 text-xs font-bold text-brand-purple hover:text-brand-primary cursor-pointer transition-all bg-brand-yellow/15 hover:bg-brand-yellow/30 px-3 py-2 rounded-lg border border-brand-yellow/40 self-start tactile-press"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-brand-coral animate-pulse" />
                  <span>Regresar a la Senda (Inicio)</span>
                </button>
                <div className="text-xs font-semibold text-slate-500">
                  Estás en: <span className="font-bold text-brand-purple">Unidad {selectedScenarioIndex + 1} de {quizScenarios.length}</span>
                </div>
              </div>

              {/* Scenario switcher header */}
              <div className="flex items-center justify-between">
                <h3 className="font-display font-extrabold text-brand-purple text-base">
                  Simulador de Netiqueta
                </h3>
                <div className="flex gap-1.5">
                  {quizScenarios.map((_scen, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedScenarioIndex(idx);
                        setSelectedOption(null);
                      }}
                      className={`w-7 h-7 rounded-full text-xs font-bold transition-all ${
                        idx === selectedScenarioIndex
                          ? "bg-brand-purple text-white shadow-md ring-2 ring-brand-purple/20"
                          : "bg-brand-yellow/30 text-brand-purple hover:bg-brand-yellow/50"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Simulated WhatsApp Card */}
              <div className="bg-brand-surface border border-brand-yellow/80 rounded-2xl shadow-lg overflow-hidden flex flex-col">
                {/* Chat header representing chat profile */}
                <div className="bg-brand-purple p-3.5 text-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-brand-yellow text-brand-purple rounded-full flex items-center justify-center font-display font-bold text-sm border-2 border-brand-coral">
                      {quizScenarios[selectedScenarioIndex].sender.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-xs leading-none">{quizScenarios[selectedScenarioIndex].sender}</h4>
                      <span className="text-[9px] font-semibold text-brand-coral tracking-wider block mt-0.5">● En línea</span>
                    </div>
                  </div>
                  <MessageSquare className="w-4.5 h-4.5 text-brand-coral opacity-80" />
                </div>

                {/* Simulated Chat Feed */}
                <div className="p-4 bg-brand-yellow bg-opacity-15 min-h-48 flex flex-col justify-end space-y-4">
                  {/* Friend's suspicious/agitated incoming message */}
                  <div className="flex gap-2 max-w-[85%]">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-yellow/50 text-[10px] font-bold flex items-center justify-center">
                      💬
                    </div>
                    <div className="bg-white p-3.5 rounded-2xl rounded-tl-none border border-brand-yellow/50 shadow-sm">
                      <p className="text-xs font-medium text-slate-800 leading-relaxed">
                        {quizScenarios[selectedScenarioIndex].messageText}
                      </p>
                      <span className="text-[9px] text-slate-400 font-semibold block text-right mt-1.5">10:45 AM</span>
                    </div>
                  </div>

                  {/* Question header */}
                  <div className="text-center py-2.5 border-y border-dashed border-brand-coral/40 my-2">
                    <p className="font-display font-extrabold text-brand-purple text-xs leading-snug">
                      {quizScenarios[selectedScenarioIndex].questionText}
                    </p>
                  </div>

                  {/* Correct response state indicator details */}
                  {selectedOption !== null && (
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={`p-3.5 rounded-xl flex gap-3 text-xs leading-relaxed border ${
                        quizScenarios[selectedScenarioIndex].options[selectedOption].isCorrect
                          ? "bg-emerald-50 border-emerald-200 text-emerald-950"
                          : "bg-brand-rose bg-opacity-10 border-brand-rose border-opacity-30 text-brand-purple"
                      }`}
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden border-2 border-brand-coral bg-brand-yellow/50">
                        <img 
                          alt="Santi tu guía digital" 
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuuzyc6bMMWsN-kMq9S70pNsXAzbswB68j92pPDIeoXNYMzD6nK06ghY_AhFAjdfNhIQHRNbNaqjAkqxImdf5nLfAAkxAvpNQKgoA9Rc-nyeFCxJ9CACZ8rCBG0natBaAbZvl3-pL31AT90VUYZDCVpmDX2xxGlwdp0LmbitQMdsuykwlJHEuzpAgEo0JaDlIRkYpVY5FoY_ADdT1EhL4SltcOrQxgQjlvxPQFFmO45R4Fv37jxbdhkujUwi8lutAYZA2EX-ZwpPAi6Q"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <span className="font-display font-bold uppercase tracking-wider text-[11px] block text-brand-purple">
                          Explicación de Tutor Santi:
                        </span>
                        <p className="font-semibold text-slate-700 font-sans italic">
                          {quizScenarios[selectedScenarioIndex].options[selectedOption].feedback}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Interactive quiz option choices buttons */}
                <div className="p-4 bg-brand-surface border-t border-brand-yellow/45 space-y-2.5">
                  {quizScenarios[selectedScenarioIndex].options.map((opt, oIdx) => {
                    const isSelected = selectedOption === oIdx;
                    const isAnswered = selectedOption !== null;

                    let btnStyle = "bg-white border-brand-yellow hover:border-brand-coral hover:bg-brand-yellow/10";
                    if (isAnswered) {
                      if (isSelected) {
                        btnStyle = opt.isCorrect
                          ? "bg-emerald-500 text-white border-emerald-600 shadow-md ring-2 ring-emerald-200"
                          : "bg-red-500 text-white border-red-600 shadow-md ring-2 ring-red-200";
                      } else {
                        btnStyle = "bg-slate-50 border-slate-200 opacity-50 cursor-not-allowed";
                      }
                    }

                    return (
                      <button
                        key={oIdx}
                        disabled={isAnswered}
                        onClick={() => handleSelectOption(oIdx)}
                        className={`w-full p-3.5 text-left border rounded-xl font-display font-semibold transition-all duration-150 text-[13px] flex items-center justify-between gap-2.5 ${btnStyle}`}
                      >
                        <span className="leading-snug">{opt.text}</span>
                        {!isAnswered && <ChevronRight className="w-4 h-4 text-brand-coral flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Chat state buttons */}
              {selectedOption !== null && (
                <div className="flex gap-3">
                  <button
                    onClick={handleResetScenario}
                    className="flex-1 h-11 border border-brand-purple text-brand-purple hover:bg-brand-purple/5 font-display font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all text-brand-purple"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Intentar de nuevo</span>
                  </button>

                  <button
                    onClick={handleNextScenario}
                    className="flex-1 h-11 bg-brand-purple text-white hover:bg-opacity-95 font-display font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>Siguiente Senda</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* AI CHAT SANDBOX INTERACTIVELY ENABLING THE GEMINI EVALUATION */}
              <div className="bg-brand-purple bg-opacity-[0.03] border border-brand-purple/15 rounded-2xl p-4.5 space-y-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="bg-brand-purple/10 text-brand-purple p-2 rounded-xl flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-brand-purple" />
                  </span>
                  <div>
                    <h4 className="font-display font-bold text-sm text-brand-purple">Senda AI Sandbox</h4>
                    <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">Prueba cualquier respuesta libre</span>
                  </div>
                </div>

                <p className="text-[11px] font-medium text-slate-600 leading-snug">
                  Escribe tu propia respuesta constructiva para ayudar a {quizScenarios[selectedScenarioIndex].sender.split(" ")[0]} y pon a prueba a nuestra Inteligencia Artificial escolar del Tutor Santi.
                </p>

                <div className="relative">
                  <textarea
                    rows={2.5}
                    value={sandboxInput}
                    disabled={sandboxLoading}
                    onChange={(e) => setSandboxInput(e.target.value)}
                    placeholder="Escribe aquí tu frase de netiqueta (Evita mayúsculas sostenidas o palabras despectivas)..."
                    className="w-full text-xs font-semibold text-slate-800 p-3 rounded-xl border border-brand-yellow focus:border-brand-coral focus:ring-1 focus:ring-brand-coral outline-none bg-white font-sans placeholder-slate-400"
                  />
                  <button
                    disabled={sandboxLoading || !sandboxInput.trim()}
                    onClick={handleEvaluateSandbox}
                    className="absolute right-2.5 bottom-2.5 p-2 bg-brand-purple rounded-lg text-white disabled:bg-slate-200 disabled:text-slate-400 transition-colors"
                  >
                    {sandboxLoading ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Sandbox feedback display response */}
                {sandboxResponse && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-3.5 rounded-xl border flex gap-3 text-xs leading-relaxed ${
                      sandboxResponse.isCorrect
                        ? "bg-emerald-50 border-emerald-200 text-emerald-950"
                        : "bg-red-50 border-red-200 text-red-950"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-brand-yellow flex-shrink-0">
                      <img 
                        alt="Santi, tu guía digital" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuuzyc6bMMWsN-kMq9S70pNsXAzbswB68j92pPDIeoXNYMzD6nK06ghY_AhFAjdfNhIQHRNbNaqjAkqxImdf5nLfAAkxAvpNQKgoA9Rc-nyeFCxJ9CACZ8rCBG0natBaAbZvl3-pL31AT90VUYZDCVpmDX2xxGlwdp0LmbitQMdsuykwlJHEuzpAgEo0JaDlIRkYpVY5FoY_ADdT1EhL4SltcOrQxgQjlvxPQFFmO45R4Fv37jxbdhkujUwi8lutAYZA2EX-ZwpPAi6Q"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-display font-extrabold text-brand-purple">Santi Evaluador AI:</span>
                        <div className="text-[10px] font-extrabold uppercase">
                          {sandboxResponse.isCorrect ? (
                            <span className="text-emerald-700">¡Correcto! (+{sandboxResponse.points} pts)</span>
                          ) : (
                            <span className="text-red-700">¡Incorrecto! ({sandboxResponse.points} pts)</span>
                          )}
                        </div>
                      </div>
                      <p className="font-semibold text-slate-700 font-sans leading-snug italic">
                        {sandboxResponse.feedback}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 3: RANKING (School directory with Search and advanced filters as requested) */}
          {activeTab === "ranking" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5"
            >
              {/* Leaderboard intro text */}
              <div>
                <h3 className="font-display font-extrabold text-brand-purple text-base">
                  Directorio de Ciudadanía
                </h3>
                <span className="text-[11px] font-semibold text-slate-500">Compara décimas y puntos acumulados en colegios de Pasto</span>
              </div>

              {/* SEARCH & FILTERS CONTROLS */}
              <div className="bg-brand-surface border border-brand-yellow rounded-2xl p-4 space-y-3.5 shadow-sm">
                {/* Name Quick Search bar */}
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar estudiante..."
                    className="w-full h-10 pl-9 pr-4 text-xs font-semibold text-slate-800 rounded-xl border border-brand-yellow outline-none focus:border-brand-coral bg-white font-sans placeholder-slate-400"
                  />
                  <Search className="absolute left-3.5 top-3 w-4 h-4 text-brand-coral" />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 font-bold text-xs"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Collapsible/Grid filters */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold uppercase text-slate-500 font-display">Institución</label>
                    <select
                      value={selectedSchool}
                      onChange={(e) => setSelectedSchool(e.target.value)}
                      className="w-full h-9 px-2 text-[11px] font-semibold text-slate-700 rounded-lg border border-brand-yellow font-display outline-none bg-white"
                    >
                      {schoolsList.map((sch) => (
                        <option key={sch} value={sch}>{sch}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold uppercase text-slate-500 font-display">Grado</label>
                    <select
                      value={selectedGrade}
                      onChange={(e) => setSelectedGrade(e.target.value)}
                      className="w-full h-9 px-2 text-[11px] font-semibold text-slate-700 rounded-lg border border-brand-yellow font-display outline-none bg-white"
                    >
                      {gradesList.map((gr) => (
                        <option key={gr} value={gr}>{gr}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Level rank advanced selector */}
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold uppercase text-slate-500 font-display">Rango del Estudiante</label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full h-9 px-2 text-[11px] font-semibold text-slate-700 rounded-lg border border-brand-yellow font-display outline-none bg-white"
                    style={{ WebkitAppearance: "none", appearance: "none" }}
                  >
                    {levelsFilterList.map((lvl) => (
                      <option key={lvl} value={lvl}>{lvl}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Leaderboard rankings list display */}
              <div className="space-y-2.5">
                {getFilteredLeaderboard().length > 0 ? (
                  getFilteredLeaderboard().map((entry, index) => {
                    const isCurrentUser = entry.name.includes("(Tú)");
                    return (
                      <motion.div
                        key={entry.id}
                        layoutId={entry.id}
                        className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
                          isCurrentUser
                            ? "bg-brand-coral/10 border-brand-coral shadow-sm ring-1 ring-brand-coral/20"
                            : "bg-brand-surface border-brand-yellow/50 hover:bg-white shadow-sm"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          {/* Rank badge */}
                          <div className={`w-6 h-6 rounded-full font-display font-extrabold text-xs flex items-center justify-center ${
                            index === 0
                              ? "bg-amber-100 text-amber-700"
                              : index === 1
                              ? "bg-slate-200 text-slate-700"
                              : index === 2
                              ? "bg-orange-100 text-orange-700"
                              : "bg-slate-100 text-slate-500"
                          }`}>
                            {index + 1}
                          </div>

                          {/* Info */}
                          <div>
                            <h4 className="font-display font-bold text-xs text-brand-purple flex items-center gap-1">
                              {entry.name}
                              {isCurrentUser && (
                                <span className="bg-brand-coral text-white text-[9px] font-extrabold px-1 rounded">Éxito</span>
                              )}
                            </h4>
                            <span className="text-[9px] font-semibold text-slate-500 block leading-tight">
                              {entry.school} • {entry.grade}
                            </span>
                            <span className="text-[9px] font-bold text-brand-primary uppercase mt-0.5 block">
                              🏅 {entry.level}
                            </span>
                          </div>
                        </div>

                        {/* Scores */}
                        <div className="text-right flex-shrink-0">
                          <span className="font-display font-extrabold text-xs text-brand-purple block leading-none">
                            {entry.points} pts
                          </span>
                          <span className="text-[10px] font-bold text-brand-rose mt-0.5 block">
                            +{entry.tenths} Décimas
                          </span>
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-brand-yellow space-y-2">
                    <p className="font-display font-extrabold text-slate-600 text-sm">No se encontraron estudiantes</p>
                    <p className="text-[11px] text-slate-400 font-semibold px-4">Recuerda ajustar los filtros o el buscador de nombres</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 4: PERFIL (Student Profile exact reconstruction) */}
          {activeTab === "perfil" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Profile card of Juanito Prez */}
              <div className="bg-white rounded-2xl shadow-xl p-5 border border-brand-yellow/40 relative overflow-hidden flex flex-col items-center">
                <div className="absolute top-0 left-0 w-full h-2 bg-brand-mauve"></div>

                {/* Profile Photo Avatar */}
                <div className="w-24 h-24 rounded-full border-4 border-brand-yellow mb-3.5 shadow-md overflow-hidden bg-brand-yellow/20 flex-shrink-0">
                  <img
                    alt={profile.name}
                    src={profile.avatarUrl}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Student info text */}
                <h2 className="font-display font-extrabold text-[#583B7E] text-lg text-center leading-tight">
                  {profile.name}
                </h2>
                <p className="text-xs font-semibold text-slate-500 mt-1">{profile.grade} • Pasto</p>

                {/* Core metrics badges */}
                <div className="mt-5 grid grid-cols-2 gap-3.5 w-full">
                  <div className="bg-brand-yellow bg-opacity-10 py-3 px-4 rounded-xl border border-brand-yellow flex flex-col items-center text-center">
                    <Sparkles className="w-5 h-5 text-brand-coral mb-1" />
                    <span className="font-display font-extrabold text-brand-purple text-base leading-none mt-1">
                      {profile.points}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500 tracking-wide mt-1">
                      Puntos Netiqueta
                    </span>
                  </div>

                  <div className="bg-brand-yellow bg-opacity-10 py-3 px-4 rounded-xl border border-brand-yellow flex flex-col items-center text-center">
                    <Award className="w-5 h-5 text-brand-mauve mb-1" />
                    <span className="font-display font-extrabold text-brand-purple text-base leading-none mt-1">
                      {profile.tenths}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500 tracking-wide mt-1">
                      Décimas Acumuladas
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Pathway Section */}
              <div className="space-y-3">
                <h3 className="font-display font-extrabold text-brand-purple text-sm flex items-center gap-1.5 uppercase tracking-wide">
                  <Coins className="w-4 h-4 text-brand-coral" />
                  Tu Camino Digital
                </h3>

                <div className="bg-white p-4.5 rounded-2xl border border-brand-yellow/40 shadow-sm space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold font-display">
                    <span className="text-brand-purple">Nivel {profile.level}: {profile.levelName}</span>
                    <span className="text-brand-purple">{profile.progressPercentage}%</span>
                  </div>
                  <div className="w-full h-3 bg-brand-yellow bg-opacity-20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand-rose to-brand-purple transition-all duration-700"
                      style={{ width: `${profile.progressPercentage}%` }}
                    ></div>
                  </div>
                  <p className="text-[11px] font-semibold text-slate-500 leading-snug italic text-center">
                    "¡Estás a solo una lección de ser el próximo guía andino!" - Santi
                  </p>
                </div>
              </div>

              {/* Badges List Section */}
              <div className="space-y-3">
                <h3 className="font-display font-extrabold text-brand-purple text-sm flex items-center gap-1.5 uppercase tracking-wide">
                  <Award className="w-4 h-4 text-brand-mauve" />
                  Mis Insignias
                </h3>

                <div className="grid grid-cols-2 gap-3.5">
                  {badges.map((b) => {
                    const isUnlocked = b.status === "unlocked";
                    return (
                      <div
                        key={b.id}
                        onClick={() => triggerToast(`Insignia ${b.title}: ${b.subtitle}`)}
                        className={`bg-white p-4 rounded-xl shadow-sm border-t-4 flex flex-col items-center text-center transition-all cursor-pointer ${b.borderCol} ${
                          !isUnlocked && "opacity-60"
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-full ${b.bgCol} flex items-center justify-center mb-2`}>
                          {renderBadgeIcon(b.icon, b.iconCol)}
                        </div>
                        <p className="font-display font-extrabold text-xs text-brand-purple leading-tight">
                          {isUnlocked ? b.title : "Senda Secreta"}
                        </p>
                        <p className="text-[10px] font-semibold text-slate-400 mt-0.5">
                          {isUnlocked ? b.subtitle : "Por Desbloquear"}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ACTION BUTTON -> REDEEM DECIMAS TRANSFERRED TO SCHOOL GRADES */}
              <div className="pt-2 space-y-3">
                <button
                  onClick={() => setShowRedeemModal(true)}
                  className="w-full h-12 bg-brand-coral hover:bg-brand-primary text-white font-display font-extrabold text-xs tracking-wider uppercase rounded-xl shadow-md flex items-center justify-center gap-2 border-b-4 border-brand-primary bg-opacity-95 transition-all cursor-pointer tactile-press"
                >
                  <Coins className="w-4 h-4 animate-bounce" />
                  <span>Canjear mis décimas</span>
                </button>

                {lessons[3]?.status === "completed" && (
                  <button
                    onClick={() => setShowCertificateModal(true)}
                    className="w-full h-12 bg-gradient-to-r from-brand-yellow to-brand-coral hover:from-brand-coral hover:to-brand-yellow text-brand-purple font-display font-extrabold text-xs tracking-wider uppercase rounded-xl shadow-md flex items-center justify-center gap-2 border-2 border-brand-yellow transition-all cursor-pointer tactile-press"
                  >
                    <Award className="w-4.5 h-4.5 text-brand-purple" />
                    <span>Ver mi Diploma de Súper Ciudadano 🏆</span>
                  </button>
                )}
              </div>
            </motion.div>
          )}

        </main>

        {/* BOTTOM NAVIGATION BAR */}
        <nav className="sticky bottom-0 z-40 bg-white border-t border-brand-yellow/60 h-20 shadow-lg flex items-center justify-around px-2">
          {/* Tab 1: Inicio */}
          <button
            onClick={() => setActiveTab("inicio")}
            className={`flex flex-col items-center justify-center flex-1 h-full select-none outline-none cursor-pointer tactile-press ${
              activeTab === "inicio" ? "text-brand-purple font-black scale-105" : "text-slate-400 hover:text-slate-600 font-semibold"
            }`}
          >
            <CompassIcon className="w-5.5 h-5.5 mb-1" />
            <span className="font-display text-[11px]">Inicio</span>
          </button>

          {/* Tab 2: Lecciones */}
          <button
            onClick={() => setActiveTab("lecciones")}
            className={`flex flex-col items-center justify-center flex-1 h-full select-none outline-none cursor-pointer tactile-press ${
              activeTab === "lecciones" ? "text-brand-purple font-black scale-105" : "text-slate-400 hover:text-slate-600 font-semibold"
            }`}
          >
            <BookOpen className="w-5.5 h-5.5 mb-1" />
            <span className="font-display text-[11px]">Lecciones</span>
          </button>

          {/* Tab 3: Ranking */}
          <button
            onClick={() => setActiveTab("ranking")}
            className={`flex flex-col items-center justify-center flex-1 h-full select-none outline-none cursor-pointer tactile-press ${
              activeTab === "ranking" ? "text-brand-purple font-black scale-105" : "text-slate-400 hover:text-slate-600 font-semibold"
            }`}
          >
            <Trophy className="w-5.5 h-5.5 mb-1" />
            <span className="font-display text-[11px]">Ranking</span>
          </button>

          {/* Tab 4: Perfil */}
          <button
            onClick={() => setActiveTab("perfil")}
            className={`flex flex-col items-center justify-center flex-1 h-full select-none outline-none cursor-pointer tactile-press ${
              activeTab === "perfil" ? "text-brand-purple bg-brand-purple/10 px-2 rounded-xl font-black scale-105" : "text-slate-400 hover:text-slate-600 font-semibold"
            }`}
          >
            <User className="w-5.5 h-5.5 mb-1" />
            <span className="font-display font-bold text-[11px]">Perfil</span>
          </button>
        </nav>

        {/* DECIMAS REDEMPTION GRADE MODAL */}
        <AnimatePresence>
          {showRedeemModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-brand-purple bg-opacity-40 flex items-end z-50 justify-center backdrop-blur-sm"
              onClick={() => setShowRedeemModal(false)}
            >
              <motion.div
                initial={{ y: 200 }}
                animate={{ y: 0 }}
                exit={{ y: 200 }}
                transition={{ type: "spring", damping: 25 }}
                className="w-full bg-white rounded-t-3xl p-6 space-y-5 border-t border-brand-yellow flex flex-col shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Title */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5">
                    <GraduationCap className="w-5.5 h-5.5 text-brand-coral" />
                    <h3 className="font-display font-extrabold text-brand-purple text-base">
                      Canjear Décimas Escolares
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowRedeemModal(false)}
                    className="p-1 h-7 w-7 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
                  >
                    <X className="w-4 h-4 mx-auto" />
                  </button>
                </div>

                {/* Body details */}
                {redemptionSuccess ? (
                  <div className="text-center py-8 space-y-3.5">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl animate-bounce">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-display font-extrabold text-brand-purple text-sm">¡Canje Exitoso, guagua!</h4>
                      <p className="text-[11px] text-slate-500 font-semibold px-4 mt-1 leading-snug">
                        Santiago ha timbrado tu libreta escolar. Tu docente de informática validará e incrementará tus décimas en la planilla de notas presencial.
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-[11px] font-medium text-slate-600 leading-snug">
                      La recompensa de tu Senda Digital se convierte en décimas reales que puedes sumar a tus materias escolares del colegio. Tu balance actual es <span className="text-brand-rose font-bold">{profile.tenths} décimas</span>.
                    </p>

                    {/* School Subjects list dropdown Select */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-extrabold uppercase text-slate-500 font-display">Materia escolar del colegio</label>
                      <select
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                        className="w-full h-10 px-3 text-xs font-semibold text-slate-700 rounded-xl border border-brand-yellow outline-none bg-slate-50 font-display font-sans"
                      >
                        <option value="Tecnología e Informática">Tecnología e Informática</option>
                        <option value="Ciencias Naturales">Ciencias Naturales</option>
                        <option value="Matemáticas">Matemáticas</option>
                        <option value="Idioma Extranjero">Idioma Extranjero (Inglés)</option>
                      </select>
                    </div>

                    {/* Tenths selection buttons */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold uppercase text-slate-500 font-display block">Cantidad de décimas a canjear</label>
                      <div className="flex gap-2">
                        {[0.2, 0.5, 1.0, 2.0].map((val) => (
                          <button
                            key={val}
                            disabled={profile.tenths < val}
                            onClick={() => setTenthsToRedeem(val)}
                            className={`flex-1 py-2 text-xs font-display font-bold rounded-lg border transition-all ${
                              tenthsToRedeem === val
                                ? "bg-brand-purple text-white border-brand-purple shadow-sm"
                                : profile.tenths >= val
                                ? "bg-white border-brand-yellow text-slate-700 hover:border-brand-coral"
                                : "bg-slate-50 border-slate-200 text-slate-300 cursor-not-allowed"
                            }`}
                          >
                            {val} d
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Redeem submit CTA button */}
                    <button
                      onClick={handleRedeemTenths}
                      disabled={profile.tenths < tenthsToRedeem}
                      className="w-full text-center h-12 bg-brand-coral hover:bg-brand-primary disabled:bg-slate-100 disabled:text-slate-400 font-display font-extrabold text-xs uppercase tracking-wider rounded-xl text-white transition-all cursor-pointer border-b-4 border-brand-primary border-opacity-60 disabled:border-none tactile-press"
                    >
                      Canjear {tenthsToRedeem} décimas ahora
                    </button>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}

          {/* CERTIFICATE MODAL */}
          {showCertificateModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-brand-purple bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm print:relative print:bg-white print:p-0 print:m-0 print:inset-auto"
              onClick={() => setShowCertificateModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-sm bg-white rounded-2xl p-6 space-y-4 border-2 border-brand-yellow flex flex-col shadow-2xl relative overflow-hidden print:shadow-none print:border-none print:p-0"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button hidden in print */}
                <button
                  onClick={() => setShowCertificateModal(false)}
                  className="absolute top-4 right-4 p-1 h-7 w-7 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 print:hidden z-10 cursor-pointer"
                >
                  <X className="w-4 h-4 mx-auto" />
                </button>

                {/* Sparkling Background Accent decoration */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#dca54c_2px,transparent_2px)] bg-[size:10px_10px]"></div>

                {/* Certificate Border Frame */}
                <div className="border-4 border-dashed border-[#FCA699] rounded-xl p-4 text-center space-y-3.5 relative bg-[#FCFBF7]">
                  <div className="absolute top-2 right-2 text-brand-rose print:hidden">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </div>
                  
                  {/* Badge emblem */}
                  <div className="w-14 h-14 rounded-full bg-brand-yellow bg-opacity-45 flex items-center justify-center mx-auto border-2 border-brand-primary">
                    <Award className="w-8 h-8 text-brand-purple" />
                  </div>

                  <div>
                    <h3 className="font-display font-black text-brand-purple text-base tracking-wide uppercase leading-tight">
                      Diploma de Honor
                    </h3>
                    <p className="text-[10px] font-extrabold text-[#8f4b41] uppercase tracking-widest mt-1">
                      Súper Ciudadano Digital
                    </p>
                  </div>

                  <div className="space-y-1.5 py-1">
                    <p className="text-[10px] text-slate-500 font-medium">Otorgado con gran orgullo pastuso a:</p>
                    
                    {/* Editable / View Name */}
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full text-center bg-transparent border-b border-brand-coral py-0.5 text-base font-extrabold text-[#583B7E] font-display hover:border-[#8f4b41] focus:border-[#8f4b41] focus:ring-0 outline-none print:border-none leading-none select-all"
                      placeholder="Escribe tu nombre completo"
                      title="Haz clic para cambiar el nombre en el diploma"
                    />
                    
                    <p className="text-[9px] text-slate-500 font-semibold italic mt-1 leading-snug px-3">
                      "Por haber escalado con éxito la Senda Digital, asumiendo con honor el compromiso ético de la netiqueta, el respeto mutuo, y la seguridad interactiva en sexto grado."
                    </p>
                  </div>

                  {/* Seals / Footers */}
                  <div className="pt-2 border-t border-brand-yellow flex justify-between items-end">
                    <div className="text-left">
                      <p className="text-[10px] font-extrabold text-brand-purple font-display">{profile.grade}</p>
                      <p className="text-[8px] text-slate-400 font-bold">Pasto, Nariño, Colombia</p>
                    </div>
                    <div className="text-right flex flex-col items-center">
                      {/* Santiago Cuy Sign */}
                      <span className="font-display text-brand-purple font-bold text-[10px] italic leading-none">Tutor Cuy Santi 🐹</span>
                      <div className="w-11 h-[1px] bg-slate-300 my-1"></div>
                      <p className="text-[8px] text-slate-400 font-bold">Líder y Orientador</p>
                    </div>
                  </div>
                </div>

                {/* Print action CTA */}
                <button
                  onClick={() => window.print()}
                  className="w-full h-11 bg-[#583B7E] text-white hover:bg-opacity-95 font-display font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all text-white cursor-pointer print:hidden shadow-md tactile-press"
                >
                  <Award className="w-4 h-4 text-brand-yellow" />
                  <span>Imprimir / Guardar Diploma 🖨️</span>
                </button>
                <p className="text-[9px] text-center text-slate-400 font-semibold leading-normal print:hidden">
                  * Haz clic sobre tu nombre en el diploma para editarlo antes de imprimir. Elige "Guardar como PDF" en tu navegador.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
          </>
        )}

      </div>
    </div>
  );
}

// Inline rendering of Badge Icons
function renderBadgeIcon(iconName: string, iconCol: string) {
  switch (iconName) {
    case "Heart":
      return <Heart className={`w-6 h-6 ${iconCol}`} />;
    case "Flame":
      return <Flame className={`w-6 h-6 ${iconCol}`} />;
    case "ShieldCheck":
      return <ShieldCheck className={`w-6 h-6 ${iconCol}`} />;
    case "CheckCircle2":
      return <CheckCircle2 className={`w-6 h-6 ${iconCol}`} />;
    default:
      return <Lock className={`w-5 h-5 ${iconCol}`} />;
  }
}

// Simple Compass Icon helper falling back to beautiful look
function CompassIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0V3m0 18a9 9 0 0 1-9-9c0-.424.03-.84.086-1.246M12 21a9 9 0 0 0 9-9c0-.424-.03-.84-.086-1.246M3.086 9.754a9.006 9.006 0 0 1 17.828 0"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m12.75 11.25 3.5-3.5m-3.5 3.5-3.5 3.5m3.5-3.5 3.5 3.5m-3.5-3.5-3.5-3.5"
      />
    </svg>
  );
}
