const total_classes_per_day = [];

function create_new_record(day, classes = 0) {
  total_classes_per_day.push({ day, classes });
}

// WEEK 1
create_new_record("14/11/2022", 7);
create_new_record("15/11/2022", 11);
create_new_record("16/11/2022", 15);
// create_new_record("17/11/2022");
// create_new_record("18/11/2022");

// WEEK 2
// create_new_record("21/11/2022");
// create_new_record("22/11/2022");
// create_new_record("23/11/2022");
// create_new_record("24/11/2022");
// create_new_record("25/11/2022");

// WEEK 3
// create_new_record("28/11/2022");
// create_new_record("29/11/2022");
// create_new_record("30/11/2022");

export default total_classes_per_day;
