import React from 'react';
import styles from './app.module.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AppHeader from '../app-header/app-header';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { LoginPage } from '../../pages/login/login';
import { RegisterPage } from '../../pages/register/register';
import { ForgotPasswordPage } from '../../pages/forgot-password/forgot-password';
import { ResetPasswordPage } from '../../pages/reset-password/reset-password';
import { ProfilePage } from '../../pages/profile/profile';
import { NotFoundPage } from '../../pages/not-found-page/not-found-page';
import { MainPage } from '../../pages/main/main';
import { ProtectedRoute } from '../protected-route/protected-route';
import { getIngredients } from '../../services/action-creators/burgerConstructorActionCreators';
import { getCookie } from '../../utils/cookies';
import { getUser } from '../../services/action-creators/userActionCreators';

const App = () => {
  const dispatch = useDispatch();

  const { isLoading, error, allIngredients } = useSelector(store => store.burgerConstructorReducer);

  const location = useLocation();
  const background = location.state && location.state.background;
  const navigate = useNavigate();

  React.useEffect(() => {
    if (getCookie('accessToken')) {
      dispatch(getUser());
    }
    dispatch(getIngredients());
  }, [dispatch]);

  if (isLoading) {
    return <h1>Загрузка...</h1>;
  }

  if (!isLoading && error.length > 0) {
    return <h1>Ошибка</h1>;
  }

  if (!isLoading && allIngredients.length === 0) {
    return <h1>Нет ингредиентов</h1>;
  }

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route
          path="/login"
          element={
            <ProtectedRoute unAuthorizedOnly={true}>
              <LoginPage />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/register"
          exact={true}
          element={
            <ProtectedRoute unAuthorizedOnly={true}>
              <RegisterPage />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/forgot-password"
          exact={true}
          element={
            <ProtectedRoute unAuthorizedOnly={true}>
              <ForgotPasswordPage />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/reset-password"
          exact={true}
          element={
            <ProtectedRoute unAuthorizedOnly={true}>
              <ResetPasswordPage />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <ProtectedRoute unAuthorizedOnly={false}>
              <ProfilePage />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/ingredients/:id"
          exact={true}
          element={
            <div className={styles.ingredient}>
              <h2 className="text text_type_main-large">Детали ингредиента</h2>
              <IngredientDetails />
            </div>
          }
        ></Route>
        <Route path="/" exact={true} element={<MainPage />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
      {background && (
        <Routes>
          (
          <Route path="/ingredients/:id" exact={true}>
            <Modal
              title="Детали ингредиента"
              onClose={() => {
                navigate({ pathname: '/' });
              }}
            >
              <IngredientDetails />
            </Modal>
          </Route>
          )
        </Routes>
      )}
    </>
  );
};

export default App;
