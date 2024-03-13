import React from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import { FaBriefcaseMedical, FaFileMedicalAlt, FaFileExcel, FaIdCardAlt, FaCalendarCheck, FaPlusCircle } from 'react-icons/fa';
import moment from 'moment'
import '../styles/agenda.css';
import '../styles/styles.css';
import '../styles/event.css';
import '../styles/month.css';
import SelectPatient from './SelectPatient';
import { useAppointmentsContext } from '../context/AppointmentsContext';
import { usePatientsContext } from '../context/PatientsContext';

const localizer = momentLocalizer(moment)




const Dashboard = () => {
  const { appointments, getAppointment, isLoadingAppointments, refetchAppointments } = useAppointmentsContext()
  const { patients, isLoadingPatients, refetchPatients } = usePatientsContext()
  const views = [Views.WEEK]

  const events = appointments?.map((appointment) => {
    return {
      title: appointment.description,
      start: new Date(appointment.startTime),
      end: new Date(appointment?.endTime || appointment.startTime)
    } 
  })

  function refetchData(){
    refetchAppointments()
    refetchPatients()
  }

  const getAppointmentBackground = (appointment) => {
    if (isLoadingAppointments) {
      return 'bg-gray-100'; 
    }

    if (appointment.status == 'absent') {
      return 'bg-red-500';
    } else if (appointment.status == 'completed') {
      return 'bg-green-500';
    } else {
      return 'bg-gray-500';
    }
  };

  const getClientName = (patientId) => {
    if (!isLoadingPatients) {
      const patient = patients.find(patient => patient.id === patientId);
      if (patient) {
        return patient.name;
      }
    }
  };

  const getAppointmentIcon = (appointment) => {
    if (appointment.type) {
      if(appointment.type == 'checkUp'){
        return <FaCalendarCheck />
      }else if(appointment.type == 'followUp'){
        return <FaPlusCircle />
      }else if(appointment.type == 'firstVisit'){
        return <FaFileMedicalAlt />
      }else if(appointment.type == 'exam'){
        return <FaBriefcaseMedical />
      }else if(appointment.type == 'surgery'){
        return <FaFileExcel />
      }
    }

  }

  const formatAppointmentDate = (appointment) => {
    if (appointment.startTime && appointment.endTime) {
      const formattedStartDate = new Date(appointment.startTime).toLocaleString();
      const formattedEndDate = new Date(appointment.endTime).toLocaleString();
      return `${formattedStartDate} - ${formattedEndDate}`;
    } else if (appointment.startTime) {
      return new Date(appointment.startTime).toLocaleString();
    } else {
      return '-';
    }
  };


  return (
    <div>
      <div className="flex flex-col md:flex-row">
        <div className='bg-white flex md:w-1/4 w-full md:h-screen text-center flex-row md:flex-col p-2'>
          <SelectPatient patients={patients} />
        </div>
        <div className='md:w-3/4 md:flex-auto p-4 bg-gray-100'>
          <h1 className='font-bold hidden md:block'>Dashboard</h1>
          <div className='bg-white w-full p-4 mt-8'>
            <div>
              <Calendar
                onRangeChange={(props) => { }}
                onNavigate={(props) => { refetchData() }}
                localizer={localizer}
                events={events}
                view={ views}
                defaultView={views}
                views={views}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                onView={(newDate) => {console.log(newDate)}}
              />
            </div>
          </div>
          <div className='mt-8 bg-white w-full p-4'>
            <h1 className='font-bold hidden md:block'>Dashboard</h1>
            <div className='mt-2 border-collapse border border-slate-500 rounded-md p-2 pt-0'>
              <table className='w-full'>
                <tbody>
                {appointments?.map((appointment) => {
                  const backgroundClass = getAppointmentBackground(appointment);
                  return (

                    <tr key={appointment.id} className='border-b border-slate-500'>
                      <td className='h-10 py-2'>{formatAppointmentDate(appointment)}</td>
                      <td className='h-10 py-2 hidden md:block text-center'><span className={`rounded-md text-sm  ${backgroundClass} p-1 text-white`}>{appointment.status}</span></td>
                      <td className='h-10 py-2'>{getClientName(appointment.patientId)}</td>
                      <td className='h-10 py-2 md:flex flex-row items-center hidden space-x-1'>{getAppointmentIcon(appointment)}<span>{appointment.type}</span></td>
                    </tr>
                  )
                })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;