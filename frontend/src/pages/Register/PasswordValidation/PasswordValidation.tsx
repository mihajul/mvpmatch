import { Check, Error } from '../../../images/svg';
import * as S from './PasswordValidation.styled';

type PasswordValidationProps = {
  password: string;
};

export const PasswordValidation = (props: PasswordValidationProps) => (
  <S.PasswordValidation>
    <S.PasswordValidationTitle>Your password must have at least:</S.PasswordValidationTitle>
    <S.PasswordValidationRule>
      {props.password && <S.PasswordValidationImage src={props.password.length > 8 ? Check : Error} />}8 characters
    </S.PasswordValidationRule>
    <S.PasswordValidationRule>
      {props.password && <S.PasswordValidationImage src={/[A-Z]/.test(props.password) ? Check : Error} />}1 uppercase
      letter
    </S.PasswordValidationRule>
    <S.PasswordValidationRule>
      {props.password && <S.PasswordValidationImage src={/[a-z]/.test(props.password) ? Check : Error} />}1 uppercase
      letter
    </S.PasswordValidationRule>
    <S.PasswordValidationRule>
      {props.password && <S.PasswordValidationImage src={/[0-9]/.test(props.password) ? Check : Error} />}1 number
    </S.PasswordValidationRule>
    <S.PasswordValidationRule>
      {props.password && <S.PasswordValidationImage src={/[^\w\s]/.test(props.password) ? Check : Error} />}1 special
      character
    </S.PasswordValidationRule>
  </S.PasswordValidation>
);
