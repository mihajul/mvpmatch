import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useLogoutMutation } from '../../api';
import { ROUTES } from '../../pages/routes';
import * as S from './Header.styled';
import { setIsLoggedIn } from '../../stores/appSlice';

const Header = () => {
  const dispatch = useDispatch();

  const [logoutUserAction] = useLogoutMutation();
  const history = useHistory();

  const logoutUser = async () => {
    dispatch(setIsLoggedIn(false));
    await logoutUserAction();
    history.push(ROUTES.LOGIN);
  };

  return (
    <S.Header>
      <S.HeaderContent>
        <S.List>
          <S.ListItem
            onClick={() => {
              history.push(ROUTES.ROOT);
            }}
          >
            Home
          </S.ListItem>
          <S.ListItem
            onClick={() => {
              history.push(ROUTES.PROFILE);
            }}
          >
            Profile
          </S.ListItem>
          <S.ListItem onClick={logoutUser}>Log out</S.ListItem>
        </S.List>
      </S.HeaderContent>
    </S.Header>
  );
};

export default Header;
