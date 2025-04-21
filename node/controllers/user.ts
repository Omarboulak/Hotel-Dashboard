import express, {Request, Response} from 'express'

const user = express();

user.get('/', (req: Request, res: Response) =>{
    res.send('Hello Word')
})

user.listen(3000, () =>{
    console.log('Server is running on port 3000');
})