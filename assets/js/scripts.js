$(document).ready(function () {
  var Animation = function (animationBar, percentage) {
    this.animationBar = animationBar;
    this.percentage = percentage;
    this.animationArray = null;
    this.animationOffset = null;
    this.labelArray = null;
    this.percentageArray = null;
    this.index = 0;

    this.initialize();
  };

  Animation.prototype.initialize = function () {
    this.animationArray = document.getElementsByClassName(this.percentage);

    if (this.animationOffset === null) this.animationOffset = [];

    if (this.labelArray === null) this.labelArray = [];

    if (this.percentageArray === null) this.percentageArray = [];

    this.setUpElements();
  };

  Animation.prototype.setUpElements = function () {
    for (var i = 0; i < this.animationArray.length; i++) {
      var elem = this.animationArray[i],
        offset =
          elem.offsetTop +
          document.getElementsByClassName(this.percentage)[0].clientHeight,
        percentage = $(this.animationArray[i]).data(this.percentage);

      this.animationOffset.push(offset);
      this.percentageArray.push(percentage);

      $(this.animationArray[i])
        .find(".label")
        .html("Percentage: " + percentage + "%");
    }

    this.attachListeners();
  };

  Animation.prototype.attachListeners = function () {
    $(window).on("scroll", this.onWindowScroll.bind(this));
  };

  Animation.prototype.onWindowScroll = function () {
    for (var i = 0; i < this.animationArray.length; i++) {
      if (
        window.pageYOffset >=
        this.animationOffset[this.index] - window.innerHeight
      ) {
        this.showElement();
        this.index++;
      } else return;
    }
  };

  Animation.prototype.showElement = function () {
    var element = document.getElementsByClassName(this.percentage)[this.index];
    element.className += " show";
    this.animateBar(element, this.percentageArray[this.index]);
  };

  Animation.prototype.animateBar = function (element, width) {
    var $element = $(element),
      className = " p" + width;

    $element.find(this.animationBar).addClass(className);
  };

  new Animation(".animation-bar", "percentage");

  // selec-popup

  const closeSelect = document.querySelectorAll(".select-close");
  const exchangeSelectd = document.querySelectorAll(".exchange-selected");
  exchangeSelectd.forEach((singleSelect) => {
    let siblink = singleSelect.nextElementSibling;
    singleSelect.addEventListener("click", function () {
      siblink.classList.add("show");
    });
    closeSelect.forEach((close) => {
      close.addEventListener("click", function () {
        siblink.classList.remove("show");
      });
    });
  });

  // Wow Js
  new WOW().init();

  // step-progress
  $("body").addClass("step1").attr("step-progress", "1");
  $(".step-progress-next").click(function () {
    var stepCurrent = $("body").attr("step-progress");
    $("body").attr("step-progress", stepCurrent - "-1");
  });
  $(".step-progress-next").click(function () {
    var stepCurrent2 = $("body").attr("step-progress");
    $("body").addClass("step" + stepCurrent2);
    var selector = ".all-step-progress .step:nth-child(" + stepCurrent2 + ")";
    $(selector).addClass("active");
    $(".all-step-progress .step").removeClass("current");
    $(selector).addClass("current");
    var selector2 = ".all-step-content .step:nth-child(" + stepCurrent2 + ")";
    $(".all-step-content .step").removeClass("active");
    $(selector2).addClass("active");
  });
  $(".step-progress-prev").click(function () {
    var stepCurrent = $("body").attr("step-progress");
    var stepCurrent3 = $("body").attr("step-progress");
    var one = 1;
    if (stepCurrent3 > one) {
      $("body").attr("step-progress", stepCurrent - "1");
    }
  });
  $(".step-progress-prev").click(function () {
    var stepCurrent2 = $("body").attr("step-progress");
    $("body").removeClass("step" + (stepCurrent2 - "-1"));
    var selector =
      ".all-step-progress .step:nth-child(" + (stepCurrent2 - -1) + ")";
    var prevSelector =
      ".all-step-progress .step:nth-child(" + (stepCurrent2 - 0) + ")";
    $(selector).removeClass("active");
    $(selector).removeClass("current");
    $(prevSelector).addClass("current");
    var selector2 = ".all-step-content .step:nth-child(" + stepCurrent2 + ")";
    $(".all-step-content .step").removeClass("active");
    $(selector2).addClass("active");
  });
});

// slider slider activations
const swiper = new Swiper(".swiper", {
  // Optional parameters
  loop: true,
  speed: 400,
  spaceBetween: 10,
  slidesPerView: "auto",
  // And if we need scrollbar
  scrollbar: {
    el: ".roadmap-progress",
    draggable: true,
    dragClass: "roadmap-progress-bar",
  },
});

// dark and light mood
const modeBtn = document.getElementById("theme-mode");
modeBtn.onchange = (e) => {
  if (modeBtn.checked === true) {
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add("dark");
    window.localStorage.setItem("mode", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
    window.localStorage.setItem("mode", "light");
  }
};

const mode = window.localStorage.getItem("mode");
if (mode == "dark") {
  modeBtn.checked = true;
  document.documentElement.classList.remove("light");
  document.documentElement.classList.add("dark");
}

if (mode == "light") {
  modeBtn.checked = false;
  document.documentElement.classList.remove("dark");
  document.documentElement.classList.add("light");
}

// offcanvas-menu
$(".menu-bar").on("click", function () {
  $(".offcanvas-wrapper, .overlay").addClass("active");
});
$(".offcanvas-close, .overlay").on("click", function () {
  $(".offcanvas-wrapper, .overlay").removeClass("active");
});
