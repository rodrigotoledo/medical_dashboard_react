import React, { createContext, useContext } from 'react';
import axios from 'axios';
import {
  useQuery,
  useQueryClient,
  useMutation
} from '@tanstack/react-query'

const PatientsContext = createContext();

export const PatientsProvider = ({children}) => {

  const queryClient = useQueryClient()

  const { isPending, error, data, isFetching, refetch } = useQuery({
    queryKey: ['patients'],
    queryFn: () =>
      axios
        .get('/patients')
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          console.error('Error on patients:', error);
          throw error;
        })
  })

  const getPatientMutation = useMutation({
    getPatientFn: ({patientId}) => {
      return axios.get(`/patients/${patientId}`).then((response) => response.data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['patients'] })
    }
  })

  const getPatient = (patient) => {
    getPatientMutation.mutate({patientId: patient.id})
  }

  return <PatientsContext.Provider value={{patients: data, getPatient: getPatient, isLoadingPatients: isFetching, refetchPatients: refetch }}>{children}</PatientsContext.Provider>
}

export const usePatientsContext = () => {
  return useContext(PatientsContext);
};