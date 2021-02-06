import { useEffect, useState } from 'react';
import { List } from './list';
import { SearchPanel } from './search-panel';
import { cleanObject, useDebounce, useMount } from 'utilities';
import { useHttp } from 'utilities/http';
import styled from '@emotion/styled';

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [param, setParam] = useState({
    name: '',
    personId: '',
  });
  const [list, setList] = useState([]);
  const debouncedValue = useDebounce(param, 500);
  const client = useHttp();

  useEffect(() => {
    setIsLoading(true);
    client('projects', { data: cleanObject(debouncedValue) })
      .then(setList)
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  useMount(() => {
    client('users').then(setUsers);
  });

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List loading={isLoading} users={users} dataSource={list} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
