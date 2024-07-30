// Define the BASE_URL for API
const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1";

 // Get all dropdown select elements  using document.querySelectorAll
  const dropdowns=document.querySelectorAll(".dropdown select");
//jaise hi exchange rate wale button pe click kare tohj exchange rate likh hui aa jaye
const btn=document.querySelector("form button");
//accessing select element of from and to element 
const fromCurr=document.querySelector(".from select")
const toCurr=document.querySelector(".to select")


// Loop through each dropdown select element
for (let select of dropdowns){
    // Loop through each currency code in the countryList
    for(let currCode in countryList){
        let newOption=document.createElement("option");//creating a new element newoption
        newOption.innerText=currCode;// Set the inner text of the option to display currency code
        newOption.value=currCode;// Set the value attribute of the option to the currency code
        //jo select kiya hai woh show ho iske liye yeah likha hai
        if(select.name==="from"&& currCode==="USD"){
            newOption.selected="selected";
        }else  if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
        }
        
        select.append(newOption); // Append the new option to the dropdown select element
        
    }
    //add event listener to select to update flag when we change currCode
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);

    }); 
}


const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
  };

//add event listener to button
btn.addEventListener("click",async(evt)=>{  //yaha humne function ko async isliye banaya hai as hum niche isme await use karne wale hai
    evt.preventDefault(); //isko use karne se button clickhone pe jo bhi kaaam by default ho rahe the(jaise page refresh) sab stop ho jayenge
    //accessing entered amount
    let amount =document.querySelector(".amount input");
    let amtVal =amount.value;
    if(amtVal=== ""|| amtVal<1){
        amtVal=1;
        amount.value="1";
    }
    //console.log(fromCurr.value,toCurr.value);

    // //here we create an url to use our api
    // const URL=`${BASE_URL}/${fromCurr.value.toLowerCase}/${toCurr.value.toLowerCases}.json`;
    // //fetching API
    // let response = await fetch(URL);

    const URL = `${BASE_URL}/currencies/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    console.log(response)

});

