import { createStore } from 'redux';

// действия
const ADD_TICKETS = 'ADD_TICKETS';
const UPDATE_TICKETS = 'UPDATE_TICKETS';

// нтерфейс состояния
export interface CartState {
  tickets: {
    date: Date | null;
    count: number;
  };
}

// начальное состояние
const initialState: CartState = {
  tickets: {
    date: null,
    count: 0,
  },
};

// редьюсер
const cartReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_TICKETS:
      return {
        ...state,
        tickets: {
          date: action.payload.date,
          count: action.payload.count,
        },
      };
    case UPDATE_TICKETS:
      return {
        ...state,
        tickets: {
          ...state.tickets,
          count: action.payload.count,
        },
      };
    default:
      return state;
  }
};

// хранилище
const store = createStore(cartReducer);

export default store;