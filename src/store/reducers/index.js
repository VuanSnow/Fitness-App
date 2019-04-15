const initialState = {
  customers: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CUSTOMERS": {
      return {
        ...state,
        customers: [...action.customers]
      };
    }
    case "REMOVE_CUSTOMER": {
      const id = action.id;
      return {
        ...state,
        customers: state.customers.filter(c => c.id !== id)
      };
    }
    default:
      return state;
  }
};

export default rootReducer;
