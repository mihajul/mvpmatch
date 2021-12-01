import LoginForm from './LoginForm/LoginForm';
import WelcomeLayout from '../../layouts/WelcomeLayout/WelcomeLayout';

const LoginPage = () => (
  <WelcomeLayout headline={<div>Welcome to Vending Machine.</div>}>
    <LoginForm />
  </WelcomeLayout>
);

export default LoginPage;
