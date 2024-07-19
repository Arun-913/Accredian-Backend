import 'dotenv/config';
import express, { application } from 'express'
import cors from 'cors'
import { userRouter } from './routes/user';
import { referralRouter } from './routes/referral';

const PORT = process.env.PORT as string || 8000;

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/user', userRouter);
app.use('/api/referral', referralRouter);

app.get('/', (req, res)=>{
    res.json({status: 'healthy'});
})

app.listen(PORT, () => console.log('Server started at port 8000'));