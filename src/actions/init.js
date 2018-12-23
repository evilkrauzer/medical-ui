export const initApp = appProps => dispatch => {
    dispatch({ type: "INIT_APP", appProps });
};