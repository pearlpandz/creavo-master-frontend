import { useState } from "react";
import DataTable from "./DataTable";
import CreateModal from "./CreateDistributorModal";

const rowData = [
    { name: 'John', location: 'Hyderabad', resellers: 12, status: 'Active' },
    { name: 'Alice', location: 'Delhi', resellers: 8, status: 'Inactive' },
    { name: 'Bob', location: 'Mumbai', resellers: 15, status: 'Active' },
    { name: 'Carol', location: 'Chennai', resellers: 10, status: 'Active' },
];

export function Distributor() {
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
                title='Distrubutor List'
                onCreate={onOpen}
                createBtnLabel='Create Distributor'
            />
            <CreateModal label='Create New Distributor' open={open} onClose={onClose} onSubmit={onSubmit} />
        </>
    )
}