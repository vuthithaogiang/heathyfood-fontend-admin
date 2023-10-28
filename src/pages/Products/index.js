import classNames from 'classnames/bind';
import styles from './Products.module.scss';
import images from '~/assets/images';
import { Editor } from 'primereact/editor';
import { useEffect, useState, useRef } from 'react';
import useOnClickOutside from '~/hooks/useOnclickOutside';
import useAxios from '~/hooks/useAxios';
import { InfinitySpin } from 'react-loader-spinner';
import AlertConfimDelete from '~/components/AlertConfirmDelete';
import React from 'react';

const cx = classNames.bind(styles);

const BASE_URL_IMAGE = 'http://127.0.0.1:8000/uploads/';

function Products() {
    const IN_AVAILABLE = 0; // STATEMENT
    const AVAILABLE = 1; // STATEMENT
    const UPCOMING = 2; // STATEMENT
    const NEW_ARRIVAL = 3; // STATEMENT

    // const SOLD_OUT = 4; // CALCULATE
    // const BEST_SELLER = 5; // CALCULATE
    const FAKE_STATUS_PRODUCT = [
        {
            id: IN_AVAILABLE,
            state: 'IN AVAILABLE',
        },
        {
            id: AVAILABLE,
            state: 'AVAILABLE',
        },
        {
            id: UPCOMING,
            state: 'UPCOMING',
        },
        {
            id: NEW_ARRIVAL,
            state: 'NEW ARRIVAL',
        },
    ];

    const [showOptionStatusProduct, setShowOptionStatusProduct] = useState(false);
    const refOptionStatusProduct = useRef();
    const [statusProduct, setStatusProduct] = useState(null);
    const [showOptionCategoryProduct, setShowOptionCategoryProduct] = useState(false);
    const refOptionCategoryProduct = useRef();
    const [categoryProduct, setCategoryProduct] = useState(null);

    const axios = useAxios();
    const [listProduct, setListProduct] = useState(null);
    const [categories, setCategories] = useState(null);
    const [loading, setLoading] = useState(false);

    const [openModal, setOpenModal] = useState(false);
    const [idProductDelete, setIdProductDelete] = useState(null);

    //value add new

    const [nameProduct, setNameProduct] = useState('');
    const [brand, setBrand] = useState('');
    const [descProduct, setDescProduct] = useState('');
    const [quantity, setQuantity] = useState(null);
    const [price, setPrice] = useState(null);

    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleDeleteProduct = async () => {
        try {
            const response = await axios.post(`/api/product/destroy/${idProductDelete}`, {
                withCredentials: true,
            });

            if (response.data.success === 'true') {
                setIdProductDelete(null);
                fetchProducts();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/product/get', {
                withCredentials: true,
            });

            console.log(response.data);
            setListProduct(response.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    const fetchCategories = async () => {
        setLoading(true);

        try {
            const response = await axios.get('/api/category-product/filter?status=1&createdAt=desc', {
                withCredentials: true,
            });

            console.log(response.data);

            if (response.data) {
                setCategories(response.data.data);
            }

            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(); // eslint-disable-next-line
        fetchCategories(); // eslint-disable-next-line
    }, []);

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

                        // $(target).classList.toggle('hide', setErrorMessageEdit(null));
                        // $(target).classList.toggle('hide', setSuccessMessageEdit(null));
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
    }, [listProduct]);

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

    //Handle photos

    const [selectedFiles, setSelectedFile] = useState([]);

    const handleImageChange = (e) => {
        setSelectedFile([]);
        if (e.target.files) {
            const fileArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
            setSelectedFile((prev) => prev.concat(fileArray));
            Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
        }
    };

    const renderPhotos = (source) => {
        return source.map((photo) => (
            <label className={cx('file-thumb', 'not-border')}>
                <img className={cx('preview-img')} alt="" src={photo} />
            </label>
        ));
    };

    const uploadToStoreProduct = async (e) => {
        e.preventDefault();

        console.log(e.target.length);
        //  console.log(e.target[20].files);
        console.log(e.target[19].files);

        const formData = new FormData();

        if (
            nameProduct !== '' &&
            brand !== '' &&
            descProduct !== '' &&
            categoryProduct !== null &&
            statusProduct !== null &&
            quantity !== null &&
            price !== null
        ) {
            setLoading(true);

            var files = e.target[19].files;

            for (let i = 0; i < files.length; i++) {
                formData.append('thumbs[]', files[i]);
            }

            formData.append('name', nameProduct);
            formData.append('brand', brand);
            formData.append('description', descProduct);
            formData.append('categoryId', categoryProduct.id);
            formData.append('status', statusProduct.id);
            formData.append('quantity', quantity);
            formData.append('price', price);

            try {
                const response = await axios.post('/api/product/store', formData, {
                    withCredentials: true,
                });

                console.log(response.data);

                if (response.data.success === 'true') {
                    setNameProduct('');
                    setDescProduct('');
                    setBrand('');
                    setPrice(0);
                    setQuantity(0);
                    setSelectedFile([]);
                    setCategoryProduct(null);
                    setStatusProduct(null);
                    setErrorMessage(null);
                    setSuccessMessage('Add new product done');
                    fetchProducts();
                }

                setLoading(false);
            } catch (error) {
                console.log(error);
                setSuccessMessage(null);
                setErrorMessage('The request fail. Please try again.');
                setLoading(false);
            }
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

                {categories !== null && listProduct !== null && (
                    <>
                        <div className={cx('list-product')}>
                            <div className={cx('container-table')}>
                                <div className={cx('head-table')}>
                                    <div>
                                        <span>
                                            ID
                                            <img className={cx('icon')} alt="" src={images.arrowDownIcon} />
                                        </span>
                                    </div>

                                    <div>
                                        <span>
                                            Name <img className={cx('icon')} alt="" src={images.arrowDownIcon} />
                                        </span>
                                    </div>

                                    <div>
                                        <span>Thumbnail</span>
                                    </div>

                                    <div>
                                        <span>
                                            Created at <img className={cx('icon')} alt="" src={images.arrowDownIcon} />
                                        </span>
                                    </div>

                                    <div>
                                        <span>
                                            Desctiption <img className={cx('icon')} alt="" src={images.arrowDownIcon} />
                                        </span>
                                    </div>

                                    <div>
                                        <span>
                                            Brand <img className={cx('icon')} alt="" src={images.arrowDownIcon} />
                                        </span>
                                    </div>

                                    <div>
                                        <span>
                                            Price <img className={cx('icon')} alt="" src={images.arrowDownIcon} />
                                        </span>
                                    </div>

                                    <div>
                                        <span>
                                            Quantity <img className={cx('icon')} alt="" src={images.arrowDownIcon} />
                                        </span>
                                    </div>

                                    <div>
                                        <span>
                                            Category <img className={cx('icon')} alt="" src={images.arrowDownIcon} />
                                        </span>
                                    </div>

                                    <div>
                                        <span>
                                            Status <img className={cx('icon')} alt="" src={images.arrowDownIcon} />
                                        </span>
                                    </div>

                                    <div>
                                        <span>
                                            Actions <img className={cx('icon')} alt="" src={images.arrowDownIcon} />
                                        </span>
                                    </div>
                                </div>

                                {listProduct.length === 0 && <span className={cx('no-data')}>No data</span>}

                                {listProduct.map((row) => (
                                    <div className={cx('inner-table')}>
                                        <span className={cx('table-data')}>{row.id}</span>
                                        <p className={cx('table-data', 'name')}>{row.name}</p>
                                        <figure className={cx('table-data')}>
                                            <img
                                                className={cx('thumb')}
                                                alt=""
                                                src={`${BASE_URL_IMAGE}${row.thumbnails[0].path}`}
                                            />
                                        </figure>
                                        <p className={cx('table-data', 'date')}>{formatDate(row.created_at)}</p>
                                        <p className={cx('table-data', 'desc')}>{row.description}</p>
                                        <p className={cx('table-data')}>{row.brand}</p>
                                        <p className={cx('table-data')}>${row.price}</p>
                                        <p className={cx('table-data')}>{row.quantity}</p>
                                        <p className={cx('table-data')}>{row.category.name}</p>
                                        <p className={cx('table-data')}>
                                            {row.status === 0 && 'InAvailable'}
                                            {row.status === 1 && 'Avaiable'}
                                            {row.status === 2 && 'Upcoming'}
                                            {row.status === 3 && 'New Arrival'}
                                            {row.status === 4 && 'Sold Out'}
                                            {row.status === 5 && 'Best Seller'}
                                        </p>
                                        <div className={cx('action-btns')}>
                                            <button>Edit</button>
                                            <span className={cx('separate')}></span>
                                            <button
                                                onClick={() => {
                                                    setIdProductDelete(row.id);
                                                    setOpenModal(true);
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
                {/* Form New Product */}
                {categories !== null && (
                    <>
                        <div id="add-product-form" className={cx('add-product', 'hide')}>
                            <div className={cx('wrap-inner')}>
                                <header>
                                    <h3>Add new Product</h3>
                                    <button className={cx('js-toggle')} toggle-target="#add-product-form">
                                        <img className={cx('icon')} alt="" src={images.xIcon} />
                                    </button>
                                </header>
                                <div className={cx('content')}>
                                    {errorMessage !== null && <p className={cx('error-message')}>{errorMessage}</p>}
                                    {successMessage !== null && (
                                        <p className={cx('success-message')}>{successMessage}</p>
                                    )}
                                    <form
                                        method="post"
                                        onSubmit={(e) => uploadToStoreProduct(e)}
                                        encType="multipart/form-data"
                                    >
                                        <div className={cx('form-group')}>
                                            <label className={cx('form-label')}>Name</label>
                                            <input
                                                type="text"
                                                className={cx('form-input')}
                                                placeholder="Name product"
                                                value={nameProduct}
                                                onChange={(e) => setNameProduct(e.target.value)}
                                            />
                                        </div>
                                        <div className={cx('form-group')}>
                                            <label className={cx('form-label')}>Brand</label>
                                            <input
                                                type="text"
                                                className={cx('form-input')}
                                                placeholder="Belong to Brand"
                                                value={brand}
                                                onChange={(e) => setBrand(e.target.value)}
                                            />
                                        </div>
                                        <div className={cx('form-group')}>
                                            <label className={cx('form-label')}>Description</label>
                                            <Editor
                                                value={descProduct}
                                                onTextChange={(e) => setDescProduct(e.textValue)}
                                                style={{ height: '220px' }}
                                            />
                                        </div>

                                        <div className={cx('form-row')}>
                                            <div className={cx('form-group')}>
                                                <label className={cx('form-label')}>Quantity</label>
                                                <input
                                                    type="number"
                                                    min={1}
                                                    className={cx('form-input')}
                                                    placeholder="10"
                                                    value={quantity}
                                                    onChange={(e) => setQuantity(e.target.value)}
                                                />
                                            </div>
                                            <div className={cx('form-group')}>
                                                <label className={cx('form-label')}>Price</label>
                                                <input
                                                    type="number"
                                                    min={1}
                                                    className={cx('form-input')}
                                                    placeholder="$12"
                                                    value={price}
                                                    onChange={(e) => setPrice(e.target.value)}
                                                />
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
                                                            {statusProduct === null
                                                                ? 'Select Status'
                                                                : statusProduct.state}
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
                                                                key={item.id}
                                                            >
                                                                <span>{item.state}</span>
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
                                                                : categoryProduct.name}
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
                                                        {categories.map((item) => (
                                                            <div
                                                                onClick={() => setCategoryProduct(item)}
                                                                className={cx('option')}
                                                                key={item.id}
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
                                                    <span className={cx('note')}>*can upload multi thumbnails</span>
                                                </label>

                                                <span className={cx('btn')} onClick={() => setSelectedFile([])}>
                                                    <img className={cx('icon')} alt="" src={images.cleanIcon} />
                                                    Clear
                                                </span>
                                            </div>
                                            <div className={cx('container-files')}>
                                                {renderPhotos(selectedFiles)}
                                                <input
                                                    type="file"
                                                    id="thumbs"
                                                    multiple
                                                    onChange={handleImageChange}
                                                    name="thumbs[]"
                                                    hidden
                                                />
                                                <label htmlFor="thumbs" className={cx('file-thumb')}>
                                                    <img className={cx('icon')} alt="" src={images.plusIcon} />
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
                    </>
                )}
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
                    message={`Do you wanna delete this Product? productId: ${idProductDelete}`}
                    confirm={handleDeleteProduct}
                    show={openModal}
                    setShow={setOpenModal}
                />
            )}
        </>
    );
}

export default Products;
