import classNames from 'classnames/bind';
import styles from './Campaigns.module.scss';
import images from '~/assets/images';
import React, { useState, useEffect, useRef } from 'react';
import useAxios from '~/hooks/useAxios';
import { InfinitySpin } from 'react-loader-spinner';
import useOnClickOutside from '~/hooks/useOnclickOutside';

const cx = classNames.bind(styles);

function Campaigns() {
    const axios = useAxios();

    const [listTypeOfCampaign, setListTypeOfCampaign] = useState(null);
    const [loading, setLoading] = useState(false);
    const [typeOfNavbar, setTypeOfNavbar] = useState('Overview');

    const [showPopperNavbar, setShowPopperNavbar] = useState(false);
    const [showPopperStatus, setShowPopperStatus] = useState(false);
    const [statusFilter, setStatusFilter] = useState(null);

    const [showPopperTypeCampaign, setShowPoppertypeCampaign] = useState(false);
    const [typeCampaingFilter, setTypeCampaignFilter] = useState(null);

    const [searchValue, setSearchValue] = useState('');

    const refSelectNavbar = useRef();
    const refSelectStatus = useRef();
    const refSelectTypeCamppaign = useRef();

    const NAVBAR = [
        {
            id: 1,
            title: 'Overview',
        },
        {
            id: 2,
            title: 'Avtivity',
        },
    ];

    const FAKE_STATUS = [
        {
            id: 1,
            title: 'New',
        },
        {
            id: 2,
            title: 'On Going',
        },
        {
            id: 3,
            title: 'Complete',
        },
        {
            id: 4,
            title: 'Paused',
        },
    ];

    const toggleShowNavbar = () => {
        setShowPopperNavbar(!showPopperNavbar);
    };

    const hiddenPopperNavBar = () => {
        setShowPopperNavbar(false);
    };

    const toggleShowPopperStatus = () => {
        setShowPopperStatus(!showPopperStatus);
    };

    const hiddenPopperStatus = () => {
        setShowPopperStatus(false);
    };

    const toggleShowPopperTypeCampaign = () => {
        setShowPoppertypeCampaign(!showPopperTypeCampaign);
    };

    const hiddenPopperTypeCampaign = () => {
        setShowPoppertypeCampaign(false);
    };

    useOnClickOutside(refSelectNavbar, hiddenPopperNavBar);
    useOnClickOutside(refSelectStatus, hiddenPopperStatus);
    useOnClickOutside(refSelectTypeCamppaign, hiddenPopperTypeCampaign);

    const fetListTypeOfCampaign = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/types-of-campaign/getAll', {
                withCredentials: true,
            });

            if (response.data) {
                setListTypeOfCampaign(response.data);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetListTypeOfCampaign(); // eslint-disable-next-line
    }, []);

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <h4>Pinned</h4>
                    <span>Customize your pins</span>
                </div>
                <div className={cx('list-type-of-campaign')}>
                    {listTypeOfCampaign !== null &&
                        listTypeOfCampaign.slice(0, 3).map((item) => (
                            <div className={cx('item')} key={item.id}>
                                <div className={cx('wrap-item')}>
                                    <div className={cx('info')}>
                                        <div className={cx('left')}>
                                            <div className={cx('row-1')}>
                                                <p className={cx('name')}>{item.name}</p>
                                                {/* <span>{item.state}</span> */}
                                            </div>
                                            <div className={cx('row-2')}>
                                                <span className={cx('tag')}></span>
                                                <span>hasManyCampaign: 0 </span>
                                            </div>
                                        </div>
                                        <div className={cx('right')}>
                                            <div className={cx('popper-actions')}>
                                                <button className={cx('popper-item', 'js-toggle')}>
                                                    <img className={cx('icon')} alt="" src={images.plusIcon} />
                                                    Add Campaign
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>

                <div className={cx('navbar')}>
                    <div className={cx('navbar-left')}>
                        <div ref={refSelectNavbar} className={cx('filter-select-wrap')}>
                            <div onClick={toggleShowNavbar} className={cx('main')}>
                                {typeOfNavbar}
                                <img
                                    className={showPopperNavbar === true ? cx('icon', 'icon-rotate') : cx('icon')}
                                    alt=""
                                    src={images.arrowDownIcon}
                                />
                            </div>
                            <div className={showPopperNavbar === true ? cx('wrap-list') : cx('wrap-list', 'none')}>
                                <div className={cx('popper-list')}>
                                    {NAVBAR.map((item) => (
                                        <div
                                            onClick={() => setTypeOfNavbar(item.title)}
                                            className={
                                                item.title === typeOfNavbar
                                                    ? cx('popper-item', 'active')
                                                    : cx('popper-item')
                                            }
                                            key={item.id}
                                        >
                                            <span>{item.title}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {typeOfNavbar === 'Overview' && (
                            <>
                                <div ref={refSelectStatus} className={cx('filter-select-wrap')}>
                                    <div onClick={toggleShowPopperStatus} className={cx('main')}>
                                        {statusFilter === null ? 'Status' : statusFilter}
                                        <img className={cx('icon')} alt="" src={images.addIcon} />
                                    </div>
                                    <div
                                        className={
                                            showPopperStatus === true ? cx('wrap-list') : cx('wrap-list', 'none')
                                        }
                                    >
                                        <div className={cx('popper-list')}>
                                            {FAKE_STATUS.map((item) => (
                                                <div
                                                    key={item.id}
                                                    onClick={() => setStatusFilter(item.title)}
                                                    className={
                                                        item.title === statusFilter
                                                            ? cx('popper-item', 'active')
                                                            : cx('popper-item')
                                                    }
                                                >
                                                    <span>{item.title}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div ref={refSelectTypeCamppaign} className={cx('filter-select-wrap')}>
                                    <div onClick={toggleShowPopperTypeCampaign} className={cx('main')}>
                                        {typeCampaingFilter === null ? ' Types of Campaign' : typeCampaingFilter.name}
                                        <img className={cx('icon')} alt="" src={images.addIcon} />
                                    </div>

                                    <div
                                        className={
                                            showPopperTypeCampaign === true ? cx('wrap-list') : cx('wrap-list', 'none')
                                        }
                                    >
                                        <div className={cx('popper-list')}>
                                            {listTypeOfCampaign !== null &&
                                                listTypeOfCampaign.map((item) => (
                                                    <div
                                                        key={item.id}
                                                        onClick={() => setTypeCampaignFilter(item)}
                                                        className={
                                                            item === typeCampaingFilter
                                                                ? cx('popper-item', 'active')
                                                                : cx('popper-item')
                                                        }
                                                    >
                                                        <span className={cx('large')}>{item.name}</span>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <div className={cx('navbar-right')}>
                        {typeOfNavbar === 'Overview' && (
                            <>
                                <div className={cx('filter-select-wrap')}>
                                    <div className={cx('main')}>
                                        <img className={cx('icon')} alt="" src={images.filterIcon} />
                                        Filter
                                    </div>
                                </div>
                                <div className={cx('filter-select-wrap')}>
                                    <div className={cx('main')}>
                                        <img className={cx('icon')} alt="" src={images.clockIcon} />
                                        Calendar
                                    </div>
                                </div>

                                <div className={cx('form-search')}>
                                    <form method="post" onSubmit={(e) => e.preventDefault()}>
                                        <button type="submit">
                                            <img className={cx('icon')} alt="" src={images.searchIncon} />
                                        </button>

                                        <input
                                            type="text"
                                            value={searchValue}
                                            onChange={(e) => setSearchValue(e.target.value)}
                                            placeholder="Search Campaign name"
                                        />
                                    </form>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {loading && (
                <div className={cx('modal-infinity')}>
                    <div className={cx('overlay-infinity')}></div>
                    <div className={cx('wrap-loading-infinity')}>
                        <InfinitySpin width="160" color="#fff" />
                    </div>
                </div>
            )}
        </>
    );
}

export default Campaigns;
