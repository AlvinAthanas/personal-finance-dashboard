import {Container, Grid} from "@mui/material";
import StatsCard from "../components/Dashboard/StatCard.tsx";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ExpensesPieChart from "../components/Dashboard/ExpensesPieChart.tsx";
import IncomeVsExpensesChart from "../components/Dashboard/IncomeVsExpensesChart.tsx";
import TransactionsDataGrid from "../components/Dashboard/TransactionsDataGrid.tsx";
import Typography from "@mui/material/Typography";

function Dashboard() {
    const dummyTransactions = [
        {
            id: 1,
            type: "INCOME",
            amount: 4200,
            date: "2025-09-02",
            description: "Salary for September",
            category: "Salary",
            user: "Jon",
        },
        {
            id: 2,
            type: "EXPENSE",
            amount: 150,
            date: "2025-09-02",
            description: "Groceries",
            category: "Food",
            user: "Jon",
        },
    ];
    return <>
        <Container maxWidth={'xl'}>
            <Grid container spacing={2} sx={{marginTop: 8}}>
                <Grid size={{xs: 12, sm: 4}}>
                    <StatsCard
                        title="Monthly Income"
                        value={4200}
                        trend="up"
                        percentage={12}
                        icon={<span>💰</span>}
                        gradient={["#66bb6a", "#43a047"]}
                    />

                </Grid>
                <Grid size={{xs:12, sm:4}}>
                    <StatsCard
                        title="Expenses"
                        value={3200}
                        trend="down"
                        percentage={-8}
                        icon={<span>🛒</span>}
                        gradient={["#ef5350", "#e53935"]}
                    />
                </Grid>
                <Grid size={{xs:12, sm:4}}>
                    <StatsCard
                        title="Current Balance"
                        value={1000}
                        trend="down"
                        percentage={-8}
                        icon={<AccountBalanceWalletIcon fontSize="large" />}
                        gradient={["#5C6BC0", "#3949AB"]}
                    />

                </Grid>
            </Grid>
            <Grid container spacing={10} sx={{marginTop: 8}}>
                {/* Charts and Graphs */}
                <Grid size={{xs:12, md:6}}>
                    {/* <Expenses Pie Chart /> */}
                    <ExpensesPieChart/>
                </Grid>
                <Grid
                    size={{xs:12, md:6}}
                >
                    <Grid><Typography
                        variant={'h4'}
                        marginInlineStart={{sm: 5}}
                    >Income vs Expenses</Typography></Grid>
                    {/* Income vs expenses */}
                    <Grid sx={{marginTop: 8}}>
                        <IncomeVsExpensesChart />
                    </Grid>

                </Grid>

            </Grid>
            <Grid container spacing={2} sx={{marginTop: 8}}>
                <Typography variant={'h4'}>Transactions</Typography>
                <TransactionsDataGrid transactions={dummyTransactions} />
            </Grid>
        </Container>
    </>;
}

export default Dashboard;