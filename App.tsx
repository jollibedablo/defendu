import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import StartupScreen from './src/views/screens/StartupScreen';
import LoginScreen from './src/views/screens/LoginScreen';
import type { AppScreen } from './src/models';

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('startup');

  return (
    <>
      <StatusBar style="light" />
      {screen === 'startup' && (
        <StartupScreen onFinish={() => setScreen('login')} />
      )}
      {screen === 'login' && (
        <LoginScreen
          onForgotPassword={() => {}}
          onRegister={() => {}}
          onLoginSuccess={() => {}}
        />
      )}
    </>
  );
}
