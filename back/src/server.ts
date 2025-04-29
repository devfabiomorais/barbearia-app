import express from 'express';
import { enterpriseRoutes } from './routes/enterpriseRoutes';

const app = express();

app.use(express.json());


app.use('/api/enterprise', enterpriseRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
