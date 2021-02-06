import { Button, Card } from 'antd';
import { useState } from 'react';
import { LoginScreen } from './login';
import { RegisterScreen } from './register';

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card>
        {isRegister ? <RegisterScreen /> : <LoginScreen />}
        <Button onClick={() => setIsRegister(!isRegister)}>
          switch to {isRegister ? 'login' : 'register'}
        </Button>
      </Card>
    </div>
  );
};

export default UnauthenticatedApp;
