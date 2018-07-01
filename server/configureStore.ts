import { createStore, applyMiddleware, compose } from "redux";
import { connectRoutes } from "redux-first-router";

import { routesMap } from "../src/routesMap";
import { createReducer } from "../src/reducers";

export const configureStore = async ({ initialEntries }) => {
  const { reducer, middleware, enhancer, thunk } = connectRoutes(routesMap, {
    initialEntries,
  }); // notice `thunk`
  const rootReducer = createReducer({ location: reducer });
  // note the order that the enhancer and middleware are composed in: enhancer first, then middleware
  const store = createStore(
    rootReducer,
    compose(
      enhancer,
      applyMiddleware(middleware),
    ),
  );

  // using redux-thunk perhaps request and dispatch some app-wide state as well, e.g:
  // await Promise.all([ store.dispatch(myThunkA), store.dispatch(myThunkB) ])

  await thunk(store); // THE WORK: if there is a thunk for current route, it will be awaited here

  return store;
};
