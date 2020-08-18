### 19\. Поиск версии установленного пакета

Для того, чтобы увидеть последние версии установленных пакетов, включая их зависимости, необходимо выполнить npm list. 

Например:
`
❯ npm list
/Users/joe/dev/node/cowsay
└─┬ cowsay@1.3.1
  ├── get-stdin@5.0.1
  ├─┬ optimist@0.6.1
  │ ├── minimist@0.0.10
  │ └── wordwrap@0.0.3
  ├─┬ string-width@2.1.1
  │ ├── is-fullwidth-code-point@2.0.0
  │ └─┬ strip-ansi@4.0.0
  │   └── ansi-regex@3.0.0
  └── strip-eof@1.0.0
`

Вы, конечно, можете просто открыть файл package-lock.json, но такое представление является более наглядным. 

npm list -g делает тоже самое, но для глобально установленных пакетов. 

Для того, чтобы получить список пакетов верхнего уровня (обычно это те пакеты, которые вы устанавливали вручную), нужно выполнить npm list --depth=0:
`
❯ npm list --depth=0
/Users/joe/dev/node/cowsay
└── cowsay@1.3.1
`

Версию определенного пакета можно получить, указав его имя:
`
❯ npm list cowsay
/Users/joe/dev/node/cowsay
└── cowsay@1.3.1
`

Это также работает с зависимостями установленного пакета: 
`
❯ npm list minimist
/Users/joe/dev/node/cowsay
└─┬ cowsay@1.3.1
  └─┬ optimist@0.6.1
    └── minimist@0.0.10
`

Если вы хотите увидеть последнюю доступную версию пакета, имеющуюся в npm, выполните `npm view <package-name\> version`:

    ❯ npm view cowsay version

    1.3.1

