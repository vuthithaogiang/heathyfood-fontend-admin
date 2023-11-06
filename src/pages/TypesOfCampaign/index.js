import classNames from 'classnames/bind';
import styles from './TypesOfCampaign.module.scss';
import images from '~/assets/images';
import { Editor } from 'primereact/editor';
import HTMLREndered from '~/components/HTMLRendered';
import useAxios from '~/hooks/useAxios';
import { InfinitySpin } from 'react-loader-spinner';
import React, { useState, useEffect } from 'react';
import AlertConfimDelete from '~/components/AlertConfirmDelete';

const cx = classNames.bind(styles);

function TypesOfCampaign() {
    // FILTER RECOMMEND ITEM

    const authAxios = useAxios();
    const [orderCreatedRecommend, setOrderCreatedRecommend] = useState(false);
    const [typeOrderCreatedRecommend, setTypeOrderCreatedRecommend] = useState(null);

    const [statusRecommend, setStatusRecommend] = useState(false);
    const [typeSatusRecommend, setTypeStatusRecommend] = useState(null);

    const [searchValue, setSearchValue] = useState('');
    const [listTypesOfCampaign, setListTypesOfampaign] = useState(null);

    const [loading, setLoading] = useState(false);

    const [showDetails, setShowDetails] = useState([]);
    const [name, setName] = useState('');
    const [descTypeCampaign, setDesTypeCampaign] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const [successEditMessage, setSuccessEditMessage] = useState(null);
    const [errorEditMessage, setErrorEditMessage] = useState(null);
    const [typeCampignEdit, setTypeCampaignEdit] = useState(null);

    const [typeCampaignDelete, setTypeCampaingDelete] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const handleDeleteTypeCampaingn = async () => {
        setLoading(true);
        try {
            const response = await authAxios.post(`/api/types-of-campaign/destroy/${typeCampaignDelete.id}`, {
                withCredentials: true,
            });

            console.log(response.data);
            fetListTypeOfCampaign();
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

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
                        $(target).classList.toggle('hide', setErrorEditMessage(null));
                        $(target).classList.toggle('hide', setSuccessEditMessage(null));
                    });
                };
            });
        }

        initJsToggle();
    }, [listTypesOfCampaign]);

    const fetListTypeOfCampaign = async () => {
        setLoading(true);
        try {
            const response = await authAxios.get('/api/types-of-campaign/getAll', {
                withCredentials: true,
            });

            if (response.data) {
                setListTypesOfampaign(response.data);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetListTypeOfCampaign(); // eslint-disable-next-line
    }, []);

    const handleSubmitSearch = async (e) => {
        e.preventDefault();
    };

    const clearRecomendStaus = () => {
        setTypeStatusRecommend(null);
        setStatusRecommend(false);
    };

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

    const clearRecommendCreatedAt = () => {
        setTypeOrderCreatedRecommend(null);
        setOrderCreatedRecommend(false);
    };

    const handleFilterCategory = async () => {};

    const handleShowDetails = (id) => {
        console.log(id);
        console.log(showDetails);
        if (showDetails.indexOf(id) === -1) {
            const result = [...showDetails, id];
            setShowDetails(result);
        } else {
            const newArray = showDetails.filter((element) => element !== id);
            setShowDetails(newArray);
        }
    };

    const handleFormAdNewSubmit = async (e) => {
        e.preventDefault();

        if (name !== '' && descTypeCampaign !== '') {
            setLoading(true);
            try {
                const response = await authAxios.post(
                    '/api/types-of-campaign/store',
                    {
                        name: name,
                        description: descTypeCampaign,
                    },
                    {
                        withCredentials: true,
                    },
                );

                console.log(response.data);
                setSuccessMessage('Add new Type of Campagn Success');
                setErrorMessage(null);
                setName('');
                setDesTypeCampaign('');
                setLoading(false);
            } catch (error) {
                setErrorMessage('Add new Type of Campaign Faild.');
                setSuccessMessage(null);
                setLoading(false);
                console.log(error);
            }
        }
    };

    const handleFormEdit = async (e) => {
        e.preventDefault();
        console.log(typeCampignEdit);

        setLoading(true);
        try {
            const response = await authAxios.post(
                `/api/types-of-campaign/edit/${typeCampignEdit.id}`,
                typeCampignEdit,

                {
                    withCredentials: true,
                },
            );

            console.log(response.data);
            setErrorEditMessage(null);
            setSuccessEditMessage('Edit successfuly.');
            fetListTypeOfCampaign();
            setLoading(false);
        } catch (error) {
            console.log(error);
            setErrorEditMessage('Edit this Type of campaign faild.');
            setSuccessEditMessage(null);
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
                        <h3 className={cx('active')}>Types Campaign</h3>
                    </header>

                    <div className={cx('suggest-list')}>
                        <div className={cx('suggest-item')}>
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

                <div className={cx('head-less')}>
                    <div className={cx('title')}>
                        <h4>Types of Campaign</h4>
                        <button className={cx('js-toggle')} toggle-target="#add-type-campaign-form">
                            <img className={cx('icon')} alt="" src={images.categoryIcon} />
                            <span>New</span>
                        </button>
                    </div>

                    <div className={cx('form-search')}>
                        <form onSubmit={handleSubmitSearch}>
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

                <div className={cx('list-type')}>
                    {listTypesOfCampaign !== null &&
                        listTypesOfCampaign.map((item) => (
                            <div className={cx('item')}>
                                <div className={cx('wrap-item')}>
                                    <div className={cx('info')}>
                                        <div className={cx('left')}>
                                            <div className={cx('row-1')}>
                                                <p onClick={() => handleShowDetails(item.id)}>{item.name}</p>
                                                <span>{item.state}</span>
                                            </div>
                                            <div className={cx('row-2')}>
                                                <span className={cx('tag')}></span>
                                                <span>hasManyCampaign: 0 </span>
                                            </div>
                                        </div>
                                        <div className={cx('right')}>
                                            <div className={cx('popper-actions')}>
                                                <button
                                                    className={cx('popper-item', 'js-toggle')}
                                                    toggle-target="#edit-type-campaign-form"
                                                    onClick={() => setTypeCampaignEdit(item)}
                                                >
                                                    <img className={cx('icon')} alt="" src={images.penIcon} />
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setTypeCampaingDelete(item);
                                                        setOpenModal(true);
                                                    }}
                                                    className={cx('popper-item')}
                                                >
                                                    <img className={cx('icon')} alt="" src={images.trashIcon} />
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className={
                                            showDetails.indexOf(item.id) !== -1
                                                ? cx('details-info')
                                                : cx('details-info', 'none')
                                        }
                                    >
                                        <div className={cx('separate')}>
                                            <figure>
                                                <img className={cx('icon')} alt="" src={images.pushIcon} />
                                            </figure>
                                        </div>
                                        <div className={cx('more-info')}>
                                            Created at: <span>{item.created_at}</span>{' '}
                                        </div>
                                        <div className={cx('more-info')}>
                                            Updated at: <span>{item.updated_at}</span>{' '}
                                        </div>
                                        <div className={cx('more-info')}>
                                            Description: <HTMLREndered htmlString={item.description} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>

                {/* Form add new Type Campaign */}
                <div id="add-type-campaign-form" className={cx('add-type-campaign', 'hide')}>
                    <div className={cx('wrap-form')}>
                        <header>
                            <h3>Add New Type Campaign</h3>
                            <button className={cx('js-toggle')} toggle-target="#add-type-campaign-form">
                                <img className={cx('icon')} alt="" src={images.xIcon} />
                            </button>
                        </header>

                        {errorMessage !== null && <p className={cx('error-message')}>{errorMessage}</p>}
                        {successMessage !== null && <p className={cx('success-message')}>{successMessage}</p>}
                        <form onSubmit={handleFormAdNewSubmit}>
                            <div className={cx('form-group')}>
                                <label className={cx('form-label')}>Name*</label>
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className={cx('form-input')}
                                    type="text"
                                    name="name"
                                    placeholder="Name type of Campaign"
                                />
                            </div>

                            <div className={cx('form-group')}>
                                <label className={cx('form-label')}>Description*</label>
                                <Editor
                                    style={{ height: '220px' }}
                                    value={descTypeCampaign}
                                    onTextChange={(e) => setDesTypeCampaign(e.htmlValue)}
                                />
                            </div>

                            <div className={cx('form-buttons')}>
                                <button disabled={name === '' || descTypeCampaign === '' ? true : false} type="submit">
                                    Submit
                                </button>
                                <span className={cx('js-toggle')} toggle-target="#add-type-campaign-form">
                                    Cancel
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
                <div className={cx('type-campaign-overlay', 'js-toggle')} toggle-target="#add-type-campaign-form"></div>

                {/* Form edit Type Campaign */}
                <div id="edit-type-campaign-form" className={cx('edit-type-campaign', 'hide')}>
                    {typeCampignEdit !== null ? (
                        <>
                            <div className={cx('wrap-form')}>
                                <header>
                                    <h3>Edit Type Campaign: {typeCampignEdit.name}</h3>
                                    <button className={cx('js-toggle')} toggle-target="#edit-type-campaign-form">
                                        <img className={cx('icon')} alt="" src={images.xIcon} />
                                    </button>
                                </header>

                                {errorEditMessage !== null && <p className={cx('error-message')}>{errorEditMessage}</p>}
                                {successEditMessage !== null && (
                                    <p className={cx('success-message')}>{successEditMessage}</p>
                                )}
                                <form onSubmit={handleFormEdit}>
                                    <div className={cx('form-group')}>
                                        <label className={cx('form-label')}>Name*</label>
                                        <input
                                            className={cx('form-input')}
                                            type="text"
                                            name="name"
                                            placeholder="Name type of Campaign"
                                            value={typeCampignEdit.name}
                                            onChange={(e) =>
                                                setTypeCampaignEdit({
                                                    id: typeCampignEdit.id,
                                                    name: e.target.value,
                                                    description: typeCampignEdit.description,
                                                })
                                            }
                                        />
                                    </div>

                                    <div className={cx('form-group')}>
                                        <label className={cx('form-label')}>Description*</label>
                                        <Editor
                                            style={{ height: '220px' }}
                                            value={typeCampignEdit.description}
                                            onTextChange={(e) =>
                                                setTypeCampaignEdit({
                                                    id: typeCampignEdit.id,
                                                    name: typeCampignEdit.name,
                                                    description: e.htmlValue,
                                                })
                                            }
                                        />
                                    </div>

                                    <div className={cx('form-buttons')}>
                                        <button type="submit">Submit</button>
                                        <span className={cx('js-toggle')} toggle-target="#edit-type-campaign-form">
                                            Cancel
                                        </span>
                                    </div>
                                </form>
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                </div>
                <div
                    className={cx('type-campaign-edit-overlay', 'js-toggle')}
                    toggle-target="#edit-type-campaign-form"
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
                    message={`Do you wanna delete this Type Campaign? id: ${typeCampaignDelete.id}`}
                    confirm={handleDeleteTypeCampaingn}
                    show={openModal}
                    setShow={setOpenModal}
                />
            )}
        </>
    );
}

export default TypesOfCampaign;
