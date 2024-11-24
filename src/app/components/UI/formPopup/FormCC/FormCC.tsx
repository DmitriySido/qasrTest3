import { useRef, useState } from 'react';
import { useInputHandlers } from '../useInputHandlers';
import './FormCC.scss';

interface IFormCC {
  handleSubmitCC: (e: React.FormEvent) => void;
  FirstNameRef: React.RefObject<HTMLInputElement>;
  LastNameRef: React.RefObject<HTMLInputElement>;
  CardNumberRef: React.RefObject<HTMLInputElement>;
  CardExpDateRef: React.RefObject<HTMLInputElement>;
  CardCVVRef: React.RefObject<HTMLInputElement>;
}

const FormCC = ({
  handleSubmitCC,
  FirstNameRef,
  LastNameRef,
  CardNumberRef,
  CardExpDateRef,
  CardCVVRef,
}: IFormCC) => {
  const {
    cardData,
    valueTel,
    valueCard,
    handleCardDataChange,
    handleTelChange,
    handleCardChange,
  } = useInputHandlers();

  const CardCVVReff = useRef<HTMLInputElement>(null);

  const CardExpDateReff = useRef<HTMLInputElement>(null);

  const handleDateInput = (e: React.FormEvent<HTMLInputElement>) => {
    let input = e.currentTarget.value;
    
    // Удаляем все нецифровые символы
    input = input.replace(/\D/g, '');
    
    // Ограничиваем ввод до 4 цифр и форматируем в MM/YY
    if (input.length > 2) {
      input = `${input.slice(0, 2)}/${input.slice(2, 4)}`;
    }
    
    // Устанавливаем значение в поле ввода
    e.currentTarget.value = input;
  };

  const [valueCardd, setValueCard] = useState('');
  const CardNumberReff = useRef<HTMLInputElement>(null);



  return (
    <form onSubmit={handleSubmitCC} className="FormCC">
      <div className="inputs-wrapper">
        <input
          className="form-input"
          type="email"
          placeholder="Email*"
          required
        />
        <input
          className="form-input"
          type="text"
          placeholder="Phone number*"
          value={valueTel}
          onChange={handleTelChange}
          required
        />
      </div>

      <div className="inputs-wrapper">
        <input
          className="form-input"
          type="text"
          placeholder="First name*"
          ref={FirstNameRef}
          required
        />
        <input
          className="form-input"
          type="text"
          placeholder="Last name*"
          ref={LastNameRef}
          required
        />
      </div>

      <h2 className="form-title">Choose your payment method</h2>
      <div className="inputs-wrapper">
        <input
          className="form-input full-input"
          type="text"
          placeholder="Credit/Debit Card Number"
          value={valueCard}
          onChange={handleCardChange}
          ref={CardNumberRef}
          required
          maxLength={19}
        />
      </div>

      <div className="inputs-wrapper">
        <input
          className="form-input"
          type="text"
          placeholder="MM/YY"
          ref={CardExpDateRef}
          required
          onInput={handleDateInput}
          maxLength={5}
        />
        <input
          className="form-input"
          type="number"
          placeholder="CVV"
          ref={CardCVVRef}
          maxLength={3}
          required
          onInput={(e: React.FormEvent<HTMLInputElement>) => {
            const input = e.currentTarget;
            input.value = input.value.replace(/\D/g, '').slice(0, 3);
          }}
        />
      </div>
      <button type="submit" className="form-submit-btn">
        Proceed
      </button>
    </form>
  );
};

export default FormCC;