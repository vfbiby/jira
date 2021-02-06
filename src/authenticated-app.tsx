import { useAuth } from 'context/auth-context';
import React from 'react';
import styled from '@emotion/styled';
import { ProjectListScreen } from 'screens/project-list';

/**
 * grid 和 flex 各自应用的场景
 * 1. 要考虑是 一维布局 还是 二维而已
 * 一般来说，一维布局用flex
 * 2. 是从内容出发还是从布局出发？
 * 从内容出发：你先有一组内容（数量一般不固定），然后希望他们均匀的分布在容器中，
 * 由内容的大小决定占据的空间
 * 从布局出发：先规划网格（数量一般比较固定），然后再把元素往里填充
 * 从内容出发：用flex
 * 从而已出发：用grid
 */

export const AuthenticatedApp = () => {
  const { logout } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <h3>Logo</h3>
          <h3>项目</h3>
          <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={logout}>Logout</button>
        </HeaderRight>
      </Header>
      <Nav>nav</Nav>
      <Main>
        <ProjectListScreen />
      </Main>
      <Aside>aside</Aside>
      <Footer>footer</Footer>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-columns: 20rem 1fr 20rem;
  grid-template-areas:
    'header header header'
    'aside main nav'
    'footer footer footer';
  height: 100vh;
  grid-gap: 10rem;
`;
const Header = styled.header`
  border: 1px solid red;
  grid-area: header;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const HeaderLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const HeaderRight = styled.div``;
const Main = styled.main`
  border: 1px solid red;
  grid-area: main;
`;
const Nav = styled.nav`
  border: 1px solid red;
  grid-area: nav;
`;
const Aside = styled.aside`
  border: 1px solid red;
  grid-area: aside;
`;
const Footer = styled.footer`
  border: 1px solid red;
  grid-area: footer;
`;

export default AuthenticatedApp;
