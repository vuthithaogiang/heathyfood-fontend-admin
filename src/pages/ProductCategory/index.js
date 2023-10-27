import classNames from 'classnames/bind';
import styles from './ProductCategory.module.scss';
import images from '~/assets/images';
import { useEffect, useState } from 'react';
import { Editor } from 'primereact/editor';
import useAxios from '~/hooks/useAxios';
import { InfinitySpin } from 'react-loader-spinner';
import AlertConfimDelete from '~/components/AlertConfirmDelete';

const cx = classNames.bind(styles);

function ProductCategory() {
    const [descCategoryProduct, setDescCategoryProduct] = useState('');
    const [name, setName] = useState('');
    const axios = useAxios();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [listCategory, setListCategory] = useState(null);
    const [nameEdit, setNameEdit] = useState(null);
    const [descCategoryEdit, setDescCategoryEdit] = useState(null);
    const [errorMessageEdit, setErrorMessageEdit] = useState(null);
    const [successMessageEdit, setSuccessMessageEdit] = useState(null);
    const [categoryIdEdit, setCategoryIdEdit] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [idCategoryDelete, setIdCategoryDelete] = useState(null);
    const [infoApi, setInfoApi] = useState(null);

    // FILTER RECOMMEND ITEM
    const [orderCreatedRecommend, setOrderCreatedRecommend] = useState(false);
    const [typeOrderCreatedRecommend, setTypeOrderCreatedRecommend] = useState(null);

    const [statusRecommend, setStatusRecommend] = useState(false);
    const [typeSatusRecommend, setTypeStatusRecommend] = useState(null);

    //SORTING
    const [type, setType] = useState(null);
    const [filter, setFilter] = useState('ASC');

    const sorting = (col) => {
        setType(col);
        console.log(col);
        console.log(filter);

        if (filter === 'DESC') {
            const sorted = listCategory.sort((a, b) => (a[col] < b[col] ? 1 : -1));
            setListCategory(sorted);
            setFilter('ASC');
        }

        if (filter === 'ASC') {
            const sorted = listCategory.sort((a, b) => (a[col] > b[col] ? 1 : -1));

            setListCategory(sorted);
            setFilter('DESC');
        }
    };

    // SEARCHING
    const [searchValue, setSearchValue] = useState('');

    const handleSeachCategory = async (e) => {
        e.preventDefault();

        if (searchValue.trim() === '') {
            return;
        }
        setLoading(true);

        try {
            const response = await axios.get(`/api/category-product/search?key=${searchValue}`, {
                withCredentials: true,
            });

            if (response.data) {
                setListCategory(response.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // END

    const handleSetRecomendItemLastest = () => {
        if (orderCreatedRecommend === false) {
            setOrderCreatedRecommend(true);
        }

        setTypeOrderCreatedRecommend('desc');
    };

    const handleSetRecomendItemOldest = () => {
        if (orderCreatedRecommend === false) {
            setOrderCreatedRecommend(true);
        }

        setTypeOrderCreatedRecommend('asc');
    };

    const handleSetRecommendInactive = () => {
        if (statusRecommend === false) {
            setStatusRecommend(true);
        }

        setTypeStatusRecommend(0);
    };

    const handleSetRecommendActive = () => {
        if (statusRecommend === false) {
            setStatusRecommend(true);
        }

        setTypeStatusRecommend(1);
    };

    const clearRecomendStaus = () => {
        setTypeStatusRecommend(null);
        setStatusRecommend(false);
    };

    const clearRecommendCreatedAt = () => {
        setTypeOrderCreatedRecommend(null);
        setOrderCreatedRecommend(false);
    };

    const handleFilterCategory = async () => {
        if (orderCreatedRecommend === false && statusRecommend === false) {
            return;
        }

        setInfoApi(null);

        let url = `/api/category-product/filter?status=${typeSatusRecommend}&createdAt=${typeOrderCreatedRecommend}`;

        if (typeOrderCreatedRecommend == null) {
            url = `/api/category-product/filter?status=${typeSatusRecommend}`;
        }

        if (typeSatusRecommend == null) {
            url = `/api/category-product/filter?createdAt=${typeOrderCreatedRecommend}`;
        }

        setLoading(true);

        try {
            const response = await axios.get(url, {
                withCredentials: true,
            });

            if (response.data) {
                console.log(response.data);
                setListCategory(response.data.data);
                // clearRecomendStaus();
                // clearRecommendCreatedAt();
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    //END FILTER RECOMMEND ITEM

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

                        $(target).classList.toggle('hide', setSuccessMessage(null));
                        $(target).classList.toggle('hide', setErrorMessage(null));
                        $(target).classList.toggle('hide', setErrorMessageEdit(null));
                        $(target).classList.toggle('hide', setSuccessMessageEdit(null));
                    });
                };
            });
        }

        initJsToggle();
    }, [listCategory]);

    const fetchCategories = async () => {
        setLoading(true);

        try {
            const response = await axios.get('/api/category-product/getAll', {
                withCredentials: true,
            });

            console.log(response.data);

            if (response.data) {
                setInfoApi(response.data);
                setListCategory(response.data.data);
            }

            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories(); // eslint-disable-next-line
    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        console.log(descCategoryProduct);

        try {
            setLoading(true);
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

            fetchCategories();

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

    const handleEditForm = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            console.log(categoryIdEdit);
            console.log(nameEdit);
            console.log(descCategoryEdit);

            const response = await axios.post(
                `/api/category-product/edit/${categoryIdEdit}`,
                {
                    name: nameEdit,
                    description: descCategoryEdit,
                },
                {
                    withCredentials: true,
                },
            );

            console.log(response.data);

            setSuccessMessageEdit('Edit complete.');
            setErrorMessageEdit(null);
            fetchCategories();
            setLoading(false);
        } catch (error) {
            console.log(error);
            setErrorMessageEdit('The name has already been taken.');
            setSuccessMessageEdit(null);
            setLoading(false);
        }
    };

    const handleDeleteCategory = async () => {
        setLoading(true);

        try {
            if (idCategoryDelete !== null) {
                const response = await axios.post(`/api/category-product/destroy/${idCategoryDelete}`, {
                    withCredentials: true,
                });

                console.log(response.data);

                fetchCategories();

                setLoading(false);
            }
        } catch (error) {
            console.log(error);
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

    const handleNextPage = async () => {
        setLoading(true);

        try {
            const response = await axios.get(infoApi.next_page_url);

            console.log(response);
            setInfoApi(response.data);
            setListCategory(response.data.data);

            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    const handlePreviousPage = async () => {
        setLoading(true);

        try {
            const response = await axios.get(infoApi.prev_page_url);

            console.log(response.data);
            setInfoApi(response.data);
            setListCategory(response.data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const handleSetSatusInactive = async (category) => {
        setLoading(true);

        console.log(category.id);

        try {
            const response = await axios.post(`/api/category-product/in-available/${category.id}`, {
                withCredentials: true,
            });

            console.log(response.data.success);

            if (response.data.success === 'true') {
                fetchCategories();
            }

            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const handleSetStatusActive = async (category) => {
        setLoading(true);

        console.log(category.id);

        try {
            const response = await axios.post(`/api/category-product/restore/${category.id}`, {
                withCredentials: true,
            });

            console.log(response.data.success);

            if (response.data.success === 'true') {
                fetchCategories();
            }

            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
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
                        <div className={cx('suggest-item')} onClick={fetchCategories}>
                            <img className={cx('icon')} alt="" src={images.filterIcon} />
                            <span>All Categories</span>
                        </div>
                        <div className={cx('suggest-item')}>
                            <img className={cx('icon')} alt="" src={images.filterIcon} />
                            <span>In-store</span>
                        </div>
                        <div className={cx('suggest-item')} onClick={handleSetRecomendItemLastest}>
                            <img className={cx('icon')} alt="" src={images.clockIcon} />
                            <span>Lastest</span>
                        </div>
                        <div className={cx('suggest-item')} onClick={handleSetRecomendItemOldest}>
                            <img className={cx('icon')} alt="" src={images.clockIcon} />
                            <span>Oldest</span>
                        </div>

                        <div className={cx('suggest-item')} onClick={handleSetRecommendInactive}>
                            <img className={cx('icon')} alt="" src={images.tagIcon} />
                            <span>Inavailable</span>
                        </div>
                        <div className={cx('suggest-item')} onClick={handleSetRecommendActive}>
                            <img className={cx('icon')} alt="" src={images.starIcon} />
                            <span>Available</span>
                        </div>
                    </div>
                    <div className={cx('recomend-item')}>
                        {orderCreatedRecommend === true && typeOrderCreatedRecommend !== null && (
                            <>
                                <div className={cx('suggest-item')}>
                                    <span>{typeOrderCreatedRecommend === 'desc' && 'Lastest'}</span>
                                    <span>{typeOrderCreatedRecommend === 'asc' && 'Oldest'}</span>
                                    <img
                                        onClick={clearRecommendCreatedAt}
                                        className={cx('')}
                                        alt=""
                                        src={images.xBorderIcon}
                                    />
                                </div>
                            </>
                        )}

                        {statusRecommend === true && typeSatusRecommend !== null && (
                            <>
                                <div className={cx('suggest-item')}>
                                    <span>{typeSatusRecommend === 0 && 'Status: Inavailable'}</span>
                                    <span>{typeSatusRecommend === 1 && 'Status: Available'}</span>
                                    <img
                                        onClick={clearRecomendStaus}
                                        className={cx('')}
                                        alt=""
                                        src={images.xBorderIcon}
                                    />
                                </div>
                            </>
                        )}

                        <button
                            onClick={() => {
                                clearRecomendStaus();
                                clearRecommendCreatedAt();
                            }}
                            className={cx('suggest-item')}
                        >
                            Reset filter
                        </button>
                        <button className={cx('suggest-item')} onClick={handleFilterCategory}>
                            Go
                        </button>
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
                        <form onSubmit={handleSeachCategory}>
                            <button type="submit">
                                <img className={cx('icon')} alt="" src={images.searchIncon} />
                            </button>
                            <input
                                type="text"
                                placeholder="Search category name"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                        </form>
                    </div>
                </div>
                {infoApi ? (
                    <div className={cx('paginations')}>
                        {infoApi.prev_page_url ? (
                            <button onClick={handlePreviousPage}>
                                <img className={cx('icon')} alt="" src={images.arrowLeftIcon} /> <span>Previous</span>
                            </button>
                        ) : null}

                        {infoApi.next_page_url ? (
                            <button onClick={handleNextPage}>
                                <span>Next</span> <img className={cx('icon')} alt="" src={images.arrowRightIcon} />{' '}
                            </button>
                        ) : null}
                    </div>
                ) : null}

                <div className={cx('list-categoty')}>
                    {listCategory !== null && (
                        <div className={cx('container-table')}>
                            <div className={cx('head-table')}>
                                <div>
                                    <span onClick={() => sorting('id')}>
                                        ID{' '}
                                        <img
                                            className={
                                                type === 'id' && filter === 'DESC'
                                                    ? cx('icon', 'icon-rotate')
                                                    : cx('icon')
                                            }
                                            alt=""
                                            src={images.arrowDownIcon}
                                        />
                                    </span>
                                </div>
                                <div>
                                    <span onClick={() => sorting('name')}>
                                        Category Name{' '}
                                        <img
                                            className={
                                                type === 'name' && filter === 'DESC'
                                                    ? cx('icon', 'icon-rotate')
                                                    : cx('icon')
                                            }
                                            alt=""
                                            src={images.arrowDownIcon}
                                        />
                                    </span>
                                </div>
                                <div>
                                    <span onClick={() => sorting('slug')}>
                                        Slug{' '}
                                        <img
                                            className={
                                                type === 'slug' && filter === 'DESC'
                                                    ? cx('icon', 'icon-rotate')
                                                    : cx('icon')
                                            }
                                            alt=""
                                            src={images.arrowDownIcon}
                                        />
                                    </span>
                                </div>
                                <div>
                                    <span onClick={() => sorting('created_at')}>
                                        Created at{' '}
                                        <img
                                            className={
                                                type === 'created_at' && filter === 'DESC'
                                                    ? cx('icon', 'icon-rotate')
                                                    : cx('icon')
                                            }
                                            alt=""
                                            src={images.arrowDownIcon}
                                        />
                                    </span>
                                </div>
                                <div>
                                    <span>
                                        Description <img className={cx('icon')} alt="" src={images.arrowDownIcon} />
                                    </span>
                                </div>
                                <div>
                                    <span onClick={() => sorting('status')}>
                                        Status
                                        <img
                                            className={
                                                type === 'status' && filter === 'DESC'
                                                    ? cx('icon', 'icon-rotate')
                                                    : cx('icon')
                                            }
                                            alt=""
                                            src={images.arrowDownIcon}
                                        />
                                    </span>
                                </div>
                                <div>
                                    <span>Actions</span>
                                </div>
                            </div>

                            {listCategory.length === 0 && <span className={cx('no-data')}>No data</span>}

                            {listCategory.map((row) => (
                                <div className={cx('inner-table')} key={row.id}>
                                    <span className={cx('table-data')}>{row.id}</span>
                                    <p className={cx('table-data', 'name')}>{row.name}</p>
                                    <p className={cx('table-data')}>{row.slug}</p>
                                    <p className={cx('table-data', 'date')}>{formatDate(row.created_at)}</p>
                                    <p className={cx('desc-category-content', 'table-data', 'desc')}>
                                        {row.description}
                                    </p>
                                    <p
                                        className={
                                            row.status === 1
                                                ? cx('table-data', 'status')
                                                : cx('table-data', 'status', 'inactive')
                                        }
                                    >
                                        {row.status === 1 ? 'Avaiable' : 'Inavailable'}
                                        <button className={cx('switch-status-btn')}>
                                            {row.status === 1 ? (
                                                <img
                                                    onClick={() => handleSetSatusInactive(row)}
                                                    className={cx('icon')}
                                                    alt=""
                                                    src={images.lockIcon}
                                                />
                                            ) : (
                                                <img
                                                    onClick={() => handleSetStatusActive(row)}
                                                    className={cx('icon')}
                                                    alt=""
                                                    src={images.upgradeIcon}
                                                />
                                            )}
                                        </button>
                                    </p>
                                    <div className={cx('action-btns')}>
                                        <button
                                            className={cx('js-toggle')}
                                            toggle-target="#edit-category-product-form"
                                            onClick={() => {
                                                setCategoryIdEdit(row.id);
                                                setNameEdit(row.name);
                                                setDescCategoryEdit(row.description);
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <span className={cx('separate')}></span>
                                        <button
                                            onClick={() => {
                                                setIdCategoryDelete(row.id);
                                                setOpenModal(true);
                                            }}
                                        >
                                            Delete
                                        </button>
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
                                <span className={cx('js-toggle')} toggle-target="#add-category-product-form">
                                    Cancel
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
                <div
                    className={cx('category-product-overlay', 'js-toggle')}
                    toggle-target="#add-category-product-form"
                ></div>

                {/* Form edit Category Product */}
                <div id="edit-category-product-form" className={cx('add-category-product', 'hide')}>
                    <div className={cx('wrap-form')}>
                        <header>
                            <h3>Edit Category Product</h3>
                            <button className={cx('js-toggle')} toggle-target="#edit-category-product-form">
                                <img className={cx('icon')} alt="" src={images.xIcon} />
                            </button>
                        </header>

                        {errorMessageEdit !== null && <p className={cx('error-message')}>{errorMessageEdit}</p>}
                        {successMessageEdit !== null && <p className={cx('success-message')}>{successMessageEdit}</p>}
                        <form method="post" onSubmit={handleEditForm}>
                            <div className={cx('form-group')}>
                                <label className={cx('form-label')}>Name*</label>
                                <input
                                    value={nameEdit}
                                    onChange={(e) => setNameEdit(e.target.value)}
                                    className={cx('form-input')}
                                    type="text"
                                    name="name"
                                    placeholder="Name category"
                                />
                            </div>

                            <div className={cx('form-group')}>
                                <label className={cx('form-label')}>Description*</label>
                                <Editor
                                    value={descCategoryEdit}
                                    onTextChange={(e) => setDescCategoryEdit(e.textValue)}
                                    style={{ height: '220px' }}
                                />
                            </div>

                            <div className={cx('form-buttons')}>
                                <button
                                    disabled={nameEdit === '' || descCategoryEdit === '' ? true : false}
                                    type="submit"
                                >
                                    Submit
                                </button>
                                <span className={cx('js-toggle')} toggle-target="#edit-category-product-form">
                                    Cancel
                                </span>
                            </div>
                        </form>
                    </div>
                </div>

                <div
                    className={cx('category-product-overlay', 'js-toggle')}
                    toggle-target="#edit-category-product-form"
                ></div>
            </div>

            {loading && (
                <div className={cx('modal')}>
                    <div className={cx('overlay')}></div>
                    <div className={cx('wrap-loading')}>
                        <InfinitySpin width="160" color="#fff" />
                    </div>
                </div>
            )}

            {openModal && (
                <AlertConfimDelete
                    message={`Do you wanna delete this Category? categoryId: ${idCategoryDelete}`}
                    confirm={handleDeleteCategory}
                    show={openModal}
                    setShow={setOpenModal}
                />
            )}
        </>
    );
}

export default ProductCategory;
