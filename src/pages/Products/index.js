import classNames from 'classnames/bind';
import styles from './Products.module.scss';
import images from '~/assets/images';
import { Editor } from 'primereact/editor';
import { useEffect, useState, useRef } from 'react';
import useOnClickOutside from '~/hooks/useOnclickOutside';

const cx = classNames.bind(styles);

function Products() {
    const FAKE_CATEGORIES_PRODUCT = [
        {
            id: 1,
            name: 'Vegetables',
        },
        {
            id: 2,
            name: 'Fast Food',
        },
        {
            id: 3,
            name: 'Snacks',
        },
    ];

    const FAKE_STATUS_PRODUCT = ['New Arrival', 'Upcoming', 'Invaiable', 'Sold Out', 'Vailable', 'Best Seller'];

    const [descProduct, setDescProduct] = useState('');

    const [showOptionStatusProduct, setShowOptionStatusProduct] = useState(false);
    const refOptionStatusProduct = useRef();
    const [statusProduct, setStatusProduct] = useState(null);

    const [showOptionCategoryProduct, setShowOptionCategoryProduct] = useState(false);
    const refOptionCategoryProduct = useRef();
    const [categoryProduct, setCategoryProduct] = useState(null);

    const toggleShowOptionCategoryProduct = () => {
        setShowOptionCategoryProduct(!showOptionCategoryProduct);
    };

    const toggleShowOptionStatusProduct = () => {
        setShowOptionStatusProduct(!showOptionStatusProduct);
    };

    const hiddenOptionStatusPorduct = () => {
        setShowOptionStatusProduct(false);
    };

    const hiddenOptionCategoryProduct = () => {
        setShowOptionCategoryProduct(false);
    };

    useOnClickOutside(refOptionStatusProduct, hiddenOptionStatusPorduct);
    useOnClickOutside(refOptionCategoryProduct, hiddenOptionCategoryProduct);

    // thumb 1
    const [previewThumb, setPreviewThumb] = useState(null);
    const handlePreviewAvatar = (e) => {
        const file = e.target.files[0];

        file.preview = URL.createObjectURL(file);
        setPreviewThumb(file.preview);
    };

    useEffect(() => {
        //clean up
        return () => {
            URL.revokeObjectURL(previewThumb);
        };
    }, [previewThumb]);

    //thumb 2
    const [previewThumbSecond, setPreviewThumbSecond] = useState(null);
    const handlePreviewThumbSecond = (e) => {
        const file = e.target.files[0];

        file.preview = URL.createObjectURL(file);
        setPreviewThumbSecond(file.preview);
    };

    useEffect(() => {
        //clean up
        return () => {
            URL.revokeObjectURL(previewThumbSecond);
        };
    }, [previewThumbSecond]);

    //thumb 3
    const [previewThumbThird, setPreviewThumbThird] = useState(null);
    const handlePreviewThumbThird = (e) => {
        const file = e.target.files[0];

        file.preview = URL.createObjectURL(file);
        setPreviewThumbThird(file.preview);
    };

    useEffect(() => {
        //clean up
        return () => {
            URL.revokeObjectURL(previewThumbThird);
        };
    }, [previewThumbThird]);

    function clearAllFile() {
        setPreviewThumb(null);
        setPreviewThumbSecond(null);
        setPreviewThumbThird(null);
    }

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
                    <h4>Product</h4>
                    <button className={cx('js-toggle')} toggle-target="#add-product-form">
                        <img className={cx('icon')} alt="" src={images.categoryIcon} />
                        <span>New</span>
                    </button>
                </div>
                <div className={cx('form-search')}>
                    <form method="post" onSubmit={(e) => e.preventDefault()}>
                        <button type="submit">
                            <img className={cx('icon')} alt="" src={images.searchIncon} />
                        </button>

                        <input type="text" placeholder="Search category name" />
                    </form>
                </div>
            </div>
            <div className={cx('list-product')}>Detail Product</div>

            {/* Form New Product */}
            <div id="add-product-form" className={cx('add-product', 'hide')}>
                <div className={cx('wrap-inner')}>
                    <header>
                        <h3>Add new Product</h3>
                        <button className={cx('js-toggle')} toggle-target="#add-product-form">
                            <img className={cx('icon')} alt="" src={images.xIcon} />
                        </button>
                    </header>
                    <div className={cx('content')}>
                        <form method="post" onSubmit={(e) => e.preventDefault()}>
                            <div className={cx('form-group')}>
                                <label className={cx('form-label')}>Name</label>
                                <input type="text" className={cx('form-input')} placeholder="Name product" />
                            </div>
                            <div className={cx('form-group')}>
                                <label className={cx('form-label')}>Brand</label>
                                <input type="text" className={cx('form-input')} placeholder="Belong to Brand" />
                            </div>
                            <div className={cx('form-group')}>
                                <label className={cx('form-label')}>Description</label>
                                <Editor
                                    value={descProduct}
                                    onTextChange={(e) => setDescProduct(e.htmlValue)}
                                    style={{ height: '220px' }}
                                />
                            </div>

                            <div className={cx('form-row')}>
                                <div className={cx('form-group')}>
                                    <label className={cx('form-label')}>Quantity</label>
                                    <input type="text" className={cx('form-input')} placeholder="10" />
                                </div>
                                <div className={cx('form-group')}>
                                    <label className={cx('form-label')}>Price</label>
                                    <input type="text" className={cx('form-input')} placeholder="$12" />
                                </div>
                            </div>

                            <div className={cx('form-row')}>
                                <div className={cx('form-status-product')}>
                                    <div
                                        onClick={toggleShowOptionStatusProduct}
                                        ref={refOptionStatusProduct}
                                        className={cx('form-group', 'product')}
                                    >
                                        <label className={cx('form-label')}>Status</label>
                                        <div className={cx('wrap-select')}>
                                            <span>{statusProduct === null ? 'Select Status' : statusProduct}</span>
                                            <img
                                                className={
                                                    showOptionStatusProduct === true
                                                        ? cx('icon', 'icon-rotate')
                                                        : cx('icon')
                                                }
                                                alt=""
                                                src={images.arrowIcon}
                                            />
                                        </div>
                                        <div
                                            className={
                                                showOptionStatusProduct === true
                                                    ? cx('wrap-options')
                                                    : cx('wrap-options', 'none')
                                            }
                                        >
                                            {FAKE_STATUS_PRODUCT.map((item) => (
                                                <div
                                                    onClick={() => setStatusProduct(item)}
                                                    className={cx('option')}
                                                    key={item}
                                                >
                                                    <span>{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className={cx('form-category-product')}>
                                    <div
                                        ref={refOptionCategoryProduct}
                                        onClick={toggleShowOptionCategoryProduct}
                                        className={cx('form-group', 'product')}
                                    >
                                        <label className={cx('form-label')}>Belong To Category</label>
                                        <div className={cx('wrap-select')}>
                                            <span>
                                                {categoryProduct === null ? 'Select Category' : categoryProduct}
                                            </span>
                                            <img
                                                className={
                                                    showOptionCategoryProduct === true
                                                        ? cx('icon', 'icon-rotate')
                                                        : cx('icon')
                                                }
                                                alt=""
                                                src={images.arrowIcon}
                                            />
                                        </div>
                                        <div
                                            className={
                                                showOptionCategoryProduct === true
                                                    ? cx('wrap-options')
                                                    : cx('wrap-options', 'none')
                                            }
                                        >
                                            {FAKE_CATEGORIES_PRODUCT.map((item, index) => (
                                                <div
                                                    onClick={() => setCategoryProduct(item.name)}
                                                    className={cx('option')}
                                                    key={index}
                                                >
                                                    <span>{item.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={cx('form-row-upload')}>
                                <div className={cx('form-label-row')}>
                                    <label className={cx('form-label')}>
                                        Upload Thumbnail
                                        <span className={cx('note')}>*can upload min 1 & max 3</span>
                                    </label>

                                    <button onClick={() => clearAllFile()}>
                                        <img className={cx('icon')} alt="" src={images.cleanIcon} />
                                        Clear
                                    </button>
                                </div>
                                <div className={cx('container-files')}>
                                    {/* Thumb 1 */}
                                    <input
                                        type="file"
                                        id="previewOne"
                                        onChange={handlePreviewAvatar}
                                        name="previewOne"
                                        hidden
                                    />
                                    <label
                                        htmlFor="previewOne"
                                        className={
                                            previewThumb === null ? cx('file-thumb') : cx('file-thumb', 'not-border')
                                        }
                                    >
                                        {previewThumb === null ? (
                                            <>
                                                <img className={cx('icon')} alt="" src={images.plusIcon} />
                                                <span>Add Thumbnail</span>
                                            </>
                                        ) : (
                                            <img className={cx('preview-img')} alt="" src={previewThumb} />
                                        )}
                                    </label>

                                    {/* Thumb 2 */}

                                    <input
                                        type="file"
                                        id="previewSecond"
                                        onChange={handlePreviewThumbSecond}
                                        name="previewSecond"
                                        hidden
                                    />

                                    <label
                                        htmlFor="previewSecond"
                                        className={
                                            previewThumbSecond === null
                                                ? cx('file-thumb')
                                                : cx('file-thumb', 'not-border')
                                        }
                                    >
                                        {previewThumbSecond === null ? (
                                            <>
                                                <img className={cx('icon')} alt="" src={images.plusIcon} />
                                                <span>Add Thumbnail</span>
                                            </>
                                        ) : (
                                            <img className={cx('preview-img')} alt="" src={previewThumbSecond} />
                                        )}
                                    </label>

                                    {/* Thumb 3 */}
                                    <input
                                        type="file"
                                        id="previewThird"
                                        onChange={handlePreviewThumbThird}
                                        name="previewThird"
                                        hidden
                                    />
                                    <label
                                        htmlFor="previewThird"
                                        className={
                                            previewThumbThird === null
                                                ? cx('file-thumb')
                                                : cx('file-thumb', 'not-border')
                                        }
                                    >
                                        {previewThumbThird === null ? (
                                            <>
                                                <img className={cx('icon')} alt="" src={images.plusIcon} />
                                                <span>Add Thumbnail</span>
                                            </>
                                        ) : (
                                            <img className={cx('preview-img')} alt="" src={previewThumbThird} />
                                        )}
                                    </label>
                                </div>
                            </div>

                            <div className={cx('form-buttons')}>
                                <button type="submit">Submit</button>
                                <span className={cx('js-toggle')} toggle-target="#add-product-form">
                                    Cancel
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className={cx('product-overlay', 'js-toggle')} toggle-target="#add-product-form"></div>
        </div>
    );
}

export default Products;
