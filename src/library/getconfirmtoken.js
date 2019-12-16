const fetch = require('node-fetch');

function getConfirmAuth(){

return fetch('http://sprcom-alerts-ui-qa.dev.cf.private.springer.com/alerts/api/toc/tokens/confirm',
    {
        body: JSON.stringify({
            email: 'testspringer1@gmail.com',
            journalNo: 41260,
            journalTitle: encodeURIComponent('Journal of Asset Management')
        }),
        headers: {
            'Content-Type':'application/json'
        },
        method: 'POST'
    })
   /* .then((res) => {
        res.text()
            .then((token) => {
                //console.log(token);
                return(token);

            })
            .catch((err) => {
                console.log(err);
            });
    })*/
    .then(function(res) {
        return res.json();
    })
}

getConfirmAuth()
    .then((res) => {
        res.json()
            .then((token) => {
                return(token);

            })
            .catch((err) => {
                console.log(err);
            })
    });

