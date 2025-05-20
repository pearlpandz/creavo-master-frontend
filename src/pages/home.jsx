import axios from 'axios';
import DashboardContent from '../components/DashboardContent'
import { useEffect, useState } from 'react';

function Home() {
    const [data, setData] = useState(null);

    const getData = async () => {
        try {
            const res = await axios.get('http://localhost:8000/accounts/master-distributors/dashboard/', {
                withCredentials: true,
            })
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

    return (
        <DashboardContent data={data} />
    )
}

export default Home;