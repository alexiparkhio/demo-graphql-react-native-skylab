const { floor, random } = Math;

module.exports = () => {
    let day, month, year, hour, minutes;
    day = `${floor(random() * 30)+ 1}`;
    month = `${floor(random() * 11)+ 1}`;
    year = `${1900 + floor(random() * 120)}`;
    hour = `${floor(random() * 23)}`;
    minutes = `${floor(random() * 59)}`;

    if (day.length === 1) day = `0${day}`;
    if (month.length === 1) month = `0${month}`;
    if (hour.length === 1) hour = `0${hour}`;
    if (minutes.length === 1) minutes = `0${minutes}`;
    
    return `${day}-${month}-${year}, ${hour}:${minutes}`;
}