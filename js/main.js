// --------------------------- navigation menu ---------------------------

(() =>{

  const humburgerBtn = document.querySelector(".humburger-btn"),
  navMenu = document.querySelector(".nav-menu"),
  closeNavBtn = navMenu.querySelector(".close-nav-menu");

  humburgerBtn.addEventListener("click", showNavMenu);
  closeNavBtn.addEventListener("click", hideNavMenu);

  function showNavMenu() {
    navMenu.classList.add("open");
    bodyScrollingToggle();
  }

  function hideNavMenu() {
    navMenu.classList.remove("open");
    fadeOutEffect();
    bodyScrollingToggle();
  }

  function fadeOutEffect() {
    document.querySelector(".fade-out-effect").classList.add("active");
    setTimeout(() => {
      document.querySelector(".fade-out-effect").classList.remove("active");
    }, 300);
  }


  document.addEventListener("click", (e) =>{
    if (e.target.classList.contains("link-item")) {
      // make sure e.target.hash has a value before overridding default behavior
      if (e.target.hash !== "") {
        // prevent default anchor click behavior
        e.preventDefault();
        const hash = e.target.hash;
        // deactive exsiting active 'section'
        document.querySelector(".section.active").classList.add("hide");
        document.querySelector(".section.active").classList.remove("active");
        /// active new one
        document.querySelector(hash).classList.add("active");
        document.querySelector(hash).classList.remove("hide");

        // deactive exsiting active navigation menu 'link-item'
        navMenu.querySelector(".active").classList.add("outer-shadow", "hover-in-shadow");
        navMenu.querySelector(".active").classList.remove("active", "inner-shadow");
        // if clicked link-item is contained withing the navigation
        if (navMenu.classList.contains("open")) {
            // active new navi 
            e.target.classList.add("active", "inner-shadow");
            e.target.classList.remove("outer-shadow", "hover-in-shadow");
            // hide navigation menu
            hideNavMenu();
        }else{
          let navItems = navMenu.querySelectorAll(".link-item");
          navItems.forEach((item) =>{
            if (hash === item.hash) {
              item.classList.add("active", "inner-shadow");
            item.classList.remove("outer-shadow", "hover-in-shadow");
            }
          })
          fadeOutEffect();
        }
        // add hash (#) to url
        window.location.hash =hash;
      }
    }
  })

})();


// --------------------------- about section tabs ------------------------------
//  اروو فانكشن شغاله من غير تشغيل
(() => {
  const aboutSection = document.querySelector(".about-section");

  const tabsContainer = document.querySelector(".about-tabs");

  tabsContainer.addEventListener("click", (event) => {
    // هنا بقوله لو الايفينت التارجت الكلاس يحتوي علي تاب ايتم وووو التارجت الكلاس لالالالا يحتوي ع الاكتف
    if (
      event.target.classList.contains("tab-item") &&
      !event.target.classList.contains("active")
    ) {
      // console.log("event.target contains ' tab-item ' class and not contains 'active' class");
      const target = event.target.getAttribute("data-target");
      // console.log(target)
      // deactive existing active 'tab-item
      tabsContainer
        .querySelector(".active")
        .classList.remove("outer-shadow", "active");
      // active New Tab-item Target
      event.target.classList.add("outer-shadow", "active");

      // deactive existing active 'tab-content'
      aboutSection
        .querySelector(".tab-content.active")
        .classList.remove("active");
      //active new 'tab-content'
      aboutSection.querySelector(target).classList.add("active");
    }
  });
})();

function bodyScrollingToggle() {
  document.body.classList.toggle("stop-scrolling");
}

/////////////////////// portfolio filter and popup -------------------------------------------

(() => {
  const filterContainer = document.querySelector(".portfolio-filter"),
    portfolioItemsContainer = document.querySelector(".portfolio-items"),
    portfolioItems = document.querySelectorAll(".portfolio-item"),
    popup = document.querySelector(".portfolio-popup"),
    prevBtn = document.querySelector(".pp-prev"),
    nextBtn = document.querySelector(".pp-next"),
    closeBtn = document.querySelector(".pp-close"),
    projectDetailsContainer = document.querySelector(".pp-details"),
    projectDetailsBtn = document.querySelector(".pp-project-details-btn");
  let itemIndex, slideIndex, screenshots;

  // filter portfolio items

  filterContainer.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("filter-item") &&
      !e.target.classList.contains("active")
    ) {
      // deactive existing active 'filter-item'
      filterContainer
        .querySelector(".active")
        .classList.remove("outer-shadow", "active");
      // active New Class 'filter-item'
      e.target.classList.add("outer-shadow", "active");
      const target = e.target.getAttribute("data-target");
      portfolioItems.forEach((item) => {
        if (target === item.getAttribute("data-category") || target === "all") {
          item.classList.remove("hide");
          item.classList.add("show");
        } else {
          item.classList.remove("show");
          item.classList.add("hide");
        }
      });
    }
  });

  portfolioItemsContainer.addEventListener("click", (e) => {
    if (e.target.closest(".portfolio-item-inner")) {
      const portfolioItem = e.target.closest(".portfolio-item-inner")
        .parentElement;
      // get the portfolioItem index
      itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(
        portfolioItem
      );
      // console.log(itemIndex)  رقم الانديكس بتاع العنصر
      screenshots = portfolioItems[itemIndex]
        .querySelector(".portfolio-item-img img")
        .getAttribute("data-screenshots");
      // console.log(screenshots);
      // convert screenshots into array
      screenshots = screenshots.split(",");
      if (screenshots.length === 1) {
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
      } else {
        prevBtn.style.display = "block";
        nextBtn.style.display = "block";
      }
      slideIndex = 0;
      popupToggle();
      popupSlideshow();
      popupDetails();
    }
  });

  closeBtn.addEventListener("click", () => {
    popupToggle();
    if (projectDetailsContainer.classList.contains("active")) {
      popupDetailsToggle();
    }
  });

  function popupToggle() {
    popup.classList.toggle("open");
    bodyScrollingToggle();
  }

  function popupSlideshow() {
    const imgSrc = screenshots[slideIndex];
    // console.log(imgSrc);
    const popupImg = popup.querySelector(".pp-img");
    // activate loader until the popupImg loaded
    popup.querySelector(".pp-loader").classList.add("active");
    popupImg.src = imgSrc;
    popupImg.onload = () => {
      // deactive loader after the popupImg loaded
      popup.querySelector(".pp-loader").classList.remove("active");
    };

    popup.querySelector(".pp-counter").innerHTML =
      slideIndex + 1 + " of " + screenshots.length;
  }

  // next slide

  nextBtn.addEventListener("click", () => {
    if (slideIndex === screenshots.length - 1) {
      slideIndex = 0;
    } else {
      slideIndex++;
    }
    popupSlideshow();
  });

  // prev slide
  prevBtn.addEventListener("click", () => {
    if (slideIndex === 0) {
      slideIndex = screenshots.length - 1;
    } else {
      slideIndex--;
    }
    popupSlideshow();
  });

  function popupDetails() {
    // if portfolio-item-details not exists
    if (!portfolioItems[itemIndex].querySelector(".portfolio-item-details")) {
      projectDetailsBtn.style.display = "none";
      return; // end function excution
    }
    projectDetailsBtn.style.display = "block";
    // get the project details
    const details = portfolioItems[itemIndex].querySelector(
      ".portfolio-item-details"
    ).innerHTML;
    // set the project details
    popup.querySelector(".pp-project-details").innerHTML = details;
    // get the project title
    const title = portfolioItems[itemIndex].querySelector(
      ".portfolio-item-title"
    ).innerHTML;
    // set the project title
    popup.querySelector(".pp-title h2").innerHTML = title;
    // get the project category
    const category = portfolioItems[itemIndex].getAttribute("data-category");
    // set the project category
    popup.querySelector(".pp-project-category").innerHTML = category
      .split("-")
      .join(" ");
  }

  projectDetailsBtn.addEventListener("click", () => {
    popupDetailsToggle();
  });

  function popupDetailsToggle() {
    if (projectDetailsContainer.classList.contains("active")) {
      projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
      projectDetailsBtn.querySelector("i").classList.add("fa-plus");
      projectDetailsContainer.classList.remove("active");
      projectDetailsContainer.style.maxHeight = 0 + "px";
    } else {
      projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
      projectDetailsBtn.querySelector("i").classList.add("fa-minus");
      projectDetailsContainer.classList.add("active");
      projectDetailsContainer.style.maxHeight =
        projectDetailsContainer.scrollHeight + "px";
      popup.scrollTo(0, projectDetailsContainer.offsetTop);
    }
  }
})();

// #################################### testimonial Slider ------------------------------------------

(() =>{

  const sliderContainer = document.querySelector(".testi-slider-container"),
  slides = sliderContainer.querySelectorAll(".testi-item"),
  slideWidth = sliderContainer.offsetWidth,
  prevBtn = document.querySelector(".testi-slider-nav .prev"),
  nextBtn = document.querySelector(".testi-slider-nav .next"),
  activeSlide = sliderContainer.querySelector(".testi-item.active");
  let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(activeSlide);
  console.log(slideIndex)

  // set widthof all slides
  slides.forEach((slide) =>{
    slide.style.width = slideWidth + "px";
  })
  // set width of slideerContainer
  sliderContainer.style.width = slideWidth * slides.length + "px";

  nextBtn.addEventListener("click", () =>{
    if (slideIndex === slides.length-1) {
      slideIndex = 0;
    }else {
      slideIndex++;
    }
    slider();
  })

  prevBtn.addEventListener("click", () =>{
    if (slideIndex === 0) {
      slideIndex = slides.length-1
    } else {
      slideIndex--;
    }
    slider();
  })

  function slider() {
    // deactive existing active  slides
    sliderContainer.querySelector(".testi-item.active").classList.remove("active");
    // active new one 
    slides[slideIndex].classList.add("active");
    sliderContainer.style.marginLeft = - (slideWidth * slideIndex) + "px";
  }

})();

// ---------------------------- hide All Section except active -----------------------

(() => {

  const sections = document.querySelectorAll(".section");
  sections.forEach((section) =>{
    if (!section.classList.contains("active")) {
      section.classList.add("hide")
    }
  })

})();






//// ------------- tyle switsher and skins ----------------------------------------------------------------
const styleSwitcher = document.querySelector(".style-switcher"),
styleToggler = document.querySelector(".style-toggler"),
dayNight = document.querySelector(".day-night");

styleToggler.addEventListener("click", () =>{
  styleSwitcher.classList.toggle("open")
})

// hide style - switcher on scroll
window.addEventListener("scroll", ()=> {
  if (styleSwitcher.classList.contains("open")) {
    styleSwitcher.classList.remove("open");
  }
})



///////////////////// theme colors



////////// save colors in local storge
let mainColors = localStorage.getItem("color_option");
if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color", mainColors);

  document.querySelectorAll(".color").forEach((element) => {
    element.classList.remove("active");

    /// add active
    if (element.dataset.color === mainColors) {
      element.classList.add("active");
    }
  });
}




/////////////////// change colors 

const colorsLi = document.querySelectorAll(".color");

const ul = document.querySelector(".colors");
colorsLi.forEach((item) => {
  item.addEventListener("click", function (e) {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    localStorage.setItem("color_option", e.target.dataset.color);
    ul.querySelector(".active").classList.remove("active");
    e.target.classList.add("active");
  });
});



/////////////////////// theme light and Dark mode ----------------------//#
let darkMode = localStorage.getItem("darkMode");


// // dayNight.addEventListener("click", () =>{
// //   dayNight.querySelector("i").classList.toggle("fa-sun");
// //   dayNight.querySelector("i").classList.toggle("fa-moon");
// //   document.body.classList.toggle("dark")
// // })


// const enableDark = () =>{
//   // add class
//   document.body.classList.add("dark");
//   // save in local
//   localStorage.setItem("darkMode", "enabled");
//   dayNight.querySelector("i").classList.add("fa-sun");
// }
// const desableDark = () =>{
//   // add class
//   document.body.classList.remove("dark");
//   // save in local
//   localStorage.setItem("darkMode", "desabled");
//   dayNight.querySelector("i").classList.add("fa-sun");
// }
// dayNight.addEventListener("clicl", () =>{
//   darkMode = localStorage.getItem("darkMode");
//   if (darkMode !== "enabled") {
//     enableDark();
//   } else {
//     desableDark();
//   }

// })
// if (darkMode === "enabled") {
//   enableDark();
// }

//////////// check becouse icon
window.addEventListener("load", () =>{
  if (document.body.classList.contains("dark")) {
    dayNight.querySelector("i").classList.add("fa-sun");
  }else{
    dayNight.querySelector("i").classList.add("fa-moon")
  }
});

/// fun to put DarkMode
const putDarkMode = () => {
  document.body.classList.add("dark");
  localStorage.setItem("darkMode", "night");
}
// Fun To Remove DarkMode
const removeDarkMode = () => {
  document.body.classList.remove("dark");
  localStorage.setItem("darkMode", null);
}

/// Event Click to switch between 
dayNight.addEventListener("click", () => {
  darkMode = localStorage.getItem("darkMode");
  if (darkMode !== "night") {
    putDarkMode();
    dayNight.querySelector("i").classList.remove("fa-moon");
    dayNight.querySelector("i").classList.add("fa-sun");
  }else{
    removeDarkMode();
    dayNight.querySelector("i").classList.remove("fa-sun");
    dayNight.querySelector("i").classList.add("fa-moon");
  }
});

if (darkMode === "night") {
  putDarkMode();
}
///////////////////////////////////////// Anemation preloader


window.addEventListener("load", () =>{
  // preloader
  document.querySelector(".preloader").classList.add("fade-out");

  setTimeout(() => {
    document.querySelector(".preloader").style.display="none";
  }, 600);
})