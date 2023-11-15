import classNames from 'classnames/bind';
import styles from './CampaignDetail.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import useAxios from '~/hooks/useAxios';
import images from '~/assets/images';
import { InfinitySpin } from 'react-loader-spinner';
import CalendarComponent from '~/components/CalendarComponent';
import useOnClickOutside from '~/hooks/useOnclickOutside';
import { Editor } from 'primereact/editor';

const cx = classNames.bind(styles);

function CampaignDetail() {
    const NAVBAR = [
        {
            title: 'Proccessing',
            icon: images.listElementIcon,
        },
        {
            title: 'Timetable',
            icon: images.dateIcon,
        },
        {
            title: 'Attending Users',
            icon: images.multiUser,
        },
        {
            title: 'Statitics',
            icon: images.processIcon,
        },
        {
            title: 'Overal',
            icon: images.groupIcon,
        },
    ];

    let params = useParams();
    const axios = useAxios();

    const renderHeader = () => {
        return (
            <span className="ql-formats">
                <button className="ql-bold" aria-label="Bold"></button>
                <button className="ql-italic" aria-label="Italic"></button>
                <button className="ql-underline" aria-label="Underline"></button>
            </span>
        );
    };

    const header = renderHeader();

    const [campaignInfo, setCampaignInfo] = useState(null);
    const [schedules, setSchedules] = useState(null);
    const [itemNavActive, setItemNavActive] = useState(NAVBAR[0]);
    const [loading, setLoading] = useState(false);

    const [addNewSuccess, setAddNewSccess] = useState(null);

    const [listSuggestActivity, setListSuggestActivity] = useState([]);

    const refCalendarNewStartDate = useRef();
    const refCalendarNewEndDate = useRef();
    const refTypesActivity = useRef();

    const [showCalendarNewStartDate, setShowCalendarNewStartDate] = useState(false);
    const [showCalendarNewEndDate, setShowCalendarNewEndDate] = useState(false);
    const [showTypesActivity, setshowTypesActivity] = useState(false);
    const [showSuggestActivities, setShowSugestActivities] = useState(false);

    //New Schedule - Activity
    const [newStartDate, setNewStartDate] = useState(null);
    const [newEndDate, setNewEndDate] = useState(null);
    const [nameActivity, setNameActivity] = useState('');
    const [typeActitvity, setTypeActity] = useState(null);
    const [newDescriptionActivity, setNewDescriptionActivity] = useState('');

    // Edit Activity
    const [scheduleEdit, setScheduleEdit] = useState(null);
    const [activityEdit, setActivityEdit] = useState(null);
    const [nameActivityEdit, setNameActivityEdit] = useState(null);
    const [typeActivityEdit, setTypeActivityEdit] = useState(null);
    const [descriptionActivityEdit, setDescriptionActivityEdit] = useState(null);

    const refTypeOfActivitydit = useRef();
    const [showTypeOfActivittyEdit, setShowTypeOfActivityEdit] = useState(false);

    const toggleTypeOfActivityEdit = () => {
        setShowTypeOfActivityEdit(!showTypeOfActivittyEdit);
    };

    const hiddenTypeOfActivityEdit = () => {
        setShowTypeOfActivityEdit(false);
    };

    useOnClickOutside(refTypeOfActivitydit, hiddenTypeOfActivityEdit);

    // Edit Timetable in Schedule
    const [scheduleEditTimetable, setScheduleEditTimetable] = useState(null);

    const refCalendarStartDateEditTimetable = useRef();
    const refCalendarEndDateEditTimetable = useRef();
    const [showCalendarStartDateEditTimetable, setShowCalendarStartDateEditTimetable] = useState(false);
    const [showCalendarEndDateEditTimetable, setshowCalendatEndDateEditTimetbale] = useState(false);

    const [startDateTimetableEdit, setStartDateTimetableEdit] = useState(null);
    const [endDateTimetableEdit, setEndDateTimetableEdit] = useState(null);

    const toggleShowCalendarStartDateEditTimetable = () => {
        setShowCalendarStartDateEditTimetable(!showCalendarStartDateEditTimetable);
    };

    const hiddenCalendarStartDateEditTimetable = () => {
        setShowCalendarStartDateEditTimetable(false);
    };

    const toggleShowCalendarEndDateEditTimetable = () => {
        setshowCalendatEndDateEditTimetbale(!showCalendarEndDateEditTimetable);
    };

    const hiddenCalendarEndDateEditTimetbale = () => {
        setshowCalendatEndDateEditTimetbale(false);
    };

    useOnClickOutside(refCalendarEndDateEditTimetable, hiddenCalendarEndDateEditTimetbale);
    useOnClickOutside(refCalendarStartDateEditTimetable, hiddenCalendarStartDateEditTimetable);
    //End

    // Delete Activity
    const [activityDelete, setActivityDelete] = useState(null);
    const [scheduleBelongToActivityToDelete, setScheduleBelongToActivityToDelete] = useState(null);

    const toggleShowTypesActivity = () => {
        setshowTypesActivity(!showTypesActivity);
    };

    const toggleShowCalendarNewStartDate = () => {
        setShowCalendarNewStartDate(!showCalendarNewStartDate);
    };

    const toggleShowCalendarNewEndDate = () => {
        setShowCalendarNewEndDate(!showCalendarNewEndDate);
    };

    const hiddenCalendarNewStartDate = () => {
        setShowCalendarNewStartDate(false);
    };

    const hiddenCalendarNewEndDate = () => {
        setShowCalendarNewEndDate(false);
    };

    const hiddenTypesActivity = () => {
        setshowTypesActivity(false);
    };

    useOnClickOutside(refCalendarNewEndDate, hiddenCalendarNewEndDate);
    useOnClickOutside(refCalendarNewStartDate, hiddenCalendarNewStartDate);
    useOnClickOutside(refTypesActivity, hiddenTypesActivity);

    const formatDateFromBackend = (dateString) => {
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
        //   const year = dateObject.getFullYear(); // Get the year (e.g., 2023)

        const formattedDate = ` ${month} ${day}`; // Combine day, month, and year
        return formattedDate;
    };

    const fetInfoCampaign = async () => {
        setLoading(true);

        try {
            const response = await axios.get(`/api/campaign/slug=${params.campaignSlug}`, {
                withCredentials: true,
            });

            console.log(response.data);

            if (response.data.data) {
                setCampaignInfo(response.data.data);
            }

            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const fetSchedule = async () => {
        if (campaignInfo === null) {
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get(`api/campaign/get-schedule-activity/${campaignInfo.id}`, {
                withCredentials: true,
            });

            console.log(response.data);

            if (response.data.data) {
                setSchedules(response.data.data);
            }

            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetInfoCampaign(); // eslint-disable-next-line
    }, [params.campaignSlug]);

    useEffect(() => {
        fetSchedule(); // eslint-disable-next-line
    }, [campaignInfo]);

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

                        // $(target).classList.toggle('hide', setErrorMessageEdit(null));
                        // $(target).classList.toggle('hide', setSuccessMessageEdit(null));
                    });
                };
            });
        }

        initJsToggle();
    }, [loading, activityEdit, activityDelete, scheduleEdit, scheduleEditTimetable]);

    const fetchActivityByType = async (campaignId, id) => {
        if (!campaignId || !id) {
            return;
        }

        console.log(campaignId, id);

        try {
            const response = await axios.get(
                `/api/campaign/activities-by-type/${campaignId}?typeOfActivityId=${id}`,

                {
                    withCredentials: true,
                },
            );

            console.log(response.data);

            if (response.data.success === 'true') {
                setListSuggestActivity(response.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmitFormSearch = async (e) => {
        e.prevenDefault();
    };

    const handlePrepareSatementForEditActivity = (act, schedule) => {
        console.log(act);
        console.log(schedule);

        if (!act || !schedule) {
            return;
        }

        setScheduleEdit(schedule);
        setActivityEdit(act);

        setNameActivityEdit(act.name);
        setTypeActivityEdit(act.type_of_activity_id);

        if (act.description !== null) {
            setDescriptionActivityEdit(act.description);
        } else {
            setDescriptionActivityEdit('');
        }
    };

    const handlePrepareStatementForDeleteActivity = (act, schedule) => {
        if (!act || !schedule) {
            return;
        }

        setActivityDelete(act);
        setScheduleBelongToActivityToDelete(schedule);
    };

    const handlePrepareStatemntForEditTimetable = (schedule) => {
        console.log(schedule);
        if (!schedule) {
            return;
        }

        setScheduleEditTimetable(schedule);
    };

    const handleSubmitAddScheduleActivity = async () => {
        console.log('Start date: ', newStartDate);
        console.log('End date: ', newEndDate);
        console.log('Type activity: ', typeActitvity);
        console.log('Name act: ', nameActivity);
        console.log('Description: ', newDescriptionActivity);
    };

    return (
        <>
            <div className={cx('wrapper')}>
                {campaignInfo !== null ? (
                    <>
                        <div className={cx('header')}>
                            <h4>{campaignInfo.name}</h4>
                            <button className="js-toggle" toggle-target="#add-new-schedule">
                                Add new Schedule
                            </button>
                        </div>
                        <div className={cx('navbar')}>
                            <div className={cx('navbar-left')}>
                                {NAVBAR.map((item) => (
                                    <div
                                        onClick={() => setItemNavActive(item)}
                                        key={item.title}
                                        className={cx('filter-select-wrap')}
                                    >
                                        <div
                                            className={
                                                itemNavActive.title === item.title ? cx('main', 'action') : cx('main')
                                            }
                                        >
                                            <img className={cx('icon')} alt="" src={item.icon} />
                                            {item.title}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className={cx('navbar-right')}>
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
                                    <form method="post" onSubmit={handleSubmitFormSearch}>
                                        <button type="submit">
                                            <img className={cx('icon')} alt="" src={images.searchIncon} />
                                        </button>

                                        <input type="text" placeholder="Search Campaign" />
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className={cx('content')}>
                            {/* Proccessing */}
                            {itemNavActive.title === 'Proccessing' && (
                                <>
                                    <div className={cx('inner-content', 'content-proccess')}>
                                        {schedules !== null && schedules.length === 0 && (
                                            <div className={cx('no-data')}>
                                                <div className={cx('inner-box')}>
                                                    <img className={cx('icon')} alt="" src={images.noDataSource} />
                                                    <div className={cx('label')}>No data source</div>
                                                    <button className={cx('button')}>
                                                        Create a new data to continue
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {schedules !== null && schedules.length > 0 && (
                                            <>
                                                <div className={cx('list-activity')}>
                                                    {schedules.map((item, index) => (
                                                        <div key={index} className={cx('group-activity')}>
                                                            <div className={cx('decoration')}>
                                                                <div>
                                                                    <img
                                                                        className={cx('icon')}
                                                                        alt=""
                                                                        src={images.decorationIcon}
                                                                    />
                                                                </div>
                                                                <div className={cx('line-column')}></div>
                                                            </div>
                                                            <div className={cx('activities')}>
                                                                <div className={cx('schedule')}>
                                                                    <button>
                                                                        <span>
                                                                            {item.start_date === item.end_date ? (
                                                                                <>
                                                                                    On{' '}
                                                                                    {formatDateFromBackend(
                                                                                        item.start_date,
                                                                                    )}
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    Going on{' '}
                                                                                    {formatDateFromBackend(
                                                                                        item.start_date,
                                                                                    )}{' '}
                                                                                    -{' '}
                                                                                    {formatDateFromBackend(
                                                                                        item.end_date,
                                                                                    )}
                                                                                </>
                                                                            )}
                                                                        </span>
                                                                    </button>

                                                                    <button
                                                                        className={cx('push-btn', 'js-toggle')}
                                                                        toggle-target="#edit-timetable-schedule"
                                                                        onClick={() =>
                                                                            handlePrepareStatemntForEditTimetable(item)
                                                                        }
                                                                    >
                                                                        <img
                                                                            className={cx('icon')}
                                                                            alt=""
                                                                            src={images.penIcon}
                                                                        />
                                                                    </button>
                                                                </div>

                                                                <div className={cx('multi-activity')}>
                                                                    {item.activities.length > 0 ? (
                                                                        item.activities.map((act, index) => (
                                                                            <div
                                                                                key={index}
                                                                                className={cx('activity-item')}
                                                                            >
                                                                                <div>
                                                                                    <p>{act.name}</p>
                                                                                    <p>
                                                                                        Belong to:{' '}
                                                                                        <span>
                                                                                            {act.type_of_activity_id ===
                                                                                            3
                                                                                                ? 'System-genereated content'
                                                                                                : 'User-generated Content'}
                                                                                        </span>
                                                                                    </p>
                                                                                </div>
                                                                                {/* Edit  / Delete */}
                                                                                <div
                                                                                    className={cx('group-action-btns')}
                                                                                >
                                                                                    <button
                                                                                        className={cx(
                                                                                            'edit',
                                                                                            'js-toggle',
                                                                                        )}
                                                                                        toggle-target="#popper-edit-activity"
                                                                                        onClick={() =>
                                                                                            handlePrepareSatementForEditActivity(
                                                                                                act,
                                                                                                item,
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        <img
                                                                                            className={cx(
                                                                                                'icon',
                                                                                                'icon-small',
                                                                                            )}
                                                                                            alt=""
                                                                                            src={images.editIcon}
                                                                                        />
                                                                                    </button>
                                                                                    <button
                                                                                        className={cx(
                                                                                            'remove',
                                                                                            'js-toggle',
                                                                                        )}
                                                                                        toggle-target="#popper-activity-delete"
                                                                                        onClick={() =>
                                                                                            handlePrepareStatementForDeleteActivity(
                                                                                                act,
                                                                                                item,
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        <img
                                                                                            className={cx('icon')}
                                                                                            alt=""
                                                                                            src={images.xIcon}
                                                                                        />
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        ))
                                                                    ) : (
                                                                        <>
                                                                            <div
                                                                                className={cx('activity-item', 'label')}
                                                                            >
                                                                                <div className={cx('div-1')}></div>
                                                                                <div className={cx('div-2')}></div>
                                                                            </div>
                                                                        </>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}

                                                    {/* Statement */}
                                                    <div className={cx('group-activity')}>
                                                        <div className={cx('decoration')}>
                                                            <div>
                                                                <img
                                                                    className={cx('icon')}
                                                                    alt=""
                                                                    src={images.decorationIcon}
                                                                />
                                                            </div>
                                                            <div className={cx('line-column')}></div>
                                                        </div>
                                                        <div className={cx('activities')}>
                                                            <div className={cx('schedule')}>
                                                                <span>Going on ...</span>
                                                            </div>
                                                            <div className={cx('multi-activity')}>
                                                                <div className={cx('activity-item', 'label')}>
                                                                    <div className={cx('div-1')}></div>
                                                                    <div className={cx('div-2')}></div>
                                                                </div>
                                                                <div className={cx('activity-item', 'label')}>
                                                                    <div className={cx('div-1')}></div>
                                                                    <div className={cx('div-2')}></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* End statement  */}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </>
                            )}

                            {/* Timetable */}
                            {itemNavActive.title === 'Timetable' && (
                                <>
                                    <div className={cx('inner-content')}>About Timetable</div>
                                </>
                            )}

                            {/* Attending Users */}
                            {itemNavActive.title === 'Attending Users' && (
                                <>
                                    <div className={cx('inner-content')}>About Attending Users</div>
                                </>
                            )}

                            {/* Statitics */}
                            {itemNavActive.title === 'Statitics' && (
                                <>
                                    <div className={cx('inner-content')}>About Statitics</div>
                                </>
                            )}

                            {/* Overal */}
                            {itemNavActive.title === 'Overal' && (
                                <>
                                    <div className={cx('inner-content')}>About Overal</div>
                                </>
                            )}
                        </div>
                    </>
                ) : (
                    <></>
                )}
            </div>

            {loading && (
                <div className={cx('modal-infinity')}>
                    <div className={cx('overlay-infinity')}></div>
                    <div className={cx('wrap-loading-infinity')}>
                        <InfinitySpin width="160" color="#fff" />
                    </div>
                </div>
            )}

            {/* Add new Schedule */}
            <div id="add-new-schedule" className={cx('popper-notofication-edit', 'hide')}>
                <div className={cx('notification-top')}>
                    <div className={cx('title')}>
                        <img className={cx('icon')} alt="" src={images.penIcon} />
                    </div>
                    <div onClick={handleSubmitAddScheduleActivity} className={cx('send')}>
                        Send
                        <img className={cx('icon', 'icon-small')} alt="" src={images.sendIcon} />
                    </div>
                    {addNewSuccess === 'success' && (
                        <div className={cx('success')}>
                            <img className={cx('icon', 'icon-small')} alt="" src={images.editIcon} />
                            <span>Add new activity success</span>
                        </div>
                    )}
                    {addNewSuccess === 'error' && (
                        <div className={cx('error')}>
                            <img className={cx('icon', 'icon-small')} alt="" src={images.spinnerIcon} />
                            <span>Add new activity error</span>
                        </div>
                    )}
                    <button
                        className={cx('close-btn', 'js-toggle')}
                        toggle-target="#add-new-schedule"
                        onClick={() => setAddNewSccess(null)}
                    >
                        <img className={cx('icon')} alt="" src={images.xIcon} />
                    </button>
                </div>

                {campaignInfo === null ? (
                    <></>
                ) : (
                    <>
                        <div className={cx('content')}>
                            <div className={cx('head-content')}>
                                <div className={cx('name')}>
                                    <div className={cx('form-edit')}>
                                        <input
                                            type="text"
                                            value={campaignInfo !== null && campaignInfo.name}
                                            placeholder="Name's Campaign"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={cx('form-row')}>
                                <div className={cx('form-label', 'label-schedule')}>
                                    <div className={cx('label')}>Schedule:</div>
                                </div>
                            </div>
                            <div className={cx('separate')}>
                                <span className={cx('first')}></span>
                                <span className={cx('')}></span>
                                <span className={cx('')}></span>
                                <span className={cx('small')}></span>
                            </div>

                            {/* New Schedule */}
                            <div className={cx('form-row')}>
                                <div className={cx('form-group')}>
                                    <div className={cx('form-label')}>
                                        <label>From:</label>
                                    </div>
                                    <div ref={refCalendarNewStartDate} className={cx('form-wrap-select')}>
                                        <div onClick={toggleShowCalendarNewStartDate} className={cx('main')}>
                                            <span>{newStartDate !== null ? newStartDate : 'Start date'}</span>
                                            <img className={cx('icon')} alt="" src={images.dateIcon} />
                                        </div>
                                        <div
                                            className={
                                                showCalendarNewStartDate === true
                                                    ? cx('wrap-list')
                                                    : cx('wrap-list', 'none')
                                            }
                                        >
                                            <div className={cx('popper-list', 'calendar')}>
                                                <CalendarComponent
                                                    date={new Date(campaignInfo.start_date)}
                                                    setDateToString={setNewStartDate}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('form-group')}>
                                    <div className={cx('form-label')}>
                                        <label>To:</label>
                                    </div>
                                    <div ref={refCalendarNewEndDate} className={cx('form-wrap-select')}>
                                        <div onClick={toggleShowCalendarNewEndDate} className={cx('main')}>
                                            <span className={cx('date-value')}>
                                                {newEndDate === null ? 'End date' : newEndDate}
                                            </span>
                                            <img className={cx('icon')} alt="" src={images.dateIcon} />
                                        </div>
                                        <div
                                            className={
                                                showCalendarNewEndDate === true
                                                    ? cx('wrap-list')
                                                    : cx('wrap-list', 'none')
                                            }
                                        >
                                            <div className={cx('popper-list', 'calendar')}>
                                                <CalendarComponent
                                                    date={new Date(campaignInfo.end_date)}
                                                    setDateToString={setNewEndDate}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Type Activity */}
                            <div className={cx('form-row')}>
                                <div className={cx('form-group')}>
                                    <div className={cx('form-label')}>
                                        <label>Type of Activity*</label>
                                    </div>
                                    <div ref={refTypesActivity} className={cx('filter-form-group')}>
                                        <div onClick={toggleShowTypesActivity} className={cx('filter-select-wrap')}>
                                            <div className={cx('wrap-select')}>
                                                <span className={cx('value')}>
                                                    {typeActitvity === null ? 'Choose tyoe of activity' : typeActitvity}
                                                </span>

                                                <span className={cx('group-btn')}>
                                                    <span>
                                                        <img className={cx('icon')} alt="" src={images.addIcon} />
                                                    </span>
                                                    <span>
                                                        {' '}
                                                        <img className={cx('icon')} alt="" src={images.arrowDownIcon} />
                                                    </span>
                                                </span>
                                            </div>

                                            <div
                                                className={
                                                    showTypesActivity === true
                                                        ? cx('category-list')
                                                        : cx('category-list', 'none')
                                                }
                                            >
                                                <img className={cx('arrow-up')} alt="" src={images.arrowUp} />
                                                <div className={cx('popper-list')}>
                                                    <div
                                                        onClick={() => {
                                                            fetchActivityByType(campaignInfo.id, 1);
                                                            setTypeActity('User-generated Content');
                                                        }}
                                                        className={
                                                            typeActitvity === 'User-generated Content'
                                                                ? cx('popper-item', 'active')
                                                                : cx('popper-item')
                                                        }
                                                    >
                                                        <img className={cx('icon')} alt="" src={images.pushIcon} />
                                                        <span>User-generated Content</span>
                                                    </div>
                                                    <div
                                                        onClick={() => {
                                                            fetchActivityByType(campaignInfo.id, 3);
                                                            setTypeActity('System-generated Content');
                                                        }}
                                                        className={
                                                            typeActitvity === 'System-generated Content'
                                                                ? cx('popper-item', 'active')
                                                                : cx('popper-item')
                                                        }
                                                    >
                                                        <img className={cx('icon')} alt="" src={images.pushIcon} />
                                                        <span>System-generated Content</span>
                                                    </div>
                                                    <div
                                                        onClick={() => {
                                                            setTypeActity(null);
                                                            setListSuggestActivity([]);
                                                        }}
                                                        className={cx('popper-item')}
                                                    >
                                                        <img className={cx('icon')} alt="" src={images.pushIcon} />
                                                        <span>Other</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Name Activity  */}
                            <div className={cx('form-row')}>
                                <div className={cx('form-group')}>
                                    <div className={cx('form-label')}>
                                        <label htmlFor="nameA">Title Actitvity*</label>
                                    </div>
                                    <div className={cx('form-control', 'no-border', 'form-activity-name')}>
                                        <input
                                            className={
                                                showSuggestActivities === true
                                                    ? cx('form-input', 'special', 'active')
                                                    : cx('form-input', 'special')
                                            }
                                            type="text"
                                            id="nameA"
                                            placeholder="Untitled"
                                            value={nameActivity}
                                            onChange={(e) => setNameActivity(e.target.value)}
                                            onFocus={() => setShowSugestActivities(true)}
                                            onDoubleClick={() => setShowSugestActivities(false)}
                                            onBlur={() => setShowSugestActivities(false)}
                                        />
                                        <div
                                            className={
                                                showSuggestActivities === true && listSuggestActivity.length > 0
                                                    ? cx('suggest-open')
                                                    : cx('suggest-open', 'none')
                                            }
                                        >
                                            {listSuggestActivity.length > 0 &&
                                                listSuggestActivity.map((item) => (
                                                    <div
                                                        onClick={() => setNameActivity(item.name)}
                                                        className={cx('item')}
                                                    >
                                                        <span>{item.name}</span>
                                                        <img
                                                            className={cx('icon', 'suggest-icon')}
                                                            alt=""
                                                            src={images.suggestIcon}
                                                        />
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Description Activity  */}

                            <div className={cx('form-row')}>
                                <div className={cx('form-group')}>
                                    <div className={cx('form-label')}>
                                        <label htmlFor="name">Description</label>
                                    </div>
                                    <div className={cx('form-control', 'no-border', 'form-activity-name')}>
                                        <Editor
                                            value={newDescriptionActivity}
                                            onTextChange={(e) => setNewDescriptionActivity(e.delta.htmlValue)}
                                            headerTemplate={header}
                                            style={{ height: '220px' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <div className={cx('popper-overlay-edit', 'js-toggle')} toggle-target="#add-new-schedule"></div>
            {/* End */}

            {/* Edit activity Schedule */}
            <div id="popper-edit-activity" className={cx('popper-edit-schedule', 'hide')}>
                <div className={cx('notification-top')}>
                    <div className={cx('title')}>
                        <img className={cx('icon')} alt="" src={images.penIcon} />
                    </div>
                    <div className={cx('send')}>
                        Send
                        <img className={cx('icon', 'icon-small')} alt="" src={images.sendIcon} />
                    </div>

                    <button className={cx('close-btn', 'js-toggle')} toggle-target="#popper-edit-activity">
                        <img className={cx('icon')} alt="" src={images.xIcon} />
                    </button>
                </div>

                {scheduleEdit !== null ? (
                    <>
                        <div className={cx('content')}>
                            <div className={cx('head-content')}>
                                <div className={cx('name')}>
                                    <div className={cx('form-edit')}>
                                        <input
                                            type="text"
                                            value={campaignInfo !== null && campaignInfo.name}
                                            placeholder="Name's Campaign"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={cx('form-row')}>
                                <div className={cx('form-label', 'label-schedule')}>
                                    <div className={cx('label')}>Schedule:</div>
                                </div>
                            </div>
                            <div className={cx('separate')}>
                                <span className={cx('first')}></span>
                                <span className={cx('')}></span>
                                <span className={cx('')}></span>
                                <span className={cx('small')}></span>
                            </div>

                            {/* New Schedule */}
                            <div className={cx('form-row')}>
                                <div className={cx('form-group')}>
                                    <div className={cx('form-label')}>
                                        <label>From:</label>
                                    </div>
                                    <div className={cx('form-wrap-select')}>
                                        <div className={cx('main')}>
                                            <span>{formatDateFromBackend(scheduleEdit.start_date)}</span>
                                            <img className={cx('icon')} alt="" src={images.dateIcon} />
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('form-group')}>
                                    <div className={cx('form-label')}>
                                        <label>To:</label>
                                    </div>
                                    <div className={cx('form-wrap-select')}>
                                        <div className={cx('main')}>
                                            <span className={cx('date-value')}>
                                                {formatDateFromBackend(scheduleEdit.end_date)}
                                            </span>
                                            <img className={cx('icon')} alt="" src={images.dateIcon} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Type Activity */}
                            <div className={cx('form-row')}>
                                <div className={cx('form-group')}>
                                    <div className={cx('form-label')}>
                                        <label>Type of Activity*</label>
                                    </div>
                                    <div ref={refTypeOfActivitydit} className={cx('filter-form-group')}>
                                        <div onClick={toggleTypeOfActivityEdit} className={cx('filter-select-wrap')}>
                                            <div className={cx('wrap-select')}>
                                                <span className={cx('value')}>
                                                    {typeActivityEdit === null && 'Choose tyoe of activity'}
                                                    {typeActivityEdit === 1 && 'User-generated Content'}
                                                    {typeActivityEdit === 3 && 'System-generated Content'}
                                                </span>

                                                <span className={cx('group-btn')}>
                                                    <span>
                                                        <img className={cx('icon')} alt="" src={images.addIcon} />
                                                    </span>
                                                    <span>
                                                        {' '}
                                                        <img className={cx('icon')} alt="" src={images.arrowDownIcon} />
                                                    </span>
                                                </span>
                                            </div>

                                            <div
                                                className={
                                                    showTypeOfActivittyEdit === true
                                                        ? cx('category-list')
                                                        : cx('category-list', 'none')
                                                }
                                            >
                                                <img className={cx('arrow-up')} alt="" src={images.arrowUp} />
                                                <div className={cx('popper-list')}>
                                                    <div
                                                        onClick={() => {
                                                            setTypeActivityEdit(1);
                                                        }}
                                                        className={
                                                            typeActivityEdit === 1
                                                                ? cx('popper-item', 'active')
                                                                : cx('popper-item')
                                                        }
                                                    >
                                                        <img className={cx('icon')} alt="" src={images.pushIcon} />
                                                        <span>User-generated Content</span>
                                                    </div>
                                                    <div
                                                        onClick={() => {
                                                            setTypeActivityEdit(3);
                                                        }}
                                                        className={
                                                            typeActivityEdit === 3
                                                                ? cx('popper-item', 'active')
                                                                : cx('popper-item')
                                                        }
                                                    >
                                                        <img className={cx('icon')} alt="" src={images.pushIcon} />
                                                        <span>System-generated Content</span>
                                                    </div>
                                                    <div onClick={() => {}} className={cx('popper-item')}>
                                                        <img className={cx('icon')} alt="" src={images.pushIcon} />
                                                        <span>Other</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Name Activity  */}
                            <div className={cx('form-row')}>
                                <div className={cx('form-group')}>
                                    <div className={cx('form-label')}>
                                        <label htmlFor="name">Title Actitvity*</label>
                                    </div>
                                    <div className={cx('form-control', 'no-border', 'form-activity-name')}>
                                        <input
                                            className={
                                                showSuggestActivities === true
                                                    ? cx('form-input', 'special', 'active')
                                                    : cx('form-input', 'special')
                                            }
                                            type="text"
                                            id="name"
                                            placeholder="Untitled"
                                            value={nameActivityEdit}
                                            onChange={(e) => setNameActivityEdit(e.target.value)}
                                            onFocus={() => setShowSugestActivities(true)}
                                            onDoubleClick={() => setShowSugestActivities(false)}
                                            onBlur={() => setShowSugestActivities(false)}
                                        />
                                        <div
                                            className={
                                                showSuggestActivities === true && listSuggestActivity.length > 0
                                                    ? cx('suggest-open')
                                                    : cx('suggest-open', 'none')
                                            }
                                        >
                                            {listSuggestActivity.length > 0 &&
                                                listSuggestActivity.map((item) => (
                                                    <div
                                                        onClick={() => setNameActivity(item.name)}
                                                        className={cx('item')}
                                                    >
                                                        <span>{item.name}</span>
                                                        <img
                                                            className={cx('icon', 'suggest-icon')}
                                                            alt=""
                                                            src={images.suggestIcon}
                                                        />
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Description Activity  */}

                            <div className={cx('form-row')}>
                                <div className={cx('form-group')}>
                                    <div className={cx('form-label')}>
                                        <label htmlFor="name">Description</label>
                                    </div>
                                    <div className={cx('form-control', 'no-border', 'form-activity-name')}>
                                        <Editor
                                            value={descriptionActivityEdit}
                                            onTextChange={(e) => setDescriptionActivityEdit(e.htmlValue)}
                                            headerTemplate={header}
                                            style={{ height: '220px' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <></>
                )}
            </div>
            <div className={cx('popper-overlay-schedule', 'js-toggle')} toggle-target="#popper-edit-activity"></div>
            {/* End */}

            {/* Edit Timetable Schedule */}
            <div id="edit-timetable-schedule" className={cx('popper-edit-timetable', 'hide')}>
                <div className={cx('notification-top')}>
                    <div className={cx('title')}>
                        <img className={cx('icon')} alt="" src={images.penIcon} />
                    </div>
                    <div className={cx('send')}>
                        Send
                        <img className={cx('icon', 'icon-small')} alt="" src={images.sendIcon} />
                    </div>

                    <button className={cx('close-btn', 'js-toggle')} toggle-target="#edit-timetable-schedule">
                        <img className={cx('icon')} alt="" src={images.xIcon} />
                    </button>
                </div>

                {scheduleEditTimetable !== null ? (
                    <>
                        <div className={cx('content')}>
                            <div className={cx('head-content')}>
                                <div className={cx('name')}>
                                    <div className={cx('form-edit')}>
                                        <input
                                            type="text"
                                            value={campaignInfo !== null && campaignInfo.name}
                                            placeholder="Name's Campaign"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={cx('form-row')}>
                                <div className={cx('form-label', 'label-schedule')}>
                                    <div className={cx('label')}>Schedule:</div>
                                </div>
                            </div>
                            <div className={cx('separate')}>
                                <span className={cx('first')}></span>
                                <span className={cx('')}></span>
                                <span className={cx('')}></span>
                                <span className={cx('small')}></span>
                            </div>

                            <div className={cx('form-row')}>
                                <div className={cx('form-group')}>
                                    <div className={cx('form-label')}>
                                        <label>From:</label>
                                    </div>
                                    <div ref={refCalendarStartDateEditTimetable} className={cx('form-wrap-select')}>
                                        <div onClick={toggleShowCalendarStartDateEditTimetable} className={cx('main')}>
                                            <span>
                                                {startDateTimetableEdit === null
                                                    ? formatDateFromBackend(scheduleEditTimetable.start_date)
                                                    : startDateTimetableEdit}
                                            </span>
                                            <img className={cx('icon')} alt="" src={images.dateIcon} />
                                        </div>
                                        <div
                                            className={
                                                showCalendarStartDateEditTimetable === true
                                                    ? cx('wrap-list')
                                                    : cx('wrap-list', 'none')
                                            }
                                        >
                                            <div className={cx('popper-list', 'calendar')}>
                                                <CalendarComponent setDateToString={setStartDateTimetableEdit} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('form-group')}>
                                    <div className={cx('form-label')}>
                                        <label>To:</label>
                                    </div>
                                    <div ref={refCalendarEndDateEditTimetable} className={cx('form-wrap-select')}>
                                        <div onClick={toggleShowCalendarEndDateEditTimetable} className={cx('main')}>
                                            <span className={cx('date-value')}>
                                                {endDateTimetableEdit === null
                                                    ? formatDateFromBackend(scheduleEditTimetable.end_date)
                                                    : endDateTimetableEdit}
                                            </span>
                                            <img className={cx('icon')} alt="" src={images.dateIcon} />
                                        </div>
                                        <div
                                            className={
                                                showCalendarEndDateEditTimetable === true
                                                    ? cx('wrap-list')
                                                    : cx('wrap-list', 'none')
                                            }
                                        >
                                            <div className={cx('popper-list', 'calendar')}>
                                                <CalendarComponent setDateToString={setEndDateTimetableEdit} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <></>
                )}
            </div>
            <div className={cx('popper-overlay-timetable', 'js-toggle')} toggle-target="#edit-timetable-schedule"></div>

            {/* End */}

            {/* Delete Activity */}
            <div id="popper-activity-delete" className={cx('popper-notification-delete', 'hide')}>
                {activityDelete !== null ? (
                    <>
                        <div className={cx('wrap-content')}>
                            <p>Would you like to remove this Activity? </p>
                            <p className={cx('name')}>{activityDelete.name}</p>
                            <div className={cx('message', 'success')}></div>
                            <div className={cx('message', 'error')}></div>

                            <div className={cx('btn')}>
                                <button>Remove</button>
                            </div>
                            <button className={cx('btn', 'js-toggle')} toggle-target="#popper-activity-delete">
                                Don't Remove
                            </button>
                        </div>
                    </>
                ) : (
                    <></>
                )}
            </div>

            <div className={cx('popper-overlay-delete', 'js-toggle')} toggle-target="#popper-activity-delete"></div>
            {/* End */}
        </>
    );
}

export default CampaignDetail;
