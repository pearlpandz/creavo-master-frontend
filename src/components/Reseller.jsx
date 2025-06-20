import { useEffect, useState } from "react";
import DataTable from "./DataTable";
import CreateModal from "./CreateDistributorModal";
import ApplyLicenseModal from './ApplyLicenseModal';
import axios from '../utils/axios-interceptor'
import { Snackbar, Alert, Button } from '@mui/material';

export function Reseller() {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const userDetails = localStorage.getItem('userDetails');
    const userId = userDetails ? JSON.parse(userDetails).id : null;
    const [licenseModalOpen, setLicenseModalOpen] = useState(false);
    const [selectedReseller, setSelectedReseller] = useState(null);

    const RESELLER_COLUMNS = [
        { field: "name", headerName: "Name", type: "text", flex: 1 },
        { field: "email", headerName: "Email", type: "text", flex: 1 },
        { field: "mobile_number", headerName: "Mobile", type: "text", flex: 1 },
        {
            field: "date_joined",
            headerName: "Created At",
            type: "date",
            flex: 1,
            valueGetter: (params) => new Date(params),
        },
        {
            field: "overall_downloads",
            headerName: "Over All Downloads",
            type: "number",
            flex: 1,
        },
        {
            field: "day_downloads",
            headerName: "Subscription Day Limit Exceeded Downloads",
            hide: true,
            type: "number",
            flex: 1,
        },
        { field: "is_verified", headerName: "Status", type: "boolean", flex: 1 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 250,
            sortable: false,
            filterable: false,
            renderCell: (params) => {
                const hasLicense = !!params.row.license;
                return hasLicense ? (
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleOpenLicenseModal({ ...params.row, viewOnly: true })}
                    >
                        View License
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleOpenLicenseModal(params.row)}
                    >
                        Assign License
                    </Button>
                );
            },
        },
    ];
    // Add viewOnly state for license modal
    const [viewOnlyLicense, setViewOnlyLicense] = useState(false);

    const handleOpenLicenseModal = (reseller) => {
        setSelectedReseller(reseller);
        setViewOnlyLicense(!!reseller.viewOnly);
        setLicenseModalOpen(true);
    };
    const handleCloseLicenseModal = () => {
        setLicenseModalOpen(false);
        setSelectedReseller(null);
        setViewOnlyLicense(false);
    };
    const handleApplyLicense = async (licenseKey) => {
        if (!selectedReseller) return handleCloseLicenseModal();
        if (viewOnlyLicense) return handleCloseLicenseModal();
        try {
            await axios.post(`/accounts/licenses/purchase/`, { license_code: licenseKey, user_id: selectedReseller.id });
            setSnackbar({ open: true, message: 'License applied successfully!', severity: 'success' });
            fetchData();
        } catch (error) {
            console.error('Error applying license:', error);
            setSnackbar({ open: true, message: 'Failed to apply license.', severity: 'error' });
        }
        handleCloseLicenseModal();
    };

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

    const onClose = () => setOpen(false);
    const onOpen = () => setOpen(true);

    const onSubmit = async (data) => {
        try {
            const url = `/accounts/users/`;
            const payload = {
                first_name: data.firstName,
                last_name: data.lastName,
                email: data.email,
                mobile_number: data.mobile,
                password: data.password,
                created_by_master_distributor: userId,
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
            <ApplyLicenseModal
                open={licenseModalOpen}
                onClose={handleCloseLicenseModal}
                onApply={handleApplyLicense}
                viewOnly={viewOnlyLicense}
                licenseKeyValue={selectedReseller && selectedReseller.license ? selectedReseller.license : ''}
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