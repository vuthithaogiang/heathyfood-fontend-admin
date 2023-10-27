import classNames from 'classnames/bind';
import styles from './AlertConfimDelete.module.scss';
import { useRef, useEffect } from 'react';
import useOnClickOutside from '~/hooks/useOnclickOutside';
const cx = classNames.bind(styles);

function AlertConfimDelete({ message, show, setShow, confirm }) {
    const ref = useRef();

    useEffect(() => {
        if (show) {
            // Show the toast immediately
            setShow(true);

            // Set a timeout to hide the toast after 3 seconds (3000 milliseconds)
            const timer = setTimeout(() => {
                setShow(false);
            }, 3000);

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
        <div ref={ref} className={show === true ? cx('toast', 'show') : cx('toast')}>
            <div className={cx('title')}>
                <p>1 row selected. {message}</p>
            </div>
            <div className={cx('separate')}></div>
            <div className={cx('action')}>
                <button onClick={confirm}>Delete</button>
                <button onClick={() => setShow(false)}>
                    <span>x</span>
                </button>
            </div>
        </div>
    );
}

export default AlertConfimDelete;
