import { useEffect, useState } from 'react';
import { List, Project } from './list';
import { SearchPanel } from './search-panel';
import { cleanObject, useDebounce, useMount } from 'utilities';
import { useHttp } from 'utilities/http';
import styled from '@emotion/styled';
import { Typography } from 'antd';
import { useAsync } from 'utilities/use-async';

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);
  //const [isLoading, setIsLoading] = useState(false);
  //const [error, setError] = useState<null | Error>(null);
  const { run, isLoading, error, data: list } = useAsync<Project[]>();

  const [param, setParam] = useState({
    name: '',
    personId: '',
  });
  //const [list, setList] = useState([]);
  const debouncedValue = useDebounce(param, 500);
  const client = useHttp();

  useEffect(() => {
    run(client('projects', { data: cleanObject(debouncedValue) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  useMount(() => {
    client('users').then(setUsers);
  });

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} users={users} dataSource={list || []} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
