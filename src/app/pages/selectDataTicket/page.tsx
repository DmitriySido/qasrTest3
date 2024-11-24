'use client';

import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { NextPage } from 'next';

import './selectDataTicket.scss';
import FormPopup from '@/app/components/UI/formPopup/FormPopup';
import { useDispatch, useSelector } from 'react-redux';
import { addTickets, updateTickets } from '@/app/utils/store/actions';

const SelectDatePage: NextPage = () => {
  const dispatch = useDispatch();
  const ticketsCount = useSelector((state: any) => state.tickets.count); // Получаем количество билетов из Redux
  const TICKET_PRICE = 65;
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [formState, setFormState] = useState<boolean>(false);
  const [count, setCount] = useState<number>(ticketsCount); // Инициализируем локальное состояние

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    dispatch(addTickets(date, count));
  };

  const increment = () => {
    if (count < 10) {
      const newCount = count + 1;
      setCount(newCount);
      dispatch(updateTickets(newCount)); // Обновляем количество билетов в Redux
    }
  };

  const decrement = () => {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      dispatch(updateTickets(newCount)); // Обновляем количество билетов в Redux
    }
  };

  useEffect(() => {
    setCount(ticketsCount); // Синхронизируем локальное состояние с Redux
  }, [ticketsCount]);

  return (
    <div className="container">
      <h1 className="heading">Select a Date for Your Ticket</h1>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="MMMM d, yyyy"
        minDate={new Date()}
        inline
        className="custom-datepicker"
      />
      <div className="more-ticket">
        <p className="more-ticket-subtitle">Select the number of tickets:</p>
        <div className="counter-container">
          <button className="counter-button" onClick={increment}>
            +
          </button>
          <span className="counter-display">{count}</span>
          <button className="counter-button" onClick={decrement}>
            -
          </button>
        </div>
      </div>
      <div className="total-panel">
        <button
          onClick={() => setFormState(true)}
          className="buy-ticket-button"
          disabled={!selectedDate || ticketsCount === 0}
        >
          Pay Now
        </button>
        <p className="total-text">
          Total: <b>{count * TICKET_PRICE} AED</b>
        </p>
      </div>
      {formState && (
        <FormPopup
          setFormState={setFormState}
          money={count * TICKET_PRICE}
          tickets={count}
          data={selectedDate}
        />
      )}
    </div>
  );
};

export default SelectDatePage;
