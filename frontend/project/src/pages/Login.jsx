import { useState, useContext } from "react";
import { MyLatest } from "../contexts/latest";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  // extract user token
  let { setToken, setUserInfo } = useContext(MyLatest);

  // navigation
  const navigate = useNavigate();

  // login settings
  const [logType, setType] = useState("signin");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // loader
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // handel input state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear messages when user types
    if (error) setError("");
    if (success) setSuccess("");
  };

  // handel form and api req
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const kind = logType === "signin" ? "signin" : "signup";
    const url = `http://localhost:3000/users/${kind}`;

    // For signup, don't send empty name
    const payload =
      kind === "signup"
        ? formData
        : { email: formData.email, password: formData.password };

    try {
      const { data } = await axios.post(url, payload);
      // console.log("Response:", data.userInfo);

      setSuccess(
        kind === "signin"
          ? "Signed in successfully!"
          : "Account created successfully!",
      );

      // Save token if returned
      if (data?.userInfo?.token) {
        setToken(data?.userInfo?.token);
        setUserInfo(data?.userInfo);
        // user token
        localStorage.setItem("userToken", data?.userInfo?.token);
        // user info
        localStorage.setItem("userInfo", JSON.stringify(data?.userInfo));
      }

      // Reset form
      setFormData({ name: "", email: "", password: "" });

      navigate("/");
    } catch (err) {
      console.error("API Error:", err);
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const isLogin = logType === "signin";

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const fieldVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
    }),
    exit: { opacity: 0, x: 30, transition: { duration: 0.2 } },
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden p-5 bg-linear-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] font-sans">
      {/* Animated background blobs */}
      <motion.div
        className="absolute w-100 h-100 rounded-full blur-[80px] opacity-50 pointer-events-none bg-[#8b5cf6] -top-25 -left-25"
        animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-125 h-125 rounded-full blur-[80px] opacity-50 pointer-events-none bg-[#ec4899] -bottom-37.5 -right-37.5"
        animate={{ x: [0, -80, 0], y: [0, 60, 0], scale: [1, 1.3, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="relative w-full max-w-105 p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.4)] z-10 text-white"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        layout
      >
        {/* Animated logo */}
        <motion.div
          className="w-15 h-15 mx-auto mb-5 flex items-center justify-center rounded-full bg-linear-to-br from-[#8b5cf6] to-[#ec4899] text-[28px] text-white shadow-[0_8px_25px_rgba(139,92,246,0.5)]"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <span>✦</span>
        </motion.div>

        {/* Title */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={logType}
            className="text-center text-[28px] font-bold mb-2 bg-linear-to-br from-white to-[#c4b5fd] bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {isLogin ? "Welcome Back" : "Create Account"}
          </motion.h1>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.p
            key={logType + "-sub"}
            className="text-center text-white/60 text-sm mb-7.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {isLogin
              ? "Please enter your details to sign in"
              : "Fill in the form to get started"}
          </motion.p>
        </AnimatePresence>

        {/* Error / Success messages */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.25 }}
              className="mb-4 px-4 py-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-sm text-center"
            >
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.25 }}
              className="mb-4 px-4 py-3 rounded-xl bg-green-500/15 border border-green-500/30 text-green-300 text-sm text-center"
            >
              {success}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4.5">
          <AnimatePresence mode="popLayout">
            {!isLogin && (
              <motion.div
                key="name-field"
                className="flex flex-col gap-2"
                variants={fieldVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                custom={0}
              >
                <label className="text-[13px] text-white/70 font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  disabled={loading}
                  className="px-4 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white text-[15px] outline-none transition-all duration-300 placeholder:text-white/30 focus:border-[#8b5cf6] focus:bg-[#8b5cf6]/10 focus:ring-[3px] focus:ring-[#8b5cf6]/20 disabled:opacity-50"
                />
              </motion.div>
            )}

            <motion.div
              key="email-field"
              className="flex flex-col gap-2"
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
              custom={isLogin ? 0 : 1}
            >
              <label className="text-[13px] text-white/70 font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                disabled={loading}
                className="px-4 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white text-[15px] outline-none transition-all duration-300 placeholder:text-white/30 focus:border-[#8b5cf6] focus:bg-[#8b5cf6]/10 focus:ring-[3px] focus:ring-[#8b5cf6]/20 disabled:opacity-50"
              />
            </motion.div>

            <motion.div
              key="password-field"
              className="flex flex-col gap-2"
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
              custom={isLogin ? 1 : 2}
            >
              <label className="text-[13px] text-white/70 font-medium">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                disabled={loading}
                className="px-4 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white text-[15px] outline-none transition-all duration-300 placeholder:text-white/30 focus:border-[#8b5cf6] focus:bg-[#8b5cf6]/10 focus:ring-[3px] focus:ring-[#8b5cf6]/20 disabled:opacity-50"
              />
            </motion.div>
          </AnimatePresence>

          {isLogin && (
            <motion.div
              className="text-right -mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <a
                href="#"
                className="text-[#a78bfa] text-[13px] no-underline transition-colors hover:text-[#c4b5fd]"
              >
                Forgot password?
              </a>
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            className="mt-2.5 py-3.75 px-4 rounded-xl border-none bg-linear-to-br from-[#8b5cf6] to-[#ec4899] text-white text-base font-semibold cursor-pointer transition-all duration-300 shadow-[0_8px_25px_rgba(139,92,246,0.3)] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            whileHover={
              loading
                ? {}
                : {
                    scale: 1.03,
                    boxShadow: "0 12px 35px rgba(139, 92, 246, 0.5)",
                  }
            }
            whileTap={loading ? {} : { scale: 0.97 }}
          >
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.span
                  key="loading"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex items-center gap-2"
                >
                  {/* Spinner */}
                  <motion.span
                    className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  {isLogin ? "Signing in..." : "Creating..."}
                </motion.span>
              ) : (
                <motion.span
                  key={logType + "-btn"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="inline-block"
                >
                  {isLogin ? "Sign In" : "Sign Up"}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </form>

        {/* Toggle section */}
        <motion.div
          className="mt-6 text-center text-sm text-white/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <span>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </span>
          <motion.button
            type="button"
            disabled={loading}
            className="ml-1.5 bg-transparent border-none text-[#a78bfa] text-sm font-semibold cursor-pointer underline underline-offset-[3px] transition-colors hover:text-[#c4b5fd] p-0 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => {
              setType(isLogin ? "signup" : "signin");
              setError("");
              setSuccess("");
            }}
            whileHover={loading ? {} : { scale: 1.05 }}
            whileTap={loading ? {} : { scale: 0.95 }}
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Login;
