import { useAuth } from 'context/auth-context';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { ProjectListScreen } from 'screens/project-list';
import { ButtonNoPadding, Row } from 'components/lib';
import { Button, Dropdown, Menu } from 'antd';
import { Navigate, Route, Routes } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { ProjectScreen } from 'screens/project';
import { resetRoute } from 'utilities';
import { ProjectModal } from 'screens/project-list/project-modal';
import { ProjectPopvoer } from 'components/project-popover';

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
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  return (
    <Container>
      <PageHeader
        projectButton={
          <ButtonNoPadding
            onClick={() => setProjectModalOpen(true)}
            type="link"
          >
            创建项目
          </ButtonNoPadding>
        }
      />
      <Main>
        <Router>
          <Routes>
            <Route
              path={'/projects'}
              element={
                <ProjectListScreen
                  projectButton={
                    <ButtonNoPadding
                      onClick={() => setProjectModalOpen(true)}
                      type="link"
                    >
                      创建项目
                    </ButtonNoPadding>
                  }
                />
              }
            ></Route>
            <Route
              path={'/projects/:projectId/*'}
              element={<ProjectScreen />}
            ></Route>
            <Navigate to={window.location.pathname + '/projects'} />
          </Routes>
        </Router>
      </Main>
      <ProjectModal
        projectModalOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
      />
    </Container>
  );
};

const PageHeader = (props: { projectButton: JSX.Element }) => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding
          style={{ padding: 0 }}
          type="link"
          onClick={resetRoute}
        >
          Jira
        </ButtonNoPadding>
        <ProjectPopvoer {...props} />
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};

const User = () => {
  const { user, logout } = useAuth();

  return (
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
