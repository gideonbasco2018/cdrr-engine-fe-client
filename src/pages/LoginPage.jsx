import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, googleLogin, verifyGoogleOtp } from "../api/auth";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login: setAuthUser } = useAuth();

  // =========================================================
  // LOGIN STATES
  // =========================================================
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =========================================================
  // OTP STATES
  // =========================================================
  const [otpStage, setOtpStage] = useState(false);
  const [pendingToken, setPendingToken] = useState("");
  const [otpEmail, setOtpEmail] = useState("");
  const [otp, setOtp] = useState("");

  // =========================================================
  // GOOGLE
  // =========================================================
  const googleBtnRef = useRef(null);

  // =========================================================
  // GOOGLE LOGIN
  // =========================================================
  async function handleGoogleCredential(response) {
    setError("");
    setLoading(true);

    try {
      const data = await googleLogin(response.credential);

      setPendingToken(data.pending_token || "");
      setOtpEmail(data.email || "");
      setOtpStage(true);
    } catch (err) {
      console.error("Google login error:", err);

      setError("We couldn't sign you in with Google. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // =========================================================
  // GOOGLE BUTTON
  // =========================================================
  useEffect(() => {
    if (otpStage) return;

    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    if (!clientId) {
      console.warn("VITE_GOOGLE_CLIENT_ID is not configured.");
      return;
    }

    const existingScript = document.querySelector(
      'script[src="https://accounts.google.com/gsi/client"]',
    );

    const initializeGoogle = () => {
      if (!window.google || !googleBtnRef.current) {
        return;
      }

      googleBtnRef.current.innerHTML = "";

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleGoogleCredential,
      });

      window.google.accounts.id.renderButton(googleBtnRef.current, {
        theme: "outline",
        size: "large",
        width: "100%",
        text: "signin_with",
        shape: "rect",
        logo_alignment: "left",
      });
    };

    if (existingScript) {
      if (window.google) {
        initializeGoogle();
      } else {
        existingScript.addEventListener("load", initializeGoogle);
      }

      return () => {
        existingScript.removeEventListener("load", initializeGoogle);
      };
    }

    const script = document.createElement("script");

    script.src = "https://accounts.google.com/gsi/client";

    script.async = true;
    script.defer = true;

    script.onload = initializeGoogle;

    document.head.appendChild(script);

    return () => {
      script.onload = null;
    };
  }, [otpStage]);

  // =========================================================
  // NORMAL LOGIN
  // =========================================================
  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    if (!username.trim() || !password) {
      setError("Please enter your username and password.");
      return;
    }

    setLoading(true);

    try {
      const data = await login(username.trim(), password);

      if (data?.access_token) {
        sessionStorage.setItem("access_token", data.access_token);
      }

      setAuthUser(data?.user || { username });

      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);

      const message =
        err?.response?.data?.detail ||
        err?.message ||
        "We couldn't sign you in. Check your username and password.";

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  // =========================================================
  // OTP SUBMIT
  // =========================================================
  async function handleOtpSubmit(e) {
    e.preventDefault();

    setError("");

    if (otp.length !== 6) {
      setError("Please enter the 6-digit verification code.");
      return;
    }

    setLoading(true);

    try {
      const data = await verifyGoogleOtp(pendingToken, otp);

      if (data?.access_token) {
        sessionStorage.setItem("access_token", data.access_token);
      }

      setAuthUser(
        data?.user || {
          email: otpEmail,
        },
      );

      navigate("/dashboard");
    } catch (err) {
      console.error("OTP verification error:", err);

      const message =
        err?.response?.data?.detail || "Invalid or expired verification code.";

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  // =========================================================
  // BACK TO LOGIN
  // =========================================================
  function backToLogin() {
    setOtpStage(false);
    setPendingToken("");
    setOtpEmail("");
    setOtp("");
    setError("");
  }

  return (
    <div className="min-h-[100dvh] w-full bg-[#f7f8f5]">
      {/* =====================================================
          MAIN LAYOUT
      ===================================================== */}
      <div className="min-h-[100dvh] w-full md:grid md:grid-cols-[46%_54%]">
        {/* ===================================================
            DESKTOP LEFT BRAND PANEL
        =================================================== */}
        <div className="relative hidden min-h-[100dvh] overflow-hidden bg-[#063f2f] px-10 py-8 text-white md:flex md:flex-col md:justify-center lg:px-12">
          {/* Background decoration */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-[#d4af52]/10 blur-3xl" />

            <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-emerald-300/5 blur-3xl" />

            <div className="absolute -right-40 top-[20%] h-[430px] w-[430px] rounded-full border border-white/[0.045]" />

            <div className="absolute -right-28 top-[25%] h-[360px] w-[360px] rounded-full border border-white/[0.045]" />

            <div className="absolute -right-16 top-[30%] h-[290px] w-[290px] rounded-full border border-white/[0.045]" />

            <div className="absolute bottom-[15%] right-16 h-24 w-24 rotate-45 border border-[#d4af52]/10" />

            <div className="absolute right-10 top-10 grid grid-cols-5 gap-1.5 opacity-20">
              {Array.from({ length: 25 }).map((_, index) => (
                <span
                  key={index}
                  className="h-1 w-1 rounded-full bg-[#d4af52]"
                />
              ))}
            </div>
          </div>

          {/* =================================================
              BRAND CONTENT
          ================================================= */}
          <div className="relative z-10 max-w-lg">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#d4af52]/20 bg-[#d4af52]/5 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d4af52]" />

              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#d4af52]">
                Product Registration Portal
              </span>
            </div>

            <h1 className="font-serif text-[38px] leading-[1.08] tracking-tight text-white lg:text-[44px] xl:text-[48px]">
              Track your product
              <span className="block text-white/90">applications with</span>
              <span className="block text-[#d4af52]">confidence.</span>
            </h1>

            <p className="mt-4 max-w-md text-[13px] leading-6 text-white/60 lg:text-sm">
              One secure account for product registration, renewals, variations,
              submissions, and supporting documents — all in one place.
            </p>

            {/* =================================================
                APPLICATION STATUS
            ================================================= */}
            <div className="mt-6 max-w-lg rounded-xl border border-white/10 bg-white/[0.055] p-4 backdrop-blur-md">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/35">
                    Application reference
                  </p>

                  <p className="mt-1 font-mono text-[11px] tracking-[0.12em] text-white/75">
                    FDA-2026-0417
                  </p>
                </div>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d4af52]/30 bg-[#d4af52]/10 px-2 py-1 font-mono text-[8px] uppercase tracking-wider text-[#e0bd61]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#d4af52]" />
                  In progress
                </span>
              </div>

              {/* Progress */}
              <div className="mt-5">
                <div className="relative">
                  <div className="absolute left-0 right-0 top-[4px] h-[2px] bg-white/10" />

                  <div className="absolute left-0 top-[4px] h-[2px] w-[58%] bg-[#d4af52]" />

                  <div className="relative flex justify-between">
                    <div className="flex w-1/3 flex-col">
                      <div className="h-2.5 w-2.5 rounded-full border-2 border-[#d4af52] bg-[#d4af52]" />

                      <span className="mt-2 text-[9px] text-white/60">
                        Submitted
                      </span>
                    </div>

                    <div className="flex w-1/3 flex-col">
                      <div className="h-2.5 w-2.5 rounded-full border-2 border-[#d4af52] bg-[#063f2f]" />

                      <span className="mt-2 text-[9px] font-medium text-[#d4af52]">
                        Under review
                      </span>
                    </div>

                    <div className="flex w-1/3 flex-col">
                      <div className="h-2.5 w-2.5 rounded-full border-2 border-white/20 bg-[#063f2f]" />

                      <span className="mt-2 text-[9px] text-white/25">
                        Approved
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              DESKTOP FOOTER
          ================================================= */}
          <div className="relative z-10 mt-10 flex items-center justify-between border-t border-white/[0.08] pt-3">
            <span className="font-mono text-[8px] tracking-[0.14em] text-white/30">
              CDRR · PRODUCT REGISTRATION
            </span>

            <span className="font-mono text-[8px] text-white/30">
              pharmaregistration.fda.gov.ph
            </span>
          </div>
        </div>

        {/* ===================================================
            RIGHT LOGIN PANEL
        =================================================== */}
        <div className="min-h-[100dvh] w-full bg-[#f8f8f5]">
          <div
            className="
              flex
              min-h-[100dvh]
              w-full
              flex-col

              px-4
              py-5

              sm:px-6
              sm:py-6

              md:items-center
              md:justify-center
              md:px-10
              md:py-8
            "
          >
            {/* =================================================
                LOGIN CONTAINER

                MOBILE:
                FULL WIDTH

                DESKTOP:
                MAX 430PX
            ================================================= */}
            <div className="w-full md:max-w-[430px]">
              {/* =================================================
                  LOGIN CARD
              ================================================= */}
              <div className="w-full rounded-2xl border border-black/[0.05] bg-white px-5 py-5 shadow-[0_12px_40px_rgba(0,0,0,0.05)] min-[400px]:px-6 sm:py-6 md:px-8 md:py-7">
                {otpStage ? (
                  /* =================================================
                     OTP SCREEN
                  ================================================= */
                  <div>
                    <div className="mb-5">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#0b513c]/10">
                        <svg
                          className="h-5 w-5 text-[#0b513c]"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <rect x="3" y="5" width="18" height="14" rx="2" />

                          <path d="M3 7l9 6 9-6" />
                        </svg>
                      </div>

                      <h2 className="font-serif text-3xl leading-tight tracking-tight text-[#17211d]">
                        Verify your account
                      </h2>

                      <p className="mt-2 text-xs leading-5 text-gray-500">
                        We sent a 6-digit verification code to{" "}
                        <strong className="font-medium text-gray-700">
                          {otpEmail}
                        </strong>
                        .
                      </p>
                    </div>

                    <form
                      onSubmit={handleOtpSubmit}
                      className="flex flex-col gap-4"
                    >
                      {/* OTP */}
                      <div>
                        <label
                          htmlFor="otp"
                          className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-gray-600"
                        >
                          Verification code
                        </label>

                        <input
                          id="otp"
                          type="text"
                          inputMode="numeric"
                          maxLength={6}
                          autoComplete="one-time-code"
                          value={otp}
                          onChange={(e) =>
                            setOtp(e.target.value.replace(/\D/g, ""))
                          }
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-center text-lg font-semibold tracking-[0.45em] text-[#17211d] outline-none transition placeholder:text-gray-300 focus:border-[#0b513c] focus:bg-white focus:ring-4 focus:ring-[#0b513c]/10"
                          placeholder="000000"
                          required
                        />
                      </div>

                      {/* ERROR */}
                      {error && (
                        <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs text-red-700">
                          {error}
                        </div>
                      )}

                      {/* VERIFY */}
                      <button
                        type="submit"
                        disabled={loading || otp.length !== 6}
                        className="w-full rounded-xl bg-[#0b513c] py-3 text-sm font-semibold text-white shadow-md shadow-[#0b513c]/15 transition hover:bg-[#083f30] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {loading ? "Verifying…" : "Verify and sign in"}
                      </button>

                      {/* BACK */}
                      <button
                        type="button"
                        onClick={backToLogin}
                        className="w-full py-1 text-xs font-medium text-gray-500 hover:text-[#0b513c]"
                      >
                        ← Back to sign in
                      </button>
                    </form>
                  </div>
                ) : (
                  /* =================================================
                     NORMAL LOGIN
                  ================================================= */
                  <div>
                    {/* =================================================
      LOGIN HEADER
  ================================================= */}
                    <div className="flex flex-col items-center text-center">
                      <img
                        src="/images/FDALogo.png"
                        alt="FDA"
                        className="h-16 w-auto object-contain sm:h-20"
                      />

                      <h5 className="mt-3 font-serif text-xl leading-none tracking-tight text-[#17211d] sm:text-2xl">
                        Welcome back
                      </h5>

                      <p className="mt-2 text-[11px] leading-5 text-gray-500 sm:text-xs">
                        Sign in to continue to the Product Registration Portal.
                      </p>
                    </div>
                    {/* =================================================
                        LOGIN FORM
                    ================================================= */}
                    <form
                      onSubmit={handleSubmit}
                      className="mt-5 flex flex-col gap-4"
                    >
                      {/* USERNAME */}
                      <div>
                        <label
                          htmlFor="username"
                          className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-gray-600"
                        >
                          Username
                        </label>

                        <div className="relative">
                          <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                            <svg
                              className="h-4 w-4"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                            >
                              <circle cx="12" cy="8" r="4" />

                              <path d="M4 21c.8-4 3.4-6 8-6s7.2 2 8 6" />
                            </svg>
                          </div>

                          <input
                            id="username"
                            type="text"
                            autoComplete="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm text-[#17211d] outline-none transition placeholder:text-gray-300 focus:border-[#0b513c] focus:bg-white focus:ring-4 focus:ring-[#0b513c]/10"
                            placeholder="juan.delacruz"
                            required
                          />
                        </div>
                      </div>

                      {/* PASSWORD */}
                      <div>
                        <div className="mb-1.5 flex items-center justify-between">
                          <label
                            htmlFor="password"
                            className="block text-[10px] font-semibold uppercase tracking-wider text-gray-600"
                          >
                            Password
                          </label>

                          <button
                            type="button"
                            onClick={() => {
                              // Replace this with your forgot-password route
                              navigate("/forgot-password");
                            }}
                            className="text-[10px] font-medium text-[#0b513c] hover:text-[#083f30]"
                          >
                            Forgot password?
                          </button>
                        </div>

                        <div className="relative">
                          {/* Password icon */}
                          <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                            <svg
                              className="h-4 w-4"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                            >
                              <rect
                                x="4"
                                y="10"
                                width="16"
                                height="11"
                                rx="2"
                              />

                              <path d="M8 10V7a4 4 0 018 0v3" />
                            </svg>
                          </div>

                          <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-16 text-sm text-[#17211d] outline-none transition placeholder:text-gray-300 focus:border-[#0b513c] focus:bg-white focus:ring-4 focus:ring-[#0b513c]/10"
                            placeholder="••••••••"
                            required
                          />

                          <button
                            type="button"
                            onClick={() => setShowPassword((value) => !value)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-medium text-gray-400 hover:text-[#0b513c]"
                          >
                            {showPassword ? "Hide" : "Show"}
                          </button>
                        </div>
                      </div>

                      {/* ERROR */}
                      {error && (
                        <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs text-red-700">
                          {error}
                        </div>
                      )}

                      {/* SIGN IN */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-[#0b513c] py-3 text-sm font-semibold text-white shadow-md shadow-[#0b513c]/15 transition-all hover:bg-[#083f30] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {loading ? "Signing in…" : "Sign in"}
                      </button>
                    </form>

                    {/* =================================================
                        DIVIDER
                    ================================================= */}
                    <div className="my-5 flex items-center gap-3">
                      <div className="h-px flex-1 bg-gray-200" />

                      <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-gray-400">
                        or
                      </span>

                      <div className="h-px flex-1 bg-gray-200" />
                    </div>

                    {/* =================================================
                        GOOGLE LOGIN
                    ================================================= */}
                    <div
                      ref={googleBtnRef}
                      className="flex min-h-[40px] w-full justify-center overflow-hidden rounded-xl"
                    />

                    {/* =================================================
                        REGISTER
                    ================================================= */}
                    <p className="mt-5 text-center text-[10px] text-gray-500">
                      Don't have an account yet?{" "}
                      <button
                        type="button"
                        onClick={() => navigate("/register-company")}
                        className="font-semibold text-[#0b513c] hover:text-[#083f30]"
                      >
                        Register your company
                      </button>
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* =================================================
                SECURITY FOOTER
            ================================================= */}
            <div className="mt-3 flex shrink-0 items-center justify-center gap-1.5 px-2 text-center text-[8px] text-gray-400">
              <svg
                className="h-3 w-3 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <rect x="4" y="10" width="16" height="11" rx="2" />

                <path d="M8 10V7a4 4 0 018 0v3" />
              </svg>

              <span>Secure access · FDA Product Registration Portal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
