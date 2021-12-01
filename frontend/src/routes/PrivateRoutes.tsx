import { Switch, Route, Redirect } from 'react-router-dom';

import { ROUTES } from '../pages/routes';
import { useGetCurrentUserQuery } from '../api';
import Dashboard from '../pages/Dashboard/Dashboard';
import Profile from '../pages/Profile/Profile';
import ProductForm from '../pages/ProductForm/ProductForm';
import { RoleRouteProps } from '../App.types';
import { Roles } from '../types/user';
import Deposit from '../pages/Deposit/Deposit';
import Buy from '../pages/Buy/Buy';

const RoleRoute = (props: RoleRouteProps) => {
  const { data: currentUser } = useGetCurrentUserQuery();

  if (currentUser?.role === props.role) {
    return <Route {...props} />;
  }
  return <Redirect to={ROUTES.ROOT} />;
};

const PrivateRoutes = () => {
  const { isSuccess } = useGetCurrentUserQuery();

  if (!isSuccess) {
    return null;
  }

  return (
    <Switch>
      <Route exact path={ROUTES.ROOT} component={Dashboard} />
      <Route exact path={ROUTES.PROFILE} component={Profile} />

      <RoleRoute role={Roles.Seller} path={ROUTES.ADD_PRODUCT} component={ProductForm} />
      <RoleRoute role={Roles.Seller} path={`${ROUTES.EDIT_PRODUCT}/:id`} component={ProductForm} />

      <RoleRoute role={Roles.Buyer} path={ROUTES.DEPOSIT} component={Deposit} />
      <RoleRoute role={Roles.Buyer} path={`${ROUTES.BUY}/:productId`} component={Buy} />

      <Redirect to={ROUTES.ROOT} />
    </Switch>
  );
};

export default PrivateRoutes;
