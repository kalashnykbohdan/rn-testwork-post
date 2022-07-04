import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import auth from "./../../firebase/config";
import { authSlice } from "./aurhReaducer";
import { useSelector, useDispatch } from "react-redux";

const { authStateChange, updateUserPtofile, authSihnOut, preLoading, isModal } =
  authSlice.actions;

const authSignUpUser =
  (name, email, password) => async (dispatch, getStatte) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: name,
      });

      const { uid, displayName } = await auth.currentUser;

      const userUpdateProfile = {
        name: displayName,
        userId: uid,
      };

      dispatch(updateUserPtofile(userUpdateProfile));
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };
const authSignInUser = (email, password) => async (dispatch, getStatte) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    dispatch(updateUserPtofile({ userId: user.uid }));
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
};
const authSignOutUser = () => async (dispatch, getStatte) => {
  console.log("authSignOutUser", authSignOutUser);
  await signOut(auth);
  dispatch(authSihnOut());
};

const authStateChangeUser = () => async (dispatch, getStatte) => {
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      const userUpdateProfile = {
        name: user.displayName,
        email: user.email,
        userId: user.uid,
      };

      dispatch(authStateChange({ stateChange: true }));
      dispatch(updateUserPtofile(userUpdateProfile));
    } else {
    }
    dispatch(preLoading({ preloading: false }));
  });
};

const changeIsModal = (val) => async (dispatch, getStatte) => {
  dispatch(isModal({ modal: val }));
};

export {
  authSignInUser,
  authSignUpUser,
  authSignOutUser,
  authStateChangeUser,
  changeIsModal,
};
