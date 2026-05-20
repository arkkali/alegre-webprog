import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../components/Button";
import api from "../../lib/api.js";
import { useAuth } from "../../hooks/useAuth.js";

const inputClasses =
  "mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-400 focus:border-blue-500 focus:bg-white/10";
const actionButtonClassName =
  "w-full rounded-xl py-3 text-[11px] tracking-[0.2em]";

const SignInPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { data } = await api.post("/auth/login", {
        email: email.trim(),
        password,
      });

      login(data.token);

      const from = location.state?.from?.pathname;
      const destination =
        from && from !== "/auth/signin" && from !== "/auth/signup" ? from : "/";
      setTimeout(() => {
        navigate(destination, { replace: true });
      }, 0);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Sign in failed. Is the API server running?";
      alert(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 text-white">
      <h1 className="text-3xl font-black">Log In</h1>
      <p className="mt-2 text-sm text-zinc-400">
        Access your store account and pickup details.
      </p>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="student@email.com"
          className={inputClasses}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="Password"
          className={inputClasses}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
        <Button
          type="submit"
          variant="primary"
          className={actionButtonClassName}
          disabled={submitting}
        >
          {submitting ? "SIGNING IN…" : "LOG IN"}
        </Button>
      </form>

      <div className="mt-8 border-t border-white/10 pt-6 text-sm text-zinc-400">
        No account yet?{" "}
        <Link
          to="/auth/signup"
          className="font-semibold text-white hover:underline"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;
