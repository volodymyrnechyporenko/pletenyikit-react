import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import validRoutesData from '../data/valid-routes.json';

const validRoutes = new Set(validRoutesData as string[]);

function normalizePathname(pathname: string): string {
  if (pathname !== '/' && pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

/**
 * Renders children only if the current path is in the sitemap (valid-routes).
 * Otherwise redirects to /404. Single source of truth for "valid" routes.
 */
export const RouteGuard: React.FC = () => {
  const { pathname } = useLocation();
  const normalized = normalizePathname(pathname);

  if (pathname === '/404') {
    return <Outlet />;
  }
  if (!validRoutes.has(normalized)) {
    return <Navigate to="/404" replace />;
  }
  return <Outlet />;
};
