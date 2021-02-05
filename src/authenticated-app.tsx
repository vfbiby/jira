import { useAuth } from 'context/auth-context';
import React from 'react';
import { ProjectListScreen } from 'screens/project-list';

export const AuthenticatedApp = () => {
  const { logout } = useAuth();

  return (
    <div>
      <button onClick={logout}>Logout</button>
      <ProjectListScreen />
    </div>
  );
};

export default AuthenticatedApp;
