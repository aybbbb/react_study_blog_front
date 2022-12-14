import { useDispatch, useSelector } from 'react-redux';
import TagBox from './TagBox';
import { changeField } from '../../modules/wirte';

export default function TagBoxContainer() {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.write.tags);

  const onChangeTags = (nextTags) => {
    dispatch(changeField({ key: 'tags', value: nextTags }));
  };

  return <TagBox onChangeTags={onChangeTags} tags={tags} />;
}
