const caretaker = state => state.careTaker.data;
const caretakerLoading = state => state.careTaker.isLoading;
const caretakerRequest = state => state.careTaker.error;
const caretakerList = state => state.listCaretaker.data;
const caretakerListLoading = state => state.listCaretaker.isLoading;
const caretakerListRequest = state => state.listCaretaker.error;

export const myCaretakerSelector = {
  caretaker,
  caretakerLoading,
  caretakerRequest,
  caretakerList,
  caretakerListLoading,
  caretakerListRequest
};
