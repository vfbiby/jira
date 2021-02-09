import styled from '@emotion/styled';
import { Button, Drawer } from 'antd';
import React from 'react';

export const ProjectModal = (props: {
  projectModalOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer
      onClose={props.onClose}
      visible={props.projectModalOpen}
      width={'100%'}
    >
      <Button onClick={props.onClose}>close</Button>
    </Drawer>
  );
};
