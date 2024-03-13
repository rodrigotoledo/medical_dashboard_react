import React, { createContext, useContext } from 'react';
import axios from 'axios';
import {
  useQuery,
  useQueryClient,
  useMutation
} from '@tanstack/react-query'

const AppointmentsContext = createContext();

export const AppointmentsProvider = ({children}) => {

  const queryClient = useQueryClient()

  const { isPending, error, data, isFetching, refetch } = useQuery({
    queryKey: ['appointments'],
    queryFn: () =>
      axios
        .get('/appointments')
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          console.error('Error on appointments:', error);
          throw error;
        })
  })

  

  const getAppointmentMutation = useMutation({
    getAppointmentFn: ({appointmentId}) => {
      return axios.get(`/appointments/${appointmentId}`).then((response) => response.data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] })
    }
  })

  const getAppointment = (appointment) => {
    getAppointmentMutation.mutate({appointmentId: appointment.id})
  }

  return <AppointmentsContext.Provider value={{appointments: data, getAppointment: getAppointment, isLoadingAppointments: isFetching, refetchAppointments: refetch }}>{children}</AppointmentsContext.Provider>
}

export const useAppointmentsContext = () => {
  return useContext(AppointmentsContext);
};