import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '~/assets/images';
import { useEffect, useState, useRef } from 'react';
import useOnClickOutside from '~/hooks/useOnclickOutside';
import { useNavigate } from 'react-router-dom';
import { Editor } from 'primereact/editor';
import { InfinitySpin } from 'react-loader-spinner';
import useAuth from '~/hooks/useAuth';
import useAxios from '~/hooks/useAxios';

const cx = classNames.bind(styles);

function Header() {
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

    const MENU = [
        {
            id: 1,
            title: 'Home',
            icon: images.homeIcon,
            to: '/',
        },
        {
            id: 2,
            title: 'Product Category',
            icon: images.categoryIcon,
            to: '/admin/product-category',
        },
        {
            id: 3,
            title: 'Product',
            icon: images.productIcon,
            to: '/admin/products',
        },

        {
            id: 4,
            title: 'Nutrition Category',
            icon: images.categoryIcon,
            to: '/',
        },
        {
            id: 5,
            title: 'Nutrition',
            icon: images.nutritionIcon,
            to: '/',
        },
        {
            id: 6,
            title: 'Order',
            icon: images.cartIcon,
            to: '/',
        },
        {
            id: 7,
            title: 'Customer',
            icon: images.userIcon,
            to: '/',
        },
        {
            id: 8,
            title: 'Category Event',
            icon: images.heartIcon,
            to: '/',
        },
        {
            id: 9,
            title: 'Event',
            icon: images.giftIcon,
            to: '/',
        },
        {
            id: 10,
            title: 'Blog',
            icon: images.blogIcon,
            to: '/',
        },
    ];

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

    const [menuActive, setMenuActive] = useState('Home');
    const refAddNew = useRef();
    const [showPopperAddNew, setShowPopperAddNew] = useState(false);
    const navigate = useNavigate();
    const [descCategoryProduct, setDescCategoryProduct] = useState('');
    const [descProduct, setDescProduct] = useState('');

    const [showOptionStatusProduct, setShowOptionStatusProduct] = useState(false);
    const refOptionStatusProduct = useRef();
    const [statusProduct, setStatusProduct] = useState(null);

    const [showOptionCategoryProduct, setShowOptionCategoryProduct] = useState(false);
    const refOptionCategoryProduct = useRef();
    const [categoryProduct, setCategoryProduct] = useState(null);

    const [loading, setLoading] = useState(false);

    const toggleShowOptionCategoryProduct = () => {
        setShowOptionCategoryProduct(!showOptionCategoryProduct);
    };

    const toggleShowOptionStatusProduct = () => {
        setShowOptionStatusProduct(!showOptionStatusProduct);
    };

    const toggleShowPopperAdNew = () => {
        setShowPopperAddNew(!showPopperAddNew);
    };
    const hiddenPopperAddNew = () => {
        setShowPopperAddNew(false);
    };

    const hiddenOptionStatusPorduct = () => {
        setShowOptionStatusProduct(false);
    };

    const hiddenOptionCategoryProduct = () => {
        setShowOptionCategoryProduct(false);
    };

    useOnClickOutside(refAddNew, hiddenPopperAddNew);
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

    const axios = useAxios();
    const { setAuth } = useAuth();

    const handleLogout = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('/api/auth/logout', {
                withCredentials: true,
            });
            console.log(response.data);
            if (response.data) {
                setAuth({});

                setLoading(false);
                navigate('/');
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    return (
        <>
            <div className={cx('header-container')}>
                <div className={cx('header-inner')}>
                    <div className={cx('left')}>
                        <button className={cx('navbar', 'js-toggle')} toggle-target="#navbar">
                            <img className={cx('icon')} alt="" src={images.menuIcon} />
                        </button>
                        <img className={cx('logo')} alt="" src={images.logo} />
                        <div className={cx('breadcrumbs')}>
                            <span>vuthithaogiang</span>
                            <span className={cx('separate')}>/</span>
                            <span className={cx('active')}>{menuActive}</span>
                        </div>
                    </div>

                    {/* Navbar Common */}
                    <div id="navbar" className={cx('navbar-menu', 'hide')}>
                        <div className={cx('navbar-menu-top')}>
                            <img className={cx('avatar')} alt="" src={images.avatarDefault} />
                            <span className={cx('close-btn')}>
                                <img
                                    toggle-target="#navbar"
                                    className={cx('icon', 'js-toggle')}
                                    alt=""
                                    src={images.xIcon}
                                />
                            </span>
                        </div>
                        <div className={cx('inner-menu')}>
                            <div className={cx('menu-items')}>
                                {MENU.map((item) => (
                                    <div
                                        className={
                                            menuActive === item.title ? cx('menu-item', 'active') : cx('menu-item')
                                        }
                                        onClick={() => {
                                            setMenuActive(item.title);
                                            navigate(item.to);
                                        }}
                                    >
                                        <button>
                                            <img className={cx('icon')} alt="" src={item.icon} />
                                            <span>{item.title}</span>
                                        </button>
                                    </div>
                                ))}
                                <div className={cx('separate')}></div>

                                <div className={cx('recent-view')}>
                                    <span className={cx('heading')}>Recent view</span>
                                    <div className={cx('wrap-recent-items')}>
                                        <div className={cx('recent-item')}>
                                            <span>Bread Handmake</span>
                                            <img className={cx('')} alt="" src={images.xBorderIcon} />
                                        </div>
                                        <div className={cx('recent-item')}>
                                            <span>$29 - $80</span>
                                            <img className={cx('')} alt="" src={images.xBorderIcon} />
                                        </div>
                                        <div className={cx('recent-item')}>
                                            <span>Bread Handmake</span>
                                            <img className={cx('')} alt="" src={images.xBorderIcon} />
                                        </div>
                                        <div className={cx('recent-item')}>
                                            <span>$29 - $80</span>
                                            <img className={cx('')} alt="" src={images.xBorderIcon} />
                                        </div>

                                        <div className={cx('recent-item')}>
                                            <span>$29 - $80</span>
                                            <img className={cx('')} alt="" src={images.xBorderIcon} />
                                        </div>
                                    </div>
                                    <span className={cx('action')}>Show more</span>
                                </div>

                                <div className={cx('separate')}></div>
                                <div
                                    onClick={() => setMenuActive('Trash')}
                                    className={menuActive === 'Trash' ? cx('menu-item', 'active') : cx('menu-item')}
                                >
                                    <button>
                                        <img className={cx('icon')} alt="" src={images.trashIcon} />
                                        <span>Trash</span>
                                    </button>
                                </div>
                                <div
                                    className={
                                        menuActive === 'Help & Information'
                                            ? cx('menu-item', 'active')
                                            : cx('menu-item')
                                    }
                                    onClick={() => setMenuActive('Help & Information')}
                                >
                                    <button>
                                        <img className={cx('icon')} alt="" src={images.helpIcon} />
                                        <span>Help & Information</span>
                                    </button>
                                </div>
                                <div className={cx('menu-item')}>
                                    <form onSubmit={handleLogout}>
                                        <button type="submit">
                                            <img className={cx('icon')} alt="" src={images.logoutIcon} />
                                            <span>Logout</span>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('navbar-overlay', 'js-toggle')} toggle-target="#navbar"></div>

                    <div className={cx('right')}>
                        {/* Search */}
                        <div className={cx('search')}>
                            <label htmlFor="search">
                                <img className={cx('icon')} alt="" src={images.searchIncon} />
                            </label>
                            <input type="text" id="search" placeholder="Typing to search" />
                        </div>
                        <div className={cx('separate')}></div>

                        {/* Add More */}
                        <div ref={refAddNew} onClick={toggleShowPopperAdNew} className={cx('wrap-button')}>
                            <div className={cx('add-more')}>
                                <span>
                                    <img className={cx('icon')} alt="" src={images.addIcon} />
                                </span>
                                <span>
                                    <img className={cx('icon')} alt="" src={images.arrowDownIcon} />
                                </span>
                            </div>

                            <div
                                className={
                                    showPopperAddNew === true ? cx('popper-add-new') : cx('popper-add-new', 'none')
                                }
                            >
                                <img className={cx('arrow-up')} alt="" src={images.arrowUp} />
                                <div className={cx('popper-list')}>
                                    {/* Add new category product */}
                                    <button
                                        className={cx('popper-item', 'js-toggle')}
                                        toggle-target="#add-category-product"
                                    >
                                        <img className={cx('icon')} alt="" src={images.categoryIcon} />
                                        <span>New Category - Product</span>
                                    </button>
                                    {/* Add new Product */}
                                    <button className={cx('popper-item', 'js-toggle')} toggle-target="#add-product">
                                        <img className={cx('icon')} alt="" src={images.productIcon} />
                                        <span>New Product</span>
                                    </button>
                                    <div className={cx('separate')}></div>
                                    {/* Add new Category Nutrition */}
                                    <button
                                        className={cx('popper-item', 'js-toggle')}
                                        toggle-target="#add-category-nutrition"
                                    >
                                        <img className={cx('icon')} alt="" src={images.categoryIcon} />
                                        <span>New Category - Nutrition</span>
                                    </button>
                                    {/* Add new Nutrition */}
                                    <button className={cx('popper-item', 'js-toggle')} toggle-target="#add-nutrition">
                                        <img className={cx('icon')} alt="" src={images.nutritionIcon} />
                                        <span>New Nutrition</span>
                                    </button>

                                    <div className={cx('separate')}></div>
                                    {/* Add new Category event */}
                                    <button
                                        className={cx('popper-item', 'js-toggle')}
                                        toggle-target="#add-category-event"
                                    >
                                        <img className={cx('icon')} alt="" src={images.categoryIcon} />
                                        <span>New Category - Event</span>
                                    </button>
                                    {/* Add new Event */}
                                    <button className={cx('popper-item', 'js-toggle')} toggle-target="#add-event">
                                        <img className={cx('icon')} alt="" src={images.heartIcon} />
                                        <span>New Event</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Notification */}

                        <button className={cx('notification', 'js-toggle')} toggle-target="#popper-notification">
                            <img className={cx('icon')} alt="" src={images.bellIcon} />
                        </button>

                        {/* Avatar */}
                        <div className={cx('avatar')}>
                            <figure>
                                <img className={cx('avatar-img')} alt="" src={images.avatarDefault} />
                            </figure>
                        </div>

                        {/* Notiification*/}

                        <div id="popper-notification" className={cx('popper-notofication', 'hide')}>
                            <div className={cx('notification-top')}>
                                <div className={cx('wrap-user-info')}>
                                    <img className={cx('avatar')} alt="" src={images.avatarDefault} />
                                    <span>vuthithaogiang</span>
                                </div>
                                <button className={cx('close-btn', 'js-toggle')} toggle-target="#popper-notification">
                                    <img className={cx('icon')} alt="" src={images.xIcon} />
                                </button>
                            </div>
                            <div className={cx('inner-notification')}>
                                <header>
                                    <img className={cx('icon')} alt="" src={images.bellIcon} />
                                    <span>Notification</span>
                                </header>
                                <span className={cx('alert')}>No notification current</span>
                            </div>
                        </div>

                        <div className={cx('popper-overlay', 'js-toggle')} toggle-target="#popper-notification"></div>

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
                                        <input
                                            className={cx('form-input')}
                                            type="text"
                                            name="name"
                                            placeholder="Name category"
                                        />
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
                        <div
                            className={cx('category-product-overlay', 'js-toggle')}
                            toggle-target="#add-category-product"
                        ></div>

                        {/* Form ad new Product */}
                        <div id="add-product" className={cx('add-product', 'hide')}>
                            <div className={cx('wrap-inner')}>
                                <header>
                                    <h3>Add new Product</h3>
                                    <button className={cx('js-toggle')} toggle-target="#add-product">
                                        <img className={cx('icon')} alt="" src={images.xIcon} />
                                    </button>
                                </header>
                                <div className={cx('content')}>
                                    <form method="post" onSubmit={(e) => e.preventDefault()}>
                                        <div className={cx('form-group')}>
                                            <label className={cx('form-label')}>Name</label>
                                            <input
                                                type="text"
                                                className={cx('form-input')}
                                                placeholder="Name product"
                                            />
                                        </div>
                                        <div className={cx('form-group')}>
                                            <label className={cx('form-label')}>Brand</label>
                                            <input
                                                type="text"
                                                className={cx('form-input')}
                                                placeholder="Belong to Brand"
                                            />
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
                                                        <span>
                                                            {statusProduct === null ? 'Select Status' : statusProduct}
                                                        </span>
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
                                                            {categoryProduct === null
                                                                ? 'Select Category'
                                                                : categoryProduct}
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
                                                        previewThumb === null
                                                            ? cx('file-thumb')
                                                            : cx('file-thumb', 'not-border')
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
                                                        <img
                                                            className={cx('preview-img')}
                                                            alt=""
                                                            src={previewThumbSecond}
                                                        />
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
                                                        <img
                                                            className={cx('preview-img')}
                                                            alt=""
                                                            src={previewThumbThird}
                                                        />
                                                    )}
                                                </label>
                                            </div>
                                        </div>

                                        <div className={cx('form-buttons')}>
                                            <button type="submit">Submit</button>
                                            <button className={cx('js-toggle')} toggle-target="#add-product">
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className={cx('product-overlay', 'js-toggle')} toggle-target="#add-product"></div>

                        {/* Form add new Categoty Nutrition */}
                        <div id="add-category-nutrition" className={cx('add-category-nutrition', 'hide')}>
                            <div className={cx('wrap-inner')}>
                                <header>
                                    <h3>Add new Category Nutrition</h3>
                                    <button className={cx('js-toggle')} toggle-target="#add-category-nutrition">
                                        <img className={cx('icon')} alt="" src={images.xIcon} />
                                    </button>
                                </header>
                            </div>
                        </div>
                        <div
                            className={cx('category-nutrition-overlay', 'js-toggle')}
                            toggle-target="#add-category-nutrition"
                        ></div>

                        {/* Form add new  Nutrition */}
                        <div id="add-nutrition" className={cx('add-nutrition', 'hide')}>
                            <div className={cx('wrap-inner')}>
                                <header>
                                    <h3>Add new Category Nutrition</h3>
                                    <button className={cx('js-toggle')} toggle-target="#add-nutrition">
                                        <img className={cx('icon')} alt="" src={images.xIcon} />
                                    </button>
                                </header>
                            </div>
                        </div>
                        <div className={cx('nutrition-overlay', 'js-toggle')} toggle-target="#add-nutrition"></div>

                        {/* Form add new Categoty Event */}
                        <div id="add-category-event" className={cx('add-category-event', 'hide')}>
                            <div className={cx('wrap-inner')}>
                                <header>
                                    <h3>Add new Category Nutrition</h3>
                                    <button className={cx('js-toggle')} toggle-target="#add-category-event">
                                        <img className={cx('icon')} alt="" src={images.xIcon} />
                                    </button>
                                </header>
                            </div>
                        </div>
                        <div
                            className={cx('category-event-overlay', 'js-toggle')}
                            toggle-target="#add-category-event"
                        ></div>

                        {/* Form add new  Event */}
                        <div id="add-event" className={cx('add-event', 'hide')}>
                            <div className={cx('wrap-inner')}>
                                <header>
                                    <h3>Add new Event</h3>
                                    <button className={cx('js-toggle')} toggle-target="#add-event">
                                        <img className={cx('icon')} alt="" src={images.xIcon} />
                                    </button>
                                </header>
                            </div>
                        </div>
                        <div className={cx('event-overlay', 'js-toggle')} toggle-target="#add-event"></div>
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
        </>
    );
}

export default Header;
