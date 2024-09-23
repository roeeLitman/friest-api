import express from 'express'

const app = express()

const port = 770

app.get('/', (req, res)=>{
    res.send("wolcam to my server")
})

app.get('/amn', (req, res)=>{
    res.send("wolcam to my server")
})

app.get('/amn/:id', (req, res)=>{
    res.send("wolcam to my server")
})

app.get('/amn/summary', (req, res)=>{
    res.send("wolcam to my server")
})

app.post('/amn', (req, res)=>{
    res.send("wolcam to my server")
})

app.patch('/amn', (req, res)=>{
    res.send("wolcam to my server")
})

app.listen(port, ()=>{
    console.log(`server listen to ${port} port. visit http://localhost:${port}`);    
})


