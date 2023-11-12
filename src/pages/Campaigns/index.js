import classNames from 'classnames/bind';
import styles from './Campaigns.module.scss';
import images from '~/assets/images';
import React, { useState, useEffect, useRef } from 'react';
import useAxios from '~/hooks/useAxios';
import { InfinitySpin } from 'react-loader-spinner';
import useOnClickOutside from '~/hooks/useOnclickOutside';
import { useNavigate } from 'react-router-dom';
import HTMLREndered from '~/components/HTMLRendered';
import { DateRangePicker } from 'react-date-range';
import CalendarComponent from '~/components/CalendarComponent';
import { Editor } from 'primereact/editor';
import { format } from 'date-fns';

const cx = classNames.bind(styles);

const BASE_URL_IMAGE = 'http://127.0.0.1:8000/uploads/';
function Campaigns() {
    const axios = useAxios();
    const navigate = useNavigate();
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
            id: 0,
            title: 'New',
        },
        {
            id: 1,
            title: 'On Going',
        },
        {
            id: 2,
            title: 'Complete',
        },
        {
            id: 3,
            title: 'Paused',
        },
    ];

    const [listTypeOfCampaign, setListTypeOfCampaign] = useState(null);
    const [loading, setLoading] = useState(false);
    const [typeOfNavbar, setTypeOfNavbar] = useState('Overview');

    const [showPopperNavbar, setShowPopperNavbar] = useState(false);
    const [showPopperStatus, setShowPopperStatus] = useState(false);
    const [showPopperCalendar, setShowPopperCalendar] = useState(false);

    const [statusFilter, setStatusFilter] = useState(null);

    const [showPopperTypeCampaign, setShowPoppertypeCampaign] = useState(false);
    const [typeCampaingFilter, setTypeCampaignFilter] = useState(null);

    const [searchValue, setSearchValue] = useState('');

    const [listCampaign, setListCampaign] = useState(null);
    const [content, setContent] = useState(null); // CONTENT PREVIEW WHEN CLICKED OPREN

    const [budgetClicked, setBudgetClicked] = useState(null);
    const [dailyBudgetClicked, setDailyBudgetclicked] = useState(null);

    const refSelectNavbar = useRef();
    const refSelectStatus = useRef();
    const refSelectTypeCamppaign = useRef();
    const refSelectCalendar = useRef();

    const refTypeCampaignEdit = useRef();
    const refStatusEdit = useRef();
    const refchannelEdit = useRef();
    const refStartDateEdit = useRef();
    const refEndDateEdit = useState();

    const [showPopperTypeCampaginEdit, setShowPopperTypeCampaignEdit] = useState(false);
    const [showPopperStatusEdit, setShowPopperStatusEdit] = useState(false);
    const [showPopperChannelEdit, setShowPopperChannelEdit] = useState(false);
    const [showPopperStartDateEdit, setShowPopperStartDateEdit] = useState(false);
    const [showPopperEndDateEdit, setShowPopperEndDateEdit] = useState(false);

    const [budgetIsChecked, setBudgetIsCheced] = useState(false);
    const [previewThumbnail, setPreviewThumbnail] = useState(null);

    const [campaignEdit, setCampaignEdit] = useState(null);

    // NEW VALUE TO EDIT
    const [nameEdit, setNameEdit] = useState(null);
    const [statusEdir, setStatusEdit] = useState(null);
    const [descriptionEdit, setDescriptionEdit] = useState(null);
    const [budgetEdit, setBudgetEdit] = useState(null);
    const [dailyBudgetEdit, setDailyBudgetEdit] = useState(null);
    const [typeCampaignEdit, setTypeCampaignEdit] = useState(null);
    const [objectiveEdit, setObjectiveEdit] = useState(null);
    const [startDateEdit, setStartDateEdit] = useState(null);
    const [endDateEdit, setEndDateEdit] = useState(null);
    const [thumnailEdit, setThumbnailEdit] = useState(null);
    const [channelEdit, setChannelEdit] = useState('Website');

    const [editSuccess, setEditSuccess] = useState(null);

    //END

    const [campaignDelete, setCampaignDelete] = useState(null);
    const [messageDeleteSuccess, setMessageDeleteSuccess] = useState(null);
    const [messageDeleleteError, setMessageDeleleError] = useState(null);

    const handlePreviewThumbnail = (e) => {
        const file = e.target.files[0];

        if (file) {
            file.preview = URL.createObjectURL(file);
            setPreviewThumbnail(file.preview);
            setThumbnailEdit(file);
        }
    };

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(previewThumbnail);
        };
    }, [previewThumbnail]);

    const handleCheckBoxBudgetChange = (event) => {
        const isChecked = event.target.checked;
        setBudgetIsCheced(isChecked);
    };

    const selectionRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    };

    const handleSelectDatePicker = (e) => {
        console.log(e);
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

                        // $(target).classList.toggle('hide', setEditSuccess(null));

                        // $(target).classList.toggle('hide', setErrorMessageEdit(null));
                        // $(target).classList.toggle('hide', setSuccessMessageEdit(null));
                    });
                };
            });
        }

        initJsToggle();
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

                        //  $(target).classList.toggle('hide', setEditSuccess(null));
                        // $(target).classList.toggle('hide', setSuccessMessageEdit(null));
                    });
                };
            });
        }

        initJsToggle();
    }, [content, campaignEdit]);

    const formatDateFromBackend = (dateString) => {
        const dateObject = new Date(dateString);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const day = dateObject.getDate(); // Get the day (1-31)
        const month = months[dateObject.getMonth()]; // Get the month as a string
        //   const year = dateObject.getFullYear(); // Get the year (e.g., 2023)

        const formattedDate = ` ${month} ${day}`; // Combine day, month, and year
        return formattedDate;
    };

    const toggleShowPopperTypeCampaignEdit = () => {
        setShowPopperTypeCampaignEdit(!showPopperTypeCampaginEdit);
    };

    const hiddenPopperTypeCampaignEdit = () => {
        setShowPopperTypeCampaignEdit(false);
    };

    const toggleShowPopperStatusEdit = () => {
        setShowPopperStatusEdit(!showPopperStatusEdit);
    };

    const hiddenPopperStatusEdit = () => {
        setShowPopperStatusEdit(false);
    };

    const toggleShowPopperChannelEdit = () => {
        setShowPopperChannelEdit(!showPopperChannelEdit);
    };

    const hiddenPopperchannelEdit = () => {
        setShowPopperChannelEdit(false);
    };

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

    const toggleShowPopperCalendar = () => {
        setShowPopperCalendar(!showPopperCalendar);
    };

    const hiddenPopperCalendar = () => {
        setShowPopperCalendar(false);
    };

    const togglePopperStartDateEdit = () => {
        setShowPopperStartDateEdit(!showPopperStartDateEdit);
    };

    const hiddenPopperStartDateEdit = () => {
        setShowPopperStartDateEdit(false);
    };

    const togglePopperEndDateEdit = () => {
        setShowPopperEndDateEdit(!showPopperEndDateEdit);
    };

    const hiddenPopperEndDateEdit = () => {
        setShowPopperEndDateEdit(false);
    };

    useOnClickOutside(refEndDateEdit, hiddenPopperEndDateEdit);
    useOnClickOutside(refStartDateEdit, hiddenPopperStartDateEdit);
    useOnClickOutside(refSelectCalendar, hiddenPopperCalendar);
    useOnClickOutside(refSelectNavbar, hiddenPopperNavBar);
    useOnClickOutside(refSelectStatus, hiddenPopperStatus);
    useOnClickOutside(refSelectTypeCamppaign, hiddenPopperTypeCampaign);
    useOnClickOutside(refTypeCampaignEdit, hiddenPopperTypeCampaignEdit);
    useOnClickOutside(refStatusEdit, hiddenPopperStatusEdit);
    useOnClickOutside(refchannelEdit, hiddenPopperchannelEdit);

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

    const fetchListCampaign = async () => {
        setLoading(true);

        try {
            const response = await axios.get('/api/campaign/getAll', {
                withCredentials: true,
            });

            setListCampaign(response.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetListTypeOfCampaign(); // eslint-disable-next-line
        fetchListCampaign();
    }, []);

    const handlePrepareStateEdit = (item) => {
        setCampaignEdit(item);
        setNameEdit(item.name);
        setObjectiveEdit(item.objective);

        const dateStart = new Date(item.start_date);
        const endDate = new Date(item.end_date);

        setStartDateEdit(format(dateStart, 'dd-MM-yyyy'));
        setEndDateEdit(format(endDate, 'dd-MM-yyyy'));

        setDescriptionEdit(item.description);
        setBudgetEdit(item.budget);
        setDailyBudgetEdit(item.daily_budget);
        setStatusEdit(item.status);
    };

    const handleEditCampaign = async () => {
        if (campaignEdit === null) {
            return;
        }
        const formData = new FormData();

        if (nameEdit !== campaignEdit.name) {
            formData.append('name', nameEdit);
        }

        if (objectiveEdit !== campaignEdit.objective) {
            formData.append('objective', objectiveEdit);
        }

        if (budgetEdit !== null && budgetEdit !== '') {
            formData.append('budget', budgetEdit);
        }

        if (dailyBudgetEdit !== null && dailyBudgetEdit !== '') {
            formData.append('dailyBudget', dailyBudgetEdit);
        }

        if (descriptionEdit !== null) {
            formData.append('description', descriptionEdit);
        }

        if (thumnailEdit !== null) {
            formData.append('thumb', thumnailEdit);
        }

        if (statusEdir !== null && statusEdir !== campaignEdit.status) {
            formData.append('status', statusEdir);
        }

        if (typeCampaignEdit !== null && typeCampaignEdit !== campaignEdit.campaigns.id) {
            formData.append('typeOfCampaignId', typeCampaignEdit);
        }

        const dateStart = new Date(campaignEdit.start_date);
        const endDate = new Date(campaignEdit.end_date);

        if (startDateEdit !== format(dateStart, 'dd-MM-yyyy')) {
            formData.append('startDate', startDateEdit);
        }

        if (endDateEdit !== format(endDate, 'dd-MM-yyyy')) {
            formData.append('endDate', endDateEdit);
        }

        setLoading(true);
        try {
            const response = await axios.post(`/api/campaign/edit/${campaignEdit.id}`, formData, {
                withCredentials: true,
            });
            console.log(response.data);

            if (response.data.success === 'true') {
                fetchListCampaign();
            }
            setEditSuccess('success');
            setLoading(false);
        } catch (error) {
            setEditSuccess('error');
            console.log(error);
            setLoading(false);
        }
    };

    const handleRemoveCampaign = async (id) => {
        console.log(id);

        if (!id) {
            return;
        }
        setLoading(true);

        try {
            const response = await axios.post(`/api/campaign/destroy/${id}`, {
                withCredentials: true,
            });

            console.log(response.data);

            if (response.data.success === 'true') {
                fetchListCampaign();
                setMessageDeleleError(null);
                setMessageDeleteSuccess(response.data.message);
                setCampaignDelete(null);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setMessageDeleleError(error.response.data.message);
            setMessageDeleteSuccess(null);
            setLoading(false);
        }
    };

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
                                                <span>hasManyCampaign: {item.campaigns.length} </span>
                                            </div>
                                        </div>
                                        <div className={cx('right')}>
                                            <div className={cx('popper-actions')}>
                                                <button
                                                    onClick={() => navigate('/admin/add-new-campaign')}
                                                    className={cx('popper-item')}
                                                >
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
                                        {statusFilter === null ? 'Status' : statusFilter.title}
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
                                                    onClick={() => setStatusFilter(item)}
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
                                <div ref={refSelectCalendar} className={cx('filter-select-wrap')}>
                                    <div onClick={toggleShowPopperCalendar} className={cx('main')}>
                                        <img className={cx('icon')} alt="" src={images.clockIcon} />
                                        Calendar
                                    </div>

                                    <div
                                        className={
                                            showPopperCalendar === true
                                                ? cx('wrap-list', 'calendar')
                                                : cx('wrap-list', 'calendar', 'none')
                                        }
                                    >
                                        <div className={cx('popper-list', 'calendar')}>
                                            <DateRangePicker
                                                ranges={[selectionRange]}
                                                onChange={handleSelectDatePicker}
                                            />
                                        </div>
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
                                            placeholder="Search Campaign"
                                        />
                                    </form>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className={cx('list-campaign')}>
                    <div className={cx('table')}>
                        <div className={cx('head-table')}>
                            <div>
                                <img className={cx('icon', 'icon-small')} alt="" src={images.hastagIcon} />
                                <span>Name</span>
                            </div>
                            <div>
                                <img className={cx('icon', 'icon-small')} alt="" src={images.statusIcon} />
                                <span>Status</span>
                            </div>
                            <div>
                                <img className={cx('icon', 'icon-small')} alt="" src={images.sumIcon} />
                                <span>Activities</span>
                            </div>
                            <div>
                                <img className={cx('icon', 'icon-small')} alt="" src={images.dateIcon} />
                                <span>Due Date</span>
                            </div>
                            <div>
                                <img className={cx('icon', 'icon-small')} alt="" src={images.channelIcon} />
                                <span>Channel</span>
                            </div>

                            <div>
                                <img className={cx('icon', 'icon-small')} alt="" src={images.nameIcon} />
                                <span>Objective</span>
                            </div>

                            <div>
                                <img className={cx('icon', 'icon-small')} alt="" src={images.flowerIcon} />
                                <span>Budget</span>
                            </div>
                            <div>
                                <img className={cx('icon', 'icon-small')} alt="" src={images.flowerIcon} />
                                <span>Daily Budget</span>
                            </div>
                        </div>
                        {listCampaign !== null && (
                            <>
                                <div className={cx('table-data')}>
                                    {listCampaign.map((item) => (
                                        <div className={cx('row-data')} key={item.id}>
                                            <div className={cx('wrap-name-campaign')}>
                                                <p className={cx('text-data')}>{item.name}</p>
                                                <button
                                                    onClick={() => {
                                                        setContent(item);
                                                    }}
                                                    className={cx('btn', 'btn-preview', 'js-toggle')}
                                                    toggle-target="#popper-review-content"
                                                >
                                                    <img
                                                        className={cx('icon', 'icon-small')}
                                                        alt=""
                                                        src={images.openIcon}
                                                    />
                                                    OPEN
                                                </button>
                                            </div>
                                            <div className={cx('')}>
                                                <span className={cx(`status-${item.status}`, 'status')}>
                                                    {item.status === 0 && 'New created'}
                                                    {item.status === 1 && 'On going'}
                                                    {item.status === 2 && 'Paused'}
                                                    {item.status === 3 && 'Complete'}
                                                </span>
                                            </div>

                                            <div className={cx('timetable-campaign')}>
                                                <p className={cx('text-data', 'wrap-date')}>
                                                    {item.activities.length > 0 ? (
                                                        <span>{item.activities.length} acts</span>
                                                    ) : (
                                                        <span>no act</span>
                                                    )}
                                                </p>
                                                <div className={cx('go-schedule')}>
                                                    Go details
                                                    <img
                                                        className={cx('icon', 'icon-small')}
                                                        alt=""
                                                        src={images.gotoIcon}
                                                    />
                                                </div>
                                            </div>

                                            <div className={cx('timetable-campaign')}>
                                                <p className={cx('text-data', 'wrap-date')}>
                                                    <span className={cx('start-date')}>
                                                        {formatDateFromBackend(item.start_date)}
                                                    </span>
                                                    -
                                                    <span className={cx('end-date')}>
                                                        {formatDateFromBackend(item.end_date)}
                                                    </span>
                                                </p>
                                                <div className={cx('go-schedule')}>
                                                    Go details
                                                    <img
                                                        className={cx('icon', 'icon-small')}
                                                        alt=""
                                                        src={images.gotoIcon}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <span>{item.channel}</span>
                                            </div>
                                            <div className={cx('wrap-objective-campaign')}>
                                                <p className={cx('text-data')}>{item.objective}</p>
                                                <div className={cx('popper-objective')}>
                                                    <span>{item.objective}</span>
                                                </div>
                                            </div>
                                            <div onBlur={() => setBudgetClicked(null)} className={cx('budget')}>
                                                {item.budget !== null ? (
                                                    <span onClick={() => setBudgetClicked(item)}>{item.budget}</span>
                                                ) : (
                                                    <>
                                                        <span
                                                            onClick={() => setBudgetClicked(item)}
                                                            className={cx('add-btn', 'add-budget')}
                                                        >
                                                            <img
                                                                className={cx('icon', 'icon-small')}
                                                                alt=""
                                                                src={images.renameIcon}
                                                            />
                                                            Add
                                                        </span>
                                                    </>
                                                )}
                                                <form
                                                    className={
                                                        budgetClicked !== null && budgetClicked.id === item.id
                                                            ? cx('form-input')
                                                            : cx('form-input', 'none')
                                                    }
                                                    onSubmit={(e) => e.preventDefault()}
                                                >
                                                    <input type="number" />
                                                </form>
                                            </div>
                                            <div
                                                onBlur={() => setDailyBudgetclicked(null)}
                                                className={cx('daily-budget')}
                                            >
                                                {item.daily_budget !== null ? (
                                                    <span onClick={() => setDailyBudgetclicked(item)}>
                                                        {item.daily_budget}
                                                    </span>
                                                ) : (
                                                    <span
                                                        onClick={() => setDailyBudgetclicked(item)}
                                                        className={cx('add-btn', 'add-daily-budget')}
                                                    >
                                                        <img
                                                            className={cx('icon', 'icon-small')}
                                                            alt=""
                                                            src={images.renameIcon}
                                                        />
                                                        Add
                                                    </span>
                                                )}
                                                <form
                                                    className={
                                                        dailyBudgetClicked !== null && dailyBudgetClicked.id === item.id
                                                            ? cx('form-input')
                                                            : cx('form-input', 'none')
                                                    }
                                                    onSubmit={(e) => e.preventDefault()}
                                                >
                                                    <input type="number" />
                                                </form>
                                            </div>

                                            <div className={cx('actions')}>
                                                <button>1 selected</button>
                                                <button
                                                    onClick={() => handlePrepareStateEdit(item)}
                                                    className={cx('js-toggle')}
                                                    toggle-target="#popper-campaign-edit"
                                                >
                                                    <img
                                                        className={cx('icon', 'icon-small')}
                                                        alt=""
                                                        src={images.editIcon}
                                                    />
                                                </button>
                                                <button
                                                    onClick={() => setCampaignDelete(item)}
                                                    className={cx('js-toggle')}
                                                    toggle-target="#popper-campaign-delete"
                                                >
                                                    <img
                                                        className={cx('icon', 'icon-small')}
                                                        alt=""
                                                        src={images.deleteIcon}
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Preview Content */}
                <div id="popper-review-content" className={cx('popper-notofication', 'hide')}>
                    {content !== null ? (
                        <>
                            <div className={cx('notification-top')}>
                                <div className={cx('title')}>Campaign:</div>
                                <button className={cx('close-btn', 'js-toggle')} toggle-target="#popper-review-content">
                                    <img className={cx('icon')} alt="" src={images.xIcon} />
                                </button>
                            </div>
                            <div className={cx('preview-content')}>
                                <div className={cx('header-preview-content')}>
                                    <figure>
                                        <img
                                            className={cx('thumbnail')}
                                            alt=""
                                            src={`${BASE_URL_IMAGE}${content.thumbnails[0].path}`}
                                        />
                                    </figure>
                                    <div className={cx('introduce')}>
                                        <h4>{content.name}</h4>
                                        <p>{content.objective}</p>
                                        <div className={cx('introduce-item')}>
                                            <span className={cx('wrap-icon')}>
                                                {' '}
                                                <img className={cx('icon')} alt="" src={images.clockIcon} />
                                            </span>
                                            <span className={cx('tag')}>Start: </span>
                                            <span className={cx('value')}>
                                                {formatDateFromBackend(content.start_date)}
                                            </span>
                                        </div>

                                        <div className={cx('introduce-item')}>
                                            <span className={cx('wrap-icon')}>
                                                {' '}
                                                <img className={cx('icon')} alt="" src={images.clockIcon} />
                                            </span>
                                            <span className={cx('tag')}>Target: </span>
                                            <span className={cx('value')}>
                                                {formatDateFromBackend(content.end_date)}
                                            </span>
                                        </div>
                                        <div className={cx('introduce-item')}>
                                            <span className={cx('wrap-icon')}>
                                                {' '}
                                                <img className={cx('icon')} alt="" src={images.planIcon} />
                                            </span>
                                            <span className={cx('tag')}>Progress: </span>
                                            <span className={cx('value')}>On Going</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('bread')}>
                                    <div className={cx('list-bread')}>
                                        <div className={cx('bread-item', 'active')}>
                                            <span>About</span>
                                        </div>
                                        <div className={cx('bread-item')}>
                                            <span>Activity</span>
                                        </div>
                                    </div>
                                </div>

                                <div className={cx('inner-content')}>
                                    {content.description !== null && (
                                        <>
                                            <div className={cx('about')}>
                                                <HTMLREndered htmlString={content.description} />
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                </div>

                <div className={cx('popper-overlay', 'js-toggle')} toggle-target="#popper-review-content"></div>

                {/* Edit Campaign */}
                <div id="popper-campaign-edit" className={cx('popper-notofication-edit', 'hide')}>
                    <div className={cx('notification-top')}>
                        <div className={cx('title')}>
                            <img className={cx('icon')} alt="" src={images.penIcon} />
                        </div>
                        <div onClick={handleEditCampaign} className={cx('send')}>
                            Send
                            <img className={cx('icon', 'icon-small')} alt="" src={images.sendIcon} />
                        </div>
                        {editSuccess === 'success' && (
                            <div className={cx('success')}>
                                <img className={cx('icon', 'icon-small')} alt="" src={images.editIcon} />
                                <span>Edit campaign success</span>
                            </div>
                        )}
                        {editSuccess === 'error' && (
                            <div className={cx('error')}>
                                <img className={cx('icon', 'icon-small')} alt="" src={images.spinnerIcon} />
                                <span>Edit campaign error</span>
                            </div>
                        )}
                        <button
                            onClick={() => setEditSuccess(null)}
                            className={cx('close-btn', 'js-toggle')}
                            toggle-target="#popper-campaign-edit"
                        >
                            <img className={cx('icon')} alt="" src={images.xIcon} />
                        </button>
                    </div>
                    {campaignEdit !== null ? (
                        <>
                            <div className={cx('content')}>
                                <div className={cx('head-content')}>
                                    <div className={cx('name')}>
                                        <div className={cx('form-edit')}>
                                            <img className={cx('icon')} alt="" src={images.renameIcon} />
                                            <input
                                                type="text"
                                                value={nameEdit}
                                                onChange={(e) => setNameEdit(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className={cx('group-btns')}>
                                        {/* New */}
                                        {campaignEdit.status === 0 && (
                                            <>
                                                <button className={cx('status-1')}>On going</button>
                                            </>
                                        )}
                                        {/* On going */}
                                        {campaignEdit.status === 1 && (
                                            <>
                                                <button className={cx('status-2')}>Pause</button>
                                                <button className={cx('status-3')}>Conplete</button>
                                            </>
                                        )}
                                        {/* Pause */}
                                        {campaignEdit.status === 2 && (
                                            <>
                                                <button className={cx('status-3')}>Complete</button>
                                                <button className={cx('status-2')}>On going</button>
                                            </>
                                        )}
                                        {/* Complete */}
                                        {campaignEdit.status === 3 && (
                                            <>
                                                <button className={cx('status-0')}>Start again</button>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Type, Status, Channel */}
                                <div className={cx('form-row')}>
                                    <div className={cx('form-group')}>
                                        <div className={cx('form-label')}>
                                            <label>Type's Campaign</label>
                                        </div>
                                        <div ref={refTypeCampaignEdit} className={cx('form-wrap-select')}>
                                            <div onClick={toggleShowPopperTypeCampaignEdit} className={cx('main')}>
                                                <span>
                                                    {typeCampaignEdit === null
                                                        ? 'Type of campaign'
                                                        : typeCampaignEdit.name}
                                                </span>
                                                <img className={cx('icon')} alt="" src={images.addIcon} />
                                            </div>
                                            <div
                                                className={
                                                    showPopperTypeCampaginEdit === true
                                                        ? cx('wrap-list')
                                                        : cx('wrap-list', 'none')
                                                }
                                            >
                                                <div className={cx('popper-list')}>
                                                    {listTypeOfCampaign.map((item) => (
                                                        <div
                                                            onClick={() => setTypeCampaignEdit(item)}
                                                            key={item.id}
                                                            className={cx('popper-item')}
                                                        >
                                                            <span>{item.name}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('form-group')}>
                                        <div className={cx('form-label')}>
                                            <label>Status Campaign</label>
                                        </div>
                                        <div ref={refStatusEdit} className={cx('form-wrap-select')}>
                                            <div onClick={toggleShowPopperStatusEdit} className={cx('main')}>
                                                <span>
                                                    {statusEdir === null && 'Status campaign'}
                                                    {statusEdir === 0 && 'New created'}
                                                    {statusEdir === 1 && 'On going'}
                                                    {statusEdir === 2 && 'Pause'}
                                                    {statusEdir === 3 && 'Complete'}
                                                </span>
                                                <img className={cx('icon')} alt="" src={images.addIcon} />
                                            </div>
                                            <div
                                                className={
                                                    showPopperStatusEdit === true
                                                        ? cx('wrap-list')
                                                        : cx('wrap-list', 'none')
                                                }
                                            >
                                                <div className={cx('popper-list')}>
                                                    <div onClick={() => setStatusEdit(0)} className={cx('popper-item')}>
                                                        <span>New created</span>
                                                    </div>
                                                    <div onClick={() => setStatusEdit(1)} className={cx('popper-item')}>
                                                        <span>On going</span>
                                                    </div>

                                                    <div onClick={() => setStatusEdit(2)} className={cx('popper-item')}>
                                                        <span>Pause</span>
                                                    </div>
                                                    <div onClick={() => setStatusEdit(3)} className={cx('popper-item')}>
                                                        <span>Complete</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('form-group')}>
                                        <div className={cx('form-label')}>
                                            <label>Channel</label>
                                        </div>
                                        <div ref={refchannelEdit} className={cx('form-wrap-select')}>
                                            <div onClick={toggleShowPopperChannelEdit} className={cx('main')}>
                                                <span>{channelEdit}</span>
                                                <img className={cx('icon')} alt="" src={images.addIcon} />
                                            </div>
                                            <div
                                                className={
                                                    showPopperChannelEdit === true
                                                        ? cx('wrap-list')
                                                        : cx('wrap-list', 'none')
                                                }
                                            >
                                                <div className={cx('popper-list')}>
                                                    <div
                                                        onClick={() => setChannelEdit('Website')}
                                                        className={cx('popper-item')}
                                                    >
                                                        <span>Website</span>
                                                    </div>
                                                    <div
                                                        onClick={() => setChannelEdit('Facebook')}
                                                        className={cx('popper-item')}
                                                    >
                                                        <span>Facebook</span>
                                                    </div>

                                                    <div
                                                        onClick={() => setChannelEdit('Linkedin')}
                                                        className={cx('popper-item')}
                                                    >
                                                        <span>Linkedin</span>
                                                    </div>
                                                    <div
                                                        onClick={() => setChannelEdit('Twitter')}
                                                        className={cx('popper-item')}
                                                    >
                                                        <span>Twitter</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Budget */}
                                <div className={cx('form-row')}>
                                    <div className={cx('form-group')}>
                                        <div className={cx('form-row', 'margin-inital')}>
                                            <div className={cx('form-group')}>
                                                <div className={cx('form-label')}>
                                                    <label>Budget</label>
                                                </div>
                                                <div className={cx('form-control', 'no-border', 'inline')}>
                                                    <p className={cx('form-desc')}>
                                                        Define how much you want to spend?
                                                    </p>
                                                    <div className={cx('switch')}>
                                                        <input
                                                            onChange={handleCheckBoxBudgetChange}
                                                            hidden
                                                            id="switch"
                                                            type="checkbox"
                                                            checked={budgetIsChecked}
                                                        />
                                                        <label htmlFor="switch"></label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {budgetIsChecked ? (
                                            <>
                                                <div className={cx('form-row', 'margin-inital')}>
                                                    <div className={cx('form-group')}>
                                                        <div className={cx('form-label', 'small')}>
                                                            <label>Overall Budget</label>
                                                        </div>
                                                        <div className={cx('form-control')}>
                                                            <input
                                                                className={cx('form-input')}
                                                                type="number"
                                                                placeholder="Enter amount for campaign total"
                                                                value={budgetEdit !== null ? budgetEdit : ''}
                                                                onChange={(e) => setBudgetEdit(e.target.value)}
                                                            />
                                                        </div>
                                                        <div className={cx('form-desc', 'small')}>(In US dollars)</div>
                                                    </div>
                                                </div>
                                                <div className={cx('form-row', 'margin-inital')}>
                                                    <div className={cx('form-group')}>
                                                        <div className={cx('form-label', 'small')}>
                                                            <label>Daily Budget</label>
                                                        </div>
                                                        <div className={cx('form-control')}>
                                                            <input
                                                                className={cx('form-input')}
                                                                type="number"
                                                                placeholder="Enter the overage you want to spend each day"
                                                                value={dailyBudgetEdit !== null ? dailyBudgetEdit : ''}
                                                                onChange={(e) => setDailyBudgetEdit(e.target.value)}
                                                            />
                                                        </div>
                                                        <div className={cx('form-desc', 'small')}>(In US dollars)</div>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                    <div className={cx('form-group')}></div>
                                </div>
                                {/* Schedule */}
                                <div className={cx('form-row')}>
                                    <div className={cx('form-group')}>
                                        <div className={cx('form-label')}>
                                            <label>From:</label>
                                        </div>
                                        <div ref={refStartDateEdit} className={cx('form-wrap-select')}>
                                            <div onClick={togglePopperStartDateEdit} className={cx('main')}>
                                                <span>{startDateEdit !== null ? startDateEdit : 'Start date'}</span>
                                                <img className={cx('icon')} alt="" src={images.dateIcon} />
                                            </div>
                                            <div
                                                className={
                                                    showPopperStartDateEdit === true
                                                        ? cx('wrap-list')
                                                        : cx('wrap-list', 'none')
                                                }
                                            >
                                                <div className={cx('popper-list', 'calendar')}>
                                                    <CalendarComponent
                                                        date={new Date(campaignEdit.start_date)}
                                                        setDateToString={setStartDateEdit}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('form-group')}>
                                        <div className={cx('form-label')}>
                                            <label>To:</label>
                                        </div>
                                        <div ref={refEndDateEdit} className={cx('form-wrap-select')}>
                                            <div onClick={togglePopperEndDateEdit} className={cx('main')}>
                                                <span className={cx('date-value')}>
                                                    {endDateEdit === null ? 'End date' : endDateEdit}
                                                </span>
                                                <img className={cx('icon')} alt="" src={images.dateIcon} />
                                            </div>
                                            <div
                                                className={
                                                    showPopperEndDateEdit === true
                                                        ? cx('wrap-list')
                                                        : cx('wrap-list', 'none')
                                                }
                                            >
                                                <div className={cx('popper-list', 'calendar')}>
                                                    <CalendarComponent
                                                        date={new Date(campaignEdit.end_date)}
                                                        setDateToString={setEndDateEdit}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('form-group')}>
                                        <div className={cx('form-group')}></div>
                                    </div>
                                </div>

                                {/* Objective  */}
                                <div className={cx('form-row')}>
                                    <div className={cx('form-group')}>
                                        <div className={cx('form-label')}>
                                            <label>Objective</label>
                                        </div>
                                        <div className={cx('form-control')}>
                                            <input
                                                type="text"
                                                className={cx('form-input')}
                                                placeholder="Enter Objective"
                                                value={objectiveEdit}
                                                onChange={(e) => setObjectiveEdit(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* Thumbnail */}
                                <div className={cx('form-row')}>
                                    <div className={cx('form-group')}>
                                        <div className={cx('form-label')}>
                                            <label>Thumbnail</label>
                                        </div>
                                        <div className={cx('container-file')}>
                                            <input
                                                type="file"
                                                onChange={handlePreviewThumbnail}
                                                id="uploadThumb"
                                                hidden
                                            />

                                            {previewThumbnail !== null ? (
                                                <label
                                                    onClick={() => {
                                                        setPreviewThumbnail(null);
                                                        setThumbnailEdit(null);
                                                    }}
                                                    className={cx('file-thumb', 'not-border', 'new')}
                                                >
                                                    <img className={cx('preview-img')} alt="" src={previewThumbnail} />
                                                    <img
                                                        className={cx('icon', 'x-icon')}
                                                        alt=""
                                                        src={images.xBorderIcon}
                                                    />
                                                </label>
                                            ) : (
                                                <label
                                                    htmlFor="uploadThumb"
                                                    className={cx('file-thumb', 'not-border', 'old')}
                                                >
                                                    <img
                                                        className={cx('preview-img')}
                                                        alt=""
                                                        src={`${BASE_URL_IMAGE}${campaignEdit.thumbnails[0].path}`}
                                                    />
                                                </label>
                                            )}
                                        </div>
                                    </div>
                                    <div className={cx('form-group')}></div>
                                    <div className={cx('form-group')}></div>
                                </div>

                                {/* Description */}
                                <div className={cx('form-row')}>
                                    <div className={cx('forn-group')}>
                                        <div className={cx('form-label')}>
                                            <label>Description</label>
                                        </div>
                                        <Editor
                                            style={{ height: '420px' }}
                                            value={descriptionEdit !== null ? descriptionEdit : ''}
                                            onTextChange={(e) => setDescriptionEdit(e.htmlValue)}
                                        />
                                    </div>
                                    <div className={cx('form-group')}></div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                </div>

                <div
                    onClick={() => setEditSuccess(null)}
                    className={cx('popper-overlay-edit', 'js-toggle')}
                    toggle-target="#popper-campaign-edit"
                ></div>

                {/* Delete Campagin */}
                <div id="popper-campaign-delete" className={cx('popper-notification-delete', 'hide')}>
                    {campaignDelete !== null ? (
                        <>
                            <div className={cx('wrap-content')}>
                                <p>Would you like to remove this Campaign? </p>
                                <p className={cx('name')}>{campaignDelete.name}</p>
                                <div className={cx('message', 'success')}>
                                    {messageDeleteSuccess !== null && messageDeleteSuccess}
                                </div>
                                <div className={cx('message', 'error')}>
                                    {messageDeleleteError !== null && messageDeleleteError}
                                </div>

                                <div onClick={() => handleRemoveCampaign(campaignDelete.id)} className={cx('btn')}>
                                    <button>Remove</button>
                                </div>
                                <button
                                    onClick={() => {
                                        setMessageDeleleError(null);
                                        setMessageDeleteSuccess(null);
                                    }}
                                    className={cx('btn', 'js-toggle')}
                                    toggle-target="#popper-campaign-delete"
                                >
                                    Don't Remove
                                </button>
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                </div>

                <div
                    onClick={() => {
                        setMessageDeleleError(null);
                        setMessageDeleteSuccess(null);
                    }}
                    className={cx('popper-overlay-delete', 'js-toggle')}
                    toggle-target="#popper-campaign-delete"
                ></div>
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
