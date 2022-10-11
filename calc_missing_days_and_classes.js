let total_classes = 0;
let average = 0;
let missing_classes = 0;
let missing_days = 0;
let missing_week = 0;
let missing_days_average = 0;
let missing_week_average = 0;
let days = 0;
let last_day = 0;
let total_days = 0;
let delay_advance = "";
let delay_advance_days = 0;
let weeks = 0;
let total_videos_day = 0;
let squares = "";
let block_width_percentage = 0;
let total_classes_week = 0;
let x = 0;
let container_days = 0;

const container_classes = document.querySelector(".container-classes");
const container_data = document.querySelector(".container-data");

import total_classes_per_day from "./total_classes_per_day.js";

import {
  class_goal,
  class_goal_per_day,
  total_study_days_per_week,
} from "./infos.js";

total_days = total_classes_per_day.length;

calc_average();
let doit;
window.onresize = () => {
  clearTimeout(doit);
  doit = setTimeout(reset, 500);
};

function reset() {
  container_classes.innerHTML = "";
  container_data.innerHTML = "";
  total_classes = 0;
  average = 0;
  missing_classes = 0;
  missing_days = 0;
  missing_week = 0;
  missing_days_average = 0;
  missing_week_average = 0;
  days = 0;
  last_day = 0;
  total_days = 0;
  delay_advance = "";
  delay_advance_days = 0;
  weeks = 0;
  total_videos_day = 0;
  squares = "";
  block_width_percentage = 0;
  total_classes_week = 0;
  x = 0;
  container_days = 0;
  calc_average();
}

function calc_average() {
  total_classes_per_day.forEach((e) => {
    total_classes += +e.classes;
    average = (total_classes / total_days).toFixed(2);
  });
  calc_missing();
}

function calc_missing() {
  missing_classes = class_goal - total_classes;
  missing_days = Math.ceil(missing_classes / class_goal_per_day);
  missing_week = missing_days / total_study_days_per_week;
  missing_days_average = Math.ceil(missing_classes / average);
  missing_week_average = missing_days_average / total_study_days_per_week;
  calc_delay_advance();
}

function calc_delay_advance() {
  if (total_classes < total_days * class_goal_per_day) {
    delay_advance = "Delay";
  } else if (total_classes == total_days * class_goal_per_day) {
    delay_advance = "Normal";
  } else {
    delay_advance = "Advance";
  }
  delay_advance_days = total_classes - total_days * class_goal_per_day;
  base_squares();
}

function base_squares() {
  total_classes_per_day.forEach((e) => {
    new_week();
    container_days = document.querySelectorAll(".container_days");
    container_days[container_days.length - 1].innerHTML += '<div class="day">';
    days = document.querySelectorAll(".day");
    last_day = days[days.length - 1];
    last_day.innerHTML += `<p> ${e.day} </p>`;
    constructor_squares(e.classes);
    total_videos_day =
      e.classes - class_goal_per_day < 0 ? 0 : e.classes - class_goal_per_day;
    last_day.innerHTML += `<p> +${total_videos_day} videos </p>`;
  });
  style_squares();
  total_class_week();
  message();
}

function new_week() {
  if (days.length % total_study_days_per_week == 0 || days == 0) {
    container_classes.innerHTML += '<div class="week">';
    weeks = document.querySelectorAll(".week");
    weeks[weeks.length - 1].innerHTML += `<h1> WEEK ${weeks.length}</h1>`;
    weeks[weeks.length - 1].innerHTML += '<div class="container_days">';
  }
}

function total_class_week() {
  x = -1;
  total_classes_per_day.forEach((e, i) => {
    total_classes_week += e.classes;
    if ((+i + 1) % total_study_days_per_week === 0) {
      x++;
      constructor_total_class_week(x);
      total_classes_week = 0;
    }
  });
}

function constructor_total_class_week(x) {
  if (total_classes_week >= class_goal_per_day * total_study_days_per_week) {
    weeks[x].innerHTML += `<h2> TOTAL: ${total_classes_week}</h2>`;
  } else {
    weeks[x].innerHTML += `<h2 class="red"> TOTAL: ${total_classes_week}</h2>`;
  }
}

function constructor_squares(classes) {
  for (let i = 0; i < class_goal_per_day; i++) {
    if (classes - i > 0) {
      last_day.innerHTML += '<div class="square"></div>';
    } else {
      last_day.innerHTML += '<div class="red square"></div>';
    }
  }
}

function style_squares() {
  squares = document.querySelectorAll(".square");
  block_width_percentage = squares[0].getBoundingClientRect().width;
  days.forEach((day) => {
    day.childNodes.forEach((day_childs) => {
      day_childs.style.height = block_width_percentage + "px";
    });
  });
}

function message() {
  container_data.innerHTML += `
  <p> Total classes taken: ${total_classes} </p>
  <p> Missing: ${missing_classes} classes </p>
  <br>
  <p> Total days so far: ${total_days} </p>
  <p> ${delay_advance}: ${delay_advance_days} classes </p>
  <br>
  <p> Missing: ${missing_days} days (average: ${class_goal_per_day}) </p>
  <p> Missing: ${missing_week} weeks (average: ${class_goal_per_day}) </p>
  <br>
  <p> OR </p>
  <br>
  <p> Missing: ${missing_days_average} days (average: ${average})  </p>
  <p> Missing: ${missing_week_average} weeks (average: ${average})  </p>
  `;
}
