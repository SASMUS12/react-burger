import React, { useState, useEffect } from 'react';
import styles from './profile.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Button, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { logout, updateUser } from '../../services/action-creators/userActionCreators';
import { useForm } from '../../hooks/useForm';

export const ProfilePage = () => {
  const dispatch = useDispatch();

  const { userName, userLogin, isLoading, error } = useSelector(store => store.userReducer);

  const { values, handleChange, setValues } = useForm({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    setValues({
      name: userName,
      email: userLogin
    });
  }, [userName, userLogin, setValues]);

  const handleLogoutClick = e => {
    e.preventDefault();
    dispatch(logout());
  };

  const [dataChanged, setDataChanged] = useState(false);

  const onChange = e => {
    setDataChanged(true);
    handleChange(e);
  };

  const handleSaveProfile = e => {
    e.preventDefault();
    dispatch(updateUser(values.name, values.email, values.password));
  };

  const handleCancelChanges = e => {
    e.preventDefault();
    setValues({
      ...values,
      name: userName,
      email: userLogin,
      password: ''
    });
    setDataChanged(false);
  };

  if (isLoading) {
    return <h1>Загрузка</h1>;
  }

  if (!isLoading && error.length > 0) {
    return <h1>Ошибка</h1>;
  }

  if (!isLoading && error.length === 0) {
    return (
      <main className={styles.profileMain}>
        <section className={styles.profileMenu}>
          <Button type="secondary">
            <p className="text text_type_main-medium pt-4 pb-4">Профиль</p>
          </Button>
          <Button type="secondary">
            <p className="text text_type_main-medium pt-4 pb-4 text_color_inactive">
              История заказов
            </p>
          </Button>
          <Button type="secondary">
            <p
              className="text text_type_main-medium pt-4 pb-4 text_color_inactive"
              onClick={handleLogoutClick}
            >
              Выход
            </p>
          </Button>
          <p className="text text_type_main-default text_color_inactive mt-20">
            В этом разделе вы можете
            <br />
            изменить свои персональные данные
          </p>
        </section>
        <section>
          <form className={styles.profileFields} onSubmit={handleSaveProfile}>
            <Input
              type={'text'}
              placeholder={'Имя'}
              onChange={onChange}
              icon={'EditIcon'}
              value={values.name}
              name={'name'}
            />
            <EmailInput
              type={'email'}
              placeholder={'Логин'}
              onChange={onChange}
              icon={'EditIcon'}
              value={values.email}
              name={'email'}
            />
            <Input
              type={'password'}
              placeholder={'Пароль'}
              onChange={onChange}
              icon={'EditIcon'}
              value={''}
              name={'password'}
            />
            {dataChanged && (
              <div className={styles.profileButtons}>
                <Button type="primary" onClick={handleCancelChanges}>
                  Отмена
                </Button>
                <Button htmlType="submit" type="primary" size="medium">
                  Сохранить
                </Button>
              </div>
            )}
          </form>
        </section>
      </main>
    );
  }
};
