const redirect_route = (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end("<h1 style=text-align:center>Welcome to Expense Tracker API's</h1>");
}



module.exports = redirect_route