import { List } from './list';
import { SearchPanel } from './search-panel';
import { useDebounce, useDocumentTitle } from 'utilities';
import styled from '@emotion/styled';
import { Typography } from 'antd';
import { useProjects } from 'utilities/use-projects';
import { useUsers } from 'utilities/use-users';
import { useProjectsSearchParams } from './util';
import React from 'react';
import { Row } from 'components/lib';

export const ProjectListScreen = (props: { projectButton: JSX.Element }) => {
  useDocumentTitle('项目列表', false);
  const [param, setParam] = useProjectsSearchParams();
  const { isLoading, error, data: list, retry } = useProjects(
    useDebounce(param, 500)
  );
  const { data: users } = useUsers();

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        {props.projectButton}
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List
        projectButton={props.projectButton}
        refresh={retry}
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
      />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;
