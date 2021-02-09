import styled from '@emotion/styled';
import { Divider, List, Popover, Typography } from 'antd';
import React from 'react';
import { useProjects } from 'utilities/use-projects';

export const ProjectPopvoer = (props: { projectButton: JSX.Element }) => {
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
      {props.projectButton}
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
