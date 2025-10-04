import {Container} from "@mui/material";
import TransactionsDataGrid from "../components/Dashboard/TransactionsDataGrid.tsx";
import PageHeader from "../components/PageHeader.tsx";


function Transactions() {
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
        {
            id: 3,
            type: "EXPENSE",
            amount: 200,
            date: "2025-09-03",
            description: "Electricity Bill",
            category: "Utilities",
            user: "Jon",
        },
        {
            id: 4,
            type: "INCOME",
            amount: 300,
            date: "2025-09-04",
            description: "Freelance Project",
            category: "Freelance",
            user: "Jon",
        }
    ]
    return (
        <Container maxWidth={'xl'}>
            <PageHeader title={'Transactions'} buttonText={'+ Add Transaction'}/>
            <TransactionsDataGrid transactions={dummyTransactions} sx={{mt: 8}}/>
        </Container>
    );
}

export default Transactions;