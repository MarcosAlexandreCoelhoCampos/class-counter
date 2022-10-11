const total_classes_per_day = [];

function create_new_record(day, classes = 0) {
  total_classes_per_day.push({ day, classes });
}

// Week 1
create_new_record("09/12/2022", 44);
create_new_record("09/13/2022");
create_new_record("09/14/2022");
create_new_record("09/15/2022");
create_new_record("09/16/2022");

// Week 2
create_new_record("09/19/2022");
create_new_record("09/20/2022", 15);
create_new_record("09/21/2022");
create_new_record("09/22/2022");
create_new_record("09/23/2022");

// Week 3
create_new_record("09/26/2022");
create_new_record("09/27/2022");
create_new_record("09/28/2022");
create_new_record("09/29/2022");
create_new_record("09/30/2022");

// Week 4
create_new_record("10/03/2022");
create_new_record("10/04/2022");
create_new_record("10/04/2022", 14);
create_new_record("10/06/2022", 15);
create_new_record("10/07/2022", 12);

// Week 5
create_new_record("10/10/2022", 13);

export default total_classes_per_day;
