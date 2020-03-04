const relativeDate = ( previous ) => {
    let current = new Date().toDateString();
    let monthAgo = previous.slice(4, 7);
    let currentMth = current.slice(4, 7);
    let daysAgo = current.slice(8, 11) - previous.slice(8, 11);
    if (monthAgo === currentMth && daysAgo < 4) {
      if (daysAgo === 0) {
        return "Today";
      } else if (daysAgo === 1) {
        return "Yesterday";
      } else {
        return daysAgo + " days ago";
      }
    } else {
      return previous.slice(4, 16);
    }
  }
export default relativeDate;