### 36\. Отправка HTTP-запросов

##### Отправка GET-запроса


    const https = require('https')
    const options = {
        hostname: 'whatever.com',
        port: 443,
        path: '/todos',
        method: 'GET'
    }

    const req = https.request(options, res => {
        console.log(\\`statusCode: ${res.statusCode}\\`)

        res.on('data', d => {
            process.stdout.write(d)
        })
    })

    req.on('error', err => console.error(err))

    req.end()


##### Отправка POST-запроса


    const https = require('https')

    const data = JSON.stringify({
        todo: 'Buy the milk'
    })

    const options = {
        hostname: 'whatever.com',
        port: 443,
        path: '/todos',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length 
        }
    }

    const req = https.request(options => {
        console.log(\\`statusCode: ${res.statusCode}\\`)

        res.on('data', d => {
            process.stdout.write(d)
        })
    })

    req.on('error', err => console.error(err))

    req.write(data)
    req.end()


##### PUT и DELETE

Запросы PUT и DELETE имеют тот же формат, что и POST-запрос, за исключением значения свойства method объекта options.

