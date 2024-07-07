import { createStore, action } from 'easy-peasy';

const store = createStore({
    showLoading: true,
    setShowLoading: action((state, payload) => {
        state.showLoading = payload
    })

  });
  
  export default store;