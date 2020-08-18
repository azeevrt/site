### 46\. Модуль path

Данный модуль предоставляет множество полезных методов для доступа и взаимодействия с путями файлов. 

Его не нужно устанавливать. Будучи частью ядра Node.js, он может использоваться по требованию:
`
const path = require('path')
`

Данный модуль содержит свойство path.sep для обработки разделителей частей пути (\\ на Windows и / на Linux/macOS) и свойство path.delimiter для обработки ограничителей пути (; на Windows и : на Linux/macOS).

Модуль path имеет следующие методы:

##### path.basename()

Возвращает последнюю часть пути. Второй параметр может исключать расширение: 
`
require('path').basename('/test/something') // something 
require('path').basename('/test/something.txt') // something.txt 
require('path').basename('/test/something.txt', '.txt') // something
`

##### path.dirname()

Возвращает путь директории, в которой находится файл: 
`
require('path').dirname('/test/something') // /test
require('path').dirname('/test/something/file.txt') // /test/something
`

##### path.extname()

Возвращает расширение файла: 
`
require('path').extname('/test/something') // ''
require('path').extname('/test/something/file.txt') // '.txt'
`

##### path.isAbsolute()

Возвращает true, если передан абсолютный путь: 
`
require('path').isAbsolute('/test/something') // true 
require('path').isAbsolute('./test/something') // false 
`

##### path.join()

Объединяет две или более части пути:
`
const name = 'joe'
require('path').join('/', 'Users', name, 'notes.txt') // '/Users/joe/notes.txt'
`

##### path.normalize()

Вычисляет путь на основе относительных спецификаторов типа ., .. или двойного слеша:
`
require('path').normalize('/Users/joe/..//test.txt') // '/Users/test.txt'
`

##### path.parse()

Разбирает (парсит) путь на объект, состоящий из частей пути:

* root - корневая директория
* dir - первая директория после корневой
* base - название файла + его расширение
* name - название файла
* ext - расширение файла

Например: 
`
require('path').parse('/Users/test.txt')
`

Получаем: 
`
{
    root: '/',
    dir: '/Users',
    base: 'test.txt',
    ext: '.txt',
    name: 'test'
}
`

##### path.relative()

Принимает 2 пути в качестве аргументов. Возвращает разницу между первым и вторым путями, основываясь на текущей директории. 

Например:
`
require('path').relative('/Users/joe', '/Users/joe/test.txt') // 'test.txt'
require('path').relative('/Users/joe', '/Users/joe/something/test.txt') // 'something/test.txt'
`

##### path.resolve()

Вы можете получить абсолютный путь, вычисляемый на основе относительного, с помощью path.resolve():
`
path.resolve('joe.txt') // '/Users/joe/joe.txt'
`

Первый параметр служит основой для второго: 
`
path.resolve('tmp', 'joe.txt') // '/Users/joe/tmp/joe.txt'
`

Если первый параметр начинается со слеша - это абсолютный путь: 
`
path.resolve('/etc', 'joe.txt') // '/etc/joe.txt'
`

