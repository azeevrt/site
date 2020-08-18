### 42\. Чтение файла

Простейшим способом прочитать содержимое файла является использование метода fs.readFile(), которому передается путь, кодировка и колбек, вызываемый с содержимым файла (и ошибкой):

	const fs = require('fs')

	fs.readFile('/Users/joe/test.txt', 'utf8', (err, data) => {
	    if (err) {
	        console.error(err)
	        return
	    }
	    console.log(data)
	})

В качестве альтурнативы можно использовать fs.readFileSync():

	const fs = require('fs')

	try {
	    const data = fs.readFileSync('/Users/joe/test.txt', 'utf8')
	    console.log(data)
	} catch (err) {
	    console.error(err)
	}

Оба метода считывают содержимое файла в память перед тем, как вернуть данные. 

Это означает, что большие файлы будут существенно влиять на расход памяти и скорость выполнения программы. 

В этом случае файлы лучше читать с помощью потоков.

