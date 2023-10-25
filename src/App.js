import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes';
import { DefaultLayout } from './layouts';
import { Fragment } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import RequireAuth from './components/RequireAuth';
import { AuthProovider } from './contexts/AuthContext';

const ROLES = {
    user: 'USER',
    admin: 'ADMIN',
};

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
            <AuthProovider>
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

                        {privateRoutes.map((route, index) => {
                            let Layout = DefaultLayout;

                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }

                            const PageElement = route.component;

                            return (
                                <Route key={index} element={<RequireAuth allowdRole={ROLES.admin} />}>
                                    <Route
                                        path={route.path}
                                        element={
                                            <Layout>
                                                <PageElement />
                                            </Layout>
                                        }
                                    />
                                </Route>
                            );
                        })}
                    </Routes>
                </div>
            </AuthProovider>
        </Router>
    );
}

export default App;
