'use client'

import './cart.scss'
import { useEffect, useState, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import DelIcon from '../../../../../public/icons/delete-icon.png'
import { updateTickets } from '@/app/utils/store/actions';
import { CartState } from '@/app/utils/store/store';

interface ICart {
  setCartState: (state: boolean) => void;
  ref: React.RefObject<HTMLDivElement>;
}

const Cart = forwardRef<HTMLDivElement, ICart>(({ setCartState }, ref) => {
  const { tickets } = useSelector((state: CartState) => state);
  const dispatch = useDispatch();
  const [count, setCount] = useState<number>(tickets.count);

  useEffect(() => {
    console.log(tickets)
    setCount(tickets.count);
  }, [tickets.count]);

  const increment = () => {
    if (count < 10) {
      const newCount = count + 1;
      setCount(newCount);
      dispatch(updateTickets(newCount));
    }
  };

  const decrement = () => {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      dispatch(updateTickets(newCount));
    }
  };

  const clearCart = () => {
    setCount(0);
    dispatch(updateTickets(0));
  };

  return (
    <div className='cart-wrapper' ref={ref}>
      {count === 0 ? (
        <div className='empty-cart'>
          <h1>There are no tickets in your cart!</h1>
          <Link className='cart-buy-button' href={'/pages/selectDataTicket'} onClick={() => setCartState(false)}>Order tickets</Link>
        </div>
      ) : (
        <>
          <h2 className='cart-title'>Qasr Al Watan Ticket</h2>
          <div className='cart-content'>
            <p className='ticket-count'>AED 65.00</p>
            <div className="counter-container">
              <button className="counter-button" onClick={increment}>+</button>
              <span className="counter-display">{tickets.count}</span>
              <button className="counter-button" onClick={decrement}>-</button>
              <button className='button-delete' onClick={clearCart}>
                <Image
                  className='delete-icon'
                  width={20}
                  height={20}
                  src={DelIcon}
                  alt='delete'
                />
              </button>
            </div>
          </div>
          <div className='total-wrapper'>
            <p className='total-text'>Total:</p>
            <p className='total-price'>AED {tickets.count * 65}</p>
          </div>
          <Link href={'/pages/selectDataTicket'} onClick={() => setCartState(false)} className='cart-buy-button'>Select Date</Link>
        </>
      )}
    </div>
  );
});

export default Cart;