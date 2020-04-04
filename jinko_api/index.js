var express = require('express')
var app = express()

app.get('/test', (req,res) => {
    res.send('Working!!!')
})

app.listen(3000, () => {
    console.log('Server working in PORT: 3000')
});


