import React from 'react';

import Header from '../../components/Header/Header';
import SiteMetadata from '../SiteMetadata/SiteMetadata';
import * as S from './DefaultLayout.styled';

export type DefaultPageProps = {
  children: React.ReactNode;
};

const DefaultPage: React.FC<DefaultPageProps> = ({ children }) => (
  <S.PageWrapper>
    <SiteMetadata />
    <Header></Header>
    <S.Body>{children}</S.Body>
  </S.PageWrapper>
);
export default DefaultPage;
