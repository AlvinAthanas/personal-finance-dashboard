import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import type {SxProps} from "@mui/material";
import type {Theme} from "@mui/material/styles";

interface Transaction {
    id: number;
    type: string;
    amount: number;
    date: string; // ISO date string
    description: string;
    category: string;
    user: string;
}

interface TransactionsDataGridProps {
    transactions: Transaction[];
    sx?: SxProps<Theme> | undefined
}

const TransactionsDataGrid: React.FC<TransactionsDataGridProps> = ({ transactions }) => {
    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "type", headerName: "Type", width: 120 },
        {
            field: "amount",
            headerName: "Amount",
            width: 130,
            valueFormatter: (params) => `${Number(params).toLocaleString()}`,
        },
        {
            field: "date",
            headerName: "Date",
            width: 130,
            valueFormatter: (params) =>
                new Date(params as string).toLocaleDateString(),
        },
        { field: "category", headerName: "Category", width: 150 },
        { field: "description", headerName: "Description", width: 250 },
        { field: "user", headerName: "User", width: 150 },
    ];

    return (
        <Box sx={{ height: 500, width: "100%", mt: 10, mb: 10 }} >
            <DataGrid
                rows={transactions}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 10 },
                    },
                }}
                pageSizeOptions={[5, 10, 25]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
};

export default TransactionsDataGrid;
