import { Link } from "react-router-dom";
import "../styles/homePage.css";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <Header />

      <section className="home-hero">
        <div>
          <span className="home-hero__eyebrow">Secure Authentication</span>
          <h1>
            アカウントの入り口を、
            <br />
            もっとシンプルに。
          </h1>
          <p className="home-hero__lede">
            メールアドレスとパスワードだけで登録が完了します。Cookieベースのセッション管理で、
            安全にログイン状態を保持します。
          </p>
          <div className="home-hero__cta">
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn btn--primary">
                ダッシュボードへ
              </Link>
            ) : (
              <>
                <Link to="/signup" className="btn btn--primary">
                  無料でサインアップ
                </Link>
                <Link to="/login" className="btn btn--outline">
                  ログイン
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="home-hero__panel">
          <div className="home-gate">
            <span className="home-gate__ring home-gate__ring--1" />
            <span className="home-gate__ring home-gate__ring--2" />
            <span className="home-gate__ring home-gate__ring--3" />
          </div>
          <div className="home-hero__panel-caption">
            <strong>Session Gate</strong>
            httpOnly Cookie に保存された JWT
            で、リクエストごとに本人確認を行います。
          </div>
        </div>
      </section>

      <section className="home-steps">
        <div className="home-step">
          <span className="home-step__num">01</span>
          <h3>サインアップ</h3>
          <p>
            名前・メールアドレス・パスワードを登録すると、アカウントが作成されます。
          </p>
        </div>
        <div className="home-step">
          <span className="home-step__num">02</span>
          <h3>ログイン</h3>
          <p>
            登録済みのメールアドレスとパスワードでログインし、セッションを開始します。
          </p>
        </div>
        <div className="home-step">
          <span className="home-step__num">03</span>
          <h3>ダッシュボード</h3>
          <p>
            ログイン後は自動的にダッシュボードへ遷移し、プロフィール情報を確認できます。
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
