import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import "../styles/dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();

  const formattedLastLogin = user?.lastLoginAt
    ? new Date(user.lastLoginAt).toLocaleString("ja-JP")
    : "初回ログイン";
  return (
    <div>
      <Header />

      <div className="dashboard">
        <div className="dashboard__head">
          <span className="dashboard__eyebrow">Dashboard</span>
          <h1>おかえりなさい、{user?.name} さん</h1>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h2>プロフィール情報</h2>
            <dl>
              <div className="profile-row">
                <dt>お名前</dt>
                <dd>{user?.name}</dd>
              </div>
              <div className="profile-row">
                <dt>メールアドレス</dt>
                <dd>{user?.email}</dd>
              </div>
              <div className="profile-row">
                <dt>最終ログイン</dt>
                <dd>{formattedLastLogin}</dd>
              </div>
            </dl>
          </div>

          <div className="dashboard-card dashboard-card--dark">
            <h2>セッションについて</h2>
            <p>
              現在のログイン状態は httpOnly Cookie に保存された JWT
              によって維持されています。 ブラウザを閉じても、Cookie
              の有効期限内であればログイン状態が保たれます。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
