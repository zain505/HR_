const formatDate= (date) =>{

    let day = new Date(date).getDate();
    let month = new Date(date).getMonth()+1;
    let year = new Date(date).getFullYear();

    return `${day>10?day:"0"+day}-${month>10?month:"0"+month}-${year}`;

}

const getDays =(startDate,endDate) =>{
    let splitDate1 = startDate.split("-");
    let splitDate2 = endDate.split("-");
    let date1 = new Date(`${splitDate1[2]}-${splitDate1[1]}-${splitDate1[0]}`);
    let date2 = new Date(`${splitDate2[2]}-${splitDate2[1]}-${splitDate2[0]}`);
   return (date2-date1)/(1000 * 60 * 60 * 24)
}

exports.formatDate = formatDate
exports.getDays = getDays