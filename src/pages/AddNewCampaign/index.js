import classNames from 'classnames/bind';
import styles from './AddNewCampaign.module.scss';
import images from '~/assets/images';
import React, { useState, useRef, useEffect } from 'react';
import useOnClickOutside from '~/hooks/useOnclickOutside';
import CalendarComponent from '~/components/CalendarComponent';
import useAxios from '~/hooks/useAxios';
import HTMLREndered from '~/components/HTMLRendered';
import { Editor } from 'primereact/editor';

const cx = classNames.bind(styles);

function AddNewCampaign() {
    const SEQUENCE_PROCESS = [
        {
            step: 1,
            title: 'Introduce about Campaign',
            icon: images.introIcon,
        },
        {
            step: 2,
            title: 'Type of Campaign',
            icon: images.typeIcon,
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

    const axios = useAxios();
    const [listTypeOfCampaign, setListTypeOfCampaign] = useState(null);
    const [inProcess, setInProcess] = useState(1);
    const [taskDone, setTaskDone] = useState([]);
    const refChannels = useRef();
    const [showPopperChannels, setShowPopperChannels] = useState(false);
    const refCalendarStartDate = useRef();
    const refCalandarEndDate = useRef();
    const [showCalendarStartDate, setShowCalendarStartDate] = useState(false);
    const [showCalandarEndDate, setShowCalendaeEndDate] = useState(false);
    const [showDetailsTypeCampaign, setshowDetailsTypeCampaign] = useState([]);
    const [breadActive, setBreadActive] = useState('About');

    //INFORMATION ABOUNT NEW CAMPAIGN
    const [channels, setChannels] = useState(null);
    const [budgetIsChecked, setBudgetIsCheced] = useState(true);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [idTypeOfCampaign, setIdTypeOfCampaign] = useState(null);
    const [content, setContent] = useState('');
    const [previewThumbnail, setPreviewThumbnail] = useState(null);

    const [nameCampaign, setNameCampaign] = useState('');
    const [objective, setObjective] = useState('');
    const [totalBudget, setTotalBudget] = useState(null);
    const [dailyBudget, setDailyBudget] = useState(null);
    //END

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

        file.preview = URL.createObjectURL(file);
        setPreviewThumbnail(file.preview);
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
        try {
            const response = await axios.get('/api/types-of-campaign/getAll', {
                withCredentials: true,
            });

            console.log(response.data);

            if (response.data) {
                setListTypeOfCampaign(response.data);
            }
        } catch (error) {
            console.log(error);
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

    const toggleShowPopperChannels = () => {
        setShowPopperChannels(!showPopperChannels);
    };

    const hiddenPopperChannels = () => {
        setShowPopperChannels(false);
    };

    useOnClickOutside(refChannels, hiddenPopperChannels);

    const handleSubmitStep1 = async (e) => {
        e.preventDefault();

        if (nameCampaign === '' || objective === '' || startDate === null || endDate === null) {
            return;
        }

        setInProcess(2);
        setTaskDone([1]);
    };

    return (
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
                {(inProcess === null) | (inProcess === 1) ? (
                    <>
                        <div className={cx('details-campaign')}>
                            <h4 className={cx('head')}>
                                Details Campaign: <p>Introduce about Campaign</p>
                            </h4>
                            <form className={cx('form')} onSubmit={handleSubmitStep1}>
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

                {inProcess === 2 ? (
                    <>
                        <div className={cx('details-campaign')}>
                            <div className={cx('head')}>
                                <h4>Details Campaign:</h4> <p>Type of Campaign</p>
                                <button className={cx('back-btn')} onClick={() => setInProcess(1)}>
                                    <img className={cx('icon')} alt="" src={images.arrowLeftIcon} />
                                    Back
                                </button>
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
                                                                            onClick={() => setIdTypeOfCampaign(null)}
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
                                                                            onClick={() => setIdTypeOfCampaign(type.id)}
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
                                                                setInProcess(3);
                                                                setTaskDone([1, 2]);
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

                {inProcess === 3 ? (
                    <>
                        <div className={cx('details-campaign')}>
                            <div className={cx('head')}>
                                <h4>Details Campign: </h4>
                                <p>Create Social Content</p>
                                <button className={cx('back-btn')} onClick={() => setInProcess(2)}>
                                    <img className={cx('icon')} alt="" src={images.arrowLeftIcon} />
                                    Back
                                </button>
                            </div>

                            <div className={cx('form')}>
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
                                                <label htmlFor="uploadThumb" className={cx('file-thumb', 'not-border')}>
                                                    <img className={cx('preview-img')} alt="" src={previewThumbnail} />
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
                                                className={cx('btn', 'btn-next', 'js-toggle')}
                                                toggle-target="#popper-review-content"
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
    );
}

export default AddNewCampaign;
