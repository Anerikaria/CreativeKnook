const sectionIntro = document.getElementById('#section--Intro');
const header = document.querySelector('.header');
const nav = document.querySelector('.nav');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1= document.querySelector('.section__otherlinks');

const sections = document.getElementById('#section1');
const sectionHidden = document.querySelector('.section--hidden');

const whyUs = document.querySelector('.why__us-img');

const philosophyAll = document.querySelectorAll('.philosophy-to-all');
const philosophyUpperOne = document.querySelector('.philosophy__upper__one');
const philosophyUpperTwo = document.querySelector('.philosophy__upper__two');
const philosophyUpperThree = document.querySelector(
  '.philosophy__upper__three'
);
const philosophyBottomFour = document.querySelector(
  '.philosophy__bottom__four'
);
const philosophyBottomFive = document.querySelector(
  '.philosophy__bottom__five'
);
const philosophyFigures = document.querySelectorAll('.philosophy-figure');

const navigation = document.querySelector('.navigation');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

// const fname = document.getElementById('fname').value;

// const lastName = document.getElementById('lname');
// const email = document.getElementById('email');
// const contactNumber = document.getElementById('cnumber');
// const message = document.getElementById('message');

//career form
const attachment = document.getElementById('attachment');
//enroll from
const howdidyouHear = document.getElementById('dropdownitem');
const daysRequired = document.getElementById('days');
const fullName = document.getElementById('fullName');
const dateOfBirth = document.getElementById('DateofBirth');
const dateOfStart = document.getElementById('DateofStart');

const validationText = document.querySelector('.error');

let messageText =[]



//validations
// const validation = function(){
//   //common for all forms
//   if(fname.value === '' || fname.value == null){
//     validationText.innerText = 'There was a problem with your submission. Please make sure * mentioned fields are not empty'
//   }
//   }



//section Philosophy animation using Intersesction Observer API

function sect(entries) {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      if (entry.target.contains(philosophyUpperOne)) {
        entry.target.classList.add('philosophy--one');
      } else if (entry.target.contains(philosophyUpperTwo)) {
        entry.target.classList.add('philosophy--two');
      } else if (entry.target.contains(philosophyUpperThree)) {
        entry.target.classList.add('philosophy--three');
      } else if (entry.target.contains(philosophyBottomFour)) {
        entry.target.classList.add('philosophy--one');
      } else if (entry.target.contains(philosophyBottomFive)) {
        entry.target.classList.add('philosophy--three');
      }
    } else if (!entry.isIntersecting) {
      return;
    }
  });
}

const img = document.querySelector('.philosophy--img');
const hide = document.querySelector('.u-section--hide');

const figure = function (entries) {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      entry.target.classList.add('philosophy-img');
    } else if (!entry.intersectionRatio > 0) {
      return;
    }
  });
};

let sectObserver = new IntersectionObserver(sect);
let figureObserver = new IntersectionObserver(figure);

philosophyAll.forEach(item => {
  sectObserver.observe(item);
});

philosophyFigures.forEach(item => {
  figureObserver.observe(item);
});


//*****************************************************************************
//slider

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides?.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      ?.classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides?.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();
  // Event handlers
  btnRight?.addEventListener('click', nextSlide);
  btnLeft?.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer?.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

////////////////////////////////////////////////////////////////////////////////////
//Lazy loading images//
// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

//faqs

//Enroll---------------------------------------------------------------------

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
  navigation.classList.add('hidden');

};

const closeModal = function (e) {
  e.preventDefault();
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
  navigation.classList.remove('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal?.addEventListener('click', closeModal);

overlay?.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//for dropdown selection
const select = document.querySelector('.select__dropdown');

if (select) {
  select.addEventListener('change', event => {
    event.target.value;
  });
}

//for model open-close
const addChildSection = document.querySelector('.child-section');
const addChildButton = document.querySelector('.btn-addchild');
// const removeChildButton = document.querySelector('.btn-removechild');
const form = document.querySelector('.modal__form');

addChildButton?.addEventListener('click', function (e) {
  addChildSection.classList.toggle('u-section--hide');
  if (addChildSection.classList.contains('u-section--hide')) {
    addChildButton.innerHTML = 'Add Child';
  } else {
    addChildButton.innerHTML = 'Remove Child';
  }
});

//for enrollment---------------------------------------------------------------------
// const enroll = document.querySelector('.btn__waitlist');

// enroll?.addEventListener('click', function(){

// })

//For FAQs ------------------------------------------------------------------------------

const accordionItemHeaders = document.querySelectorAll(
  '.accordion-item-header'
);

accordionItemHeaders.forEach(accordionItemHeader => {
  accordionItemHeader.addEventListener('click', event => {
    const currentActiveAccordionItemHeader = document.querySelector(
      '.accordion-item-header.active'
    );
    if (
      currentActiveAccordionItemHeader &&
      currentActiveAccordionItemHeader !== accordionItemHeader
    ) {
      currentActiveAccordionItemHeader.classList.toggle('active');
      currentActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0;
    }
    accordionItemHeader.classList.toggle('active');
    const accordionItemBody = accordionItemHeader.nextElementSibling;
    if (accordionItemHeader.classList.contains('active')) {
      accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + 'px';
    } else {
      accordionItemBody.style.maxHeight = 0;
    }
  });
});

//navigation call US -----------------------------------------------------------------------
const callUs = document.querySelector('.nav__main-contact--number');

callUs?.addEventListener('click', function (e) {
  callUs.innerHTML = '(02) 9618 2252';
});

//tabbed for Education-----------------------------------------------------------------------------
// Tabbed component

function openTab(tab) {
}

const tabs = document.querySelectorAll('.operations__tab');
let tabsContainer = document.querySelector('.operations__tab-container');
let tabsContent = document.querySelectorAll('.operations__content');
let activeClass = document.querySelector('.operations__tab--active');

tabsContainer?.addEventListener('click', function (e) {
  let clicked = e.target.closest('.operations__tab');

  // Ignore click if its outside of the button
  // Guard clause
  if (!clicked) {
    return;
  }

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});




const backtoTop = document.querySelector('.top');
const headerCheck = document.querySelector('.otherlinks');

const rootEle = document.documentElement;
//1. Button appears only if header passed when scrolled
function test(entries) {
  //This callback function will return an array of entries, even if you are
  //only observing a single item.
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      backtoTop.style.opacity = 1;
    } else {
      backtoTop.style.opacity = 0;
    }
  });
}

const observerTop = new IntersectionObserver(test);

observerTop.observe(header);

//2. when someone click the button it goes till up.

const scrollToTop = () => {
  rootEle.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const scrollToDown = () => {
  rootEle.scrollTo({
    top:800,
    behavior: 'smooth',
  })
}
backtoTop?.addEventListener('click', scrollToTop);
btnScrollTo?.addEventListener('click', scrollToDown);


//Child Care Calculator -----------------------------------------------------
//Family income

const final = function(){

  const totalSubsidy = document.querySelector('.totalSubsidy');
  //getting the variables 
let incomeInput = document.querySelector('.income__value');

let activityHours = document.querySelector('.activity__hours');

const totlValueResult = document.querySelector('.totalValueResult');

// let selectChildren = document.querySelector('.select__children');

// let selectDays = document.querySelector('.select__days');

// let selectdaysResult = document.querySelector('.selectday__result');


// let ageYear = document.querySelectorAll('.radio__years');

// let ageResult = document.querySelector('.result__age');


// let ageButton = document.querySelector('.btn__age');

let days ;

let Summary = document.querySelector('.btn__summary');
// let btncalculate = document.querySelector('.btn__per');

let resultCCSPercentage = document.querySelector('.CCSPercentgeText');
let outofPocketCostWeekly = document.querySelector('.outofPocketweekly');
// let outofPocketCostYearly = document.querySelector('.outofPocketAnnualy');
let OriginalFee = document.querySelector('.withoutCCS');
let weeklySaved = document.querySelector('.moneySaved');

//default constant variables for CCS
let initialIncome = (72466);
let constantChange = Number(3000);
let perHourRange ;
let initialPercentage = Number(85);
let for50to20percentage = Number(50);


//calculating the activity hours

//functions
let calculateFinalValue = function(){
  
  //Selecting age, based on age getting fees per hour
  let selected = document.querySelector('input[type = "radio"]:checked');
  if (selected.value == '0-2years') {
    perHourRange = 10.3
  } else if (selected.value == '2-4years') {
    perHourRange = 9.7
  } else {
    perHourRange = 9.5
  }


//Getting Original Value
let originalvalue = 
Math.ceil(days = perHourRange * (Number(document.querySelector('.numberOfDays').value) * 11));

OriginalFee.textContent =`Fees without Subsidy: AU$${originalvalue}`

//calculating CCS per week
//Step1: Count Percetage based on income
// let weeklyAnnualCss = function(){
//   
//   console.log(activityHoursWeekly);
//   let calculateWeeklyCCS = activityHoursWeekly * calculatedHourlyCSS
//   let outofPocketCostweek = Math.floor (originalvalue - calculateWeeklyCCS)
//   outofPocketCostWeekly.textContent = `Out Of Pocket Cost per Week : ${outofPocketCostweek}`;

// }

if (incomeInput.value > initialIncome && incomeInput.value <= 177466) {
  let activityHoursWeekly = activityHours.value / 2;
  //logic goes here...
  if (incomeInput.value >= 75466) {
    const check = (incomeInput.value - initialIncome) / constantChange;
    let per =   (initialPercentage - check);
    // resultCCSPercentage.textContent = `Your CCS Percentage based on Your family Income :
    // ${Math.ceil(per)}`;
    let calculatedHourlyCSS = perHourRange * (per / 100);
    let calculateWeeklyCCS = activityHoursWeekly * calculatedHourlyCSS
    let outofPocketCostweek = Math.floor (originalvalue - calculateWeeklyCCS)
    outofPocketCostWeekly.textContent = `Out Of Pocket Cost Per Week : AU$${outofPocketCostweek}`;
    weeklySaved.textContent = `Money you are Saving Per Week: AU$${(originalvalue - outofPocketCostweek)}`;
    // outofPocketCostYearly.textContent = `Out Of Pocket Cost yearly : ${Number(outofPocketCostWeekly * 52)}`
    // weeklyAnnualCss();

  }

  //based on logic calculate the percentage.
} else if (incomeInput.value > 177466 && incomeInput.value <= 256756) {
  // console.log('Family income is between 177466 and 256756');
  const per =  Number(50);
  // resultCCSPercentage.textContent = `Your CCS Percentage based on Your family Income :${per}%`
  let calculatedHourlyCSS = perHourRange * (per / 100);
  let activityHoursWeekly = activityHours.value / 2;
  let calculateWeeklyCCS = activityHoursWeekly * calculatedHourlyCSS
  let outofPocketCostweek = Math.floor (originalvalue - calculateWeeklyCCS)
  outofPocketCostWeekly.textContent = `Out Of Pocket Cost per Week : AU$${outofPocketCostweek}`;
  weeklySaved.textContent = `Money you are Saving Per Week: AU$${(originalvalue - outofPocketCostweek)}`;

} else if (
  incomeInput.value > Number(256756) &&
  incomeInput.value <= Number(346756)
) {
  const check = (incomeInput.value - 256756) / constantChange;
  let per = for50to20percentage - check;
  // resultCCSPercentage.textContent = `Your CCS Percentage based on Your family Income : ${Math.ceil(per)}%`
   let calculatedHourlyCSS = perHourRange * (per / 100);
   let activityHoursWeekly = activityHours.value / 2;
  let calculateWeeklyCCS = activityHoursWeekly * calculatedHourlyCSS
  let outofPocketCostweek = Math.floor (originalvalue - calculateWeeklyCCS)
  outofPocketCostWeekly.textContent = `Out Of Pocket Cost per Week : AU$${outofPocketCostweek}`;
  weeklySaved.textContent = `Money you are Saving Per Week: AU$${(originalvalue - outofPocketCostweek)}`;

} else if (
  incomeInput.value > Number(346756) &&
  incomeInput.value <= Number(356756)
) {
  let per = Number(20);
  // resultCCSPercentage.textContent = `Your CCS Percentage based on Your family Income : ${per} `;
  let calculatedHourlyCSS = perHourRange * (per / 100);
  let activityHoursWeekly = activityHours.value / 2;
 let calculateWeeklyCCS = activityHoursWeekly * calculatedHourlyCSS
 let outofPocketCostweek = Math.floor (originalvalue - calculateWeeklyCCS)
 outofPocketCostWeekly.textContent = `Out Of Pocket Cost per Week : AU$${outofPocketCostweek}`;
 weeklySaved.textContent = `Money you are Saving Per Week: AU$${(originalvalue - outofPocketCostweek)}`;

} else if (incomeInput.value > Number(356756)) {
  // resultCCSPercentage.textContent = '0%';
  outofPocketCostWeekly.textContent = '';
  OriginalFee.textContent = `Fees with/without Subsidy : AU$${originalvalue},  We are sorry You are not eligible for CCS `
  weeklySaved.textContent = '';
} else if (incomeInput.value <= initialIncome) {
  let per = Number(85)
  // resultCCSPercentage.textContent = `Your CCS Percentage based on Your family Income : ${per} `;
  let calculatedHourlyCSS = perHourRange * (per / 100);
  let activityHoursWeekly = activityHours.value / 2;
 let calculateWeeklyCCS = activityHoursWeekly * calculatedHourlyCSS
 let outofPocketCostweek = Math.floor (originalvalue - calculateWeeklyCCS)
 outofPocketCostWeekly.textContent = `Out Of Pocket Cost per Week : AU$${outofPocketCostweek}`;
 weeklySaved.textContent = `Money you are Saving Per Week: AU$${(originalvalue - outofPocketCostweek)}`;
 
} else {
  console.log('error! error! error!');
}
//Workout the out of pocket cost
totlValueResult.classList.remove('u-section-hidden');
 totalSubsidy.classList.add('u-section-hidden');

}
// btncalculate.addEventListener('click', calculateFinalValue);
Summary?.addEventListener('click', calculateFinalValue);
}

final();



//Select Age Step2:-
//   btnSummary.addEventListener('click', function () {

// });

//Email--------------------------------------------------------------------------------
// For Contact US Form
const formSubmit = document.querySelector('.form');
const resultcheck = document.querySelector('.result');

const firstName = document.querySelector('.FirstName');
const lastName = document.getElementById('lname');
const email = document.getElementById('email');
const contactNumber = document.getElementById('cnumber');
const message = document.getElementById('message');



  
formSubmit?.addEventListener('submit', function (e) {

  const formData = new FormData(formSubmit);
  e.preventDefault();
  var object = {};
  formData.forEach((value, key) => {
    object[key] = value;
  });
  var json = JSON.stringify(object);
  resultcheck.innerHTML = 'Please wait...';

  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: json,
  })
    .then(async response => {
      let json = await response.json();
      if (response.status == 200) {
        resultcheck.innerHTML = 'Email Sent successfully!';
        // result.classList.remove('text-gray-500');
        // result.classList.add('text-green-500');
      } else {
        resultcheck.innerHTML = 'Contact Us Form';
      }
    })
    .catch(error => {
      resultcheck.innerHTML = 'Something went wrong!';
    })
    .then(function () {
      formSubmit.reset();
      setTimeout(() => {
        alert('email Sent Successfully!');
        resultcheck.style.display = 'none';
      }, 1000);
    });
});


//form calculator
const formCalc = document.querySelector('.formcalc');
let Summary = document.querySelector('.btn__summary');
// let paraAppear = document.querySelector('. mt-1');
let formData;

Summary?.addEventListener('click', function (e) {
  if(Summary.classList.contains('validation')){
    checkvalidations();
    
  }
  else{
  formData = new FormData(formCalc);
  console.log(formData);
  e.preventDefault();
  var object = {};
  formData.forEach((value, key) => {
    object[key] = value;
  });
  var json = JSON.stringify(object);

  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: json,
  })
    .then(async response => {
      let json = await response.json();
      if (response.status == 200) {
        console.log(json);
        // result.classList.remove('text-gray-500');
        // result.classList.add('text-green-500');
      } else {
        console.log(response);
      }
    })
    .catch(error => {
      console.log(error);
    })
    .then(function () {
      formCalc.reset();
      setTimeout(() => {
      }, 1000);
    });
  }
});

//for Enroll Form

const formEnroll = document.querySelector('.modal__form');
const result = document.getElementById('result');

formEnroll?.addEventListener('submit', function(e){

  if (dateValidation()) {
  e.preventDefault();
  
  console.log("here");
  const formData = new FormData(formEnroll);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.innerHTML = "Please wait..."
   
   fetch('https://api.web3forms.com/submit', {
    method : 'POST',
    headers:{
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: json
   })
   .then(async (response) => {
    let json = await response.json();
    if(response.status == 200){
      result.innerHTML = json.message;
    }
    else{
      result.innerHTML = json.message
    }
   })
   .catch(error => {
    result.innerHTML = 'Something went wrong!';
   })
   .then(function(){
    form.reset();
    setTimeout(()=> {
      result.style.display ="none";
    }, 3000);
   });
  } else {
  
    result.innerHTML = 'Please Select the Start date Correctly!'
    e.preventDefault();
  
  }
});

// //For Carrer Page
// const formAttachment = document.querySelector('.form');
// const resultAttachment = document.getElementById('result');

// formAttachment?.addEventListener('submit', function (e) {
//   e.preventDefault();

//   const formData = new FormData(formAttachment);
//   formData.append('access_key', 'ddc9efc1-25ec-4b62-983f-db3308aa1b7d');
//   formData.append('subject', 'New Submission from ypur website');

//   const file = document.getElementById('attachment');
//   const filesize = file.files[0].size / 1024;

//   if (filesize > 1000) {
//     alert('Please upload file less than 1 MB');
//     return;
//   }

//   fetch('https://api.web3forms.com/submit', {
//     method: 'POST',
//     body: formData,
//   })
//     .then(async response => {
//       // let res =  response.json();
//       if (response.status == 200) {
//         let json = await response.json();
//         resultAttachment.innerHTML = 'Hey wow Successfully done!';
//         console.log(json.message);
//         resultAttachment.innerHTML = json.message;
//       } else {
//         console.log(response);
//         resultAttachment.innerHTML = 'Hey not Successfully done!';

//         // result.innerHTML = json.message;
//         // result.classList.remove('text-gray-500');
//         // result.classList.add('text-red-500');
//       }
//     })
//     .catch(error => {
//       console.log(error);
//       resultAttachment.innerHTML = 'Something went wrong!';
//     })
//     .then(function () {
//       formAttachment.reset();
//       setTimeout(() => {
//         resultAttachment.style.display = 'none';
//       }, 5000);
//     });
// });


const formCareer = document.getElementById("myForm");

formCareer?.addEventListener("submit", function (e) {
  e.preventDefault();
  
  const formData = new FormData(formCareer);
  result.innerHTML = "Please wait..."

  formData.append("access_key", "3ebff317-c509-444a-b6f0-ccf3223f8461");
  formData.append("subject", "Hey! someone fill carrer form on your website Please have a look");

  const file = document.getElementById("attachment");
  const filesize = file.files[0].size / 1024;

  if (filesize > 1000) {
    alert("Please upload file less than 1 MB");
    return;
  }
  
  // Don't add `headers` or `content-type` in this fetch call
  // Since it contains attachments, the browser auto-adds them. 
  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.innerHTML = json.message;
      } else {
        result.innerHTML = json.message;
      }
    })
    .catch((error) => {
      result.innerHTML = 'Something went wrong!';
    })
    .then(function () {
      formCareer.reset();
      setTimeout(()=> {
        result.style.display ="none";
      }, 3000);
    });
});

const dateValidation = function() {
  let startDate = document.getElementById('DateofStart').value;
  let varDate = new Date(startDate);
  let todayDate = new Date();

  if (varDate >= todayDate) {
    console.log("COrrect date");
    return true;
  } else {
    console.log("Wrong Date");
    return false;
  }
}

const checkvalidations = function(){
 const activityHours = document.querySelector('.activity__hours').value;
 const familyIncome = document.querySelector('.income__value').value;
 const radionzerototwo = document.querySelector('.zerotwo').value;
 const radiotwotofour = document.querySelector('.twofour').value;
 const radiofourtofive = document.querySelector('.fourfive').value;
 let datatoCheckdown = document.querySelectorAll('.fordata');
 const income = document.querySelector('.income');
 const activityHoursPara = document.querySelector('.activityhours');
 const selectAge = document.querySelector('.age');


//  if (activityHours == "" || activityHours == null ) {
//   console.log(datatoCheckdown[0]);
//   datatoCheckdown[0].classList.remove('empty-feedback');
//   datatoCheckdown[0].style.color = 'red'
//   console.log(datatoCheckdown[0]);
//  } 

// if (activityHours => 8 || activityHours <= 100){
//   datatoCheckdown[0].classList.add('empty-feedback');
// }

//  if(familyIncome == "" || familyIncome == null){
//   datatoCheckdown[1].classList.remove('empty-feedback');
//   datatoCheckdown[1].style.color = 'red'

// }
//  if(radionzerototwo == "" || radiotwotofour == "" || radiofourtofive == ""){
//   datatoCheckdown[2].style.color = 'red'
//   datatoCheckdown[2].classList.remove('empty-feedback');

// }


}
