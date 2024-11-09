// The first week must include a thursday to be considered the week number 1.
function getWeekNumber(date) {
  const currentDate = new Date(date);
  //get 1 january
  const startOfYear = new Date(currentDate.getFullYear(), 0, 1);

  // find the first sunday
  const firstSunday = new Date(startOfYear);
  firstSunday.setDate(firstSunday.getDate() - firstSunday.getDay());

  const firstThursday = new Date(startOfYear);
  firstThursday.setDate(startOfYear.getDate() + (4 - startOfYear.getDay()));

  if (firstThursday < firstSunday) {
    firstSunday.setDate(firstSunday.getDate() - 7);
  }

  const daysSinceFirstSunday = Math.floor(
    (currentDate - firstSunday) / (1000 * 60 * 60 * 24)
  );

  const weekNumber = Math.floor(daysSinceFirstSunday / 7) + 1;

  return weekNumber;
}

export default getWeekNumber;
