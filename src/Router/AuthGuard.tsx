import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../app/hooks/useAuth';

interface AuthGuardProps {
  isPrivate: boolean;
  isAdmin?: boolean;
}

export function AuthGuard({ isPrivate, isAdmin = false }: AuthGuardProps) {
  const { signedIn, hasAuthority } = useAuth();

  if (hasAuthority('ADMIN') && !isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  if (!signedIn && isPrivate) {
    return <Navigate to="/login" replace />;
  }

  if (signedIn && !isPrivate) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
