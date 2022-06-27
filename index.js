

const express =require('express');
const {MongoClient}=require('mongodb');
const cors=require('cors');



require('dotenv').config();


const app=express();

const port =process.env.PORT ||5000;


app.use(cors());
app.use(express.json());



const uri=`mongodb+srv://new-database:AHEOew1fHJYN9RtC@cluster0.7s5ai.mongodb.net/?retryWrites=true&w=majority`

const client = new MongoClient (uri,{
useNewUrlParser:true,
useUnifiedTopology:true
});

async function run(){
try{
await client.connect();

const database=client.db("informations");
const info =database.collection("info");



app.post("/information",async(req,res)=>{
const result = await info.insertOne(req.body);
res.json(result); 
});

console.log("db connected successfully");
}
finally{}
}
run().catch(console.dir);

app.get('/',(req,res)=>{
res.send('server is running')});

app.listen(port,()=>{
console.log('server running at port ',port)
});
