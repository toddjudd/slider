import { useEffect } from 'react';
import { loadPickDetails } from './util';
import { usePickState } from './pick-state';
import {
  validateActualLocationAndLicensePlate,
  getValidPickLocations,
  getValidPickLicensePlates,
} from './util';

export const useGetPicks = (taskId) => {
  const [, dispatch] = usePickState();
  useEffect(() => {
    let current = true;
    loadPickDetails(taskId).then(({ data: task }) => {
      if (current) {
        dispatch({ type: 'LOAD_TASK', task });
      }
    });
    return () => {
      current = false;
    };
  }, [taskId, dispatch]); //this is a weird depencancy?
  // likely it would be the 'selected task id of some parent?
};

export const useGetLocations = (taskId, set) => {
  useEffect(() => {
    let current = true;
    const clean = () => {
      current = false;
    };
    if (taskId === null) return clean;
    getValidPickLocations(taskId).then(({ data: locations }) => {
      if (current) {
        set(locations);
      }
    });
    return clean;
  }, [set, taskId]);
};

export const useGetLp = (taskId, sourceLoc, set) => {
  useEffect(() => {
    let current = true;
    let clean = () => {
      current = false;
    };
    if (taskId === null) return clean;
    getValidPickLicensePlates(taskId, sourceLoc).then(
      ({ data: licensePlates }) => {
        if (current) {
          set(licensePlates);
        }
      }
    );
    return clean;
  }, [taskId, sourceLoc, set]);
};

export const useValidateLp = () => {
  const [pick, dispatch] = usePickState();
  useEffect(() => {
    let current = true;
    let clean = () => {
      current = false;
    };
    if (
      pick.taskId === null ||
      pick.actualSourceLocation === '' ||
      pick.actualSourceLP === ''
    )
      return clean;
    validateActualLocationAndLicensePlate(
      pick.taskId,
      pick.actualSourceLocation,
      pick.actualSourceLP
    ).then(({ data: valid }) => {
      if (current && pick.actualSourceLP !== '') {
        console.log(pick.actualSourceLP);
        dispatch({
          type: 'FORM_CHANGE',
          change: valid,
        });
      }
    });
    return clean;
  }, [dispatch, pick.taskId, pick.actualSourceLocation, pick.actualSourceLP]);
};
