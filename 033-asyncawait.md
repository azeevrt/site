### 33\. Async/Await

Прошло совсем немного времени с момента появления промисов в 2015 году, а уже в 2017 асинхронный JavaScript был еще больше упрощен благодаря синтаксису async/await. 

Асинхронные функции - это комбинация промисов и генераторов, обычно, их называют высокоуровневой абстракцией над промисами. Позвольте повторить, async/await основан на промисах. 

##### Зачем нужен async/await?

Async/await представляет собой надстройку над промисами и не разрушает концепцию цепочки промисов. 

Когда промисы были представлены в 2015, их главной задачей являлось решение проблемы асинхронного кода, и они ее решили, но спустя 2 года стало очевидно, что промисы не являются окончательным решением. 

Промисы должны были решить проблему, известную как ад колбеков, но ни содержали собственную сложность, связанную с их синтаксисом. 

Они являлись хорошим примитивом, на основе которого можно было разработать лучшее решение, и через некоторое время мы получили асинхронные функции. 

Они делаеют код похожим на синхронный, оставаясь асинхронным и неблокирующим за сценой. 

##### Как это работает?

Асинхронная функция возвращает промис, например:
`
const doSomethingAsync = () => {
    return new Promise(resolve => {
        setTimeout(() => resolve('I did something'), 3000)
    })
}
`

При вызове этой функции вы предваряете его ключевым словом await, и вызов функции ожидает выполнения или отклонения промиса. Одна особенность: функция должна быть определена как асинхронная. Например:
`
const doSomething = async () => {
        console.log(await doSomethingAsync())
    }
`

##### Простой пример

Вот простой пример использования async/await для асинхронного выполнения функции:

    const doSomethingAsync = () => {
        return new Promise(resolve => {
            setTimeout(() => resolve('I did something'), 3000)
        })
    }

    const doSomething = async () => {
        console.log(await doSomethingAsync())
    }

    console.log('Before')
    doSomething()
    console.log('After')

    // => Before After I did something

##### Все дело в промисах

Предварение функции ключевым словом async означает, что она вернет промис. 

Даже если не сделать этого явно, все равно будет возвращен промис. 

Вот почему следующий код является валидным: 

    const aFunction = async () => 'test'

    aFucntion().then(alert) // 'test'

И этот также: 

    const aFucntion = async () => Promise.resolve('test')

    aFunction().then(alert) // 'test'

##### Код намного легче читать

Как видите, наш код выглядит очень простым. Сравните его с кодом, в котором использует цепочка из промисов или с колбеками. 

Это очень простой пример, главные преимущества использования async/await начинают в полной мере проявляться в более сложных случаях. 

Например, вот как мы получаем ресурс и разбираем его с помощью промисов: 

    const getFirstUserData = () => {
        return fetch('/users.json') // получаем список пользователей
            .then(response => response.json()) // разбираем JSON 
            .then(users => users[0]) // получаем первого пользователя 
            .then(user => fetch(\\`/users/${user.name}\\`)) // получаем данные пользователя 
            .then(userResponse => userResponse.json) // разбираем JSON 
    }

    getFirstUserData()

Вот тот же функционал, реализованный с помощью async/await: 

    const getFirstUserData = async () => {
        const response = await fetch('/users.json')
        const users = await response.json()
        const user = users[0]
        const userResponse = await fetch(\\`/users/${user.name}\\`)
        const userData = await userResponse.json()
        return userData
    }

    getFirstUserData()

##### Серия из нескольких функций

Асинхронные функции легко собираются в цепочки и при этом синтаксис выглядит намного прще, чем при использовании промисов: 

    const promiseToDoSomething = () => {
        return new Promise(resolve => {
            setTimeout(() => resolve('I did something'), 10000)
        })
    }

    const watchOverSomeoneDoingSomething = async () => {
        cons something = await promiseToDoSomething()
        return something + '\nand I watched'
    }

    const watchOverSomeoneWatchingSomeoneDoingSomething = async () => {
        const something = await watchOverSomeoneDoingSomething()
        return something + '\nand I watched as well'
        }
        
    watchOverSomeoneWatchingSomeoneDoingSomething().then(res => {
        console.log(res)
    })
        
    /*
        I did something
        and I watched
        and I watched as well
    */

##### Простая отладка

Отладка промисов - задача не из легких, поскольку отладчик не может последовательно разбирать асинхронный код. 

Async/await позволяет это делать, поскольку для компилятора такой код является синхронным.

