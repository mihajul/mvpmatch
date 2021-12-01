import RegisterForm from './RegisterForm/RegisterForm';
import WelcomeLayout from '../../layouts/WelcomeLayout/WelcomeLayout';

const RegisterPage = () => (
  <WelcomeLayout headline="Create your Vending Machine account.">
    <RegisterForm />
  </WelcomeLayout>
);

export default RegisterPage;
