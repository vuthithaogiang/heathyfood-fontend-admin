import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '~/assets/images';
import { useEffect, useState } from 'react';

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
        },
        {
            id: 2,
            title: 'Product Category',
            icon: images.categoryIcon,
        },
        {
            id: 3,
            title: 'Product',
            icon: images.productIcon,
        },

        {
            id: 4,
            title: 'Nutrition Category',
            icon: images.categoryIcon,
        },
        {
            id: 5,
            title: 'Nutrition',
            icon: images.nutritionIcon,
        },
        {
            id: 6,
            title: 'Order',
            icon: images.cartIcon,
        },
        {
            id: 7,
            title: 'Customer',
            icon: images.userIcon,
        },
        {
            id: 8,
            title: 'Category Event',
            icon: images.heartIcon,
        },
        {
            id: 9,
            title: 'Event',
            icon: images.giftIcon,
        },
        {
            id: 10,
            title: 'Blog',
            icon: images.blogIcon,
        },
    ];

    const [menuActive, setMenuActive] = useState('Home');

    return (
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

                {/* Navbar */}
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
                                    className={menuActive === item.title ? cx('menu-item', 'active') : cx('menu-item')}
                                    onClick={() => setMenuActive(item.title)}
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
                                    menuActive === 'Help & Information' ? cx('menu-item', 'active') : cx('menu-item')
                                }
                                onClick={() => setMenuActive('Help & Information')}
                            >
                                <button>
                                    <img className={cx('icon')} alt="" src={images.helpIcon} />
                                    <span>Help & Information</span>
                                </button>
                            </div>
                            <div className={cx('menu-item')}>
                                <button>
                                    <img className={cx('icon')} alt="" src={images.logoutIcon} />
                                    <span>Logout</span>
                                </button>
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
                    <div className={cx('add-more')}>
                        <span>
                            <img className={cx('icon')} alt="" src={images.addIcon} />
                        </span>
                        <span>
                            <img className={cx('icon')} alt="" src={images.arrowDownIcon} />
                        </span>
                    </div>

                    {/* Notification */}

                    <div className={cx('notification')}>
                        <img className={cx('icon')} alt="" src={images.bellIcon} />
                    </div>

                    {/* Avatar */}
                    <div className={cx('avatar')}>
                        <figure>
                            <img className={cx('avatar-img')} alt="" src={images.avatarDefault} />
                        </figure>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
