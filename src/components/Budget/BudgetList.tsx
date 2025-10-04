import {Card, Grid, LinearProgress} from "@mui/material";
import Typography from "@mui/material/Typography";
interface Budget {
    id: number;
    category: string;
    amount: number;
    spent: number;
}
interface BudgetProps {
    budgets: Budget[];
}
export default function BudgetList({budgets}: BudgetProps) {
    return(
        <Grid container spacing={2}>
            {budgets.map((budget) => (
                <Grid size={{xs:12, sm:6, md:4}} key={budget.category}>
                    <Card sx={{ p: 2 }}>
                        <Typography variant="h6">{budget.category}</Typography>
                        <Typography>Budgeted: ${budget.amount}</Typography>
                        <Typography>Spent: ${budget.spent}</Typography>
                        <LinearProgress
                            variant="determinate"
                            value={(budget.spent / budget.amount) * 100}
                            sx={{ mt: 1 }}
                        />
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            Remaining: ${budget.amount - budget.spent}
                        </Typography>
                    </Card>
                </Grid>
            ))}
        </Grid>)
}

