import Loading from '../Loading/Loading';
import * as S from './Button.styled';
import { ButtonProps } from './Button.types';

export const Button = (props: ButtonProps) => (
  <S.Button role="button" type={props.type} disabled={props.disabled} $loading={props.loading} onClick={props.onClick}>
    {props.loading ? <Loading size="24px" /> : props.children}
  </S.Button>
);

export default Button;
