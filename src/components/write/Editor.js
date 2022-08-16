import React from 'react';
import { useRef, useEffect } from 'react';
import { Quill } from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';

const EditorBlock = styled(Responsive)`
  /**페이지 위아래 여백 지정 */
  padding-top: 5rem;
  padding-bottom: 5rem;
`;

const TitleInput = styled.input`
  font-size: 3rem;
  outline: none;
  padding-bottom: 0.5rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[4]};
  margin-bottom: 2rem;
  width: 100%;
`;

const QuillWrapper = styled.div`
  .ql-editior {
    padding: 0;
    min-height: 320px;
    font-size: 1.125rem;
    line-height: 1.5;
  }
  .ql-editior.ql-blank::before {
    left: 0px;
  }
`;

export default function Editor({ title, body, onChangeField }) {
  const quillElement = useRef(null); // Quill을  적용할 DivElement설정
  const quillInstance = useRef(null); //Quill 인스턴스 설정

  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      theme: 'bubble',
      placeholder: '내용을 작성하세요..',
      modules: {
        toolbar: [
          [{ header: '1' }, { header: '2' }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['blockquote', 'code-block', 'link', 'image'],
        ],
      },
    });
  });

  // const quill = quillInstance.current;
  // quill.on(
  //   'text-change',
  //   (delta, onDelta, source) => {
  //     if (source === 'user') {
  //       onChangeField({ key: 'body', value: quill.root.innerHTML });
  //     }
  //   },
  //   [onChangeField],
  // );
  const formats = ['blockquote', 'code-block', 'link', 'image'];
  const modules = {
    toolbar: {
      container: [
        [{ header: '1' }, { header: '2' }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['blockquote'],
      ],
    },
  };

  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    quillInstance.current.root.innerHTML = body;
  }, [body]);

  const onChangeTitle = (e) => {
    onChangeField({ key: 'title', value: e.target.value });
  };

  return (
    <div>
      <EditorBlock>
        <TitleInput
          placeholder="제목을 입력하세요."
          onChange={onChangeTitle}
          value={title}
        />
        <QuillWrapper
          //value={value || ''}
          value={body}
          theme="bubble"
          modules={modules}
          formats={formats}
          onChange={(content, delta, source, editor) => {
            source === 'user' &&
              onChangeField({
                key: 'body',
                value: quillInstance.current.innerHTML,
              });
          }}
        >
          <div ref={quillElement} />
        </QuillWrapper>
      </EditorBlock>
    </div>
  );
}
