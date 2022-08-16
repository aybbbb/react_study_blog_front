import EditorContainer from '../components/write/EditorContainer';
import Responsive from '../components/common/Responsive';
import TagBoxContainer from '../components/write/TagBoxContainer';
import WriteActionButtonsContainer from '../containers/write/WriteActionButtonsContainer';
import { Helmet } from 'react-helmet-async';

export default function WritePage() {
  return (
    <div>
      <Responsive>
        <Helmet>
          <title>글 작성하기</title>
        </Helmet>
        <EditorContainer />
        <TagBoxContainer />
        <WriteActionButtonsContainer />
      </Responsive>
    </div>
  );
}
