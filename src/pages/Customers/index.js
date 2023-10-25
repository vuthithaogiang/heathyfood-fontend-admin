import classNames from 'classnames/bind';
import styles from './Customer.module.scss';
import useAxios from '~/hooks/useAxios';
import { useEffect, useState } from 'react';
import { InfinitySpin } from 'react-loader-spinner';

const cx = classNames.bind(styles);

function Customers() {
    const axios = useAxios();
    const [listUser, setListUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/api/admin/users', {
                    withCredentials: true,
                });

                console.log(response.data);

                if (response.data) {
                    setListUser(response.data);
                }
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        };

        fetchUsers(); // eslint-disable-next-line
    }, []);

    return (
        <>
            <div className={cx('wrapper')}>
                <div>Customers</div>

                <div>
                    {listUser === null ? (
                        <>
                            <p>Fetch User fail</p>
                        </>
                    ) : (
                        <>
                            <p>Number of user: {listUser.length}</p>
                        </>
                    )}
                </div>
            </div>

            {loading && (
                <div className={cx('modal')}>
                    <div className={cx('overlay')}></div>
                    <div className={cx('wrap-loading')}>
                        <InfinitySpin width="160" color="#fff" />
                    </div>
                </div>
            )}
        </>
    );
}

export default Customers;
