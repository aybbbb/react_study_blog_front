import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { useNavigate } from 'react-router-dom';

export default function RegisterForm() {
  const [error, setError] = useSelector(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(changeField({ form: 'register', key: name, value }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password, passwordConfirm } = form;
    if ([username, password, passwordConfirm].includes('')) {
      setError('��ĭ�� ��� �Է��ϼ���');
      return;
    }
    if (password !== passwordConfirm) {
      setError('��й�ȣ�� ��ġ���� �ʽ��ϴ�.');
      dispatch(changeField({ form: 'register', key: 'password', value: '' }));
      dispatch(
        changeField({ form: 'register', key: 'passwordConfirm', value: '' }),
      );
      return;
    }
    dispatch(register({ username, password }));
  };

  // ������Ʈ�� ó�� �������Ҷ�, form �� �ʱ�ȭ��
  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

  //ȸ������ ����/ ���� ó��
  useEffect(() => {
    if (authError) {
      if (authError.response.status === 409) {
        setError('�̹� ������� �����Դϴ�.');
        return;
      }
      setError('ȸ������ ����');
      return;
    }
    if (auth) {
      console.log('ȸ�����Լ���');
      console.log(auth);
      dispatch(check());
    }
  }, [auth, authError, dispatch, setError]);

  //user ���� �� �����Ǿ����� Ȯ��
  useEffect(() => {
    if (user) {
      navigate('/'); //Ȩȭ������ �𞪤�
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (error) {
        console.log('localStorage is not working');
      }
    }
  }, [user, navigate]);

  return (
    <AuthForm
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
}
