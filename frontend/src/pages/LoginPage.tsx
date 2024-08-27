import React, { useState } from 'react';
import { useLoginUserMutation } from '../store/apiSlice';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../store';
import Header from '../components/NavBar';
import { Link } from 'react-router-dom';
const LoginPage: React.FC = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '', form: '' });
  const [loginUser] = useLoginUserMutation();
  const dispatch=useDispatch()
  const validateForm = () => {
    const newErrors = { email: '', password: '', form: '' };
    let isValid = true;

    if (!email) {
      newErrors.email = 'email is required';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await loginUser({ email, password }).unwrap();
        console.log(response)
        if('message' in response){
          setErrors(prev => ({ ...prev, form: response.message }));
          return
        }
        const { token, user } = response;
        dispatch(setUserInfo(user))
      } catch (err:any) {
        setErrors(prev => ({ ...prev, form: err?.data?.message || 'Login Failed' }));
      }
    }
  };

  return (
    <section
      className="text-center position-relative"
      style={{
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      <Header/>
      <div
        style={{
          backgroundImage: 'url(/leaves.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
      ></div>

     
      <div
        style={{
          backgroundImage: 'url(/drops.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'top',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '400px',
          zIndex: 2,
        }}
      ></div>

      
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: '100vh',
          position: 'relative',
          zIndex: 3,
        }}
      >
        <div
          className="card mx-2 mx-md-3 shadow-5-strong bg-body-tertiary bg-transparent"
          style={{
            backdropFilter: 'blur(30px)',
            display: 'flex',
            flexDirection: 'row',
            borderRadius: '15px',
            width: '100%',
            maxWidth: '800px',

          }}
        >
          <div
            className="card-image"
            style={{
              flex: 1,
              backgroundImage: 'url(/login.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'bottom',
              borderTopLeftRadius: '15px',
              borderBottomLeftRadius: '15px',
              height: '400px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          ></div>

          <div
            className="card-body"
            style={{
              flex: 1,
              padding: '2rem',
            }}
          >
            <h2 className="fw-bold mb-5">Login now</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-outline mb-4">
                <input
                  type="email"
                  className="form-control custom-input"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    color: 'white',
                  }}
                />
                {errors.email && <div className="text-danger">{errors.email}</div>}
              </div>

              <div className="form-outline mb-4">
                <input
                  type="password"
                  className="form-control custom-input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    color: 'white',
                  }}
                />
                {errors.password && <div className="text-danger">{errors.password}</div>}
              </div>

              <button type="submit" className="btn  btn-block mb-4" style={{backgroundColor: 'rgb(31 41 55)',color:'white'}}>
                Log In
              </button>
              {errors.form && <div className="text-danger mt-3">{errors.form}</div>}
              <div className="mt-3">
                  <span className="text-white">Do not have an account? </span>
                  <Link
                    to="/register"
                    className="text-decoration-underline"
                    style={{ color: "white" }}
                  >
                    Register
                  </Link>
                </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
