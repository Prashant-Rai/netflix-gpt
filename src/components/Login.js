import React, { useState, useRef, useEffect } from "react";
import Header from "./Header";
import { validateFormInput } from "../utils/validate";
import { auth } from "../utils/firebase";
import {
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigateTo = useNavigate();
  const [isSignInForm, setSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user) navigateTo("/browse");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const toggleForm = () => {
    setSignInForm(!isSignInForm);
    if (errorMessage && errorMessage.indexOf("Name") >= 0) {
      setErrorMessage("");
    }
  };

  const handleFormSubmit = () => {
    const name = isSignInForm ? "" : nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const message = validateFormInput({
      name,
      email,
      password,
      isSignUp: !isSignInForm,
    });
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(name);
          updateProfile(user, {
            displayName: name,
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName }));
              navigateTo("/browse");
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              setErrorMessage(errorCode + "-" + errorMessage);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          navigateTo("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          className="bg-cover h-screen w-screen"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/4d2c5849-b306-4884-9036-6211f7ee0178/web/IN-en-20240930-TRIFECTA-perspective_1e1ca6cd-9e2d-4e9d-9e4b-ba0c2d3a0e31_small.jpg"
          alt={"logo"}
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="p-12 my-36 bg-black absolute w-3/12 mx-auto right-0 left-0 bg-opacity-80 rounded-lg text-white"
      >
        <h1 className="text-3xl font-bold mb-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={nameRef}
            type="text"
            placeholder="Name"
            className="p-2 my-2 w-full rounded-lg bg-gray-700"
          />
        )}
        <input
          ref={emailRef}
          type="text"
          placeholder="Email Address"
          className="p-2 my-2 w-full rounded-lg bg-gray-700"
        />
        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          className="p-2 my-2 w-full rounded-lg bg-gray-700"
        />
        <p className="py-2 text-red-800 font-medium">{errorMessage}</p>
        <button
          className="p-3 my-4 w-full bg-red-900 rounded-lg"
          onClick={handleFormSubmit}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        {isSignInForm ? (
          <p className="mt-4">
            New To Netflix?{" "}
            <span className="font-bold cursor-pointer" onClick={toggleForm}>
              Sign Up Now
            </span>
          </p>
        ) : (
          <p className="mt-4">
            Already a User?{" "}
            <span className="font-bold cursor-pointer" onClick={toggleForm}>
              Sign In Now
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
