


const displayContainer = document.querySelector('.display-container');

const inputName = document.querySelector('#input-name');
const invalidName = document.querySelector('#invalid-name');

const inputEmail = document.querySelector('#input-email');
const invalidEmail = document.querySelector('#invalid-email');

const inputPhone = document.querySelector('#input-phone');
const invalidPhone = document.querySelector('#invalid-phone');

const timeframeContainer = document.querySelector('.timeframe-container');
const toggleTimeframe = document.querySelector('#toggle-timeframe');

const addOnlineService = document.querySelector('#add-ons__online-service');
const addLargerStorage = document.querySelector('#add-ons__larger-storage');
const addCustomizableProfile = document.querySelector('#add-ons__customizable-profile');


const planCostContainer = document.querySelector(".plan-cost__step-4");

const onlineServiceAddendStep4 = document.querySelector('#addends__online-service');
const largerStorageAddendStep4 = document.querySelector('#addends__larger-storage')
const customizableProfileAddendStep4 = document.querySelector('#addends__customizable-profile');

const changePlanLink = document.querySelector('.change-plan');

const nextButton = document.querySelector('#next-button');
const backButton = document.querySelector('#back-button');


const stepContainers = document.querySelectorAll('.step-container');
const stepNumbers = document.querySelectorAll('.step-number');
const stepArr = [...stepContainers];
const stepNumberArr = [...stepNumbers];

const monthlyCosts = document.querySelectorAll('.monthly-cost');
const yearlyCosts = document.querySelectorAll('.yearly-cost');
const monthlyCostArray = [...monthlyCosts];
const yearlyCostArray = [...yearlyCosts];


const arcadeContainer = document.querySelector('.arcade-container');
const advancedContainer = document.querySelector('.advanced-container');
const proContainer = document.querySelector('.pro-container');




const savedInfo = new Object( {
    plan: "",
    timeframe: "Monthly",
    addOns: [],
    costMap: new Map()

})

savedInfo.costMap.set('Arcade', 9);
savedInfo.costMap.set('Advanced', 12);
savedInfo.costMap.set('Pro', 15);

savedInfo.costMap.set('Online service', 1);
savedInfo.costMap.set('Larger storage', 2);
savedInfo.costMap.set('Customizable profile', 2);

const selectAddOns = (addOn, addOnAsString) => {

    let isSelected = addOn.getAttribute('data-selected');
    if (isSelected == "false") {
        addOn.setAttribute('data-selected', 'true');
        savedInfo.addOns.push(addOnAsString);

        // if (savedInfo.timeframe == 'Monthly') {
        //     savedInfo.costMap.set(addOnAsString, )
        // }
    } else if (isSelected == "true") {
        addOn.setAttribute('data-selected', 'false');

        let indexToRemove = savedInfo.addOns.findIndex( (element) => element == addOnAsString );

        savedInfo.addOns.splice(indexToRemove, 1);
        // console.log(savedInfo.addOns);
    }
}


const totalCostCalculator = () => {
    let totalCost = 0;
    totalCost += savedInfo.costMap.get(savedInfo.plan);

    savedInfo.addOns.forEach( (item) => {
        totalCost += savedInfo.costMap.get(item);
    })

    return totalCost;
}

const loadStepFourData = () => {

    // console.log({savedInfo});

    document.querySelector('#plan-selected__step-4').textContent = savedInfo.plan + ' (' + savedInfo.timeframe + ')';
    
    let planCost = savedInfo.costMap.get(savedInfo.plan);
    let planCostStr

    let totalCost = totalCostCalculator();
    let totalCostStr
    if (savedInfo.timeframe == "Monthly") {
        planCostStr = "$" + planCost + "/mo";
        document.querySelector('.total-cost__label').textContent = "Total (per month)";

        totalCostStr = "+$" + totalCost + "/mo";

    } else if (savedInfo.timeframe == "Yearly") {
        planCostStr = "$" + planCost +"/yr";
        document.querySelector('.total-cost__label').textContent = "Total (per year)";

        totalCostStr = "+$" + totalCost + "/mo";
        
    }

    planCostContainer.textContent = planCostStr;
    document.querySelector('.total-cost__cost').textContent = totalCostStr;
    

    
    if (savedInfo.addOns.includes("Online service")) {
        onlineServiceAddendStep4.setAttribute("data-visible", "true");
    } else {
        onlineServiceAddendStep4.setAttribute("data-visible", "false");
    }

    if (savedInfo.addOns.includes("Larger storage")) {
        largerStorageAddendStep4.setAttribute("data-visible", "true");
    } else {
        largerStorageAddendStep4.setAttribute("data-visible", "false");
    }

    if (savedInfo.addOns.includes("Customizable profile")) {
        customizableProfileAddendStep4.setAttribute("data-visible", "true");
    } else {
        customizableProfileAddendStep4.setAttribute("data-visible", "false");
    }

    // const totalCostLabelContainer = document.querySelector('.total-cost__label');
    // if ()
    
}

const validateEmail = (email) => {
    console.log({email});
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const validatePhoneNumber = (phoneNumber) => {
    return String(phoneNumber)
        .match(
            /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
        );
}

const validateInputs = (currentPage) => {
    

    if (currentPage == 1) {
        console.log({currentPage})
        let name = inputName.value;
        let emailAddress = inputEmail.value;
        let phoneNumber = inputPhone.value;
        
        let validName = 0;
        let validEmail = 0;
        let validPhone = 0;
        

        if (name == '') {
            invalidName.setAttribute('data-visible', "true");
            validName = 0;
        } else {
            invalidName.setAttribute('data-visible', "false");
            validName = 1;
        }


        if (emailAddress == '') {
            invalidEmail.textContent = "This field is required";
            invalidEmail.setAttribute('data-visible', "true");
            validPhone = 0;
        } else if (!validateEmail(emailAddress)) {
            // console.lo
            invalidEmail.textContent = "Must be valid format";
            invalidEmail.setAttribute('data-visible', "true");
            validEmail = 0;
        } else {
            console.log('email is valid');
            invalidEmail.setAttribute('data-visible', "false");
            validEmail = 1;
        }
        


        if (phoneNumber == '') {
            invalidPhone.textContent = "This field is required";
            invalidPhone.setAttribute('data-visible', "true");
            validPhone = 0;
        } else if (!validatePhoneNumber(phoneNumber)){
            invalidPhone.textContent = "Must be valid format";
            invalidPhone.setAttribute('data-visible', "true");
            validPhone = 0;
        } else {
            invalidPhone.setAttribute('data-visible', "false");
            validPhone = 1;
        }


        if (validName && validEmail && validPhone) return true;
        return false;

    }
    

    if (currentPage == 2) {
        if (savedInfo.plan == '') {
            // alert('You must select a plan.');
            document.querySelector('.validation-warning__step-2').setAttribute('data-visible', 'true');
            return false;
        } else {
            document.querySelector('.validation-warning__step-2').setAttribute('data-visible', 'false');
        }

        return true;
        // return true;
    }
    // return false;

    return true;

}

function loadPage (currentPage, button) {

    // console.log('in loadPage')
    let stepIndex = currentPage-1;
    let targetIndex
    let newPage
    // console.log({phoneInput});
    console.log({button});



    if (button == nextButton) {
        if (!validateInputs(currentPage)) return;

        // if (currentPage == 3)
        targetIndex = stepIndex + 1;
        newPage = parseInt(currentPage) + 1;
    } else if ( button == backButton) {
        targetIndex = stepIndex - 1;
        newPage = parseInt(currentPage) - 1;
    } else {
        console.log('error, invalid button');
        return;
    }


    if (newPage > 1) {
        backButton.setAttribute('data-visible', "true");
    } else {
        backButton.setAttribute('data-visible', "false");
    }



    if (newPage == 4) {
        loadStepFourData();
        nextButton.textContent = "Confirm";
    } else if (newPage == 5) {
        nextButton.setAttribute('data-visible', "false");
        backButton.setAttribute('data-visible', "false");
    } else {
        nextButton.textContent = "Next Step";
        nextButton.setAttribute('data-visible', "true");
    }


    stepArr.forEach( (step, index) => {
        if (index == targetIndex) {
            step.setAttribute('data-visible', "true");
            displayContainer.setAttribute('data-current-page', newPage)
        } else {
            step.setAttribute('data-visible', "false");
        }
    })

    if (newPage == 5) return;
    // if (targetIndex == 4) return;
    stepNumberArr.forEach(( number, index) => {
        if (index == targetIndex) {
            number.setAttribute('data-selected', "true");
        } else {
            number.setAttribute('data-selected', "false");
        }
    })
    
}


arcadeContainer.addEventListener('click', () => {
    arcadeContainer.setAttribute('data-selected', "true");
    advancedContainer.setAttribute('data-selected', "false");
    proContainer.setAttribute('data-selected', "false");

    savedInfo.plan = 'Arcade';
})

advancedContainer.addEventListener('click', () => {
    arcadeContainer.setAttribute('data-selected', "false");
    advancedContainer.setAttribute('data-selected', "true");
    proContainer.setAttribute('data-selected', "false");

    savedInfo.plan = 'Advanced';
})

proContainer.addEventListener('click', () => {
    arcadeContainer.setAttribute('data-selected', "false");
    advancedContainer.setAttribute('data-selected', "false");
    proContainer.setAttribute('data-selected', "true");

    savedInfo.plan = 'Pro';
    
})


toggleTimeframe.addEventListener('click', () => {
    let currentTimeframe = timeframeContainer.getAttribute('data-timeframe-selected');
    // console.log({currentTimeframe})
    let newTimeframe
    if (currentTimeframe == 'monthly') {
        newTimeframe = 'yearly';
        savedInfo.timeframe = "Yearly";

        savedInfo.costMap.set('Arcade', 90);
        savedInfo.costMap.set('Advanced', 120);
        savedInfo.costMap.set('Pro', 150);
        savedInfo.costMap.set('Online service', 10);
        savedInfo.costMap.set('Larger storage', 20);
        savedInfo.costMap.set('Customizable profile', 20);

        monthlyCostArray.forEach( (item) => {
            item.setAttribute('data-visible', 'false');
            
        })

        yearlyCostArray.forEach( (item) => {
            item.setAttribute('data-visible', 'true');
        })

        
        // timeframeContainer.setAttribute('data-timeframe-selected', 'yearly');
    } else if (currentTimeframe == 'yearly') {
        newTimeframe = 'monthly';
        savedInfo.timeframe = "Monthly";

        savedInfo.costMap.set('Arcade', 9);
        savedInfo.costMap.set('Advanced', 12);
        savedInfo.costMap.set('Pro', 15);
        savedInfo.costMap.set('Online service', 1);
        savedInfo.costMap.set('Larger storage', 2);
        savedInfo.costMap.set('Customizable profile', 2);

        monthlyCostArray.forEach( (item) => {
            item.setAttribute('data-visible', 'true');
        })
        yearlyCostArray.forEach( (item) => {
            item.setAttribute('data-visible', 'false');
        })

        // timeframeContainer.setAttribute('data-timeframe-selected', 'monthly');
    } else {
        console.log('invalid timeframe');
    }

    timeframeContainer.setAttribute('data-timeframe-selected', newTimeframe);
    toggleTimeframe.setAttribute('data-slider-position', newTimeframe)
})



addOnlineService.addEventListener('click', () => {
    selectAddOns(addOnlineService, "Online service");
})

addLargerStorage.addEventListener('click', () => {
    selectAddOns(addLargerStorage, "Larger storage");
})

addCustomizableProfile.addEventListener('click', () => {
    selectAddOns(addCustomizableProfile, "Customizable profile");
})

changePlanLink.addEventListener('click', () => {
    loadPage(1, nextButton);
})



nextButton.addEventListener('click', () => {
    const currentPage = displayContainer.getAttribute('data-current-page');
    console.log({currentPage});

    // navigatePages(currentPage, nextButton);
    loadPage(currentPage, nextButton);
    
})

backButton.addEventListener('click', () => {
    const currentPage = displayContainer.getAttribute('data-current-page');
    loadPage(currentPage, backButton);
})




