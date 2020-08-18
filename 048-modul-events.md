### 48\. Модуль events

Модуль events предоставляет класс EventEmitter, предназначенный для обработки событий. 
`
const EventEmitter = require('events')
const door = new EventEmitter()
`

Обработчик событий сам вызывает два события:

* newListener - при добавлении обработчика
* removeListener - при удалении обработчика

Рассмотрим наиболее полезные методы данного модуля: 

##### emitter.addListener()

Является алиасом для emitter.on(). 

##### emitter.emit()

Вызывает событие. При этом последовательно вызываются все зарегистрированные обработчики. 
`
door.emit('slam') // вызываем событие 'slam'
`

##### emitter.eventNames()

Возвращает массив строк, представляющих собой события, зарегистрированные для текущего объекта EventEmitter: 
`
door.eventsName()
`

##### emitter.getMaxListeners()

Возвращает количество обработчиков, которые могут быть зарегистрированы для одного объекта EventEmitter, обычно это число равняется 10, но оно может быть увеличено или уменьшено посредством setMaxListeners(): 
`
door.getMaxListeners()
`

##### emitter.listenerCount()

Возвращает количество обработчиков события, переданного в качестве аргумента: 
`
door.listenerCount('open')
`

##### emitter.off()

Алиас для emitter.removeListener(), появившийся в Node.js 10\. 

##### emitter.on()

Добавляет колбек, который вызывается при возникновении события. 

Например: 
`
door.on('open', () => {
    console.log('Door was opened')
})
`

##### emitter.once()

Добавляет колбек, который вызывается при первом после регистрации возникновении события. Этот колбек вызывается лишь один раз. 


	const EventEmitter = require('events')
	const ee = new EventEmitter()

	ee.once('my-event', () => {
	    // вызвать колбек один раз 
	})

##### emitter.prependListener()

Когда вы добавляете обработчик с помощью on или addListener, данный обработчик добавляется в конец очереди обработчиков и вызывается последним. Посредством prependListener обработчик добавляется в начало очереди. 

##### emitter.prependOnceListener()

Аналогично emitter.prependListener(), за исключением того, что колбек вызывается только один раз. 

##### emitter.removeAllListeners()

Удаляет все обработчики для объекта EventEmitter, обрабатывающие определенное событие: 
`
door.removeAllListeners('open')
`

##### emitter.removeListener()

Удаляет определенный обработчик. Для этого нужно сохранить колбек в переменную: 
`
const doSomething = () => {}
door.on('open', doSomething)
door.removeListener('open', doSomething)
`

##### emitter.setMaxListeners()

Устанавливает максимальное количество обработчиков, которые можно добавить для объекта EventEmitter: 
`
door.setMaxListeners(50)
`
