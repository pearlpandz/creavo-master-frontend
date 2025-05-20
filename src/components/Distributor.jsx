import { useEffect, useState } from "react";
import DataTable from "./DataTable";
import CreateModal from "./CreateDistributorModal";
import { API_URL } from "../constants/settings";
import { DISTRIBUTOR_COLUMNS } from "../constants/columns";
import axios from "axios";
import { Snackbar, Alert } from '@mui/material';

export function Distributor() {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const userDetails = localStorage.getItem('userDetails');
    const userId = userDetails ? JSON.parse(userDetails).id : null;

    const fetchData = async () => {
        try {
            const url = `${API_URL}/accounts/distributors/`;
            const response = await axios.get(url, { withCredentials: true, });
            const data = response.data?.map((item) => ({ ...item, name: item.first_name + ' ' + item.last_name }));
            setData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const onClose = () => {
        setOpen(false);
    }

    const onOpen = () => {
        setOpen(true);
    }

    const onSubmit = async (data) => {
        try {
            const url = `${API_URL}/accounts/distributors/`;
            const payload = {
                first_name: data.firstName,
                last_name: data.lastName,
                email: data.email,
                mobile_number: data.mobile,
                password: data.password,
                created_by: userId,
            }
            const response = await axios.post(url, payload, { withCredentials: true, });
            if (response.status === 201) {
                fetchData();
                setOpen(false);
                setSnackbar({ open: true, message: 'Distributor created successfully!', severity: 'success' });
            }
        } catch (error) {
            const errors = error?.response?.data;
            const errMsg = Object.values(errors).toString()
            setSnackbar({ open: true, message: errMsg, severity: 'error' });
        }
    }

    return (
        <>
            <DataTable
                columns={DISTRIBUTOR_COLUMNS}
                rows={data}
                title='Distrubutor List'
                onCreate={onOpen}
                createBtnLabel='Create Distributor'
            />
            <CreateModal label='Create New Distributor' open={open} onClose={onClose} onSubmit={onSubmit} />
            <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    )
}