const tKeys = {
  no_rights_for_movie_remove: 'no_rights_for_movie_remove',
  user_already_exists: 'user_already_exists',
  authorization_needed: 'authorization_needed',
  field_required: 'field_required',
  field_must_be_string: 'field_must_be_string',
  field_must_be_number: 'field_must_be_number',
  incorrect_movie_id: 'incorrect_movie_id',
  incorrect_email: 'incorrect_email',
  incorrect_movie_image: 'incorrect_movie_image',
  incorrect_movie_trailer_link: 'incorrect_movie_trailer_link',
  incorrect_movie_thumbnail_link: 'incorrect_movie_thumbnail_link',
  min_password_length_required: 'min_password_length_required',
  min_field_length_required: 'min_field_length_required',
  max_field_length_required: 'max_field_length_required',
  server_error: 'server_error',
  incorrect_data: 'incorrect_data',
  data_not_found: 'data_not_found',
  page_not_found: 'page_not_found',
  field_is_incorrect_url: 'field_is_incorrect_url',
  field_is_incorrect_email: 'field_is_incorrect_email',
  incorrect_email_or_password: 'incorrect_email_or_password',
  success_registration: 'success_registration',
  email: 'email',
  password: 'password',
  name: 'name',
  country: 'country',
  director: 'director',
  duration: 'duration',
  year: 'year',
  description: 'description',
  image: 'image',
  trailer: 'trailer',
  thumbnail: 'thumbnail',
  nameRU: 'nameRU',
  nameEN: 'nameEN',
};

const translations = {
  [tKeys.no_rights_for_movie_remove]: 'У вас нет прав на удаление данного фильма',
  [tKeys.user_already_exists]: 'Пользователь с таким Email уже существует',
  [tKeys.authorization_needed]: 'Необходима авторизация',
  [tKeys.field_required]: 'Поле "{0}" является обязательным для заполнения',
  [tKeys.field_must_be_string]: 'Поле "{0}" должно быть строкой',
  [tKeys.field_must_be_number]: 'Поле "{0}" должно быть числом',
  [tKeys.incorrect_movie_id]: 'Некорректный ID фильма',
  [tKeys.incorrect_email]: 'Некорректный Email',
  [tKeys.incorrect_movie_image]: 'Некорректная ссылка на постер',
  [tKeys.incorrect_movie_trailer_link]: 'Некорректная ссылка на трейлер',
  [tKeys.incorrect_movie_thumbnail_link]: 'Некорректная ссылка на миниатюру',
  [tKeys.min_password_length_required]: 'Пароль должен быть не менее 8 символов в длину',
  [tKeys.min_field_length_required]: '{0} должно быть не менее {1} символов в длину',
  [tKeys.max_field_length_required]: '{0} должно быть не более {1} символов в длину',
  [tKeys.server_error]: 'На сервере произошла ошибка',
  [tKeys.incorrect_data]: 'Некорректные данные',
  [tKeys.data_not_found]: 'Запрашиваемые данные не найдены',
  [tKeys.page_not_found]: 'Запрашиваемая страница не найдена',
  [tKeys.field_is_incorrect_url]: '{0} не является корректным URL',
  [tKeys.field_is_incorrect_email]: '{0} не является корректным Email',
  [tKeys.incorrect_email_or_password]: 'Неправильные почта или пароль',
  [tKeys.success_registration]: 'Вы успешно зарегистрированы!',
  [tKeys.email]: 'Email',
  [tKeys.password]: 'Пароль',
  [tKeys.name]: 'Имя',
  [tKeys.country]: 'Страна',
  [tKeys.director]: 'Режиссёр',
  [tKeys.duration]: 'Длительность',
  [tKeys.year]: 'Год',
  [tKeys.description]: 'Описание',
  [tKeys.image]: 'Ссылка на постер',
  [tKeys.trailer]: 'Ссылка на трейлер',
  [tKeys.thumbnail]: 'Миниатюра',
  [tKeys.nameRU]: 'Имя фильма на русском',
  [tKeys.nameEN]: 'Имя фильма на английском',
};

const t = (key, replacementArray) => {
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

module.exports = {
  t,
  tKeys,
};
