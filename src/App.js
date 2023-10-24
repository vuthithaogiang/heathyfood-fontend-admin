import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { publicRoutes } from './routes';
import { DefaultLayout } from './layouts';
import { Fragment } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

function App() {
    useEffect(() => {
        const http = axios.create({
            baseURL: 'http://localhost:8000',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
            withCredentials: true,
        });

        const getCsrf = async () => {
            const csrf = await http.get('/sanctum/csrf-cookie');
            console.log(csrf);

            // const login = await http.post('/api/auth/login', {
            //     email: 'giangvttth2209086@fpt.edu.vn',
            //     password: 'Abcd123!',
            // });

            // console.log('User', login.data);
        };

        getCsrf();
    }, []);
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Layout = route.layout === null ? Fragment : DefaultLayout;
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
