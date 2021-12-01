import React from 'react';

import * as S from './Container.styled';

export type ContainerProps = {
  children: React.ReactNode;
};

const Container: React.FC<ContainerProps> = ({ children }) => <S.Container>{children}</S.Container>;

export default Container;
