import { useHistory } from 'react-router-dom';
import { useActionCreators } from './useActionCreators';

export const useStartOver = () => {
  const history = useHistory();
  const { startOver } = useActionCreators();
  return () => {
    startOver();
    history.push('/');
  };
};
