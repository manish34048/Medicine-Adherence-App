const appointmentReminder = state => state.appointmentReminder.data?.result;
const appointmentReminderLoading = state => state.appointmentReminder.isLoading;
const apppointmentReminderError = state => state.appointmentReminder.error;
const saveAppointmentReminder = state => state.saveAppointment.data;
const saveAppointmentReminderLoading = state => state.saveAppointment.isLoading;
const saveAppointmentReminderError = state => state.saveAppointment.error;
const getAppointment = state => state.getAppointment;
const getAppointmentLoading = state => state.getAppointment.isLoading.loader;
const getAppointmentError = state => state.getAppointment.error;
const updateAppointment = state => state.updateAppointment.data;
const updateAppointmentLoading = state => state.updateAppointment.isLoading;
const updateAppointmentError = state => state.updateAppointment.error;
const deleteAppointment = state => state.deleteAppointment?.data;
const deleteAppointmentLoading = state =>state.deleteAppointment.isLoading;
const deleteAppointmentError = state => state.deleteAppointment.error

export const appointmentReminderSelector = {
  appointmentReminder,
  appointmentReminderLoading,
  apppointmentReminderError,
  saveAppointmentReminder,
  saveAppointmentReminderLoading,
  saveAppointmentReminderError,
  getAppointment,
  getAppointmentLoading,
  getAppointmentError,
  updateAppointment,
  updateAppointmentLoading,
  updateAppointmentError,
  deleteAppointment,
  deleteAppointmentError,
  deleteAppointmentLoading,
};
