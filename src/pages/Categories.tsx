import * as React from "react";
import {
    Box,
    Button,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem, Container,
} from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PageHeader from "../components/PageHeader.tsx";

interface Category {
    id: number;
    name: string;
    type: "INCOME" | "EXPENSE";
}

// Dummy data
const dummyCategories: Category[] = [
    { id: 1, name: "Salary", type: "INCOME" },
    { id: 2, name: "Food", type: "EXPENSE" },
    { id: 3, name: "Transport", type: "EXPENSE" },
    { id: 4, name: "Entertainment", type: "EXPENSE" },
];

export default function Categories() {
    const [categories, setCategories] = React.useState<Category[]>(dummyCategories);

    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [newCategory, setNewCategory] = React.useState({
        name: "",
        type: "INCOME" as "INCOME" | "EXPENSE",
    });

    const handleOpen = () => setDialogOpen(true);
    const handleClose = () => setDialogOpen(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewCategory(prev => ({ ...prev, [name]: value }));
    };

    const handleAddCategory = () => {
        const nextId = categories.length ? Math.max(...categories.map(c => c.id)) + 1 : 1;
        setCategories([...categories, { id: nextId, ...newCategory }]);
        setNewCategory({ name: "", type: "INCOME" });
        handleClose();
    };

    const columns: GridColDef<Category>[] = [
        { field: "id", headerName: "ID", flex: 0.5 },
        { field: "name", headerName: "Name", flex: 2 },
        { field: "type", headerName: "Type", flex: 1 },
        {
            field: "actions",
            headerName: "Actions",
            flex: 0.5,
            sortable: false,
            filterable: false,
            renderCell: () => (
                <Box>
                    <IconButton color="primary">
                        <EditIcon />
                    </IconButton>
                    <IconButton color="error">
                        <DeleteIcon />
                    </IconButton>
                </Box>
            ),
        },
    ];

    return (
        <Container maxWidth={'xl'}>
            {/* Header */}
            <PageHeader title="Categories" buttonText="+ Add Category" onButtonClick={handleOpen}/>

            {/* DataGrid */}
            <Box sx={{ height: 500, width: "100%", mt: 10 }}>
                <DataGrid<Category>
                    rows={categories}
                    columns={columns}
                    pageSizeOptions={[5, 10]}
                    initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>

            {/* Add Category Dialog */}
            <Dialog open={dialogOpen} onClose={handleClose}>
                <DialogTitle>Add New Category</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Name"
                        name="name"
                        fullWidth
                        value={newCategory.name}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        label="Type"
                        name="type"
                        select
                        fullWidth
                        value={newCategory.type}
                        onChange={handleChange}
                    >
                        <MenuItem value="INCOME">Income</MenuItem>
                        <MenuItem value="EXPENSE">Expense</MenuItem>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAddCategory} variant="contained">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
