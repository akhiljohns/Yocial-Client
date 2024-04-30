export const getTimeDifference = (targetDateStr) => {
  const targetDate = new Date(targetDateStr);
  const currentDate = new Date();
  const timeDifference = currentDate - targetDate;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return days + " days";
  } else if (hours > 0) {
    return hours + " hrs";
  } else if (minutes > 0) {
    return minutes + " min";
  } else {
    return seconds + " sec";
  }
};



export const convertDate = (dateString) => {
  const date = new Date(dateString);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based, so we add 1
  const year = date.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
}
