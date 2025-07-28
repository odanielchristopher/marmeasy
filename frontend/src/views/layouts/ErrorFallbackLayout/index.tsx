import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router';

import { InternalServerError } from './errors/InternalServerError';

export function ErrorFallbackLayout() {
  return (
    <ErrorBoundary FallbackComponent={InternalServerError}>
      <Outlet />
    </ErrorBoundary>
  );
}
