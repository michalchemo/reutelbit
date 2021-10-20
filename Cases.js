//const countryMap = new Map();
var   countryMap = new Map();
var   countrySet ;
function ValidateValues(InputValue)
{
  if (!InputValue) {
    return false; 
  }
    return true;

}

async function getCasesbyDate(date,CountryName,status)
{
  var TodayCases;
  try {
     
  //if (IfToday(date) )
  //{
     // GET today Total cases

    // const cors = require('cors')

   //  const corsOptions = {
   // origin: 'http://localhost:5500',
  //  credentials: true,
 
  //}
//app.use(cors(corsOptions));


// map every url to the promise of the fetch

 
     const response = await fetch('https://covid-api.mmediagroup.fr/v1/cases?country=' + CountryName, {
    mode: 'no-cors'
  } ).then((response) => {
    return response.json();
    })
    .then((myJson) => {
     //const Res = await response.json(); //.then((response) => {
 
    if (status = 'confirmed')
      {TodayCases =  myJson.All.confirmed;}
      else 
     {TodayCases = myJson.All.deaths;}
      alert(TodayCases);
 });
  //}

 // GET yesterday Total Cases
 /*
 fetch('https://covid-api.mmediagroup.fr/v1/history?country=' + CountryName + '&status='+status).then((response) => {
 return response.json();
 })
 .then((myJson) => {
 
  countryMap.set(CountryName, myJson.All.dates);
  var yesterday = new Date(date - 86400000); // that is: 24 * 60 * 60 * 1000
  
  TodayCases = countryMap.get(CountryName)[getValidFormat(date)] ;
  var totalCase =  TodayCases - countryMap.get(CountryName)[getValidFormat(yesterday)];
  console.log('getCasesbyDate = ' + countryMap.get(CountryName)[getValidFormat(date)]);
  
  
});
*/
return  TodayCases;//totalCase;



  }
catch (Message) {
 alert ('Error getCasesbyDate ' + Message);
}
  
}
function GetConfirmedCases() {

  
  var CountryName = document.getElementById("CountryName").value;
  var CountryDate = new Date(document.getElementById("CountryDate").value);
  var TodayConfirmed;
  try {
     
    if (!ValidateValues(CountryName) || !ValidateValues(CountryDate))
  {
      
      throw 'Country Name or date are missing';
 
  }
  
  if (IfToday(CountryDate) )
  {
     // GET today Total cases
 fetch('https://covid-api.mmediagroup.fr/v1/cases?country=' + CountryName ).then((response) => {
  return response.json();
  })
  .then((myJson) => {
    console.log( 'Today');
    TodayConfirmed =  myJson.All.confirmed;
 });
  }

 // GET yesterday Total Cases
 fetch('https://covid-api.mmediagroup.fr/v1/history?country=' + CountryName + '&status=confirmed').then((response) => {
 return response.json();
 })
 .then((myJson) => {
 
  countryMap.set(CountryName, myJson.All.dates);
  var yesterday = new Date(CountryDate - 86400000); // that is: 24 * 60 * 60 * 1000
  
  TodayConfirmed = countryMap.get(CountryName)[getValidFormat(CountryDate)] ;
  var totalCase =  TodayConfirmed - countryMap.get(CountryName)[getValidFormat(yesterday)];
  console.log(countryMap.get(CountryName)[getValidFormat(CountryDate)]);
  console.log('totalCase=' + totalCase);
  document.getElementById("TotalCases").innerHTML = 'Total Confirmed: ' + totalCase;

  return [CountryDate,totalCase ];
});


  }
catch (Message) {
 alert (Message);
}
}
 
// if today
function IfToday(someDate)
{
  const today = new Date();
  return someDate.getDate() == today.getDate() &&
         someDate.getMonth() == today.getMonth() &&
         someDate.getFullYear() == today.getFullYear();

}

//Get date in format YYYY-MM-DD
function getValidFormat(date) {

  var date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  var result = date.toISOString().split('T')[0];
  return result;
 
}


function AddCountry()
{
try { 
    var UserName = document.getElementById("UserName").value;
    var CountryName = document.getElementById("CountryName").value;
    if (!ValidateValues(UserName)|| !ValidateValues(CountryName))
    {
        throw 'No User name or Country Was Given';
    }
    
    if (countryMap.has(UserName)) // if user Exist
      {
        
        var countryArray = countryMap.get(UserName);
        var index = countryArray.indexOf(CountryName); //Avoid Duplicate
        if (index !== -1) {
            throw 'Country Already Exist for that User.';
            }
        countryArray.push(CountryName);
        countryMap.set(UserName, countryArray);
        console.log(CountryName +' add to Exist User '+UserName );
        console.log(countryMap.get(UserName));
      } 
      else // create new array for existing user
      {
        var countryArray= [CountryName];
        countryMap.set(UserName, countryArray);
        console.log(CountryName +' add to '+ UserName );
        console.log(countryMap.get(UserName));
      }
     
     
    

}
   


catch(Message)
{
   alert(Message);
}
}

function DeleteCountry()
{
    try{
        var UserName = document.getElementById("UserName").value;
        var CountryName = document.getElementById("CountryName").value;
        if (!ValidateValues(UserName)|| !ValidateValues(CountryName))
        {
            throw 'No User name or Country Was Given';
        }
        if (!countryMap.has(UserName) )
        {
         throw 'There are No Country list for that user.';
        }
     countrySet = countryMap.get(UserName);
     var index = countrySet.indexOf(CountryName);
     if (index !== -1) {
             countrySet.splice(index, 1);
         }
     else 
     {
         throw 'Country did not exist for that user.';
     }
     countryMap.set(UserName, countrySet);
     console.log(CountryName +' Deleted From '+ UserName );
    console.log(countryMap.get(UserName));
    }
    catch(Message)
         {
            alert(Message);
         }

}

function GetAllCountries()
{
    try{
        var UserName = document.getElementById("UserName").value;
        var CountryName = document.getElementById("CountryName").value;
        if (!ValidateValues(UserName)|| !ValidateValues(CountryName))
        {
            throw 'No User name or Country Was Given';
        }
    
        var Countries;
        if (countryMap.has(UserName))
           {
            document.getElementById("TotalCountryByUser").innerHTML =  countryMap.get(UserName) ;
            console.log(countryMap.get(UserName));
            return countryMap.get(UserName);
           }
           else 
           {
               throw 'No Such User.';
           }
           
            
        }
   catch(Message)
        {
           alert(Message);
        }

}
//https://www.delftstack.com/howto/javascript/javascript-wait-for-function-to-finish/ 
//
async function NumberOfCases(Status)
{
  // Validation!!!!
  var allCases = new Set(new Map());
  var DateFrom =  new Date(document.getElementById("DateFrom").value);
  var DateTo = new Date(document.getElementById("DateTo").value);
  var AllCountries = GetAllCountries(); 
  var Totalcases;
  var PromiseAll = [];
 
    for (let index = 0; index < AllCountries.length; ++index) {
      while (DateTo >= DateFrom)
      {
        allCases.add(AllCountries[index],[DateTo,Totalcases] ); 
        //PromiseAll.push(AllCountries[index], getValidFormat(DateTo), getCasesbyDate(DateTo,(AllCountries[index]),Status) );
        PromiseAll.push( getValidFormat(DateTo), getCasesbyDate(DateTo,(AllCountries[index]),Status) );
        await Promise.all(PromiseAll,{
          mode: 'no-cors'
        });
      }
  
   DateTo = new Date(DateTo - 86400000);
  }
  console.log(allCases.keys());
  console.log(PromiseAll.values());
  
   document.getElementById("TotalCases").innerHTML =  JSON.stringify(PromiseAll);
   document.getElementById("TotalCountryByUser").innerHTML =  JSON.stringify(PromiseAll);
   console.log('END');
}


async function HighestCases(Status)
{
  // Validation!!!!
 
}