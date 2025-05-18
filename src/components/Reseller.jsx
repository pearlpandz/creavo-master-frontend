import { useState } from "react";
import DataTable from "./DataTable";
import CreateModal from "./CreateDistributorModal";

const rowData = [
    { name: 'Eve', location: 'Hyderabad', distributors: 2, status: 'Active' },
    { name: 'Mallory', location: 'Delhi', distributors: 1, status: 'Inactive' },
    { name: 'Trent', location: 'Mumbai', distributors: 3, status: 'Active' },
    { name: 'Oscar', location: 'Chennai', distributors: 2, status: 'Active' },
];

export function Reseller() {
    const [open, setOpen] = useState(false);

    const onClose = () => {
        setOpen(false);
    }

    const onOpen = () => {
        setOpen(true);
    }

    const onSubmit = (data) => {
        console.log('Submitted Data:', data);
        setOpen(false);
    }

    return (
        <>
            <DataTable
                columns={[
                    { field: 'name', headerName: 'Name', flex: 1 },
                    { field: 'location', headerName: 'Location', flex: 1 },
                    { field: 'resellers', headerName: 'Resellers', flex: 1 },
                    { field: 'status', headerName: 'Status', flex: 1 },
                ]}
                rows={rowData}
                title='Reseller List'
                onCreate={onOpen}
                createBtnLabel='Create Reseller'
            />
            <CreateModal label='Create New Reseller' open={open} onClose={onClose} onSubmit={onSubmit} />
        </>
    )
}