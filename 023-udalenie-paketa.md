### 23\. Удаление пакета

Для удаления пакета, установленного локально (с помощью `npm i <package-name\>` в папку node\_modules), запустите `npm unistall <package-name\>` из корневой директории проекта (директории, в которой находится папка node\_modules). 

Если добавить флаг -S или --save, то из package.json будет удалена запись об удаленном пакете. 

Для удаление записи о пакете для разработки, запись о котором содержится в разделе devDependencies файла package.json, следует использовать флаг -D / --save-dev:

	npm uninstall -S npm uninstall -D

Если пакет установлен глобально, следует использовать флаг `-g` / `--global`: `npm uninstall <package-name\> -g`. 

Например: 

	npm uninstall -g webpack


