import Express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = Express()

app.use(Express.json({limit: "16kb"}))
app.use(Express.urlencoded({extended: true}))
app.use(Express.static("public"))
app.use(cookieParser())
app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        credential: true
    }
))





app.get('',(req, res)=>{

})



export { app }