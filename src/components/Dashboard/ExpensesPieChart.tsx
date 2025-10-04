import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { PieChart } from '@mui/x-charts';

// Dummy Expenses by Category Data
const expensesByCategory = [
    { label: 'Food', value: 350 },
    { label: 'Transport', value: 120 },
    { label: 'Entertainment', value: 200 },
    { label: 'Utilities', value: 90 },
    { label: 'Healthcare', value: 150 },
    { label: 'Savings', value: 100 },
];

export default function ExpensesPieChart() {
    const [radius, setRadius] = React.useState(50);
    const [itemNb, setItemNb] = React.useState(expensesByCategory.length);
    const [skipAnimation, setSkipAnimation] = React.useState(false);

    const handleItemNbChange = (_event: Event, newValue: number | number[]) => {
        if (typeof newValue === 'number') setItemNb(newValue);
    };

    const handleRadius = (_event: Event, newValue: number | number[]) => {
        if (typeof newValue === 'number') setRadius(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Typography variant="h6" gutterBottom>
                Expenses by Category
            </Typography>

            <PieChart
                height={300}
                width={350}
                series={[
                    {
                        data: expensesByCategory.slice(0, itemNb),
                        innerRadius: radius,
                        arcLabel: (params) => `${params.label}: $${params.value}`,
                        arcLabelMinAngle: 20,
                    },
                ]}
                skipAnimation={skipAnimation}
            />

            <FormControlLabel
                checked={skipAnimation}
                control={
                    <Checkbox onChange={(event) => setSkipAnimation(event.target.checked)} />
                }
                label="Skip Animation"
                labelPlacement="end"
            />

            <Typography id="input-item-number" gutterBottom>
                Number of Categories
            </Typography>
            <Slider
                value={itemNb}
                onChange={handleItemNbChange}
                valueLabelDisplay="auto"
                min={1}
                max={expensesByCategory.length}
                aria-labelledby="input-item-number"
            />

            <Typography id="input-radius" gutterBottom>
                Radius
            </Typography>
            <Slider
                value={radius}
                onChange={handleRadius}
                valueLabelDisplay="auto"
                min={15}
                max={100}
                aria-labelledby="input-radius"
            />
        </Box>
    );
}
