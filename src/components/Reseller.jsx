import { useEffect, useState } from "react";
import DataTable from "./DataTable";
import CreateModal from "./CreateDistributorModal";
import { RESELLER_COLUMNS } from "../constants/columns";
import axios from '../utils/axios-interceptor'
import { Snackbar, Alert } from '@mui/material';

export function Reseller() {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const userDetails = localStorage.getItem('userDetails');
    const userId = userDetails ? JSON.parse(userDetails).id : null;


    const fetchData = async () => {
        try {
            const url = `/accounts/master-distributors/users/`;
            const response = await axios.get(url);
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
            const url = `/accounts/users/`;
            const payload = {
                first_name: data.firstName,
                last_name: data.lastName,
                email: data.email,
                mobile_number: data.mobile,
                password: data.password,
                created_by_master_distributor: userId, // created_by_distributor
            }
            const response = await axios.post(url, payload);
            if (response.status === 201) {
                fetchData();
                setOpen(false);
                setSnackbar({ open: true, message: 'Reseller created successfully!', severity: 'success' });
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
                columns={RESELLER_COLUMNS}
                rows={data}
                title='Reseller List'
                onCreate={onOpen}
                createBtnLabel='Create Reseller'
            />
            <CreateModal label='Create New Reseller' open={open} onClose={onClose} onSubmit={onSubmit} />
            <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    )
}