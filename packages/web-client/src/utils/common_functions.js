const months_list = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export const currency_format = (amount, currency) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: currency, minimumFractionDigits: 0 }).format(amount)
}



export const date_formater = (date) => {
    
    const today = new Date(date);
    const yyyy = today.getFullYear();
    let mm = today.getMonth() ; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    // if (mm < 10) mm = '0' + mm;

    const formattedToday = dd + ' ' + months_list[mm] + ' ' + yyyy;

    return formattedToday
}