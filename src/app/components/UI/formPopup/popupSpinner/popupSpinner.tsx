import './popupSpinner.scss';

const PopupSpinner = () => {
  return (
    <div className="PopupSpinner">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default PopupSpinner;
