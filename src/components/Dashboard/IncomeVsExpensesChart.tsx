import { BarChart } from "@mui/x-charts/BarChart";

export default function IncomeVsExpensesChart() {
    // Dummy data for now
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    const incomeData = [3000, 3200, 2800, 3500, 4000, 3700];
    const expensesData = [2500, 2900, 2600, 3100, 3300, 3400];

    return (
        <BarChart
            xAxis={[{ data: months, scaleType: "band" }]}
            series={[
                { data: incomeData, label: "Income" },
                { data: expensesData, label: "Expenses" },
            ]}
            height={300}
            colors={["#4caf50", "#f44336"]} // Green for income, Red for expenses
        />
    );
}
