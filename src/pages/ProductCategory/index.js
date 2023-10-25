import classNames from 'classnames/bind';
import styles from './ProductCategory.module.scss';
import images from '~/assets/images';
import { useEffect, useState } from 'react';
import { Editor } from 'primereact/editor';

const cx = classNames.bind(styles);

function ProductCategory() {
    const [descCategoryProduct, setDescCategoryProduct] = useState('');

    useEffect(() => {
        const $ = document.querySelector.bind(document);
        const $$ = document.querySelectorAll.bind(document);

        function initJsToggle() {
            $$('.js-toggle').forEach((button) => {
                const target = button.getAttribute('toggle-target');
                if (!target) {
                    document.body.innerText = `Cần thêm toggle-target cho: ${button.outerHTML}`;
                }
                button.onclick = () => {
                    if (!$(target)) {
                        return (document.body.innerText = `Không tìm thấy phần tử "${target}"`);
                    }
                    const isHidden = $(target).classList.contains('hide');

                    requestAnimationFrame(() => {
                        $(target).classList.toggle('hide', !isHidden);
                        $(target).classList.toggle('show', isHidden);
                    });
                };
            });

            const links = $$('.js-dropdown-list > li > a');

            links.forEach((link) => {
                link.onclick = () => {
                    if (window.innerWidth > 991) return;
                    const item = link.closest('li');
                    item.classList.toggle('navbar-item--active');
                };
            });
        }

        initJsToggle();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('filter-suggest')}>
                <header>
                    <h3>Home</h3>
                    <img src={images.arrowRightIcon} alt="" />
                    <h3 className={cx('active')}>Product Category</h3>
                </header>

                <div className={cx('suggest-list')}>
                    <div className={cx('suggest-item')}>
                        <img className={cx('icon')} alt="" src={images.filterIcon} />
                        <span>All filters</span>
                    </div>
                    <div className={cx('suggest-item')}>
                        <img className={cx('icon')} alt="" src={images.filterIcon} />
                        <span>In-store</span>
                    </div>
                    <div className={cx('suggest-item')}>
                        <img className={cx('icon')} alt="" src={images.clockIcon} />
                        <span>Lastest</span>
                    </div>

                    <div className={cx('suggest-item')}>
                        <img className={cx('icon')} alt="" src={images.tagIcon} />
                        <span>Inavailable</span>
                    </div>
                    <div className={cx('suggest-item')}>
                        <img className={cx('icon')} alt="" src={images.starIcon} />
                        <span>Available</span>
                    </div>
                </div>
                <div className={cx('recomend-item')}>
                    <div className={cx('suggest-item')}>
                        <span>Bread Handmake</span>
                        <img className={cx('')} alt="" src={images.xBorderIcon} />
                    </div>
                    <div className={cx('suggest-item')}>
                        <span>$29 - $80</span>
                        <img className={cx('')} alt="" src={images.xBorderIcon} />
                    </div>
                    <div className={cx('suggest-item')}>
                        <span>Bread Handmake</span>
                        <img className={cx('')} alt="" src={images.xBorderIcon} />
                    </div>
                    <div className={cx('suggest-item')}>
                        <span>$29 - $80</span>
                        <img className={cx('')} alt="" src={images.xBorderIcon} />
                    </div>
                    <div className={cx('suggest-item')}>
                        <span>Bread Handmake</span>
                        <img className={cx('')} alt="" src={images.xBorderIcon} />
                    </div>
                    <div className={cx('suggest-item')}>
                        <span>$29 - $80</span>
                        <img className={cx('')} alt="" src={images.xBorderIcon} />
                    </div>
                    <button className={cx('suggest-item')}>Reset filter</button>
                </div>
            </div>
            <div className={cx('actions')}>
                <div className={cx('title')}>
                    <h4>Category Product</h4>
                    <button className={cx('js-toggle')} toggle-target="#add-category-product">
                        <img className={cx('icon')} alt="" src={images.categoryIcon} />
                        <span>New</span>
                    </button>
                </div>
                <div className={cx('form-search')}>
                    <form method="post" onSubmit={(e) => e.preventDefault()}>
                        <img className={cx('icon')} alt="" src={images.searchIncon} />
                        <input type="text" placeholder="Search category name" />
                    </form>
                </div>
            </div>
            <div className={cx('list-categoty')}>Detail Category</div>

            {/* Form add new Category Product */}
            <div id="add-category-product" className={cx('add-category-product', 'hide')}>
                <div className={cx('wrap-form')}>
                    <header>
                        <h3>Add New Category Product</h3>
                        <button className={cx('js-toggle')} toggle-target="#add-category-product">
                            <img className={cx('icon')} alt="" src={images.xIcon} />
                        </button>
                    </header>
                    <form method="post" onSubmit={(e) => e.preventDefault()}>
                        <div className={cx('form-group')}>
                            <label className={cx('form-label')}>Name*</label>
                            <input className={cx('form-input')} type="text" name="name" placeholder="Name category" />
                        </div>

                        <div className={cx('form-group')}>
                            <label className={cx('form-label')}>Description*</label>
                            <Editor
                                value={descCategoryProduct}
                                onTextChange={(e) => setDescCategoryProduct(e.htmlValue)}
                                style={{ height: '220px' }}
                            />
                        </div>

                        <div className={cx('form-buttons')}>
                            <button type="submit">Submit</button>
                            <button className={cx('js-toggle')} toggle-target="#add-category-product">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className={cx('category-product-overlay', 'js-toggle')} toggle-target="#add-category-product"></div>
        </div>
    );
}

export default ProductCategory;
