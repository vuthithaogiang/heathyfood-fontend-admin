import classNames from 'classnames/bind';
import styles from './Notification.module.scss';
import { useRef, useEffect } from 'react';
import useOnClickOutside from '~/hooks/useOnclickOutside';
const cx = classNames.bind(styles);

function Notification({ message, className, show, toggleTarget, setShow, confirm }) {
    const ref = useRef();

    useEffect(() => {
        if (show) {
            // Show the toast immediately
            setShow(true);

            // Set a timeout to hide the toast after 3 seconds (3000 milliseconds)
            const timer = setTimeout(() => {
                setShow(false);
            }, 5000);

            return () => {
                clearTimeout(timer);
            };
        }
        // eslint-disable-next-line
    }, [show]);

    const hidden = () => {
        setShow(false);
    };

    useOnClickOutside(ref, hidden);

    return (
        <div
            ref={ref}
            toggle-target={toggleTarget}
            className={show === true ? cx('toast', 'show', className) : cx('toast', className)}
        >
            <div className={cx('title')}>
                <p>{message}</p>
            </div>
            <div className={cx('separate')}></div>
            <div className={cx('action')}>
                <button onClick={() => setShow(false)}>
                    <span>OK</span>
                </button>
            </div>
        </div>
    );
}

export default Notification;
