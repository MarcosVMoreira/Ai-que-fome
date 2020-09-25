import * as actionTypes from './actionTypes';
import axios from '../../Axios';

const authEndpoint = 'localhost:8080/login';

export const authEmailStart = () => ({
  type: actionTypes.AUTH_EMAIL_START,
});

export const authEmailSuccess = payload => ({
  type: actionTypes.AUTH_EMAIL_SUCCESS,
  payload,
});

export const authEmailFail = payload => ({
  type: actionTypes.AUTH_EMAIL_FAIL,
  payload,
});

export const authEmail = payload => {
  return dispatch => {
    dispatch(authEmailStart());

    const authEmailData = {
      email: payload.email,
      password: '12345',
    };

    axios
      .post('', authEmailData)
      .then(res => {
        console.log(res);
        dispatch(authEmailSuccess(res.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(authEmailFail({ error: err }));
      });
  };
};

// export const authCheckState = () => {
//   return dispatch => {
//     const token = localStorage.getItem('token');

//     if (!token) {
//       dispatch(authLogout());
//     } else {
//       const expirationDate = new Date(localStorage.getItem('expirationDate'));

//       if (expirationDate > new Date()) {
//         const userId = localStorage.getItem('userId');
//         const remainingTime =
//           (expirationDate.getTime() - new Date().getTime()) / 1000;

//         dispatch(authSuccess({ idToken: token, localId: userId }));
//         dispatch(authTimeout({ expiresIn: remainingTime }));
//       } else {
//         dispatch(authLogout());
//       }
//     }
//   };
// };
