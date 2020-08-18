### 40\. Статистика файла

Каждый файл содержит перечень информации, которую мы можем изучить с помощью Node.js. 

В частности, посредством метода stat() модуля fs. 

Данный метод вызывается с двумя аргументами: путем к файлу и колбеком. Колбек, в свою очередь, содержит два параметра: сообщение об ошибке и статистику файла:
`
const fs = require('fs')
fs.stat('/Users/joe/test.txt', (err, stats) => {
    if (err) {
        console.error(err)
        return
    }
    // мы имеем доступ к статистике файла через 'stats'
})
`

Node.js также предоставляет синхронный метод, который блокирует поток до получения статистики файла: 
`
const fs = require('fs')
try {
    const stats = fs.statSync('/Users/joe/test.txt')
} catch (err) {
    console.error(err)
}
`

Информация о файле содержится в переменной stats. Какую информацию мы можем получить, используя stats? 

Среди прочего:

* файл - это директория или файл? stats.isFile() и stats.isDirectory()
* файл - это символическая ссылка? stats.isSymbolicLink()
* размер файла в байтах, stats.size

Существует множество других методов, но чаще всего используются указанные выше. 

    const fs = require('fs')
    fs.stat('/Users/joe/test.txt', (err, stats) => {
        if (err) {
            console.error(err)
            return
        }

        stats.isFile() // true
        stats.isDirectory() // false
        stats.isSymbolicLink() // false
        stats.size // 1024000 //= 1MB
    })

