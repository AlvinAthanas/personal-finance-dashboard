import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Stack,
    TextField
} from "@mui/material";
import PageHeader from "../components/PageHeader.tsx";
import {useState} from "react";
import StatsCard from "../components/Dashboard/StatCard.tsx";
import BudgetList from "../components/Budget/BudgetList.tsx";
import Typography from "@mui/material/Typography";

function Budgets() {
    const dummyBudgets = [
        {
            id: 1,
            category: "Food",
            amount: 1000,
            spent: 600
        },
        {
            id: 2,
            category: "Transport",
            amount: 500,
            spent: 200

        },
        {
            id: 3,
            category: "Entertainment",
            amount: 800,
            spent: 400
        }
    ]
    const [dialogOpen, setDialogOpen] = useState(false);
    const openDialog = () => {
        setDialogOpen(true);
    }
    const handleClose = () => {
        setDialogOpen(false);
    }
    return <Container maxWidth={'xl'}>
        <PageHeader title={'Budgets'} buttonText={'+ Add Budget'} onButtonClick={openDialog}/>
        <Grid container spacing={2} sx={{ mb: 4, mt: 6 }}>
            <Grid size={{xs: 12, sm: 4}}>
                <StatsCard title="Total Budget" value={5000} icon={<span>📊</span>} gradient={["#42a5f5", "#1e88e5"]}/>
            </Grid>
            <Grid size={{xs: 12, sm: 4}}>
                <StatsCard title="Total Spent" value={3200} icon={<span>💸</span>} gradient={["#ef5350", "#e53935"]}/>
            </Grid>
            <Grid size={{xs: 12, sm: 4}}>
                <StatsCard title="Remaining" value={1800} icon={<span>💰</span>} gradient={["#66bb6a", "#43a047"]}/>
            </Grid>
        </Grid>
        {/* Budget List */}
        <BudgetList budgets={dummyBudgets}/>
        <Dialog open={dialogOpen} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>
                <Typography variant="h5" fontWeight="600">
                    Add a Budget
                </Typography>
            </DialogTitle>

            <DialogContent dividers>
                <Stack spacing={3} sx={{ mt: 1 }}>
                    <TextField
                        fullWidth
                        label="Budget Name"
                        variant="outlined"
                    />
                    <TextField
                        fullWidth
                        label="Amount"
                        type="number"
                        variant="outlined"
                    />
                    <TextField
                        fullWidth
                        label="Category"
                        variant="outlined"
                    />
                    <TextField
                        fullWidth
                        label="Period"
                        select
                        variant="outlined"
                        defaultValue="MONTHLY"
                    >
                        <option value="DAILY">Daily</option>
                        <option value="MONTHLY">Monthly</option>
                        <option value="YEARLY">Yearly</option>
                    </TextField>
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color="inherit">
                    Cancel
                </Button>
                <Button variant="contained" color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    </Container>;
}

export default Budgets;