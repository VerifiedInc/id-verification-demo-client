import { useNavigate } from 'react-router-dom';
import { useActionCreators } from './useActionCreators';

export const useStartOver = (): () => void => {
  const history = useNavigate();
  const { startOver } = useActionCreators();
  return () => {
    startOver();
    history('/');
  };
};
