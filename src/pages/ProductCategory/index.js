import classNames from 'classnames/bind';
import styles from './ProductCategory.module.scss';

const cx = classNames.bind(styles);

function ProductCategory() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h4>Category's Product</h4>
            </div>
            <div className={cx('filter')}></div>
            <div className={cx('list-categoty')}>Detail Category</div>
        </div>
    );
}

export default ProductCategory;
