import Header from './Header';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <div className={cx('content')}>
                <div className="container">{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
