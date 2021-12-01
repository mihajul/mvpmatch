import { MainTitleProps } from './MainTitle.types';
import * as S from './MainTitle.styled';

const MainTitle: React.FC<MainTitleProps> = ({ children, style }) => (
  <S.MainTitle style={style}>
    <S.Wrapper>{children}</S.Wrapper>
  </S.MainTitle>
);

export default MainTitle;
