import { FaBriefcaseMedical, FaFileMedicalAlt, FaFileExcel, FaCalendarCheck, FaPlusCircle } from 'react-icons/fa';


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

const getAppointmentBackground = (appointment) => {
  if (appointment === undefined) {
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

export { getAppointmentBackground, getAppointmentIcon, formatAppointmentDate };