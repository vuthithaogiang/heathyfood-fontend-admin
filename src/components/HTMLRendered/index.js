import classNames from 'classnames/bind';
import styles from './HTMLREndered.module.scss';

const cx = classNames.bind(styles);

function HTMLREndered({ htmlString }) {
    return (
        <div className={cx('text-value')}>
            <div dangerouslySetInnerHTML={{ __html: htmlString }} />
        </div>
    );
}

export default HTMLREndered;
