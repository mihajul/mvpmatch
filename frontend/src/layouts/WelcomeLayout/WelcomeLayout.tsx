import FormError from '../FormError/FormError';
import SiteMetadata from '../SiteMetadata/SiteMetadata';
import {
  Container,
  FirstColumn,
  SecondColumn,
  HeaderText,
  LogoWrapper,
  ChildrenContainer,
} from './WelcomeLayout.styled';

export type WelcomeLayoutProps = {
  children: React.ReactNode;
  headline: React.ReactNode;
  subHeader?: React.ReactNode;
};

const WelcomeLayout = ({ children, headline, subHeader }: WelcomeLayoutProps) => (
  <Container>
    <SiteMetadata />
    <FirstColumn>
      <LogoWrapper>Vending Machine</LogoWrapper>
      <HeaderText>{headline}</HeaderText>
      {subHeader && <HeaderText style={{ margin: 0, marginTop: '-30px' }}>{subHeader}</HeaderText>}
    </FirstColumn>
    <SecondColumn>
      <FormError />
      <ChildrenContainer>{children}</ChildrenContainer>
    </SecondColumn>
  </Container>
);

export default WelcomeLayout;
