const formatDate= (date) =>{

    let day = new Date(date).getDate();
    let month = new Date(date).getMonth()+1;
    let year = new Date(date).getFullYear();

    return `${day}-${month}-${year}`;

}

exports.formatDate = formatDate