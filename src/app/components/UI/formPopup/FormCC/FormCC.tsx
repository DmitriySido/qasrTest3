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
        />
      </div>

      <div className="inputs-wrapper">
        <input
          className="form-input"
          type="text"
          placeholder="MM/YY"
          ref={CardExpDateRef}
          required
        />
        <input
          className="form-input"
          type="text"
          placeholder="CVV"
          ref={CardCVVRef}
          required
        />
      </div>
      <button type="submit" className="form-submit-btn">
        Proceed
      </button>
    </form>
  );
};

export default FormCC;