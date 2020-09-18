import { createStackNavigator } from "@react-navigation/stack";
import { createStore, applyMiddleware } from "redux";
import loggerMiddleware from "redux-logger";
import createSagaMiddleware, { SagaMiddleware } from "redux-saga";
import reducers from "./reducers";
import sagas from "./sagas";

const getMiddleWare = (sagaMiddleware: SagaMiddleware<object>) => {
  if (__DEV__) {
    console.log("test");
    return [loggerMiddleware, sagaMiddleware];
  } else {
    return [sagaMiddleware];
  }
};

export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = getMiddleWare(sagaMiddleware);

  const store = createStore(reducers, applyMiddleware(sagaMiddleware));

  sagaMiddleware.run(sagas);

  return store;
};
