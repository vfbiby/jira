import styled from '@emotion/styled';
import { Divider, List, Popover, Typography } from 'antd';
import React from 'react';
import { useProjects } from 'utilities/use-projects';
import { ButtonNoPadding } from './lib';

export const ProjectPopvoer = (props: {
  setProjectModalOpen: (isOpen: boolean) => void;
}) => {
  const { data: projects } = useProjects();
  const PinnedProjects = projects?.filter((project) => project.pin);
  const content = (
    <ContentContainer>
      <Typography.Text>收藏的项目</Typography.Text>
      <List>
        {PinnedProjects?.map((project) => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNoPadding
        onClick={() => props.setProjectModalOpen(true)}
        type="link"
      >
        创建项目
      </ButtonNoPadding>
    </ContentContainer>
  );

  return (
    <Popover placement="bottom" content={content}>
      <span>项目</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
