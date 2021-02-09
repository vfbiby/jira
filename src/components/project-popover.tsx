import styled from '@emotion/styled';
import { List, Popover, Typography } from 'antd';
import React from 'react';
import { useProjects } from 'utilities/use-projects';

export const ProjectPopvoer = () => {
  const { data: projects, isLoading } = useProjects();
  const PinnedProjects = projects?.filter((project) => project.pin);
  const content = (
    <ContentContainer>
      <Typography.Text>收藏的项目</Typography.Text>
      <List>
        {PinnedProjects?.map((project) => (
          <List.Item>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
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
