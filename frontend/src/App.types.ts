import { RouteComponentProps } from 'react-router-dom';

import { Roles } from './types/user';

export type RouteProps = {
  render?: () => JSX.Element;
  component?: React.ComponentType<RouteComponentProps> | React.ComponentType;
  exact?: boolean;
  path: string;
};

export type RoleRouteProps = RouteProps & { role: Roles };
