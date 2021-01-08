import { useEffect } from 'react';
import { loadPickDetails } from './util';
import { usePickState } from './pick-state';

const useGetPicks = () => {
  const [pick, dispatch] = usePickState();
  useEffect(() => {
    let current = true;
    loadPickDetails(pick.taskId).then(({ data: task }) => {
      if (current) {
        dispatch({ type: 'LOAD_TASK', task });
      }
    });
    return () => {
      current = false;
    };
  }, [pick.taskId]);
};

export default useGetPicks;
