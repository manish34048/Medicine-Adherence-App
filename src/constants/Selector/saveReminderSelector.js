const saveReminder = state => state.saveReminder;
const saveReminderLoading = state => state.saveReminder.isLoading;
const saveReminderRequest = state => state.saveReminder.error;

export const saveReminderSelector = {
  saveReminder,
  saveReminderLoading,
  saveReminderRequest,
};

