### 44\. Работа с директориями

Модуль fs предоставляет множество методов для работы с каталогами. 

##### Проверка наличия директории

Используйте fs.check() для определения существования директории и возможности получить к ней доступ. 

##### Создание новой директории

Используйте fs.mkdir() или fs.mkdirSync() для создания новой директории: 

    const fs = require('fs')

    const folderName = '/Users/joe/test'

    try {
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName)
        }
    } catch (err) {
        console.error(err)
    }

##### Чтение содержимого директории

Используйте fs.readdir() и fs.readdirSync() для чтения содержимого каталога. 

Следущий код читает контент папки, как файлы, так и поддиректории, и возвращает их относительные пути: 

    const fs = require('fs')
    const path = require('path')

    const folderPath = '/Users/joe'

    fs.readdieSync(folderPath)

Полный путь можно получить так: 
`
fs.readdirSync(folderPath).map(fileName => {
    return path.join(folderPath, fileName)
})
`

Кроме того, можно отфильтровать результаты, чтобы получить только файлы:

    const isFile = fileName => {
        return fs.lstatSync(fileName).isFile()
    }

    fs.readdirSync(folderPath).map(fileName => {
        return path.join(folderPath, fileName)
    })
    .filter(isFile)

##### Переименование директории

Для переименования директории используйте fs.rename() и fs.renameSync(). Первый параметр - это текущий путь, второй - новый путь: 

    const fs = require('fs')

    fs.rename('/Users/joe', '/Users/roger', err => {
        if (err) {
            console.error(err)
            return
        }
        // готово
    })

fs.renameSync() - это синхронная версия: 

    const fs = require('fs')

    try {
        fs.renameSync('/Users/joe', 'Users/roger')
    } catch (err) {
        console.error(err)
    }

##### Удаление директории

Для удаления директории используйте fs.rmdir() и fs.rmdirSync(). 

Удаление непустой папки может оказаться сложнее, чем кажется. 

В данном случае, проще установить модуль [fs-extra][anchor0], который очень популярен и хорошо поддерживается. Он является своего рода заменой модуля fs, предоставляя более продвинутые возможности. 

Нас интересует его метод remove(). 

Устанавливаем модуль: 
`
npm install fs-extra
`

И используем следующим образом:

    const fs = require('fs-extra')

    const folder = '/Users/joe'

    fs.remove(folder, err => {
        console.error(err)
    })

Он также может быть использован совместно с промисами:
`
fs.remove(folder)
    .then(() => {
        // готово 
    })
    .catch(err => {
        console.error(err)
    })
`

Или с async/await: 

    async function removeFolder(folder) {
        try {
            await fs.remove(folder)
            // готово 
        } catch (err) {
            console.error(err)
        }
    }

    const folder = 'Users/joe'
    removeFolder(folder)

[anchor0]: https://www.npmjs.com/package/fs-extra