const monthNames = [
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

export const dateFormat = (date: string | number) => {
  const dateObject = new Date(date);
  const month = monthNames[dateObject.getMonth()];
  const day = dateObject.getDate();
  const year = dateObject.getFullYear();
  const formatedDate = `${month} ${day}, ${year}`;
  return formatedDate;
};
