import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { useState, useCallback } from 'react';
import AskRemoveModal from './AskRemoveModal';

const PostActionButtonBlock = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  margin-top: -1.5rem;
`;

const ActionButton = styled.div`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  color: ${palette.gray[6]};
  font-weight: bold;
  border: none;
  outline: none;
  font-size: 0.875rem;
  cursor: pointer;
  &:hover {
    background: ${palette.gray[1]};
    color: ${palette.cyan[7]};
  }
  & + & {
    margin-left: 0.25rem;
  }
`;

export default function PostActionButtons({ onEdit, onRemove }) {
  const [modal, setModal] = useState(false);

  const onRemoveClick = () => {
    setModal(true);
  };

  const onCancel = () => {
    setModal(false);
  };

  const onConfrim = () => {
    setModal(false);
    onRemove();
  };
  return (
    <>
      <PostActionButtonBlock>
        <ActionButton onClick={onEdit}>수정</ActionButton>
        <ActionButton onClick={onRemoveClick}>삭제</ActionButton>
      </PostActionButtonBlock>
      <AskRemoveModal
        visible={modal}
        onConfirm={onConfrim}
        onCancel={onCancel}
      />
    </>
  );
}
