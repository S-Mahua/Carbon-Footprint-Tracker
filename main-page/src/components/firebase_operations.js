import {db} from '../firestore/firebase'
import { collection,doc, query, where, onSnapshot , setDoc, getDocs, li} from "firebase/firestore";
const calculateTotalData = (user,category,setValue) => {
  console.log(user)
  var totalEmmitted = 0;
     onSnapshot(collection(db,"carbon_data",user,category), (querySnapshot) => {
      if(!querySnapshot.empty) {
      querySnapshot.forEach((doc) =>{

        Object.keys(doc.data()).map((key,index) => {
          totalEmmitted += doc.data()[key];
        })
        setValue(totalEmmitted)
      })}
    });
    console.log(totalEmmitted)
    
}

const calculateFootprintPercentage = (user,setValue) => {
  var totalEmmitted = 0;
  const tasks = ['travel','vehicle','food','electricity'];
  for(let i = 0; i < 4; i++ )  {
    
    onSnapshot(collection(db,"carbon_data",user,tasks[i]),(querySnapshot) => {
      if(!querySnapshot.empty) {
      querySnapshot.forEach((doc) =>{
          Object.keys(doc.data()).map((key,index) => {
            totalEmmitted += (doc.data()[key])*1;
          })
          setValue((totalEmmitted*10));
        console.log(totalEmmitted);
      })
    }
    })
  };
}

const calculateMonthlyData =  (user,val,ind,setValue) => {
   var totalEmmitted = 0;
   const tasks = ['travel','vehicle','food','electricity'];
   ind--;
   let checkVal = ind.toString();
   console.log(ind)
   if(checkVal.length == 1) checkVal = "0"+checkVal;
   for(let i = 0; i < 4; i++ )  {
   
    onSnapshot(collection(db,"carbon_data",user,tasks[i]),(querySnapshot) => {
      if(!querySnapshot.empty) {

      
      querySnapshot.forEach((doc) =>{
        if(doc.id.slice(3,5) == checkVal){
          Object.keys(doc.data()).map((key,index) => {
            if(doc.data()[key] != null)
            totalEmmitted += doc.data()[key];
          })
          val[ind] = totalEmmitted;
          console.log(val[i-1]);
          setValue(val);
        }
        
        console.log(totalEmmitted);
      })
    }})
   }  
}

const inputCarbonData = (category,val,user) => {
  var date = new Date();
            const date1 = date.getDate() + ':' + ((date.getMonth()/10).toFixed(0) == 0 ? "0" + date.getMonth() : date.getMonth() )+ ':' + date.getFullYear() 
            const time = date.getHours() 
            + ':' + date.getMinutes() 
            + ":" + date.getSeconds();
            console.log(typeof(db))
            setDoc(doc(db,"carbon_data", user,category,date1), {
                  [time] : val || null
                
              },{merge: true}).then((res) =>{console.log(res)}).catch((e) => console.log(e));
}
    export  {calculateTotalData,inputCarbonData,calculateMonthlyData,calculateFootprintPercentage};