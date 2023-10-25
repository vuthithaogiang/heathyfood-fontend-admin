import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import images from '~/assets/images';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import useOnClickOutside from '~/hooks/useOnclickOutside';
import useAuth from '~/hooks/useAuth';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

function Login() {
    const http = axios.create({
        baseURL: 'http://localhost:8000',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
        },
        withCredentials: true,
    });

    const { setAuth } = useAuth();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await http.post('/api/auth/login', {
                email: email,
                password: password,
            });
            console.log(response.data);
            const access_token = response?.data?.access_token;

            if (response?.data?.user?.role !== 1) {
                setErrorMessage('Unauthorized.');
                setLoginSuccess(false);
                setLoading(false);
                return;
            }
            const data = {
                access_token: access_token,
                role: 'ADMIN',
            };

            setAuth(data);
            setErrorMessage(null);
            setModal(true);
            setLoginSuccess(true);
            setLoading(false);
        } catch (error) {
            if (error.response?.status === 403) {
                setErrorMessage('Email or Password not true');
            } else if (error.response?.status === 400) {
                setErrorMessage('Your email not activate. Please check again.');
            } else {
                setErrorMessage('Log in Failed!');
            }

            setLoginSuccess(false);
            setLoading(false);
        }
    };

    //Modal
    const refModal = useRef();
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };
    if (modal) {
        document.body.classList.add('active-modal');
    } else {
        document.body.classList.remove('active-modal');
    }
    useOnClickOutside(refModal, toggleModal);

    //End Modal

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <div className={cx('header')}>
                        <img onClick={() => navigate('/')} className={cx('logo')} alt="" src={images.logo} />
                        <h4>Sign in to Healthy Food</h4>
                    </div>

                    <div className={cx('form')}>
                        <p className={errorMessage === null ? cx('error', 'none') : cx('error')}>
                            Email or Password not true.
                        </p>
                        <form onSubmit={handleSubmit}>
                            <div className={cx('form-group')}>
                                <div className={cx('form-label')}>
                                    <label htmlFor="email">Email address</label>
                                </div>
                                <div className={cx('form-input')}>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email"
                                    />
                                </div>
                            </div>

                            <div className={cx('form-group')}>
                                <div className={cx('form-label')}>
                                    <label htmlFor="password">Password</label>
                                    <span>Forgot password?</span>
                                </div>
                                <div className={cx('form-input')}>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className={cx('form-group')}>
                                <button type="submit">Sign in</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {loading && (
                <div className={cx('modal')}>
                    <div className={cx('overlay')}></div>
                    <div className={cx('wrap-loading')}>
                        <InfinitySpin width="160" color="#fff" />
                    </div>
                </div>
            )}

            {modal && loginSuccess && (
                <div className={cx('modal')}>
                    <div className={cx('overlay')} onClick={toggleModal}></div>
                    <div className={cx('modal-content')}>
                        <div className={cx('modal-content-inner')}>
                            <header>
                                <h2 className={cx('modal-heading')}>Login Successfully</h2>
                                <span className={cx('icon')} onClick={toggleModal}>
                                    x
                                </span>
                            </header>
                            <p className={cx('modal-desc')}>You're welcome for Login with our system.</p>
                            <button className={cx('modal-btn')} onClick={() => navigate(from, { replace: true })}>
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Login;
