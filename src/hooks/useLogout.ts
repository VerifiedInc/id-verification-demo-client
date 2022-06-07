import { useNavigate } from 'react-router-dom';
import { useActionCreators } from './useActionCreators';

export const useLogout = (): () => void => {
  const history = useNavigate();
  const { resetState } = useActionCreators();

  return () => {
    resetState();
    history('/');
  };
};
