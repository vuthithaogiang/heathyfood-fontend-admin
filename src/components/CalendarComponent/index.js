import classNames from 'classnames/bind';
import styles from './CalendarComponent.module.scss';
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns';

const cx = classNames.bind(styles);

function CalendarComponent({ setDateToString }) {
    const handleSelectDate = (e) => {
        // console.log(e);
        setDateToString(format(e, 'dd-MM-yyyy'));
    };
    return (
        <div className={cx('wrapper')}>
            <Calendar date={new Date()} onChange={handleSelectDate} />
        </div>
    );
}

export default CalendarComponent;
