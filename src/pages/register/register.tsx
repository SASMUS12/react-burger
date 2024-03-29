import React, { FC } from 'react';
import styles from '../forgot-password/forgot-password.module.css';
import { Link } from 'react-router-dom';
import {
  Input,
  EmailInput,
  PasswordInput,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import { register } from '../../services/action-creators/userActionCreators';
import { useForm } from '../../hooks/useForm';
import { useAppDispatch } from '../../services/types/index';

export const RegisterPage: FC = () => {
  const dispatch = useAppDispatch();

  const { values, handleChange } = useForm({
    email: '',
    password: '',
    name: ''
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(register(values.email, values.password, values.name));
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.form}>
        <h2 className={`${styles.header} text text_type_main-medium`}>Регистрация</h2>
        <div className="pt-6 pb-20">
          <form className={styles.body} onSubmit={handleRegister}>
            <Input
              type={'text'}
              placeholder={'Имя'}
              value={values.name}
              onChange={handleChange}
              name={'name'}
            />
            <EmailInput value={values.email} onChange={handleChange} name={'email'} />
            <PasswordInput value={values.password} onChange={handleChange} name={'password'} />
            <Button htmlType="submit" type="primary" size="large">
              Зарегистрироваться
            </Button>
          </form>
        </div>
        <p className={`${styles.password} text text_type_main-default text_color_inactive`}>
          Уже зарегистрированы? <Link to="/login">Войти</Link>
        </p>
      </div>
    </section>
  );
};
