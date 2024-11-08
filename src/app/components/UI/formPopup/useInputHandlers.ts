import { useState } from 'react';

export function useInputHandlers() {
  const [cardData, setCardData] = useState('');
  const [valueTel, setValueTel] = useState<string>('');
  const [valueCard, setValueCard] = useState<string>('');

  const handleCardDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
    }
    setCardData(value);
  };

  const handleTelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.replace(/\D/g, '');
    if (inputValue.length <= 13) {
      setValueTel(inputValue);
    }
  };

  const handleCardChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.replace(/\D/g, '');
    if (inputValue.length <= 16) {
      setValueCard(inputValue);
    }
  };

  return {
    cardData,
    valueTel,
    valueCard,
    handleCardDataChange,
    handleTelChange,
    handleCardChange,
  };
}
