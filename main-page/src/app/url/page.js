require('dotenv').config({path: require('find-config')('.env')});
const express = require('express');

const bodyParser = require('body-parser');
const { Reclaim } = require('@reclaimprotocol/js-sdk');
const http = require('http');
const socketIo = require('socket.io');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.json());
const cors = require('cors'); 
app.use(cors());
const providerIds = {
  "amazon" : '5f83ab14-9656-4552-9fbc-482e07022766', // Amazon 2023 Order Count
  "aadhar" : '5e1302ca-a3dd-4ef8-bc25-24fcc97dc800', // Aadhaar Card Date of Birth
  'uber': '5e96617c-351c-4f76-a6af-556ee7fcb522', // Uber Us - 2
  "bank" : 'e56a707e-e8e9-458e-846a-bda8d9699d79', // Bank of America Bank Balance
  "uberuser" : '9d2ea353-8819-447d-9e3f-c433a0d9fe40', // Uber user credentials
  "facebook" : '309e9bc9-be15-4b46-8212-6cc1c0ce14a2', // Facebook account associated with Instagram.
  "salary" : 'e917d34d-4f88-4670-ab52-fd0ce3342762', // Proof of Salary and Title
  "bigbasket": 'f5eb152e-4e52-41d4-be7b-2fc0e8adc892', // Bigbasket Order Count and BBstar Membership
  "blinkit": '618435af-81b0-4b63-aa1d-96187b7f8403', // BlinkIt User details and Time Stamp of when the app was installed
};
const providerValues = {
  amazon : 'CLAIM_DATA', // '171 orders'
  aadhar : 'CLAIM_DATA', //
  uber : 'ride_count', // 32
  bank : 'account_balance' ,//
  uberuser:'',
  facebook : '',
  salary: '',
  flipkart: '',
  swiggy: '',
  steam:'CLAIM_DATA', // accountid
  luma: '',
  alaska: '',
  calendly: 'user_email',// email
  smallcase: 'exited_returns',// 4000
  alphabot_discord: 'discord', // discord id
  alphabot_twitter: 'twitter_ID', // twitter id
  alphabot_address: 'wallet_address' // address of alphabot
  // growwkyc : 
}

app.get('/status',async(req,res) =>{
  res.status(200).send("no")
})
app.post('/status',async(req,res) =>{
  
    const {statusUrl, item} = req.body
    if(statusUrl == "" || item == "") throw new Error("Empty statusUrl")
    console.log(item)
    // console.log(statusUrl)
    await pollApi(req.body,res);
  
})

app.post('/createProofRequest', async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { sessionId, addressUser, messageUser, provider } = req.body;
      if (!sessionId || !addressUser || !messageUser || !provider) {
        throw new Error("Missing input values");
      }

      const reclaimClient = new Reclaim.ProofRequest(
        process.env.APP_ID,
        sessionId
      );

      reclaimClient.addContext(
        addressUser,
        messageUser
      );
       console.log(providerIds['uber'])
      if (!providerIds[provider]) {
        throw new Error("Incorrect provider value");
      }
      
      await reclaimClient.buildProofRequest(providerIds[provider]);
      reclaimClient.setSignature(
        await reclaimClient.generateSignature(
          process.env.APP_SECRET_KEY
        )
      );

      const { requestUrl, statusUrl } = await reclaimClient.createVerificationRequest();
      console.log(requestUrl);
      res.status(200).send([requestUrl.toString(), statusUrl.toString()]);
    } else {
      res.status(500).send({ error: "Incorrect method" });
    }
  } catch (error) {
    console.error(error);
    if (res) {
      res.status(500).send({ error: error.message });
    } else {
      console.error("Response object is undefined");
    }
  }
});

async function pollApi(req,res) {
  const requiredValue = 'MOBILE_SUBMITTED'; 
  // console.log(req.statusUrl)
  fetch(req.statusUrl,{
    method: 'GET',
    mode: 'cors',
  }).then(async(response) => {
    const data = await response.json()
    console.log(data)
    if (data.session.status !== requiredValue) {
        setTimeout(() => pollApi(req,res), 5000); // Poll again after 5 seconds (adjust as needed)
      } else {
        console.log(data.session.proofs[0])
        res.status(200).send([true,(data.session.proofs[0].extractedParameterValues[providerValues[req.item]])]);
      }
  }).catch((e) => console.log(e));
  
  }


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

