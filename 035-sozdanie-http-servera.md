### 35\. Создание HTTP-сервера

Вот пример простого HTTP-сервера:


	const http = require('http')

	const port = process.env.PORT || 3000

	const server = http.createServer((req, res) => {
	    res.statusCode = 200
	    res.setHeader('Content-Type', 'text/html')
	    res.end('<>Hello, World!<>')
	})

	server.listen(port, () => {
	    console.log(\\`Server running at port ${port}\\`)
	})


Проанализируем этот код.

Мы подключаем [модуль http][anchor0]. 

Затем используем этот модуль для создания HTTP-сервера. 

Мы указываем серверу слушать порт 3000. После запуска сервера вызывается колбек. 

Данный колбек будет вызываться в ответ на каждый запрос. При получении запроса вызывается [событие request][anchor1], возвращающее два объекта: запрос (объект [http.IncomingMessage][anchor2]) и ответ (объект [http.ServerResponse][anchor3]). 

request содержит детали запроса. Через него мы получаем доступ к заголовкам и данным запроса. 

response используется для формирования ответа клиенту. 

В данном случае, с помощью res.statusCode = 200 мы присваиваем свойству statusCode значение 200 в качестве индикатора успешного выполнения запроса. 

Также мы устанавливаем заголовок:
`
res.setHeader('Content-Type', 'text/html')
`

И закрываем ответ, добавляя контент в качестве аргумента метода end():
`
res.end('Hello, World!')
`

[anchor0]: https://nodejs.org/api/http.html
[anchor1]: https://nodejs.org/api/http.html#http_event_request
[anchor2]: https://nodejs.org/api/http.html#http_class_http_incomingmessage
[anchor3]: https://nodejs.org/api/http.html#http_class_http_serverresponse

