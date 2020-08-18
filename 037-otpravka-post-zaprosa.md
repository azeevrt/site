### 37\. Отправка POST-запроса

Существует множество способов отправки POST-запроса в зависимости от уровня абстракции. 

Одним из простейших способов это сделать является использование [библиотеки Axios][anchor0]. 

    const axios = require('axios')

    axios 
        .post('https://whatever.com/todos', {
            todo: 'Buy the milk'
        })
        .then(res => {
            console.log(\\`statusCode: ${res.statusCode}\\`)
        })
        .catch(err => console.error(err))

Axios нуждается в сторонней библиотеке. 

POST-запрос можно отправить с помощью стандартного модуля Node.js, однако код при этом будет более многословным:

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

    const req = https.request(options, res => {
        console.log(\\`statusCode: ${res.statusCode}\\`)

        res.on('data', d => {
        process.stdout.write(d)
        })
    })

    req.on('error', error => {
        console.error(error)
    })

    req.write(data)
    req.end()

[anchor0]: https://github.com/axios/axios

