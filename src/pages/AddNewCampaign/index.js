import classNames from 'classnames/bind';
import styles from './AddNewCampaign.module.scss';
import images from '~/assets/images';
import React, { useState, useRef, useEffect } from 'react';
import useOnClickOutside from '~/hooks/useOnclickOutside';
import CalendarComponent from '~/components/CalendarComponent';
import useAxios from '~/hooks/useAxios';
import HTMLREndered from '~/components/HTMLRendered';
import { Editor } from 'primereact/editor';
import { InfinitySpin } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function AddNewCampaign() {
    const SEQUENCE_PROCESS = [
        {
            step: 1,
            title: 'Type of Campaign',
            icon: images.typeIcon,
        },
        {
            step: 2,
            title: 'Introduce about Campaign',
            icon: images.introIcon,
        },
        {
            step: 3,
            title: 'Create Social content',
            icon: images.socialContentIcon,
        },
        {
            step: 4,
            title: 'Planned Activities',
            icon: images.planIcon,
        },
        {
            step: 5,
            title: 'Publish Campaign',
            icon: images.upgradeIcon,
        },
    ];

    const FAKE_CHANNELS = [
        {
            id: 1,
            title: 'Website',
        },
        {
            id: 2,
            title: 'Facebook',
        },
        {
            id: 3,
            title: ' Twitter',
        },
        {
            id: 4,
            title: 'Linked',
        },
    ];

    const FAKE_BREAD = [
        {
            id: 1,
            title: 'About',
        },
        {
            id: 2,
            title: 'Activity',
        },
        {
            id: 3,
            title: 'Resources',
        },
    ];

    const navigate = useNavigate();
    const axios = useAxios();
    const [loading, setLoading] = useState(false);
    const [listTypeOfCampaign, setListTypeOfCampaign] = useState(null);
    const [inProcess, setInProcess] = useState(1);
    const [taskDone, setTaskDone] = useState([]);
    const refChannels = useRef();
    const [showPopperChannels, setShowPopperChannels] = useState(false);
    const refCalendarStartDate = useRef();
    const refCalandarEndDate = useRef();
    const refCalendarStartDateActivity = useRef();
    const refCalendarEndDateActivity = useRef();

    const [showCalendarStartDate, setShowCalendarStartDate] = useState(false);
    const [showCalandarEndDate, setShowCalendaeEndDate] = useState(false);
    const [showCalendarStartDateActivity, setShowCalendarStartDateActivity] = useState(false);
    const [showCalendarEndDateActivity, setShowCalendarEndDateActivity] = useState(false);
    const [showDetailsTypeCampaign, setshowDetailsTypeCampaign] = useState([]);
    const [breadActive, setBreadActive] = useState('About');

    //INFORMATION ABOUNT NEW CAMPAIGN
    const [channels, setChannels] = useState(null);
    const [budgetIsChecked, setBudgetIsCheced] = useState(false);
    const [activityIsChecked, setActivityIsChecked] = useState(true);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [idTypeOfCampaign, setIdTypeOfCampaign] = useState(null);
    const [content, setContent] = useState('');
    const [previewThumbnail, setPreviewThumbnail] = useState(null);
    const [image, setImage] = useState(null);

    const [nameCampaign, setNameCampaign] = useState('');
    const [objective, setObjective] = useState('');
    const [totalBudget, setTotalBudget] = useState(null);
    const [dailyBudget, setDailyBudget] = useState(null);
    const [messageErrorDate, setMessageErrorDate] = useState(null);

    const [createdSuccess, setCreatedSuccess] = useState(false);
    const [CAMPAIGN_ID, setCAMPAIGN_ID] = useState(null);

    //MESSAGE ERROR
    const [messageErrorDateSchedule, setMessageErrorDateSchedule] = useState(null);
    const [messageNameExistInActivity, setMessageNameExistInActivity] = useState(null);
    const [messageNameExistInCampaign, setMessageNameExistInCampaign] = useState(null);
    //END

    //INFORMATION AVTIVITY BELONGS TO CAMPAIGN
    const [nameActivity, setNameActivity] = useState('');
    const [startDateActivity, setStartDateActivity] = useState(null);
    const [endDateActivity, setEndDateActivity] = useState(null);
    const [dateActivityValid, setDateActivityValid] = useState(false);
    const [typeActitvity, setTypeActity] = useState(null);
    const [idTypeActivity, setIdTypeActivity] = useState(null);

    //END
    const [listActivity, setListActivity] = useState([]);
    const [schedule, setSchedule] = useState(null);

    const refTypesActivity = useRef();
    const [showTypesActivity, setshowTypesActivity] = useState(false);
    const [showSuggestActivities, setShowSugestActivities] = useState(false);

    const [loadingPush, setLoadingPush] = useState(false);

    const [listActivityScheduleInital, setListActivityScheduleInital] = useState(null);

    const fetchListActivityAchedule = async (campaignId) => {
        try {
            const response = await axios.get(`/api/campaign/get-schedule-activity/${campaignId}`, {
                withCredentials: true,
            });

            console.log(response.data);

            if (response.data.data) {
                setListActivityScheduleInital(response.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (startDate === null || endDate === null || startDateActivity === null || endDateActivity === null) {
            setDateActivityValid(false);
            return;
        }

        const compareStartDateVsBegin = compareDates(startDateActivity, startDate);
        const compareStartDateVsEnd = compareDates(startDate, endDate);

        const compareStartDateVsEndDate = compareDates(startDateActivity, endDateActivity);

        const compareEndDateVsEnd = compareDates(endDateActivity, endDate);
        const compareEndDateVsStart = compareDates(endDateActivity, startDate);

        if (compareStartDateVsEndDate === 1) {
            setDateActivityValid(false);
            return;
        }

        if (
            (compareStartDateVsBegin === 0 || compareStartDateVsBegin === 1) &&
            (compareStartDateVsEnd === 0 || compareStartDateVsEnd === -1) &&
            (compareEndDateVsEnd === 0 || compareEndDateVsEnd === -1) &&
            (compareEndDateVsStart === 0 || compareEndDateVsStart === 1)
        ) {
            setDateActivityValid(true);
        } else {
            setDateActivityValid(false);
        } // eslint-disable-next-line
    }, [startDateActivity, endDateActivity]);

    const toggleShowTypesActivity = () => {
        setshowTypesActivity(!showTypesActivity);
    };

    const hiddenTypesActivity = () => {
        setshowTypesActivity(false);
    };

    useOnClickOutside(refTypesActivity, hiddenTypesActivity);

    const tranferDate = (dateString) => {
        const parts = dateString.split('-');
        let dateObject;
        if (parts.length === 3) {
            // Create a new Date object with the parsed day, month, and year
            dateObject = new Date(parts[2], parts[1] - 1, parts[0]);
        }
        return dateObject;
    };

    const formatDate = (dateString) => {
        const dateObject = tranferDate(dateString);
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

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(previewThumbnail);
        };
    }, [previewThumbnail]);

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
    }, [content]);

    const handlePreviewThumbnail = (e) => {
        const file = e.target.files[0];

        if (file) {
            file.preview = URL.createObjectURL(file);
            setPreviewThumbnail(file.preview);
            setImage(file);
        }
    };

    const handleShowDetails = (id) => {
        if (showDetailsTypeCampaign.indexOf(id) === -1) {
            const result = [...showDetailsTypeCampaign, id];
            setshowDetailsTypeCampaign(result);
        } else {
            const newArray = showDetailsTypeCampaign.filter((element) => element !== id);
            setshowDetailsTypeCampaign(newArray);
        }
    };

    const fetchTypesOfCampaign = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/types-of-campaign/getAll', {
                withCredentials: true,
            });

            console.log(response.data);

            if (response.data) {
                setListTypeOfCampaign(response.data);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTypesOfCampaign(); // eslint-disable-next-line
    }, []);

    const toggleShowCalendarEndDate = () => {
        setShowCalendaeEndDate(!showCalandarEndDate);
    };

    const hiddenCalendarEndDate = () => {
        setShowCalendaeEndDate(false);
    };

    const toggleShowCalendarStartDateActivity = () => {
        setShowCalendarStartDateActivity(!showCalendarStartDateActivity);
    };

    const hiddenCalendarStartDateActivity = () => {
        setShowCalendarStartDateActivity(false);
    };

    const toggleShowCalendarEndDateActvity = () => {
        setShowCalendarEndDateActivity(!showCalendarEndDateActivity);
    };

    const hiddenCalendarEndDateActivity = () => {
        setShowCalendarEndDateActivity(false);
    };

    useOnClickOutside(refCalendarStartDateActivity, hiddenCalendarStartDateActivity);

    useOnClickOutside(refCalendarEndDateActivity, hiddenCalendarEndDateActivity);

    useOnClickOutside(refCalandarEndDate, hiddenCalendarEndDate);

    const toggleShowCalendarStartDate = () => {
        setShowCalendarStartDate(!showCalendarStartDate);
    };

    const hiddenCalendarStartDate = () => {
        setShowCalendarStartDate(false);
    };

    useOnClickOutside(refCalendarStartDate, hiddenCalendarStartDate);

    const handleCheckBoxBudgetChange = (event) => {
        const isChecked = event.target.checked;
        setBudgetIsCheced(isChecked);
    };

    const handleCheckboxShowFormActivity = (event) => {
        const isChecked = event.target.checked;

        setActivityIsChecked(isChecked);
        console.log(activityIsChecked);
    };

    const toggleShowPopperChannels = () => {
        setShowPopperChannels(!showPopperChannels);
    };

    const hiddenPopperChannels = () => {
        setShowPopperChannels(false);
    };

    useOnClickOutside(refChannels, hiddenPopperChannels);

    function compareDates(date1, date2) {
        const parseDate = (dateString) => {
            const [day, month, year] = dateString.split('-').map(Number);
            // Month in JavaScript Date is 0-indexed, so subtract 1
            return new Date(year, month - 1, day);
        };

        const d1 = parseDate(date1);
        const d2 = parseDate(date2);

        if (d1 < d2) {
            return -1;
        } else if (d1 > d2) {
            return 1;
        } else {
            return 0;
        }
    }

    const handleSubmitStep1 = async (e) => {
        e.preventDefault();

        if (nameCampaign === '' || objective === '' || startDate === null || endDate === null) {
            return;
        }

        const compareDate = compareDates(startDate, endDate);
        if (compareDate === 0 || compareDate === 1) {
            setMessageErrorDate('The start date and end date in Campaign is not valid!');
            return;
        } else {
            setMessageErrorDate(null);
        }

        try {
            setLoading(true);
            const response = await axios.post(
                '/api/campaign/check-name',
                {
                    name: nameCampaign,
                },
                {
                    withCredentials: true,
                },
            );

            console.log(response.data);

            if (response.data.success === 'true') {
                setMessageNameExistInCampaign(null);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            if (error.response.status === 400) {
                setMessageNameExistInCampaign(`${nameCampaign} is existed!`);
            }

            setLoading(false);
            return;
        }

        setInProcess(3);
        setTaskDone([1, 2]);
    };

    const handleAddSchedule = (e) => {
        e.preventDefault();

        console.log(dateActivityValid);

        if (dateActivityValid === true) {
            setMessageErrorDateSchedule(null);
            const data = {
                startDate: startDateActivity,
                endDate: endDateActivity,
            };

            console.log(data);

            setSchedule(data);
            console.log(schedule);
        } else {
            setMessageErrorDateSchedule('Date was choosen conflict with date instance in Campaingn!');
        }
    };

    const handleAddActivityToSchedule = async (e) => {
        e.preventDefault();

        if (nameActivity === '' && typeActitvity === null) {
            return;
        }

        // check name not sample

        const newActivity = {
            name: nameActivity,
            typeOfActivityId: idTypeActivity,
        };

        let newArray = [];

        if (listActivity !== null) {
            newArray = listActivity;
        }

        // Check if the name already exists in the array
        let isNameUnique = !newArray.some((obj) => obj.name === newActivity.name);

        // If the name is unique, add the new object
        if (isNameUnique) {
            setMessageNameExistInActivity(null);
            newArray.push(newActivity);
            setListActivity(newArray);

            setTypeActity(null);
            setIdTypeActivity(null);
            setNameActivity('');
        } else {
            setMessageNameExistInActivity('This name is esited. Please try again!');
        }
    };

    const handleRemoteActivity = (item) => {
        if (listActivity.indexOf(item) === -1) {
            return;
        } else {
            const newArray = listActivity.filter((element) => element !== item);
            setListActivity(newArray);
        }
    };

    const handleStoreCampaign = async (e) => {
        e.preventDefault();
        if (createdSuccess === true) {
            return;
        }
        console.log(image);

        if (image === null || content === '') {
            return;
        }
        setLoading(true);

        const formData = new FormData();
        formData.append('thumb', image);
        formData.append('name', nameCampaign);
        formData.append('typeCampaignId', idTypeOfCampaign);
        formData.append('objective', objective);
        formData.append('startDate', startDate);
        formData.append('endDate', endDate);
        formData.append('description', content);

        if (totalBudget !== null) {
            formData.append('budget', totalBudget);
        }

        if (dailyBudget !== null) {
            formData.append('dailyBudget', dailyBudget);
        }

        try {
            const response = await axios.post('/api/campaign/store', formData, {
                withCredentials: true,
            });

            console.log(response);
            if (response.data.success === 'true') {
                setCreatedSuccess(true);
                setCAMPAIGN_ID(response.data.data.id); // save id campaign id
                setInProcess(4);
                setTaskDone([1, 2, 3]);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const handlePushActivities = async () => {
        console.log(listActivity);
        console.log(schedule);
        console.log(CAMPAIGN_ID);
        if (listActivity.length === 0 || CAMPAIGN_ID === null) {
            return;
        }
        setLoadingPush(true);

        const formData = new FormData();
        formData.append('startDate', schedule.startDate);
        formData.append('endDate', schedule.endDate);
        //  formData.append('muliActivity', listActivity);

        try {
            const response = await axios.post(
                `/api/campaign/store-activity-schedule/${CAMPAIGN_ID}`,
                {
                    startDate: schedule.startDate,
                    endDate: schedule.endDate,
                    multiActivity: listActivity,
                },
                {
                    withCredentials: true,
                },
            );

            console.log(response.data.data);

            fetchListActivityAchedule(CAMPAIGN_ID);
            setSchedule(null);
            setStartDateActivity(null);
            setEndDateActivity(null);
            setListActivity([]);
            setLoadingPush(false);
        } catch (error) {
            console.log(error);
            setLoadingPush(false);
        }
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('sidebar')}>
                    <header className={cx('header')}>
                        <h3>On boading plan for New Campaign</h3>
                        <p>Track & Modify existing campaign, or create a new one.</p>
                    </header>
                    <div className={cx('process')}>
                        {SEQUENCE_PROCESS.map((item) => (
                            <div
                                className={
                                    (inProcess === item.step) | (taskDone.indexOf(item.step) !== -1)
                                        ? cx('process-item', 'active')
                                        : cx('process-item')
                                }
                                key={item.step}
                            >
                                {taskDone.indexOf(item.step) !== -1 ? (
                                    <>
                                        <img className={cx('done-icon')} alt="" src={images.doneIcon} />
                                    </>
                                ) : (
                                    <>
                                        <div className={cx('wrap-icon')}>
                                            <img className={cx('icon')} alt="" src={item.icon} />
                                        </div>
                                    </>
                                )}

                                <div className={cx('process-desc')}>
                                    <span className={cx('process-sequence')}>#Step {item.step}</span>
                                    <p>{item.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={cx('content')}>
                    {inProcess === 1 || inProcess === null ? (
                        <>
                            <div className={cx('details-campaign')}>
                                <div className={cx('head')}>
                                    <h4>Details Campaign:</h4> <p>Type of Campaign</p>
                                </div>

                                <div className={cx('form', 'not-background-color')}>
                                    <div className={cx('list-types-of-campaign')}>
                                        {listTypeOfCampaign !== null ? (
                                            <>
                                                {listTypeOfCampaign.map((type) => (
                                                    <div key={type.id} className={cx('item')}>
                                                        <div className={cx('wrap-item')}>
                                                            <div className={cx('info')}>
                                                                <div className={cx('left')}>
                                                                    <div className={cx('row-1')}>
                                                                        <p onClick={() => handleShowDetails(type.id)}>
                                                                            {type.name}
                                                                        </p>
                                                                        <span>{type.state}</span>
                                                                    </div>
                                                                    <div className={cx('row-2')}>
                                                                        <span className={cx('tag')}></span>
                                                                        <span>hasManyCampaign: 0 </span>
                                                                    </div>
                                                                </div>
                                                                <div className={cx('right')}>
                                                                    {idTypeOfCampaign === type.id ? (
                                                                        <>
                                                                            <button
                                                                                onClick={() =>
                                                                                    setIdTypeOfCampaign(null)
                                                                                }
                                                                                className={cx('remove-type')}
                                                                            >
                                                                                <img
                                                                                    className={cx('icon')}
                                                                                    alt=""
                                                                                    src={images.trashIcon}
                                                                                />
                                                                                Remove
                                                                            </button>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <button
                                                                                onClick={() =>
                                                                                    setIdTypeOfCampaign(type.id)
                                                                                }
                                                                                className={cx('add-type')}
                                                                            >
                                                                                <img
                                                                                    className={cx('icon')}
                                                                                    alt=""
                                                                                    src={images.addIcon}
                                                                                />
                                                                                Add
                                                                            </button>
                                                                        </>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <div
                                                                className={
                                                                    showDetailsTypeCampaign.indexOf(type.id) !== -1
                                                                        ? cx('details-info')
                                                                        : cx('details-info', 'none')
                                                                }
                                                            >
                                                                <div className={cx('separate')}>
                                                                    <figure>
                                                                        <img
                                                                            className={cx('icon')}
                                                                            alt=""
                                                                            src={images.pushIcon}
                                                                        />
                                                                    </figure>
                                                                </div>
                                                                <div className={cx('more-info')}>
                                                                    Created at: <span>{type.created_at}</span>{' '}
                                                                </div>
                                                                <div className={cx('more-info')}>
                                                                    Updated at: <span>{type.updated_at}</span>{' '}
                                                                </div>
                                                                <div className={cx('more-info')}>
                                                                    Description:{' '}
                                                                    <HTMLREndered htmlString={type.description} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}

                                                {idTypeOfCampaign !== null ? (
                                                    <>
                                                        <div className={cx('form-actions', 'larger-margin')}>
                                                            <div
                                                                onClick={() => setIdTypeOfCampaign(null)}
                                                                className={cx('btn')}
                                                            >
                                                                Cancel
                                                            </div>
                                                            <div
                                                                onClick={() => {
                                                                    setInProcess(2);
                                                                    setTaskDone([1]);
                                                                }}
                                                                className={cx('btn', 'btn-next')}
                                                            >
                                                                Next step
                                                                <img
                                                                    className={cx('icon')}
                                                                    alt=""
                                                                    src={images.arrowRightIcon}
                                                                />
                                                            </div>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <></>
                                                )}
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                    {inProcess === 2 ? (
                        <>
                            <div className={cx('details-campaign')}>
                                <h4 className={cx('head')}>
                                    Details Campaign: <p>Introduce about Campaign</p>
                                    <button
                                        className={cx('back-btn')}
                                        onClick={() => {
                                            setInProcess(1);
                                            setTaskDone([]);
                                        }}
                                    >
                                        <img className={cx('icon')} alt="" src={images.arrowLeftIcon} />
                                        Back
                                    </button>
                                </h4>
                                <form method="post" className={cx('form')} onSubmit={handleSubmitStep1}>
                                    {/* Calendar */}
                                    <div className={cx('form-row')}>
                                        <div className={cx('form-group')}>
                                            <div className={cx('form-label')}>
                                                <label>Calendar</label>
                                            </div>
                                            <div className={cx('form-control', 'no-border', 'inline')}>
                                                <p className={cx('form-desc')}>Define how long you want to going?</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('form-row', 'margin-inital')}>
                                        <div className={cx('form-group')}>
                                            <div className={cx('form-label', 'small')}>
                                                <label>Start Date</label>
                                            </div>
                                            <div ref={refCalendarStartDate} className={cx('form-wrap-select')}>
                                                <div onClick={toggleShowCalendarStartDate} className={cx('main')}>
                                                    {startDate === null ? (
                                                        <>
                                                            <span>Choose Campaign Start Date </span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span className={cx('date-value')}>{startDate}</span>
                                                        </>
                                                    )}

                                                    <img
                                                        className={
                                                            showCalendarStartDate === true
                                                                ? cx('icon', 'icon-rotate')
                                                                : cx('icon')
                                                        }
                                                        alt=""
                                                        src={images.arrowIcon}
                                                    />
                                                </div>
                                                <div
                                                    className={
                                                        showCalendarStartDate === true
                                                            ? cx('wrap-list', 'calendar')
                                                            : cx('wrap-list', 'calendar', 'none')
                                                    }
                                                >
                                                    <div className={cx('popper-list', 'calendar')}>
                                                        <CalendarComponent setDateToString={setStartDate} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('form-group')}>
                                            <div className={cx('form-label', 'small')}>
                                                <label>End Date</label>
                                            </div>
                                            <div ref={refCalandarEndDate} className={cx('form-wrap-select')}>
                                                <div onClick={toggleShowCalendarEndDate} className={cx('main')}>
                                                    {endDate === null ? (
                                                        <>
                                                            <span>Choose Campaign End Date </span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span className={cx('date-value')}> {endDate} </span>
                                                        </>
                                                    )}

                                                    <img
                                                        className={
                                                            showCalandarEndDate === true
                                                                ? cx('icon', 'icon-rotate')
                                                                : cx('icon')
                                                        }
                                                        alt=""
                                                        src={images.arrowIcon}
                                                    />
                                                </div>

                                                <div
                                                    className={
                                                        showCalandarEndDate === true
                                                            ? cx('wrap-list', 'calendar')
                                                            : cx('wrap-list', 'calendar', 'none')
                                                    }
                                                >
                                                    <div className={cx('popper-list', 'calendar')}>
                                                        <CalendarComponent setDateToString={setEndDate} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {messageErrorDate === null ? (
                                        <></>
                                    ) : (
                                        <>
                                            <div className={cx('form-error')}>{messageErrorDate}</div>
                                        </>
                                    )}
                                    {/* Name + Channel*/}
                                    <div className={cx('form-row')}>
                                        <div className={cx('form-group')}>
                                            <div className={cx('form-label')}>
                                                <label htmlFor="campaignName">Campaign Name*</label>
                                            </div>
                                            <div className={cx('form-control')}>
                                                <input
                                                    className={cx('form-input')}
                                                    type="text"
                                                    id="campaignName"
                                                    placeholder="Enter campaign name"
                                                    value={nameCampaign}
                                                    onChange={(e) => setNameCampaign(e.target.value)}
                                                />
                                            </div>
                                            {messageNameExistInCampaign !== null && (
                                                <div className={cx('form-error')}>{messageNameExistInCampaign}</div>
                                            )}
                                        </div>

                                        <div className={cx('form-group')}>
                                            <div className={cx('form-label')}>
                                                <label>Channel</label>
                                            </div>
                                            <div ref={refChannels} className={cx('form-wrap-select')}>
                                                <div onClick={toggleShowPopperChannels} className={cx('main')}>
                                                    {channels === null ? (
                                                        <span>Choose Channel </span>
                                                    ) : (
                                                        <span className={cx('channel-value')}>{channels.title}</span>
                                                    )}
                                                    <img className={cx('icon')} alt="" src={images.addIcon} />
                                                </div>

                                                <div
                                                    className={
                                                        showPopperChannels === true
                                                            ? cx('wrap-list')
                                                            : cx('wrap-list', 'none')
                                                    }
                                                >
                                                    <div className={cx('popper-list')}>
                                                        {FAKE_CHANNELS.map((item) => (
                                                            <div
                                                                onClick={() => setChannels(item)}
                                                                key={item.id}
                                                                className={
                                                                    channels === item
                                                                        ? cx('popper-item', 'active')
                                                                        : cx('popper-item')
                                                                }
                                                            >
                                                                <img
                                                                    className={cx('icon')}
                                                                    alt=""
                                                                    src={images.socialContentIcon}
                                                                />
                                                                <span>{item.title}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Objective */}
                                    <div className={cx('form-row')}>
                                        <div className={cx('form-group')}>
                                            <div className={cx('form-label')}>
                                                <label htmlFor="objective">Objective*</label>
                                            </div>
                                            <div className={cx('form-control')}>
                                                <input
                                                    type="text"
                                                    className={cx('form-input')}
                                                    id="objective"
                                                    placeholder="Enter campaign objective"
                                                    value={objective}
                                                    onChange={(e) => setObjective(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        {idTypeOfCampaign === 8 && (
                                            <>
                                                <div className={cx('form-group')}>
                                                    <div className={cx('form-label')}>
                                                        <label htmlFor="objective">Target Domation*</label>
                                                    </div>
                                                    <div className={cx('form-control')}>
                                                        <input
                                                            type="number"
                                                            className={cx('form-input')}
                                                            id="objective"
                                                            placeholder="Enter target amount in this campaign"
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {/* Budget */}
                                    <div className={cx('form-row')}>
                                        <div className={cx('form-group')}>
                                            <div className={cx('form-label')}>
                                                <label>Budget</label>
                                            </div>
                                            <div className={cx('form-control', 'no-border', 'inline')}>
                                                <p className={cx('form-desc')}>Define how much you want to spend?</p>
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
                                                            value={totalBudget}
                                                            onChange={(e) => setTotalBudget(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className={cx('form-desc', 'small')}>(In US dollars)</div>
                                                </div>
                                                <div className={cx('form-group')}>
                                                    <div className={cx('form-label', 'small')}>
                                                        <label>Daily Budget</label>
                                                    </div>
                                                    <div className={cx('form-control')}>
                                                        <input
                                                            className={cx('form-input')}
                                                            type="number"
                                                            placeholder="Enter the overage you want to spend each day"
                                                            value={dailyBudget}
                                                            onChange={(e) => setDailyBudget(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className={cx('form-desc', 'small')}>(In US dollars)</div>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <></>
                                    )}

                                    <div className={cx('form-actions')}>
                                        <div className={cx('btn')}>Cancel</div>
                                        <button
                                            type="submit"
                                            // onClick={() => {
                                            //     setInProcess(2);
                                            //     setTaskDone([1]);
                                            // }}
                                            className={cx('btn', 'btn-next')}
                                        >
                                            Next step
                                            <img className={cx('icon')} alt="" src={images.arrowRightIcon} />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </>
                    ) : (
                        <></>
                    )}

                    {inProcess === 3 ? (
                        <>
                            <div className={cx('details-campaign')}>
                                <div className={cx('head')}>
                                    <h4>Details Campaign: </h4>
                                    <p>Create Social Content</p>
                                    <button
                                        className={cx('back-btn')}
                                        onClick={() => {
                                            setInProcess(2);
                                            setTaskDone([1]);
                                        }}
                                    >
                                        <img className={cx('icon')} alt="" src={images.arrowLeftIcon} />
                                        Back
                                    </button>
                                </div>

                                <form method="post" onSubmit={handleStoreCampaign} className={cx('form')}>
                                    <div className={cx('form-row')}>
                                        <div className={cx('form-group')}>
                                            <div className={cx('form-label')}>
                                                <label>Upload Thumbnail</label>
                                            </div>
                                            <div className={cx('form-desc', 'small')}>(Optional)</div>
                                            <div className={cx('container-file')}>
                                                <input
                                                    type="file"
                                                    onChange={handlePreviewThumbnail}
                                                    id="uploadThumb"
                                                    hidden
                                                />

                                                {previewThumbnail !== null ? (
                                                    <label
                                                        htmlFor="uploadThumb"
                                                        className={cx('file-thumb', 'not-border')}
                                                    >
                                                        <img
                                                            className={cx('preview-img')}
                                                            alt=""
                                                            src={previewThumbnail}
                                                        />
                                                    </label>
                                                ) : (
                                                    <label htmlFor="uploadThumb" className={cx('file-thumb')}>
                                                        <img className={cx('icon')} alt="" src={images.plusIcon} />
                                                    </label>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className={cx('form-row')}>
                                        <div className={cx('form-group')}>
                                            <div className={cx('form-label')}>
                                                <label>Content</label>
                                            </div>
                                            <Editor
                                                style={{ height: '420px' }}
                                                value={content}
                                                onTextChange={(e) => setContent(e.htmlValue)}
                                            />
                                        </div>
                                    </div>

                                    {content !== '' || previewThumbnail !== null ? (
                                        <>
                                            <div className={cx('form-actions')}>
                                                <div
                                                    onClick={() => {
                                                        setPreviewThumbnail(null);
                                                        setContent('');
                                                    }}
                                                    className={cx('btn')}
                                                >
                                                    Cancel
                                                </div>

                                                <button
                                                    type="submit"
                                                    onClick={() => {
                                                        if (createdSuccess === true) {
                                                            setInProcess(4);
                                                            setTaskDone([1, 2, 3]);
                                                        }
                                                    }}
                                                    className={cx('btn', 'btn-next')}
                                                >
                                                    Next step
                                                    <img className={cx('icon')} alt="" src={images.arrowRightIcon} />
                                                </button>

                                                <button
                                                    className={cx('btn', 'btn-preview', 'js-toggle')}
                                                    toggle-target="#popper-review-content"
                                                >
                                                    Show Preview
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </form>
                            </div>
                        </>
                    ) : (
                        <></>
                    )}

                    {inProcess === 4 || inProcess === 5 ? (
                        <>
                            <div className={cx('details-campaign')}>
                                <div className={cx('head')}>
                                    <h4>Details Campaign: </h4>
                                    <p>Planned Activities in Campaign</p>
                                    <button
                                        className={cx('back-btn')}
                                        onClick={() => {
                                            setInProcess(3);
                                            setTaskDone([1, 2]);
                                        }}
                                    >
                                        <img className={cx('icon')} alt="" src={images.arrowLeftIcon} />
                                        Back
                                    </button>
                                </div>
                                <div className={cx('timetable')}>
                                    <div className={cx('timetable-title')}>
                                        <img className={cx('icon')} alt="" src={images.calendarIcon} />
                                        <span>
                                            Start: <span className={cx('value')}>{formatDate(startDate)}</span>{' '}
                                        </span>
                                    </div>
                                    <div className={cx('timetable-title')}>
                                        <img className={cx('icon')} alt="" src={images.pinIcon} />
                                        <span>
                                            Target: <span className={cx('value')}>{formatDate(endDate)}</span>
                                        </span>
                                    </div>
                                    <div className={cx('timetable-title')}>
                                        <img className={cx('icon')} alt="" src={images.tasksIcon} />
                                        <span>
                                            Activities: <span className={cx('value')}>0</span>
                                        </span>
                                    </div>
                                </div>

                                {schedule !== null ? (
                                    <>
                                        <form
                                            method="post"
                                            onSubmit={handleAddActivityToSchedule}
                                            className={cx('form', 'form-timetable')}
                                        >
                                            <div className={cx('form-row')}>
                                                <div className={cx('form-label', 'label-schedule')}>
                                                    <div className={cx('label')}>
                                                        Schedule:
                                                        <span className={cx('')}>
                                                            {schedule.startDate} - {schedule.endDate}
                                                        </span>
                                                    </div>
                                                    <span
                                                        onClick={() => setSchedule(null)}
                                                        className={cx('add-timetable')}
                                                    >
                                                        <span>Continue Schedule</span>
                                                        <img
                                                            className={cx('icon', 'deco-icon')}
                                                            alt=""
                                                            src={images.addIcon}
                                                        />
                                                    </span>
                                                </div>
                                            </div>
                                            <div className={cx('separate')}>
                                                <span className={cx('first')}></span>
                                                <span className={typeActitvity !== null ? cx('active') : cx('')}></span>
                                                <span
                                                    className={
                                                        nameActivity !== '' && typeActitvity !== null
                                                            ? cx('active')
                                                            : cx('')
                                                    }
                                                ></span>
                                                <span className={cx('small')}></span>
                                            </div>
                                            <div className={cx('form-row')}>
                                                <div className={cx('form-group')}>
                                                    <div className={cx('form-label')}>
                                                        <label>Type of Activity*</label>
                                                    </div>
                                                    <div ref={refTypesActivity} className={cx('filter-form-group')}>
                                                        <div
                                                            onClick={toggleShowTypesActivity}
                                                            className={cx('filter-select-wrap')}
                                                        >
                                                            <div className={cx('wrap-select')}>
                                                                <span className={cx('value')}>
                                                                    {typeActitvity === null
                                                                        ? 'Choose tyoe of activity'
                                                                        : typeActitvity}
                                                                </span>

                                                                <span className={cx('group-btn')}>
                                                                    <span>
                                                                        <img
                                                                            className={cx('icon')}
                                                                            alt=""
                                                                            src={images.addIcon}
                                                                        />
                                                                    </span>
                                                                    <span>
                                                                        {' '}
                                                                        <img
                                                                            className={cx('icon')}
                                                                            alt=""
                                                                            src={images.arrowDownIcon}
                                                                        />
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
                                                                <img
                                                                    className={cx('arrow-up')}
                                                                    alt=""
                                                                    src={images.arrowUp}
                                                                />
                                                                <div className={cx('popper-list')}>
                                                                    <div
                                                                        onClick={() => {
                                                                            setIdTypeActivity(1);
                                                                            setTypeActity('User-generated Content');
                                                                        }}
                                                                        className={
                                                                            typeActitvity === 'User-generated Content'
                                                                                ? cx('popper-item', 'active')
                                                                                : cx('popper-item')
                                                                        }
                                                                    >
                                                                        <img
                                                                            className={cx('icon')}
                                                                            alt=""
                                                                            src={images.pushIcon}
                                                                        />
                                                                        <span>User-generated Content</span>
                                                                    </div>
                                                                    <div
                                                                        onClick={() => {
                                                                            setIdTypeActivity(3);
                                                                            setTypeActity('System-generated Content');
                                                                        }}
                                                                        className={
                                                                            typeActitvity === 'System-generated Content'
                                                                                ? cx('popper-item', 'active')
                                                                                : cx('popper-item')
                                                                        }
                                                                    >
                                                                        <img
                                                                            className={cx('icon')}
                                                                            alt=""
                                                                            src={images.pushIcon}
                                                                        />
                                                                        <span>System-generated Content</span>
                                                                    </div>
                                                                    <div
                                                                        onClick={() => {
                                                                            setIdTypeActivity(null);
                                                                            setTypeActity(null);
                                                                        }}
                                                                        className={cx('popper-item')}
                                                                    >
                                                                        <img
                                                                            className={cx('icon')}
                                                                            alt=""
                                                                            src={images.pushIcon}
                                                                        />
                                                                        <span>Other</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {typeActitvity !== null && (
                                                <>
                                                    {/* Name */}
                                                    <div className={cx('form-row')}>
                                                        <div className={cx('form-group')}>
                                                            <div className={cx('form-label')}>
                                                                <label htmlFor="activityName">Title Actitvity*</label>
                                                            </div>
                                                            <div
                                                                className={cx(
                                                                    'form-control',
                                                                    'no-border',
                                                                    'form-activity-name',
                                                                )}
                                                            >
                                                                <input
                                                                    className={
                                                                        showSuggestActivities === true
                                                                            ? cx('form-input', 'special', 'active')
                                                                            : cx('form-input', 'special')
                                                                    }
                                                                    type="text"
                                                                    id="activityName"
                                                                    placeholder="Untitled"
                                                                    value={nameActivity}
                                                                    onChange={(e) => setNameActivity(e.target.value)}
                                                                    onFocus={() => setShowSugestActivities(true)}
                                                                    onDoubleClick={() => setShowSugestActivities(false)}
                                                                    onBlur={() => setShowSugestActivities(false)}
                                                                />
                                                                <div
                                                                    className={
                                                                        showSuggestActivities === true
                                                                            ? cx('suggest-open')
                                                                            : cx('suggest-open', 'none')
                                                                    }
                                                                >
                                                                    <div
                                                                        onClick={() =>
                                                                            setNameActivity(
                                                                                'Click me if you wanna recommend activities saved',
                                                                            )
                                                                        }
                                                                        className={cx('item')}
                                                                    >
                                                                        <span>
                                                                            Click me if you wanna recommend activities
                                                                            saved
                                                                        </span>
                                                                        <img
                                                                            className={cx('icon', 'suggest-icon')}
                                                                            alt=""
                                                                            src={images.suggestIcon}
                                                                        />
                                                                    </div>
                                                                    <div
                                                                        onClick={() =>
                                                                            setNameActivity(
                                                                                'Click me if you wanna recommend activities saved',
                                                                            )
                                                                        }
                                                                        className={cx('item')}
                                                                    >
                                                                        <span>
                                                                            Click me if you wanna recommend activities
                                                                            saved
                                                                        </span>
                                                                        <img
                                                                            className={cx('icon', 'suggest-icon')}
                                                                            alt=""
                                                                            src={images.suggestIcon}
                                                                        />
                                                                    </div>
                                                                    <div
                                                                        onClick={() =>
                                                                            setNameActivity(
                                                                                'Click me if you wanna recommend activities saved',
                                                                            )
                                                                        }
                                                                        className={cx('item')}
                                                                    >
                                                                        <span>
                                                                            Click me if you wanna recommend activities
                                                                            saved
                                                                        </span>
                                                                        <img
                                                                            className={cx('icon', 'suggest-icon')}
                                                                            alt=""
                                                                            src={images.suggestIcon}
                                                                        />
                                                                    </div>
                                                                    <div
                                                                        onClick={() =>
                                                                            setNameActivity(
                                                                                'Click me if you wanna recommend activities saved',
                                                                            )
                                                                        }
                                                                        className={cx('item')}
                                                                    >
                                                                        <span>
                                                                            Click me if you wanna recommend activities
                                                                            saved
                                                                        </span>
                                                                        <img
                                                                            className={cx('icon', 'suggest-icon')}
                                                                            alt=""
                                                                            src={images.suggestIcon}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {messageNameExistInActivity !== null && (
                                                        <>
                                                            <div className={cx('form-error')}>
                                                                {messageNameExistInActivity}
                                                            </div>
                                                        </>
                                                    )}

                                                    <div className={cx('form-actions', 'larger-margin')}>
                                                        <button
                                                            type="submit"
                                                            // onClick={() => {
                                                            //     setInProcess(2);
                                                            //     setTaskDone([1]);
                                                            // }}
                                                            className={cx('btn', 'btn-add')}
                                                        >
                                                            Add
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </form>
                                    </>
                                ) : (
                                    <>
                                        <form
                                            method="post"
                                            onSubmit={handleAddSchedule}
                                            className={cx('form', 'form-timetable')}
                                        >
                                            <div className={cx('form-row')}>
                                                <div className={cx('form-group')}>
                                                    <div className={cx('form-label')}>
                                                        <label>Create Activity's Campaign: </label>
                                                    </div>

                                                    <p className={cx('form-desc')}>
                                                        Define how about information you want to provide in this
                                                        campaign
                                                    </p>
                                                </div>

                                                <div className={cx('switch', 'activity')}>
                                                    <input
                                                        onChange={handleCheckboxShowFormActivity}
                                                        hidden
                                                        id="switchActivity"
                                                        type="checkbox"
                                                        checked={activityIsChecked}
                                                    />
                                                    <label htmlFor="switchActivity"></label>
                                                </div>
                                            </div>

                                            <div
                                                className={activityIsChecked ? cx('form-row') : cx('form-row', 'none')}
                                            >
                                                <div className={cx('form-group')}>
                                                    <div className={cx('form-label')}>
                                                        <label>Schedule:</label>
                                                    </div>
                                                    <div className={cx('form-control', 'no-border', 'inline')}>
                                                        <p className={cx('form-desc')}>
                                                            Define how long you want to going?
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div
                                                className={
                                                    activityIsChecked
                                                        ? cx('form-row', 'margin-inital')
                                                        : cx('form-row', 'none', 'margin-inital')
                                                }
                                            >
                                                <div className={cx('form-group')}>
                                                    <div className={cx('form-label', 'small')}>
                                                        <label>From: </label>
                                                    </div>
                                                    <div
                                                        ref={refCalendarStartDateActivity}
                                                        className={cx('form-wrap-select')}
                                                    >
                                                        <div
                                                            onClick={toggleShowCalendarStartDateActivity}
                                                            className={cx('main')}
                                                        >
                                                            {startDateActivity === null ? (
                                                                <>
                                                                    <span>Choose Activity Start Date </span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <span className={cx('date-value')}>
                                                                        {startDateActivity}
                                                                    </span>
                                                                </>
                                                            )}

                                                            <img
                                                                className={
                                                                    showCalendarStartDateActivity === true
                                                                        ? cx('icon', 'icon-rotate')
                                                                        : cx('icon')
                                                                }
                                                                alt=""
                                                                src={images.arrowIcon}
                                                            />
                                                        </div>
                                                        <div
                                                            className={
                                                                showCalendarStartDateActivity === true
                                                                    ? cx('wrap-list', 'calendar')
                                                                    : cx('wrap-list', 'calendar', 'none')
                                                            }
                                                        >
                                                            <div className={cx('popper-list', 'calendar')}>
                                                                <CalendarComponent
                                                                    setDateToString={setStartDateActivity}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={cx('form-group')}>
                                                    <div className={cx('form-label', 'small')}>
                                                        <label>To: </label>
                                                    </div>
                                                    <div
                                                        ref={refCalendarEndDateActivity}
                                                        className={cx('form-wrap-select')}
                                                    >
                                                        <div
                                                            onClick={toggleShowCalendarEndDateActvity}
                                                            className={cx('main')}
                                                        >
                                                            {endDateActivity === null ? (
                                                                <>
                                                                    <span>Choose Activity End Date </span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <span className={cx('date-value')}>
                                                                        {' '}
                                                                        {endDateActivity}{' '}
                                                                    </span>
                                                                </>
                                                            )}

                                                            <img
                                                                className={
                                                                    showCalendarEndDateActivity === true
                                                                        ? cx('icon', 'icon-rotate')
                                                                        : cx('icon')
                                                                }
                                                                alt=""
                                                                src={images.arrowIcon}
                                                            />
                                                        </div>

                                                        <div
                                                            className={
                                                                showCalendarEndDateActivity === true
                                                                    ? cx('wrap-list', 'calendar')
                                                                    : cx('wrap-list', 'calendar', 'none')
                                                            }
                                                        >
                                                            <div className={cx('popper-list', 'calendar')}>
                                                                <CalendarComponent
                                                                    setDateToString={setEndDateActivity}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {messageErrorDateSchedule !== null ? (
                                                <>
                                                    <div className={cx('form-error')}>{messageErrorDateSchedule}</div>
                                                </>
                                            ) : (
                                                <></>
                                            )}

                                            {/* Form Notice */}
                                            <div className={cx('form-notice')}>
                                                <p>Note: </p>
                                                <p>
                                                    The proposed activities are just an estimate, you can change them
                                                    later.
                                                </p>
                                            </div>

                                            {activityIsChecked ? (
                                                <>
                                                    <div className={cx('form-actions', 'larger-margin')}>
                                                        <button
                                                            type="submit"
                                                            // onClick={() => {
                                                            //     setInProcess(2);
                                                            //     setTaskDone([1]);
                                                            // }}
                                                            className={cx('btn', 'btn-add')}
                                                        >
                                                            Add
                                                        </button>
                                                    </div>
                                                </>
                                            ) : (
                                                <></>
                                            )}
                                        </form>
                                    </>
                                )}

                                <div className={cx('list-activity')}>
                                    {listActivityScheduleInital !== null && (
                                        <>
                                            {listActivityScheduleInital.map((item, index) => (
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
                                                            <span>
                                                                {item.start_date === item.end_date ? (
                                                                    <>On {formatDateFromBackend(item.start_date)}</>
                                                                ) : (
                                                                    <>
                                                                        Going on{' '}
                                                                        {formatDateFromBackend(item.start_date)} -{' '}
                                                                        {formatDateFromBackend(item.end_date)}
                                                                    </>
                                                                )}
                                                            </span>
                                                        </div>
                                                        <div className={cx('multi-activity')}>
                                                            {item.activities.length > 0 ? (
                                                                item.activities.map((item, index) => (
                                                                    <div key={index} className={cx('activity-item')}>
                                                                        <div>
                                                                            <p>{item.name}</p>
                                                                            <p>
                                                                                Belong to:{' '}
                                                                                <span>
                                                                                    {item.type_of_activity_id === 3
                                                                                        ? 'System-genereated content'
                                                                                        : 'User-generated Content'}
                                                                                </span>
                                                                            </p>
                                                                        </div>
                                                                        <div className={cx('remove')}>
                                                                            <img
                                                                                className={cx('icon')}
                                                                                alt=""
                                                                                src={images.xIcon}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <>
                                                                    <div className={cx('activity-item', 'label')}>
                                                                        <div className={cx('div-1')}></div>
                                                                        <div className={cx('div-2')}></div>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </>
                                    )}
                                    {schedule !== null && (
                                        <>
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
                                                        <span
                                                            className={
                                                                loadingPush === true ? cx('text-loading') : cx('')
                                                            }
                                                            data-text={`Going on ${formatDate(
                                                                schedule.startDate,
                                                            )} - ${formatDate(schedule.endDate)}`}
                                                        >
                                                            Going on {formatDate(schedule.startDate)} -{' '}
                                                            {formatDate(schedule.endDate)}
                                                        </span>
                                                        <button
                                                            onClick={handlePushActivities}
                                                            className={
                                                                loadingPush === true
                                                                    ? cx('push-btn', 'none')
                                                                    : cx('push-btn')
                                                            }
                                                        >
                                                            Push
                                                            <img
                                                                className={cx('icon')}
                                                                alt=""
                                                                src={images.saveCloudIcon}
                                                            />
                                                        </button>
                                                        {loadingPush && (
                                                            <div
                                                                onClick={() => setLoadingPush(false)}
                                                                className={cx('loading')}
                                                            >
                                                                <img
                                                                    className={cx('icon')}
                                                                    alt=""
                                                                    src={images.loadingIcon}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className={cx('multi-activity')}>
                                                        {listActivity.map((item, index) => (
                                                            <div key={index} className={cx('activity-item')}>
                                                                <div>
                                                                    <p>{item.name}</p>
                                                                    <p>
                                                                        Belong to:{' '}
                                                                        <span>
                                                                            {item.typeOfActivityId === 3
                                                                                ? 'System-genereated content'
                                                                                : 'User-generated Content'}
                                                                        </span>
                                                                    </p>
                                                                </div>
                                                                <div
                                                                    onClick={() => handleRemoteActivity(item)}
                                                                    className={cx('remove')}
                                                                >
                                                                    <img
                                                                        className={cx('icon')}
                                                                        alt=""
                                                                        src={images.xIcon}
                                                                    />
                                                                </div>
                                                            </div>
                                                        ))}

                                                        <div className={cx('activity-item', 'label')}>
                                                            <div className={cx('div-1')}></div>
                                                            <div className={cx('div-2')}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    <div className={cx('group-activity')}>
                                        <div className={cx('decoration')}>
                                            <div>
                                                <img className={cx('icon')} alt="" src={images.decorationIcon} />
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
                                    {listActivityScheduleInital === null && (
                                        <>
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
                                        </>
                                    )}

                                    {listActivityScheduleInital === null ? (
                                        <>
                                            <div className={cx('form-actions')}>
                                                <button
                                                    onClick={() => {
                                                        setInProcess(5);
                                                        setTaskDone([1, 2, 3, 4]);
                                                        navigate('/admin/campaigns');
                                                    }}
                                                    className={cx('btn', 'btn-next')}
                                                >
                                                    Skip
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className={cx('form-actions')}>
                                                <button
                                                    onClick={() => {
                                                        setInProcess(5);
                                                        setTaskDone([1, 2, 3, 4]);
                                                        navigate('/admin/campaigns');
                                                    }}
                                                    className={cx('btn', 'btn-next')}
                                                >
                                                    Done
                                                </button>
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

                {/* Preview Content */}
                <div id="popper-review-content" className={cx('popper-notofication', 'hide')}>
                    <div className={cx('notification-top')}>
                        <div className={cx('title')}>Preview Content:</div>
                        <button className={cx('close-btn', 'js-toggle')} toggle-target="#popper-review-content">
                            <img className={cx('icon')} alt="" src={images.xIcon} />
                        </button>
                    </div>
                    <div className={cx('preview-content')}>
                        <div className={cx('header-preview-content')}>
                            <figure>
                                <img className={cx('thumbnail')} alt="" src={previewThumbnail} />
                            </figure>
                            <div className={cx('introduce')}>
                                <h4>{nameCampaign}</h4>
                                <p>{objective}</p>
                                <div className={cx('introduce-item')}>
                                    <span className={cx('wrap-icon')}>
                                        {' '}
                                        <img className={cx('icon')} alt="" src={images.clockIcon} />
                                    </span>
                                    <span className={cx('tag')}>Start: </span>
                                    <span className={cx('value')}>{startDate}</span>
                                </div>

                                <div className={cx('introduce-item')}>
                                    <span className={cx('wrap-icon')}>
                                        {' '}
                                        <img className={cx('icon')} alt="" src={images.clockIcon} />
                                    </span>
                                    <span className={cx('tag')}>Target: </span>
                                    <span className={cx('value')}>{endDate}</span>
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
                                {FAKE_BREAD.map((item) => (
                                    <div
                                        onClick={() => setBreadActive(item.title)}
                                        key={item.id}
                                        className={
                                            breadActive === item.title ? cx('bread-item', 'active') : cx('bread-item')
                                        }
                                    >
                                        <span>{item.title}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={cx('inner-content')}>
                            {breadActive === 'About' && (
                                <>
                                    <div className={cx('about')}>
                                        <HTMLREndered htmlString={content} />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className={cx('popper-overlay', 'js-toggle')} toggle-target="#popper-review-content"></div>
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

export default AddNewCampaign;
