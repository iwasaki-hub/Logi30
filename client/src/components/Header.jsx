import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="site-header__brand">
          <span className="site-header__mark" aria-hidden="true" />
          Auth<span className="site-header__brand-accent">App</span>
        </Link>

        <nav className="site-header__nav">
          {isAuthenticated ? (
            <>
              <span className="site-header__greeting">{user?.name} さん</span>
              <Link to="/dashboard" className="btn btn--ghost">
                ダッシュボード
              </Link>
              <button
                type="button"
                className="btn btn--outline"
                onClick={handleLogout}
              >
                ログアウト
              </button>
            </>
          ) : (
            <>
              <Link to="/signup" className="btn btn--ghost">
                サインアップ
              </Link>
              <Link to="/login" className="btn btn--primary">
                ログイン
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
