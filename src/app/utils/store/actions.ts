// store/actions.ts
export const addTickets = (date: Date | null, count: number) => {
  return {
    type: 'ADD_TICKETS',
    payload: { date, count }
  };
};

export const updateTickets = (count: number) => ({
  type: 'UPDATE_TICKETS',
  payload: { count },
});