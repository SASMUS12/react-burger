import type { Middleware, MiddlewareAPI } from 'redux';
import type { AppDispatch, RootState } from '../types/index';
import { TWSActions } from '../actions/wsActions';
import { TWS } from '../types/index';

export const socketMiddleware = (wsActions: TWS): Middleware => {

    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

    return next => (action: TWSActions) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

      if (type === wsInit) {
        socket = new WebSocket(action.payload);
      }

      if (socket) {
        socket.onopen = (event) => {
            dispatch({ type: onOpen, payload: event });
        }

        socket.onerror = (event) => {
            dispatch({ type: onError, payload: event });
        }

        socket.onmessage = (event) => {
            const { data } = event;
            dispatch({ type: onMessage, payload: data });
        }

        socket.onclose = (event) => {
            dispatch({ type: onClose, payload: event });
        }
      }

      next(action);
    };

  }) as Middleware;

}