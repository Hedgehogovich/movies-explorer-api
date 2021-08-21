const translations = {
  no_rights_for_movie_remove: 'У вас нет прав на удаление данного фильма',
  user_already_exists: 'Пользователь с таким Email уже существует',
  authorization_needed: 'Необходима авторизация',
  field_required: 'Поле "{0}" является обязательным для заполнения',
  field_must_be_string: 'Поле "{0}" должно быть строкой',
  field_must_be_number: 'Поле "{0}" должно быть числом',
  incorrect_movie_id: 'Некорректный ID фильма',
  incorrect_email: 'Некорректный Email',
  incorrect_movie_image: 'Некорректная ссылка на постер',
  incorrect_movie_trailer_link: 'Некорректная ссылка на трейлер',
  incorrect_movie_thumbnail_link: 'Некорректная ссылка на миниатюру',
  min_password_length_required: 'Пароль должен быть не менее 8 символов в длину',
  min_field_length_required: '{0} должно быть не менее {1} символов в длину',
  max_field_length_required: '{0} должно быть не более {1} символов в длину',
  server_error: 'На сервере произошла ошибка',
  incorrect_data: 'Некорректные данные',
  data_not_found: 'Запрашиваемые данные не найдены',
  page_not_found: 'Запрашиваемая страница не найдена',
  field_is_incorrect_url: '{0} не является корректным URL',
  field_is_incorrect_email: '{0} не является корректным Email',
  incorrect_email_or_password: 'Неправильные почта или пароль',
  success_registration: 'Вы успешно зарегистрированы!',
};

module.exports.t = (key, replacementArray) => {
  let translation = translations[key];
  if (!translation) {
    return '';
  }

  if (Array.isArray(replacementArray) && replacementArray.length) {
    for (let i = 0; i < replacementArray.length; i += 1) {
      translation = translation.replace(`{${i}}`, replacementArray[i]);
    }
  }

  return translation;
};
