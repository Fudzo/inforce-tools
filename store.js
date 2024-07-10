import { createStore, action } from 'easy-peasy';

const store = createStore({
    showLoading: true,
    showMainPage: false,
    setShowLoading: action((state, payload) => {
        state.showLoading = payload
    }),
    setShowMainPage: action((state, payload) => {
        state.showMainPage = payload
    })
  });
  
  export default store;