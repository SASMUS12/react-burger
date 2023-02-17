import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import styles from '../forgot-password/forgot-password.module.css';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPassword } from '../../services/action-creators/userActionCreators';
import { useForm } from '../../hooks/useForm';

export const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const { values, handleChange } = useForm({
    newPassword: '',
    resetPasswordCode: ''
  });

  const isResettingPassword = useSelector(store => store.userReducer.isResettingPassword);

  const handleResetPasswordRequest = e => {
    e.preventDefault();
    dispatch(resetPassword(values.newPassword, values.resetPasswordCode));
  };

  if (!isResettingPassword) {
    return <Navigate to={{ pathname: '/forgot-password' }} />;
  }

  return (
    <section className={styles.loginWrapper}>
      <div className={styles.loginForm}>
        <h2 className={`${styles.loginHeader} text text_type_main-medium`}>
          Восстановление пароля
        </h2>
        <div className="pt-6 pb-20">
          <form className={styles.loginFormBody} onSubmit={handleResetPasswordRequest}>
            <PasswordInput
              placeholder={'Введите новый пароль'}
              name={'newPassword'}
              onChange={handleChange}
              value={values.newPassword}
            />
            <Input
              type={'text'}
              placeholder={'Введите код из письма'}
              name={'resetPasswordCode'}
              onChange={handleChange}
              value={values.resetPasswordCode}
            />
            <Button htmlType="submit" type="primary" size="large">
              Сохранить
            </Button>
          </form>
        </div>
        <p className={`${styles.password} text text_type_main-default text_color_inactive`}>
          Вспомнили пароль? <Link to="/login">Войти</Link>
        </p>
      </div>
    </section>
  );
};
