import classNames from 'classnames/bind';
import styles from './AddNewCampaign.module.scss';
import images from '~/assets/images';
import React, { useState, useRef } from 'react';
import useOnClickOutside from '~/hooks/useOnclickOutside';
import CalendarComponent from '~/components/CalendarComponent';

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

    const [inProcess, setInProcess] = useState(null);
    const [taskDone, setTaskDone] = useState([]);
    const refChannels = useRef();
    const [showPopperChannels, setShowPopperChannels] = useState(false);
    const [channels, setChannels] = useState(null);
    const [budgetIsChecked, setBudgetIsCheced] = useState(false);

    const refCalendarStartDate = useRef();
    const [showCalendarStartDate, setShowCalendarStartDate] = useState(false);

    const refCalandarEndDate = useRef();
    const [showCalandarEndDate, setShowCalendaeEndDate] = useState(false);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

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
                                (inProcess === item) | (taskDone.indexOf(item.step) !== -1)
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
                {(inProcess === null) | (inProcess === SEQUENCE_PROCESS[0]) ? (
                    <>
                        <div className={cx('details-campaign')}>
                            <h4 className={cx('head')}>
                                Details Campaign: <p>Introduce about Campaign</p>
                            </h4>
                            <form className={cx('form')} onSubmit={(e) => e.preventDefault()}>
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
                                    <div className={cx('btn', 'btn-next')}>
                                        Next step
                                        <img className={cx('icon')} alt="" src={images.arrowRightIcon} />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}

export default AddNewCampaign;
