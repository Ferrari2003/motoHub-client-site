export const getTime = (time) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dataTime = new Date(time);
  let month = months[dataTime.getMonth()];
  const year = dataTime.getFullYear();
  const day = dataTime.getDate();
  const date = day + ", " + month + " " + year;
  return date;
};
