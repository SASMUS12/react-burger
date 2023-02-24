import React, { useEffect, FC } from 'react';
import styles from './app.module.css';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { Login } from '../../pages/login/login';
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
import { useAppDispatch, useAppSelector } from '../../services/types/index';
import { Location } from 'history';
import { FeedPage } from '../../pages/feed/feed';
import { OrdersPage } from '../../pages/orders/orders';
import OrderInfo from '../orders-info/order-info';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error, allIngredients } = useAppSelector(
    store => store.burgerConstructorReducer
  );

  const location = useLocation<{ background: Location }>();
  const background = location.state && location.state.background;
  const history = useHistory();

  useEffect(() => {
    if (getCookie('accessToken')) {
      dispatch(getUser());
    }
    dispatch(getIngredients());
  }, [dispatch]);

  if (isLoading) {
    return <h1>Загрузка...</h1>;
  }

  if (!isLoading && error && error.length > 0) {
    return <h1>Ошибка</h1>;
  }

  if (!isLoading && allIngredients.length === 0) {
    return <h1>Нет ингредиентов</h1>;
  }

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <ProtectedRoute unAuthorizedOnly={true} path="/login" exact={true}>
          <Login />
        </ProtectedRoute>
        <ProtectedRoute unAuthorizedOnly={true} path="/register" exact={true}>
          <RegisterPage />
        </ProtectedRoute>
        <ProtectedRoute unAuthorizedOnly={true} path="/forgot-password" exact={true}>
          <ForgotPasswordPage />
        </ProtectedRoute>
        <ProtectedRoute unAuthorizedOnly={true} path="/reset-password" exact={true}>
          <ResetPasswordPage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile" exact={true}>
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders" exact={true}>
          <OrdersPage />
        </ProtectedRoute>
        <Route path="/ingredients/:id" exact={true}>
          <div className={styles.pageWrapper}>
            <h2 className="text text_type_main-large">Детали ингредиента</h2>
            <IngredientDetails />
          </div>
        </Route>
        <Route path="/feed/:number" exact={true}>
          <div className={styles.pageWrapper}>
            <OrderInfo />
          </div>
        </Route>
        <ProtectedRoute path="/profile/orders/:number" exact={true}>
          <div className={styles.pageWrapper}>
            <OrderInfo />
          </div>
        </ProtectedRoute>
        <Route path="/" exact={true}>
          <MainPage />
        </Route>
        <Route path="/feed" exact={true}>
          <FeedPage />
        </Route>
        <Route path="/orderdetails" exact={true}>
          <OrderInfo />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
      {background && (
        <>
          <Route path="/ingredients/:id" exact={true}>
            <Modal
              title="Детали ингредиента"
              onClose={() => {
                history.replace({ pathname: '/' });
              }}
            >
              <IngredientDetails />
            </Modal>
          </Route>

          <Route path="/feed/:number" exact={true}>
            <Modal
              onClose={() => {
                history.replace({ pathname: '/feed/' });
              }}
            >
              <OrderInfo />
            </Modal>
          </Route>

          <Route path="/profile/orders/:number" exact={true}>
            <Modal
              onClose={() => {
                history.replace({ pathname: '/profile/orders' });
              }}
            >
              <OrderInfo />
            </Modal>
          </Route>
        </>
      )}
    </>
  );
};

export default App;
