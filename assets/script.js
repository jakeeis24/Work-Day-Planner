// ---GIVEN I am using a daily planner to create a schedule
// ---WHEN I open the planner
// ---THEN the current day is displayed at the top of the calendar

//display current date and time at the top
$("#currentDay").text(moment().format("dddd, MMMM Do, YYYY"));

//need to create variable based on military time to make the for loop easier to iterate
//military time
var militaryHour = moment().hour();
//console.log(militaryHour);

//array for time blocks starting at 9 to run against military time
var timeBlocks = [9, 10, 11, 12, 13, 14, 15, 16, 17];
//console.log(timeBlocks);
var timeText = [
  "9AM",
  "10AM",
  "11AM",
  "12PM",
  "1PM",
  "2PM",
  "3PM",
  "4PM",
  "5PM",
];
// ---WHEN I scroll down
// ---THEN I am presented with timeblocks for standard business hours
// ---WHEN I view the timeblocks for that day
// ---THEN each timeblock is color coded to indicate whether it is in the past, present, or future

//for loop with if statement to change block colors depending on time
for (i = 0; i < timeBlocks.length; i++) {
  //add color code for each block depending on the time
  if (militaryHour < timeBlocks[i]) {
    $("#block" + i).addClass("future");
  } else if (militaryHour > timeBlocks[i]) {
    $("#block" + i).addClass("past");
  } else {
    $("#block" + i).addClass("present");
  }
}

// WHEN I click into a timeblock - textarea
// THEN I can enter an event
// WHEN I click the save button for that timeblock -event listener
var saveBtn = $(".saveBtn");
saveBtn.on("click", function () {
  console.log($(this).siblings("textarea").val());
  console.log($(this).siblings("div").text());
  var textBox = $(this).siblings("textarea").val();
  var timeData = $(this).siblings("div").text();
  localStorage.setItem(timeData, textBox);
  populateData();
});
// THEN the text for that event is saved in local storage localStorage.setItem
// WHEN I refresh the page
// THEN the saved events persist
function populateData() {
  for (let i = 0; i < timeText.length; i++) {
    var saveTime = localStorage.getItem(timeText[i]);
    $("#hr" + i)
      .children("textarea")
      .text(saveTime);
  }
}
populateData();
