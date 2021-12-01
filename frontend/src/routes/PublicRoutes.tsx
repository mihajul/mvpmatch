import { Switch, Route, Redirect } from 'react-router-dom';

import LoginPage from '../pages/Login/Login';
import RegisterPage from '../pages/Register/Register';
import { ROUTES } from '../pages/routes';

const PublicRoutes = () => (
  <Switch>
    <Route exact path={ROUTES.LOGIN} render={LoginPage} />
    <Route exact path={ROUTES.REGISTER} render={RegisterPage} />

    <Redirect to={ROUTES.LOGIN} />
  </Switch>
);

export default PublicRoutes;
