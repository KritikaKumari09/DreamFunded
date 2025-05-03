import express , {response} from 'express'
import dotenv from "dotenv"
import cors from 'cors'
import userRouter from './routes/userRoute.js'
import projectRouter from './routes/projectRoute.js'
import chatRouter from './routes/chatRoute.js'
import paymentRouter from './routes/paymentRoute.js'
import connectDB from './db/index.js'
import cookieParser from "cookie-parser"
import {createServer} from 'http'
import {Server} from 'socket.io'
import {getUserGroupsId} from './controllers/chat/getAllGroups.controller.js'
import { uploadOnCloudinary } from './utils/cloudinary.js'

dotenv.config({
    path:'./.env'
})

const app=express();
const server = createServer(app);
const io = new Server(server,{cors: {origin: 'https://dreamfunded.onrender.com'}});


io.on("connection",async(socket)=>{
        const userGroups = await getUserGroupsId(socket.handshake.query.id);
        userGroups.forEach((grp)=>{
            socket.join(String(grp._id));
        })

        socket.on("message",(data)=>{
            const newMessage = {
                sender: data.id,
                createdAt: data.time,
                content: data.content
            }
            const newData = {
                message: newMessage,
                groupId: data.groupId
            }
            socket.to(data.groupId).emit("recieve",newData);
        })
    socket.on("disconnect",()=>{
        userGroups.forEach((grp)=>{
            socket.leave(String(grp._id));
        })  
    })
    
})

app.use(cors({
    origin: [process.env.CORS_ORIGIN, 'https://checkout.stripe.com'],
    credentials: true
}))

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.CORS_ORIGIN);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
  

//* we don't want to parse the incoming request body for the webhook route
app.use((req, res, next) => {
    if (req.originalUrl === '/api/payment/webhook') {
      next(); //* Skip express.json() for the webhook route
    } else {
      express.json()(req, res, next); //* Apply express.json() for other routes
    }
});
app.use(express.urlencoded({extended:true, limit:"16kb"}))// accept url  
app.use(express.static("public"))// used to save some images, favicon if needed in public folder
app.use(cookieParser())
// app.use(express.json()) //! disabling it because webhook signature are lost after parsing


//routes
app.use('/api/user',userRouter)
app.use('/api/chat',chatRouter)
app.use('/api/project',projectRouter)
app.use('/api/payment',paymentRouter)

// below we are creating route
app.get('/', (req,res)=>{
    console.log(req);
    return res.status(234).send('welocme')
})

app.get()
// app.post("/",async(req,res)=>{
//     console.log("File recieved")
//     const result = await uploadOnCloudinary(req.body.url)
//     return res.json({url: result})
//   })


server.listen(process.env.PORT || 5000, async()=>{
     await connectDB();
    console.log(`Server is running at port : ${process.env.PORT}`);
})




