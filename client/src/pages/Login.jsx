import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/auth.css";
import { useState } from "react";

const Login = () => {
  const { login, submitting } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from || "/dashboard";

  const [form, setForm] = useState({ email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /**
   *
   * @param {Event} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setFieldErrors({});

    try {
      await login(form.email, form.password);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      const res = err.response?.data;
      if (res?.errors?.length) {
        const mapped = {};
        res.errors.forEach((e2) => {
          const key = e2.path || e2.param;
          if (key) mapped[key] = e2.msg;
        });
        setFieldErrors(mapped);
      }
      setFormError(
        res?.message ||
          "ログインに失敗しました。時間をおいて再度お試しください。",
      );
    }
  };

  return (
    <div className="auth-screen">
      <aside className="auth-brand">
        <div className="auth-brand__top">
          <span className="auth-brand__mark" aria-hidden="true" />
          AuthApp
        </div>
        <p className="auth-brand__quote">
          おかえりなさい。<span>続き</span>から始めましょう。
        </p>
        <div className="auth-brand__foot">
          セッションは httpOnly Cookie
          で保護されています。共有端末では、利用後に必ずログアウトしてください。
        </div>
      </aside>

      <div className="auth-panel">
        <div className="auth-card">
          <Link to="/" className="auth-card__back">
            ← ホームに戻る
          </Link>
          <h1>ログイン</h1>
          <p className="auth-card__sub">
            アカウントをお持ちでない方は <Link to="/signup">サインアップ</Link>
          </p>

          {formError && <div className="form-alert">{formError}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="email">メールアドレス</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                aria-invalid={!!fieldErrors.email}
                required
              />
              {fieldErrors.email && (
                <p className="field__error">{fieldErrors.email}</p>
              )}
            </div>

            <div className="field">
              <label htmlFor="password">パスワード</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                aria-invalid={!!fieldErrors.password}
                required
              />
              {fieldErrors.password && (
                <p className="field__error">{fieldErrors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="btn btn--primary btn--block auth-card__submit"
              disabled={submitting}
            >
              {submitting ? "ログイン中..." : "ログイン"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
