### 38\. Получение данных из тела запроса

Вот как можно извлечь данные, содержащиеся в теле запроса в формате JSON. 

Допустим, мы получили такой запрос: 

    const axios = require('axios')

    axios.post('https://whatever.com/todos', {
        todo: 'Buy the milk'
    })

Серверный код выглядит так: 

    app.use(express.urlencoded({ extended: false }))
    app.use(express.json())

    app.post('/todos', (req, res) => {
        console.log(req.body.todo)
    })


Если вы не используете Express и хотите сделать тоже самое на ванильном Node.js, придется попотеть, поскольку Express делает многие вещи автоматически. 

При инициализации сервера посредством http.createServer(), колбек вызывается, когда сервер получил все HTTP-заголовки, но не тело запроса. 

Объект request, переданный в колбек соединения, это поток. 

Поэтому мы должны отслеживать получение содержимого тела запроса, которое поступает по частям. 

Сначала мы получаем данные, обрабатывая событие потока data, и когда данные заканчиваются, возникает событие end:
`
const server = http.createServer((req, res) => {
    // мы можем получить заголовки 
    req.on('data', chunk => {
        console.log(\\`Data chunk available: ${chunk}\\`)
    })
    req.on('end', () => {
        // данные получены в полном объеме
    })
})
`

Поэтому для получения данных, предположим, что мы ожидаем получить строку, мы должны помещать части в массив: 
`
const server = http.createServer((req, res) => {
    let data = []
    req.on('data', chunk => {
        data.push(chunk)
    })
    req.on('end', () => {
        JSON.parse(data).todo // 'Buy the milk'
    })
})
`

