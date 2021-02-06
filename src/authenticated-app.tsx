import { useAuth } from 'context/auth-context';
import React from 'react';
import styled from '@emotion/styled';
import { ProjectListScreen } from 'screens/project-list';
import { Row } from 'components/lib';
import { Button, Dropdown, Menu } from 'antd';

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
  const { user, logout } = useAuth();

  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <h3>Logo</h3>
          <h3>项目</h3>
          <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key={'logout'}>
                  <Button type="link" onClick={logout}>
                    logout
                  </Button>
                </Menu.Item>
              </Menu>
            }
          >
            <Button type="link">Hi, {user?.name}</Button>
          </Dropdown>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main``;

export default AuthenticatedApp;
