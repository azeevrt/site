### 12\. Получение данных, введенных пользователем

Как сделать Node.js-программу интерактивной?

Для этого в 7 версии Node.js представлен модуль [readline][anchor0]: он служит для получения данных из потока для чтения, такого как process.stdin - командная строка во время выполнения Node.js-программы. 

    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    })

    readline.question('What is your name?', name => {
        console.log(\\`Hi ${name}!\\`)
        readline.close()
    })

В этом коде запрашивается имя пользователя. После того, как пользователь набрал текст и нажал enter, выводится приветствие. 

Метод question() выводит в консоль первый параметр (вопрос) и ожидает ответа пользователя. При нажатии enter выполняется функция обратного вызова. 

В данном колбеке мы закрываем интерфейс readline. 
readline содержит и другие методы, о которых вы можете почитать в документации. 

Если вам необходимо запросить пароль, лучше не возвращать его в явном виде, а использовать символ \*. 

Одним из способом это сделать является использование пакета [readline-sync][anchor1], который прост для понимания и легок в настройке. 

Более полное и абстрактное решение предоставляет пакет [Inquirer.js][anchor2]. 

Устанавливаем его с помощью npm install inquirer и используем следующим образом:

    const inquirer = require('inquirer')

    const questions = [
        {
            type: 'input',
            name: 'name',
            message: 'What's your name?'
        }
    ]

    inquirer.prompt(questions).then(answers => {
        console.log(\\`Hi ${answers['name']}!\\`)
    })

Inquirer.js позволяет делать много интересных вещей, например, предлагать множественный выбор, предоставлять радио-кнопки, запрашивать подтверждение действия и т.д. 

Он больше известен как альтернатива встроенным решениям, но если вы планируете поднять взаимодействие с пользователем на новый уровень, Inquirer.js - оптимальное решение. 

[anchor0]: https://nodejs.org/api/readline.html
[anchor1]: https://www.npmjs.com/package/readline-sync
[anchor2]: https://github.com/SBoudrias/Inquirer.js

