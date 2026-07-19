import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import "../styles/auth.css";

const Signup = () => {
  const { register, submitting } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
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
      await register(form.name, form.email, form.password);
      navigate("/dashboard", { replace: true });
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
        res?.message || "登録に失敗しました。時間をおいて再度お試しください。",
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
          はじめまして。<span>アカウント</span>を作成しましょう。
        </p>
        <div className="auth-brand__foot">
          パスワードは bcrypt
          でハッシュ化して保存され、平文のまま扱われることはありません。
        </div>
      </aside>

      <div className="auth-panel">
        <div className="auth-card">
          <Link to="/" className="auth-card__back">
            ← ホームに戻る
          </Link>
          <h1>サインアップ</h1>
          <p className="auth-card__sub">
            既にアカウントをお持ちの方は <Link to="/login">ログイン</Link>
          </p>

          {formError && <div className="form-alert">{formError}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="name">お名前</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="山田 太郎"
                value={form.name}
                onChange={handleChange}
                aria-invalid={!!fieldErrors.name}
                required
              />
              {fieldErrors.name && (
                <p className="field__error">{fieldErrors.name}</p>
              )}
            </div>

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
                autoComplete="new-password"
                placeholder="8文字以上"
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
              {submitting ? "登録中..." : "サインアップ"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
