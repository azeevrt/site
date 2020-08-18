### 11\. Вывод результатов в командную строку

##### Стандартный вывод посредством модуля console

Node.js предоставляет [модуль console][anchor0], содержащий множество очень полезных способов взаимодействия с командной строкой. 

Он похож на объект console браузера. 

Одним из основных методов данного модуля является console.log(), который выводит в консоль переданную строку. 

Если вы передадите объект, он будет преобразован в строку. 

Мы можем передавать console.log несколько переменных:
`
const x = 'x'
const y = 'y'
console.log(x, y)
`

и Node.js выведет в консоль обе. 

Мы также можем форматировать строку с помощью спецификаторов:

Например:
`
console.log('My %s has %d years', 'cat', 2)
`

* %s - форматирует переменную как строку
* %d - форматирует переменную как число
* %i - приводит переменную к целому числу
* %o - форматирует переменную как объект

Например:
`
console.log('%o', Number)
`

##### Очистка консоли

console.clear() очищает консоль (поведение зависит от используемой консоли).

##### Подсчет элементов

console.count() - полезный метод. 

Изучите этот код:
`
const x = 1 
const y = 2 
const z = 3
console.count(
    'The value of x is ' + x +
    ' and has been checked .. how many times?'
)
console.count(
    'The value of x is ' + x +
    ' and has been checked .. how many times?'
)
console.count(
    'The value of y is ' + y +
    ' and has been checked .. how many times?'
)
`

Счетчик считает и показывает количество отображений строки. 
`
The value of x is 1 and has been checked .. how many times?: 1
The value of x is 1 and has been checked .. how many times?: 2
The value of y is 2 and has been checked .. how many times?: 1  
`

Так вы можете посчитать количество яблок и апельсинов:
`
const oranges = ['orange', 'orange']
const apples = ['just one apple']
oranges.forEach(fruit => console.count(fruit))
apples.forEach(fruit => console.count(fruit))
`

##### Отображение трассировки стека

Возникают ситуации, когда необходимо отобразить трассировку стека функции, например, для того, чтобы ответить на вопрос "Как мы достигли этой части кода?"

Вы можете сделать это с помощью console.trace():
`
const function2 = () => console.trace()
const function1 = () => function2()
function1()
`

Это выведет в консоль трассировку стека. Вот что мы увидим в командной строке, если выполним приведенный код в REPL:
`
Trace
    at function2 (repl:1:33)
    at function1 (repl:1:25)
    at repl:1:1
    at ContextifyScript.Script.runInThisContext (vm.js:44:33)
    at REPLServer.defaultEval (repl.js:239:29)
    at bound (domain.js:301:14)
    at REPLServer.runBound [as eval] (domain.js:314:12)
    at REPLServer.onLine (repl.js:440:10)
    at emitOne (events.js:120:20)
    at REPLServer.emit (events.js:210:7)
`

##### Подсчет времени выполнения кода

Вы легко можете посчитать, сколько времени выполнялась функция при помощи time() и timeEnd():
`
const doSomething = () => console.log('test')
const measureDoingSomething = () => {
    console.time('doSomething()')
    // выполняем какие-либо операции и засекаем время их выполнения
    doSomething()
    console.timeEnd('doSomething()')
}
measureDoingSomething()
`

##### stdout и stderr

Как мы знаем, console.log() отлично подходит для вывода сообщений в консоль. Это называется стандартным выводом или stdout. 

console.error() отображает поток stderr. 

Данный поток не выводится в консоль, а записывается в журнал ошибок (error log). 

##### Стилизуем вывод

Вы можете раскрасить текст, выводимый в консоль, с помощью [обратных последовательностей (escape sequences)][anchor1]. Эти последовательности представлют собой набор символов, идентифицирующих цвет. 

Например:
`
console.log('\x1b[33m%s\x1b[0m', 'hi!')
`

Если набрать приведенный код в REPL, то hi! будет желтого цвета. 

Рассмотренный способ довольно трудоемкий. Простейшим способом раскрасить консольный вывод - использовать библиотеку. Одной из таких библиотек является [Chalk][anchor2], которая кроме определения цвета, позволяет сделать текст полужирным, наклонным или подчеркнутым. 

Устанавливаем библиотеку посредством npm install chalk и используем ее следующим образом:
`
const chalk = require('chalk')
console.log(chalk.yellow('hi!'))
`

Использование chalk.yellow гораздо проще, чем запоминание сложных последовательностей. Это также делает код более читаемым. 

##### Создание индикатора прогресса

[Progress][anchor3] - отличная библиотека для создания индикаторов прогресса в терминале. Устанавливаем ее с помощью npm install progress. 

Данный сниппет создает индикатор прогресса, состоящий из 10 шагов. Каждые 100 мс выполняется один шаг. При заполнении индикатора мы отключаем счетчик: 

    const ProgressBar = require('progress')

    const bar = new ProgressBar(':bar', { total: 10 })
    const timer = setInterval(() => {
        bar.tick()
        if (bar.complete) clearInterval(timer)
    }, 100)

[anchor0]: https://nodejs.org/api/console.html
[anchor1]: https://gist.github.com/iamnewton/8754917
[anchor2]: https://github.com/chalk/chalk
[anchor3]: https://www.npmjs.com/package/progress

