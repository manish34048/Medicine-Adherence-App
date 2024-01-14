let store;
class StoreProviderService {
  init(configureStore) {
    store = configureStore();
  }
  getStore() {
    return store;
  }
  get state() {
    return this.getStore().getState();
  }
  get internetStatus() {
    return this.state.internetConnectivity?.data;
  }
  get dispatch() {
    return this.getStore().dispatch;
  }
  get userLoggedIn() {
    return this.state.userInfo?.data;
  }
}
const storeProviderService = new StoreProviderService();
export {storeProviderService as StoreProviderService};
