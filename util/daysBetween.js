export function daysBetween(date1, date2) {
  const [year1, month1, day1] = date1.split("/").map(Number);
  const [year2, month2, day2] = date2.split("/").map(Number);

  const firstDate = new Date(year1, month1 - 1, day1);
  const secondDate = new Date(year2, month2 - 1, day2);

  const difference = Math.abs(secondDate - firstDate);

  return Math.floor(difference / (1000 * 60 * 60 * 24));
}

console.log(daysBetween("2026/08/27", "2026/08/28"));


// console.log(daysBetween("12/10/2003", "12/10/2004"));
