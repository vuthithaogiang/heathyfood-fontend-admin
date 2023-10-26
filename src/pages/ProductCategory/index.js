import classNames from 'classnames/bind';
import styles from './ProductCategory.module.scss';
import images from '~/assets/images';
import { useEffect, useState } from 'react';
import { Editor } from 'primereact/editor';
import useAxios from '~/hooks/useAxios';
import { InfinitySpin } from 'react-loader-spinner';

const cx = classNames.bind(styles);

function ProductCategory() {
    const [descCategoryProduct, setDescCategoryProduct] = useState('');
    const [name, setName] = useState('');
    const axios = useAxios();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [listCategory, setListCategory] = useState(null);

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

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);

            try {
                const response = await axios.get('/api/category-product/getAll', {
                    withCredentials: true,
                });

                console.log(response.data);

                if (response.data) {
                    setListCategory(response.data);
                }

                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };

        fetchCategories(); // eslint-disable-next-line
    }, [successMessage]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        console.log(descCategoryProduct);

        try {
            const response = await axios.post(
                '/api/category-product/store',
                {
                    name: name.trim(),
                    description: descCategoryProduct.trim(),
                },
                {
                    withCredentials: true,
                },
            );

            console.log(response.data);
            setSuccessMessage('Add new category product successfuly.');
            setErrorMessage(null);
            setLoading(false);
            setName('');
            setDescCategoryProduct('');
        } catch (error) {
            setErrorMessage('This Category has been taken.');
            setSuccessMessage(null);
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const dateObject = new Date(dateString);
        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];

        const day = dateObject.getDate(); // Get the day (1-31)
        const month = months[dateObject.getMonth()]; // Get the month as a string
        const year = dateObject.getFullYear(); // Get the year (e.g., 2023)

        const formattedDate = `${day} ${month} ${year}`; // Combine day, month, and year
        return formattedDate;
    };

    return (
        <>
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
                        <button className={cx('js-toggle')} toggle-target="#add-category-product-form">
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
                <div className={cx('list-categoty')}>
                    {listCategory !== null && (
                        <div className={cx('container-table')}>
                            <div className={cx('head-table')}>
                                <div>
                                    <span>
                                        ID <img className={cx('icon')} alt="" src={images.arrowDownIcon} />
                                    </span>
                                </div>
                                <div>
                                    <span>
                                        Category Name <img className={cx('icon')} alt="" src={images.arrowDownIcon} />
                                    </span>
                                </div>
                                <div>
                                    <span>
                                        Slug <img className={cx('icon')} alt="" src={images.arrowDownIcon} />
                                    </span>
                                </div>
                                <div>
                                    <span>
                                        Created at <img className={cx('icon')} alt="" src={images.arrowDownIcon} />
                                    </span>
                                </div>
                                <div>
                                    <span>
                                        Description <img className={cx('icon')} alt="" src={images.arrowDownIcon} />
                                    </span>
                                </div>
                                <div>
                                    <span>
                                        Status <img className={cx('icon')} alt="" src={images.arrowDownIcon} />
                                    </span>
                                </div>
                                <div>
                                    <span>Actions</span>
                                </div>
                            </div>

                            {listCategory.map((row) => (
                                <div className={cx('inner-table')} key={row.id}>
                                    <span className={cx('table-data')}>{row.id}</span>
                                    <p className={cx('table-data', 'name')}>{row.name}</p>
                                    <p className={cx('table-data')}>{row.slug}</p>
                                    <p className={cx('table-data', 'date')}>{formatDate(row.created_at)}</p>
                                    <p className={cx('desc-category-content', 'table-data', 'desc')}>
                                        {row.description}
                                    </p>
                                    <p className={cx('table-data', 'status')}>
                                        {row.status === 1 ? 'Avaiable' : 'Inavailable'}
                                        <button className={cx('switch-status-btn')}>
                                            <img className={cx('icon')} alt="" src={images.penIcon} />
                                        </button>
                                    </p>
                                    <div className={cx('action-btns')}>
                                        <button>Edit</button>
                                        <span className={cx('separate')}></span>
                                        <button>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Form add new Category Product */}
                <div id="add-category-product-form" className={cx('add-category-product', 'hide')}>
                    <div className={cx('wrap-form')}>
                        <header>
                            <h3>Add New Category Product</h3>
                            <button className={cx('js-toggle')} toggle-target="#add-category-product-form">
                                <img className={cx('icon')} alt="" src={images.xIcon} />
                            </button>
                        </header>

                        {errorMessage !== null && <p className={cx('error-message')}>{errorMessage}</p>}
                        {successMessage !== null && <p className={cx('success-message')}>{successMessage}</p>}
                        <form onSubmit={handleFormSubmit}>
                            <div className={cx('form-group')}>
                                <label className={cx('form-label')}>Name*</label>
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
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
                                    onTextChange={(e) => setDescCategoryProduct(e.textValue)}
                                    style={{ height: '220px' }}
                                />
                            </div>

                            <div className={cx('form-buttons')}>
                                <button
                                    disabled={name === '' || descCategoryProduct === '' ? true : false}
                                    type="submit"
                                >
                                    Submit
                                </button>
                                <button className={cx('js-toggle')} toggle-target="#add-category-product-form">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div
                    className={cx('category-product-overlay', 'js-toggle')}
                    toggle-target="#add-category-product-form"
                ></div>

                {/* Form edit Category Product */}
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

export default ProductCategory;
