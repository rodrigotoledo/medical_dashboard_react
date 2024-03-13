import { useEffect } from 'react';
import { usePatientsContext } from '../context/PatientsContext';

const useRefetchPatients = () => {
  const { refetchPatients } = usePatientsContext();
  
  useEffect(() => {
    return refetchPatients;
  }, [refetchPatients]);

  return refetchPatients;
};

export { useRefetchPatients };