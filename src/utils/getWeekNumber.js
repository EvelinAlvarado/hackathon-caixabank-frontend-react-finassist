// The first week must include a thursday to be considered the week number 1.
function getWeekNumber(date) {
  const currentDate = new Date(date);
  //get 1 january
  const startOfYear = new Date(currentDate.getFullYear(), 0, 1);

  // Get the day og january 1 and Modified: Monday=0, tuesday=1,etc
  const dayNumber = (startOfYear.getDay() + 6) % 7;

  // find the first thursday
  startOfYear.setDate(startOfYear.getDate() + (3 - dayNumber));

  const daysSinceFirstThursday =
    (currentDate - startOfYear) / (1000 * 60 * 60 * 24);

  const weekNumber = Math.floor(daysSinceFirstThursday / 7) + 1;

  return weekNumber;
}

export default getWeekNumber;
