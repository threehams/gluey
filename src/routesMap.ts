const API_URL = "http://localhost:3000/";

export const routesMap = {
  HOME: "/",
  ABOUT: "/about/",
  ENTITY: {
    path: "/entities/:slug/",
    thunk: async (dispatch, getState) => {
      try {
        const { slug } = getState().location.payload;
        const data = await fetch(`${API_URL}/api/entity/${slug}/`);
        const entity = await data.json();
        const action = { type: "ENTITY_FOUND", payload: { entity } }; // you handle this action type

        dispatch(action);
      } catch (err) {
        console.log(err);
        dispatch({ type: "NOT_FOUND" });
      }
    },
  },
};
