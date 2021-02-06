import { Table } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { User } from './search-panel';

interface Project {
  id: string;
  name: string;
  personId: string;
  pin: string;
  organization: string;
  created: number;
}

interface ListProps {
  list: Project[];
  users: User[];
  isloading: boolean;
}

export const List = ({ users, list, isloading }: ListProps) => {
  return (
    <Table
      loading={isloading}
      dataSource={list}
      pagination={false}
      rowKey="id"
      columns={[
        {
          title: '名称',
          dataIndex: 'name',
          sorter: (a, b) => a.name.localeCompare(b.name),
          key: 'name',
        },
        {
          title: '部门',
          dataIndex: 'organization',
          key: 'organization',
        },
        {
          title: '负责人',
          render(value, project) {
            return (
              <span>
                {users.find((user: User) => user.id === project.personId)
                  ?.name || 'unknow'}
              </span>
            );
          },
          key: 'project.personId',
        },
        {
          title: '创建时间',
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format('YYYY-MM-DD')
                  : '无'}
              </span>
            );
          },
          key: 'project.created',
        },
      ]}
    ></Table>
  );
};
