// Функция, переводящая ошибки на русский язык
export const messagesTranslator = (message) => {
  switch (message) {
    case 'email must be an email':
      return 'Некорректный email';
    case 'password must be longer than or equal to 8 characters':
      return 'Пароль должен быть длиннее 8-ми символов';

    default:
      return message;
  }
};
