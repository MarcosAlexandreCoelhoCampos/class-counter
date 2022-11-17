const container_classes = document.querySelector(".container-classes");
const container_data = document.querySelector(".container-data");

import total_classes_per_day from "./total_classes_per_day.js";
import {
  total_class_goal,
  class_goal_per_day,
  total_study_days_per_week,
} from "./infos.js";

const total_days = total_classes_per_day.length;

const total_classes = total_classes_per_day
  .map((classes_per_day) => classes_per_day.classes)
  .reduce((classes, e) => classes + e);

const average = () => (total_classes / total_days).toFixed(2);

const missing_or_leftover = () => {
  if (missing_classes > 0) {
    return "Missing";
  } else if (missing_classes === 0) {
    return "Concluded";
  } else {
    return "Leftover";
  }
};

const delay_advance_days = total_classes - total_days * class_goal_per_day;
const missing_classes = total_class_goal - total_classes;
const missing_days = Math.ceil(missing_classes / class_goal_per_day);
const missing_week = missing_days / total_study_days_per_week;
const missing_days_average = Math.ceil(missing_classes / average());
const missing_week_average = missing_days_average / total_study_days_per_week;
const class_goal_per_week = class_goal_per_day * total_study_days_per_week;

const delay_advance = () => {
  if (delay_advance_days < 0) {
    return "Delay";
  } else if (delay_advance_days === 0) {
    return "Normal";
  } else {
    return "Advance";
  }
};

const select_days = () => document.querySelectorAll(".day");
const select_weeks = () => document.querySelectorAll(".week");
const goal_checked = (conclusion, goal) => conclusion >= goal;
const squares = () => document.querySelectorAll(".square");
const squares_width = () => squares()[0].getBoundingClientRect().width;

if (class_goal_per_day > 10) container_classes.classList += " one-column";

init_squares();
message();

let doit;
window.onresize = () => {
  clearTimeout(doit);
  doit = setTimeout(reset, 500);
};

function reset() {
  container_classes.innerHTML = "";
  init_squares();
}

function init_squares() {
  total_classes_per_day.forEach(base_squares);
  style_squares();
  init_total_classes_week();
}

function base_squares(e, i) {
  new_week(i);
  new_day();
  let days = select_days();
  let last_day = days[days.length - 1];
  last_day.innerHTML += `<p> ${e.day} </p>`;
  constructor_squares(e.classes, last_day);
  const total_videos_day =
    e.classes - class_goal_per_day < 0 ? 0 : e.classes - class_goal_per_day;
  last_day.innerHTML += `<p> +${total_videos_day} videos </p>`;
}

function new_week(i) {
  if (i % total_study_days_per_week == 0 || i == 0) {
    container_classes.innerHTML += '<div class="week"></div>';
    let weeks = select_weeks();
    weeks[weeks.length - 1].innerHTML += `<h1> WEEK ${weeks.length}</h1>`;
    weeks[weeks.length - 1].innerHTML += '<div class="container_days"></div>';
  }
}

function new_day() {
  let container_days = document.querySelectorAll(".container_days");
  container_days[container_days.length - 1].innerHTML +=
    '<div class="day"></div>';
}

function constructor_squares(classes, last_day) {
  for (let i = 0; i < class_goal_per_day; i++) {
    if (classes - i > 0) {
      last_day.innerHTML += '<div class="square"></div>';
    } else {
      last_day.innerHTML += '<div class="red square"></div>';
    }
  }
}

function style_squares() {
  select_days().forEach((day) => {
    day.childNodes.forEach((day_childs) => {
      day_childs.style.height = squares_width() + "px";
    });
  });
}

function init_total_classes_week() {
  let x = -1;
  let total_classes_week = 0;
  total_classes_per_day.forEach((e, i) => {
    total_classes_week += e.classes;
    if ((+i + 1) % total_study_days_per_week === 0) {
      x++;
      constructor_total_class_week(x, total_classes_week);
      total_classes_week = 0;
    }
  });
}

function constructor_total_class_week(x, total_classes_week) {
  let weeks = select_weeks();
  weeks[x].innerHTML += goal_checked(total_classes_week, class_goal_per_week)
    ? `<h2> TOTAL: ${total_classes_week}</h2>`
    : `<h2 class="red"> TOTAL: ${total_classes_week}</h2>`;
}

function message() {
  container_data.innerHTML += `
  <p> Total classes taken: ${total_classes + 217} </p>
  <p> ${missing_or_leftover()}: ${Math.abs(missing_classes)} classes </p>
  <br>
  <p> Total days so far: ${total_days} </p>
  <p> ${delay_advance()}: ${delay_advance_days} classes </p>
  <br>
  <p> Missing: ${missing_days} days (average: ${class_goal_per_day}) </p>
  <p> Missing: ${missing_week} weeks (average: ${class_goal_per_day})) </p>
  <br>
  <p> OR </p>
  <br>
  <p> Missing: ${missing_days_average} days (average: ${average()})  </p>
  <p> Missing: ${missing_week_average} weeks (average: ${average()})  </p>
  `;
}
