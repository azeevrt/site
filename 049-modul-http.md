### 49\. Модуль http

Модуль http ядра Node.js является ключевым модулем для работы с сетью. 

Он добавляется следующим образом: 
`
const http = require('http')
`

Данный модуль предоставляет некоторые свойства, методы и классы. 

##### Свойства

###### http.METHODS

Данное свойство содержит список поддерживаемых HTTP-методов:
`
> require('http').METHODS
[ 'ACL',
    'BIND',
    'CHECKOUT',
    'CONNECT',
    'COPY',
    'DELETE',
    'GET',
    'HEAD',
    'LINK',
    'LOCK',
    'M-SEARCH',
    'MERGE',
    'MKACTIVITY',
    'MKCALENDAR',
    'MKCOL',
    'MOVE',
    'NOTIFY',
    'OPTIONS',
    'PATCH',
    'POST',
    'PROPFIND',
    'PROPPATCH',
    'PURGE',
    'PUT',
    'REBIND',
    'REPORT',
    'SEARCH',
    'SUBSCRIBE',
    'TRACE',
    'UNBIND',
    'UNLINK',
    'UNLOCK',
    'UNSUBSCRIBE' ]
`

###### http.STATUS\_CODE

Данное свойство содержит список статус-кодов HTTP-ответа и их описание: 
`
> require('http').STATUS_CODES
{ '100': 'Continue',
    '101': 'Switching Protocols',
    '102': 'Processing',
    '200': 'OK',
    '201': 'Created',
    '202': 'Accepted',
    '203': 'Non-Authoritative Information',
    '204': 'No Content',
    '205': 'Reset Content',
    '206': 'Partial Content',
    '207': 'Multi-Status',
    '208': 'Already Reported',
    '226': 'IM Used',
    '300': 'Multiple Choices',
    '301': 'Moved Permanently',
    '302': 'Found',
    '303': 'See Other',
    '304': 'Not Modified',
    '305': 'Use Proxy',
    '307': 'Temporary Redirect',
    '308': 'Permanent Redirect',
    '400': 'Bad Request',
    '401': 'Unauthorized',
    '402': 'Payment Required',
    '403': 'Forbidden',
    '404': 'Not Found',
    '405': 'Method Not Allowed',
    '406': 'Not Acceptable',
    '407': 'Proxy Authentication Required',
    '408': 'Request Timeout',
    '409': 'Conflict',
    '410': 'Gone',
    '411': 'Length Required',
    '412': 'Precondition Failed',
    '413': 'Payload Too Large',
    '414': 'URI Too Long',
    '415': 'Unsupported Media Type',
    '416': 'Range Not Satisfiable',
    '417': 'Expectation Failed',
    '418': 'I\'m a teapot',
    '421': 'Misdirected Request',
    '422': 'Unprocessable Entity',
    '423': 'Locked',
    '424': 'Failed Dependency',
    '425': 'Unordered Collection',
    '426': 'Upgrade Required',
    '428': 'Precondition Required',
    '429': 'Too Many Requests',
    '431': 'Request Header Fields Too Large',
    '451': 'Unavailable For Legal Reasons',
    '500': 'Internal Server Error',
    '501': 'Not Implemented',
    '502': 'Bad Gateway',
    '503': 'Service Unavailable',
    '504': 'Gateway Timeout',
    '505': 'HTTP Version Not Supported',
    '506': 'Variant Also Negotiates',
    '507': 'Insufficient Storage',
    '508': 'Loop Detected',
    '509': 'Bandwidth Limit Exceeded',
    '510': 'Not Extended',
    '511': 'Network Authentication Required' }
`

###### http.globalAgent

Содержит ссылку на глобальный экземпляр объекта Agent, который является экземпляром класса http.Agent. 

Этот класс используется для управления постоянством соединения и возможностью его повторного использования HTTP-клиентами, и является важным компонентом работы с сетью. 

##### Методы

###### http.createServer()

Возвращает новый экземпляр класса http.Server. 

Например: 
`
const server = http.createServer((req, res) => {
    // обрабатываем запросы
})
`

###### http.request()

Отправляет запрос на сервер, создавая экземпляр класса http.ClientRequest. 

###### http.get()

Похож на http.request(), но автоматически устанавливает метод GET и вызывает req.end(). 

##### Классы

Модуль http предоставляет 5 классов: 

* http.Agent
* http.ClientRequest
* http.Server
* http.ServerResponse
* http.IncomingMessage

###### http.Agent
Node.js создает экземпляр класса http.Agent для управления постоянством соединения и возможностью его повторного использования HTTP-клиентами. 

Данный объект позволяет убедиться, что каждый запрос к серверу помещается в очередь и что при этом повторно используется один и тот же сокет. 

Он также поддерживает пул сокетов (socket pull). Это очень важно для производительности. 

###### http.ClientRequest

Объект http.ClientRequest создается при вызове http.request() или http.get(). 

При получении ответа вызывается событие response с экземпляром http.IncomingMessage в качестве аргумента. 

Данные ответа можно прочитать двумя способами: 

* с помощью метода response.read()
* посредством обработчика события data в колбеке response (так можно обрабатывать поток данных)

###### http.Server

Данный клас, как правило, возвращается при создании сервера с помощью http.createServer(). 

После получения объекта сервера вы получаете доступ к его методам:

* close() - запрещает серверу устанавливать новые соединения
* listen() - запускает HTTP-сервер для установки соединений

###### http.ServerResponse

Создается http.Server и передается в качестве второго аргумента событию request. 

В коде, обычно, именуется как res: 
`
const server = http.createServer((req, res) => {
    // res - это объект http.ServerResponse 
})
`

В каждом обработчике вызывается метод end(), уведомляющий сервер, что сообщение готово к отправке клиенту. Этот метод должен вызываться в каждом ответе. 

Для работы с HTTP-заголовками используются следующие методы: 

* getHeadersNames() - возвращает список установленных заголовков
* getHeaders() - возвращает копию установленных заголовков
* setHeader('headername', value) - устанавливает значение заголовка
* getHeader('headername') - возвращает установленный заголовок
* hasHeader('headername') - возвращает true при наличии заголовка
* headersSent() - возвращает true, если заголовки были отправлены клиенту

После работы с заголовками вы можете отправить их клиенту с помощью response.writeHead(), который принимает статус-код, опциональное сообщение о статусе и объект заголовков. 

Для отправки данных клиенту в теле ответа следует использовать write(). Данный метод отправит буфферизованные данные в виде потока ответа. 

Если заголовки не были отправлены посредством response.writeHead(), сначала будут отправлены заголовки со статус-кодом и сообщением, которые можно редактировать с помощью statusCode и statusMessage: 
`
response.statusCode = 500 
response.statusMessage = 'Internal Server Error'
`

###### http.IncomingMessage

Объект http.IncomingMessage создается: 

* http.Server при обработке события request
* http.ClientRequest при обработке события response

Данный объект может использоваться для доступа к следующему содержимому ответа: 

* статусу - с помощью методов statusCode и statusMessage
* заголовкам - с помощью методов headers или rawHeaders
* HTTP-методу - с помощью method
* версии HTTP - с помощью httpVersion
* URL - с помощью url
* сокету - с помощью socket

Также могут быть получены данные из потока, поскольку http.IncomingMessage реализует интерфейс потока для чтения.