import axios from '../utils/axios-interceptor'
import DashboardContent from '../components/DashboardContent'
import { useEffect, useState } from 'react';
import { useAuth } from '../context/auth.context';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [data, setData] = useState(null);
    const { login, isAuthenticated } = useAuth()
    const navigate = useNavigate();

    const getData = async () => {
        try {
            const res = await axios.get('/accounts/master-distributors/dashboard/')
            if (res.status === 200) {
                setData(res.data)
            } else {
                console.error('Failed to fetch data:', res.data)
            }

        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        const getProfile = async () => {
            try {
                const res = await axios.get('/accounts/users/profile/')
                if (res.status === 200) {
                    login(res.data)
                    navigate('/')
                }
            } catch (error) {
                console.error('Error fetching CSRF token:', error);
                navigate('/login')
            }
        }
        if (!isAuthenticated) {
            getProfile()
        } else {
            navigate('/')
        }
    }, [isAuthenticated, login, navigate])

    return (
        <DashboardContent data={data} />
    )
}

export default Home;