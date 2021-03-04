import { useHistory } from 'react-router-dom';
import { useActionCreators } from './useActionCreators';

export const useLogout = () => {
  const history = useHistory();
  const { resetState } = useActionCreators();

  return () => {
    resetState();
    history.push('/');
  };
};
