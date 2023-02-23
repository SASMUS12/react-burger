import React, { FC } from 'react';
import styles from '../forgot-password/forgot-password.module.css';
import {
  EmailInput,
  PasswordInput,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { login } from '../../services/action-creators/userActionCreators';
import { useForm, useAppDispatch } from '../../hooks/useForm';

export const Login: FC = () => {
  const dispatch = useAppDispatch();
  const { values, handleChange } = useForm({
    email: '',
    password: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login(values.email, values.password));
  };

  return (
    <section className={styles.loginWrapper}>
      <div className={styles.loginForm}>
        <h2 className={`${styles.loginHeader} text text_type_main-medium`}>Вход</h2>
        <div className="pt-6 pb-20">
          <form className={styles.loginFormBody} onSubmit={handleLogin}>
            <EmailInput name={'email'} value={values.email} onChange={handleChange} />
            <PasswordInput name={'password'} value={values.password} onChange={handleChange} />
            <Button htmlType="submit" type="primary" size="large">
              Войти
            </Button>
          </form>
        </div>
        <p className={`${styles.password} text text_type_main-default text_color_inactive mb-4`}>
          Вы — новый пользователь? <Link to="/register">Зарегистрироваться</Link>
        </p>
        <p className={`${styles.password} text text_type_main-default text_color_inactive`}>
          Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link>
        </p>
      </div>
    </section>
  );
};
