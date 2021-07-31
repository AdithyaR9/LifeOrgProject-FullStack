const saveBasicInfoBtn = document.querySelector("button");
const saveVitalInfoBtn = document.querySelectorAll("button")[1];

let age, gender, height, weight;

//basic Info
saveBasicInfoBtn.addEventListener("click", function () {
    
    age = document.querySelectorAll("input")[0].value;
    gender = document.querySelector("input")[1].value;
    height = document.querySelectorAll("input")[2].value;
    weight = document.querySelectorAll("input")[3].value;

    document.querySelectorAll("p")[0].innerText = `Age: ${age} yrs old`;
    document.querySelectorAll("p")[1].innerText = `Gender: ${gender}`;
    document.querySelectorAll("p")[2].innerText = `Height: ${height} in.`;
    document.querySelectorAll("p")[3].innerText = `Weight: ${weight} lbs.`;
})

// const selectedGender = () => {
//     const genderOptions = document.getElementsByName("gender");

//     if(genderOptions[0].checked)
//         gender = genderOptions[0].value;
//     else if (genderOptions[1].checked)
//         gender = genderOptions[1].value;
//     else gender = "Other/None Selected"
// }

let heartRate, bPSystolic, bPDystolic;

//Vitals inputs
saveVitalInfoBtn.addEventListener("click", function () {
    
    heartRate = document.querySelectorAll("input")[5].value;
    bPSystolic = document.querySelectorAll("input")[6].value;
    bPDystolic = document.querySelectorAll("input")[7].value;

    document.querySelectorAll("p")[4].innerText = `Heart Rate: ${heartRate} bpm`;
    document.querySelectorAll("p")[5].innerText = `Blood Pressure (Systolic/Dystolic): ${bPSystolic}/${bPDystolic}`;
})

