import React, { useState } from 'react';
import './Login.css'
import authApi from '../../api/authApi';
import { toast } from 'react-toastify';
import jwt_decode from "jwt-decode";


function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const validate = () => {
        let errors = {};
        if (!formData.email) {
            errors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            errors.email = 'Email is invalid';
        }
        if (!formData.password) {
            errors.password = 'Password is required';
        }
        setErrors(errors);

        return Object.keys(errors).length === 0;
    }
    const handleSubmit = () => {
        if (validate()) {
            // handle login
            authApi.login({ email: formData.email, password: formData.password })
                .then((response) => {
                    var decoded = jwt_decode(response.data);
                    if (decoded.role === "ROLE_ADMIN") {
                        localStorage.setItem('token', response.data);
                        window.location = "/";
                    }
                    else {
                        toast.error("Không phải tài khoản admin", {
                            position: toast.POSITION.BOTTOM_RIGHT
                        })
                    }

                })
                .catch(err => {
                    toast.error(err.message, {
                        position: toast.POSITION.BOTTOM_RIGHT
                    })
                });
        }
        else console.log('erorr validate');
    }
    return (
        <div>
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <div className="login100-form-title">
                            <span className="login100-form-title-1">
                                Sign In
                            </span>
                        </div>
                        <form className="login100-form validate-form">
                            <div className="wrap-input100 validate-input m-b-26" data-validate="Username is required">
                                <input className="input100" type="text" name="email" placeholder="Enter username" value={formData.email} onChange={handleChange} autocomplete="nope" />
                                <span className="focus-input100" />
                            </div>
                            {errors.email && <span className="message-error">{errors.email}</span>}
                            <div className="wrap-input100 validate-input m-b-18 input-password" data-validate="Password is required">
                                <input className="input100" type={showPassword ? 'text' : 'password'} name="password" placeholder="Enter password" value={formData.password} onChange={handleChange} autocomplete="nope" />
                                {formData.password && <i className={"fa-regular eye-icon " + (showPassword ? 'fa-eye' : 'fa-eye-slash')} onClick={e => setShowPassword(!showPassword)}></i>}
                                <span className="focus-input100" />
                            </div>
                            {errors.password && <span className="message-error">{errors.password}</span>}
                            <div className="flex-sb-m w-full p-b-30">
                                <div className="contact100-form-checkbox">
                                    <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" />
                                    <label className="label-checkbox100" htmlFor="ckb1">
                                        Remember me
                                    </label>
                                </div>
                            </div>
                            <div className="container-login100-form-btn">
                                <button type='button' className="login100-form-btn" onClick={handleSubmit}>
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;