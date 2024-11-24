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

    let input = event.target.value;

    // Удаляем все символы, кроме цифр
    input = input.replace(/\D/g, '');

    // Добавляем пробел после каждых 4 цифр
    input = input.replace(/(\d{4})(?=\d)/g, '$1 ');

    // Обновляем значение состояния
    setValueCard(input);
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
