import React, { useState } from "react";
import IonIcon from "@reacticons/ionicons";
import userServices from "../services/UserService";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const [showPass, setShowPass] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    name: "",
  });
  const navigate = useNavigate();
  const handleChangeUserInfo = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value, 
    });
  };
  const handleSubmitUserLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await userServices.userLogin(
        userDetails.email,
        userDetails.password
      );
      var closeButton = document.getElementById("closeButton");

      // Trigger a click event on the close button
      closeButton.click();
      navigate("/search");
      console.log("User login:", user);
    } catch (error) {
      console.error("login failed:", error);
    }
  };

  const handleSubmitUserSignUp = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    try {
      const user = await userServices.signUp(
        userDetails.name,
        userDetails.email,
        userDetails.password
      );
      console.log("User signed up:", user);
      setUserDetails({ name: "", email: "", password: "" });
    } catch (error) {
      console.error("Sign-up failed:", error);
   
    }
  };

  return (
    <div>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Login
      </button>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModalsignup"
      >
        sign up
      </button>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Login
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form
                class="row g-3 needs-validation"
                novalidate
                onSubmit={handleSubmitUserLogin}
              >
                <div class="col-md-8 d-flex flex-row align-items-center">
                  <label for="validationCustom01" class="form-label me-4  mb-0">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    class="form-control"
                    id="validationCustom01"
                    value={userDetails.email}
                    onChange={handleChangeUserInfo}
                    placeholder="Email"
                    required
                  />
                  <div class="valid-feedback">Looks good!</div>
                </div>
                <div class="col-md-8 d-flex flex-row align-items-center">
                  <label for="validationCustom02" class="form-label me-4  mb-0">
                    Password
                  </label>
                  <input
                    name="password"
                    type={showPass ? "text" : "password"}
                    class="form-control me-2"
                    id="validationCustom02"
                    placeholder="Password"
                    required
                    value={userDetails.password}
                    onChange={handleChangeUserInfo}
                  />
                  <IonIcon
                    name={showPass ? "eye-outline" : "eye-off-outline"}
                    size="large"
                    onClick={() => setShowPass(!showPass)}
                  />
                  <div class="valid-feedback">Looks good!</div>
                </div>

                <div class="col-12">
                  <button class="btn btn-primary me-5" type="submit">
                    Submit form
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                    id="closeButton"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="exampleModalsignup"
        tabindex="-1"
        aria-labelledby="exampleModalsignup"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                sign up
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form
                class="row g-3 needs-validation"
                novalidate
                onSubmit={handleSubmitUserSignUp}
              >
                <div class="col-md-8 d-flex flex-row align-items-center">
                  <label for="validationCustom01" class="form-label me-4  mb-0">
                    Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    class="form-control"
                    id="validationCustom01"
                    value={userDetails.name}
                    onChange={handleChangeUserInfo}
                    placeholder="Name"
                    required
                  />
                  <div class="valid-feedback">Looks good!</div>
                </div>
                <div class="col-md-8 d-flex flex-row align-items-center">
                  <label for="validationCustom01" class="form-label me-4  mb-0">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    class="form-control"
                    id="validationCustom01"
                    value={userDetails.email}
                    onChange={handleChangeUserInfo}
                    placeholder="Email"
                    required
                  />
                  <div class="valid-feedback">Looks good!</div>
                </div>
                <div class="col-md-8 d-flex flex-row align-items-center">
                  <label for="validationCustom02" class="form-label me-4  mb-0">
                    Password
                  </label>
                  <input
                    name="password"
                    type={showPass ? "text" : "password"}
                    class="form-control me-2"
                    id="validationCustom02"
                    placeholder="Password"
                    required
                    value={userDetails.password}
                    onChange={handleChangeUserInfo}
                  />
                  <IonIcon
                    name={showPass ? "eye-outline" : "eye-off-outline"}
                    size="large"
                    onClick={() => setShowPass(!showPass)}
                  />
                  <div class="valid-feedback">Looks good!</div>
                </div>

                <div class="col-12">
                  <button class="btn btn-primary me-5" type="submit">
                    Submit form
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                    id="closeButton"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
