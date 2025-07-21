import { type ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { refreshToken as requestNewToken } from "../../auth";
import { setToken } from "../../store/authSlice";
import type { AppDispatch } from "../../store/index";

interface Props {
  children: ReactNode;
}

interface JwtPayload {
  exp: number;
}

const Auth = ({ children }: Props) => {
  const { token, user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const isTokenExpired = (token: string): boolean => {
    try {
      const { exp } = jwtDecode<JwtPayload>(token);
      return exp * 1000 < Date.now();
    } catch (err) {
      return true;
    }
  };

  useEffect(() => {
    const handleRefresh = async () => {
      if (!token || !user?.refreshToken) {
        setLoading(false);
        return;
      }

      const expired = isTokenExpired(token);

      if (expired) {
        try {
          const newTokens = await requestNewToken(user.refreshToken);
          dispatch(setToken( newTokens ));
          localStorage.setItem("token", JSON.stringify(newTokens));
        } catch (err) {
          console.error("Refresh token failed:", err);
        }
      }

      setLoading(false);
    };

    handleRefresh();
  }, [token]);

  if (loading) return <p>Verificando sessão...</p>;

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default Auth;
