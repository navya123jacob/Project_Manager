import React, { useEffect, useState } from "react";
import { useRegisterUserMutation } from "../store/apiSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState} from "../store";
import Header from "../components/NavBar";

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("");
  const [registerUser] = useRegisterUserMutation();
  const [errors, setErrors] = useState({
    email: "",
    fname: "",
    lname: "",
    password: "",
    mobile: "",
    gender: "",
    form: "",
  });
  const navigate = useNavigate();
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
  };

  const validateName = (name: string) => {
    if(!name.trim()){
      return false
    }
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
  };

  const validateMobile = (mobile: string) => {
    const mobileRegex = /^[1-9]{1}[0-9]{9}$/;
    return mobileRegex.test(mobile);
  };

  const validateForm = () => {
    const newErrors = {
      email: "",
      fname: "",
      lname: "",
      password: "",
      mobile: "",
      gender: "",
      form: "",
    };
    let isValid = true;

    if (!email || !validateEmail(email)) {
      newErrors.email = "Valid email is required";
      isValid = false;
    }

    if (!fname || !validateName(fname)) {
      newErrors.fname = "First name should contain only letters";
      isValid = false;
    }

    if (!lname || !validateName(lname)) {
      newErrors.lname = "Last name should contain only letters";
      isValid = false;
    }

    if (!password || !validatePassword(password)) {
      newErrors.password = "Password must be strong";
      isValid = false;
    }

    if (!mobile || !validateMobile(mobile)) {
      newErrors.mobile = "Mobile number must be 10 digits and not all zeros";
      isValid = false;
    }

    if (!gender) {
      newErrors.gender = "Please select a gender";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const response = await registerUser({
        email,
        password,
        fname,
        lname,
        mobile,
        gender,
      }).unwrap();
      
      if (response.message) {
        setErrors((prev) => ({ ...prev, form: response.message }));
        return;
      }
      navigate('/')
    } catch (err: any) {
      setErrors((prev) => ({
        ...prev,
        form: err?.data?.message || "Registration failed",
      }));
    }
  };

  return (
    <>
      <section
        className="text-center position-relative"
        style={{
          minHeight: "100vh",
          overflow: "hidden",
        }}
      >
        <Header />
        <div
          style={{
            backgroundImage: "url(/leaves.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
          }}
        ></div>

        <div
          style={{
            backgroundImage: "url(/drops.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "top",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "400px",
            zIndex: 2,
          }}
        ></div>

        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            minHeight: "100vh",
            position: "relative",
            zIndex: 3,
          }}
        >
          <div
            className="card mx-2 mx-md-3 shadow-5-strong bg-body-tertiary bg-transparent"
            style={{
              backdropFilter: "blur(30px)",
              display: "flex",
              flexDirection: "row",
              borderRadius: "15px",
              width: "100%",
              maxWidth: "800px",
            }}
          >
            <div
              className="card-image"
              style={{
                flex: 1,
                backgroundImage: "url(/Register.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "bottom",
                borderTopLeftRadius: "15px",
                borderBottomLeftRadius: "15px",
                height: "600px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></div>

            <div
              className="card-body"
              style={{
                flex: 1,
                padding: "2rem",
              }}
            >
              <h2 className="fw-bold mb-5">Register</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    className="form-control custom-input"
                    placeholder="First Name"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.3)",
                      color: "white",
                    }}
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                  />
                  {errors.fname && (
                    <div className="text-danger">{errors.fname}</div>
                  )}
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="text"
                    className="form-control custom-input"
                    placeholder="Last Name"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.3)",
                      color: "white",
                    }}
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                  />
                  {errors.lname && (
                    <div className="text-danger">{errors.lname}</div>
                  )}
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="email"
                    className="form-control custom-input"
                    placeholder="Email address"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.3)",
                      color: "white",
                    }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <div className="text-danger">{errors.email}</div>
                  )}
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    className="form-control custom-input"
                    placeholder="Password"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.3)",
                      color: "white",
                    }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && (
                    <div className="text-danger">{errors.password}</div>
                  )}
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="text"
                    className="form-control custom-input"
                    placeholder="Mobile"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.3)",
                      color: "white",
                    }}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                  {errors.mobile && (
                    <div className="text-danger">{errors.mobile}</div>
                  )}
                </div>

                <div className="form-outline mb-4">
                  <select
                    className="form-control custom-input"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.3)",
                      color: "black",
                    }}
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option value="male ">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && (
                    <div className="text-danger">{errors.gender}</div>
                  )}
                </div>

                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn "
                    style={{ backgroundColor: "rgb(31 41 55)", color: "white" }}
                  >
                    Register
                  </button>
                </div>

                {errors.form && (
                  <div className="text-danger mt-3">{errors.form}</div>
                )}
                <div className="mt-3">
                  <span className="text-white">Already have an account? </span>
                  <Link
                    to="/"
                    className="text-decoration-underline"
                    style={{ color: "white" }}
                  >
                    Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterPage;
