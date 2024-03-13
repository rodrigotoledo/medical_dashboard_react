import { useAppointmentsContext } from '../context/AppointmentsContext';
import { useEffect } from 'react';

const useRefetchAppointments = () => {
  const { refetchAppointments } = useAppointmentsContext();
  
  useEffect(() => {
    return refetchAppointments;
  }, [refetchAppointments]);

  return refetchAppointments;
};

export { useRefetchAppointments };