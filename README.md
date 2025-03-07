# MtaConnection

![npm](https://img.shields.io/npm/v/mta-connection) ![license](https://img.shields.io/github/license/rendet4/mta-connection)

## English

**MtaConnection** is a client for interacting with the MTA:SA HTTP API in Node.js.

### Installation

```sh
npm install mta-connection
```

### Usage

```ts
import MtaConnection from "mta-connection";

const mta = new MtaConnection({
  host: "127.0.0.1",
  port: 22005,
  protocol: "http",
  credentials: {
    username: "admin",
    password: "password",
  },
});

async function testCall() {
  try {
    const result = await mta.api.resourceName.procedureName("param1", "param2");
    console.log(result);
  } catch (error) {
    console.error("Error:", error);
  }
}

testCall();
```

### Configuration

| Option                 | Type                | Description           | Default Value |
| ---------------------- | ------------------- | --------------------- | ------------- |
| `host`                 | `string`            | MTA:SA server address | `127.0.0.1`   |
| `port`                 | `number`            | HTTP API port         | `22005`       |
| `protocol`             | `"http" \| "https"` | Connection protocol   | `http`        |
| `credentials.username` | `string`            | API login             | `undefined`   |
| `credentials.password` | `string`            | API password          | `undefined`   |

### API

MtaConnection automatically generates methods to call API resources:

```ts
const result = await mta.api.resourceName.procedureName(param1, param2);
```

- `resourceName` — the name of the MTA resource.
- `procedureName` — the name of the exported server function.
- `param1, param2, ...` — parameters passed to the function.

## Русский

**MtaConnection** — это клиент для взаимодействия с HTTP API MTA:SA на Node.js.

### Установка

```sh
npm install mta-connection
```

### Использование

```ts
import MtaConnection from "mta-connection";

const mta = new MtaConnection({
  host: "127.0.0.1",
  port: 22005,
  protocol: "http",
  credentials: {
    username: "admin",
    password: "password",
  },
});

async function testCall() {
  try {
    const result = await mta.api.resourceName.procedureName("param1", "param2");
    console.log(result);
  } catch (error) {
    console.error("Error:", error);
  }
}

testCall();
```

### Конфигурация

| Опция                  | Тип                 | Описание             | Значение по умолчанию |
| ---------------------- | ------------------- | -------------------- | --------------------- |
| `host`                 | `string`            | Адрес сервера MTA:SA | `127.0.0.1`           |
| `port`                 | `number`            | Порт HTTP API        | `22005`               |
| `protocol`             | `"http" \| "https"` | Протокол соединения  | `http`                |
| `credentials.username` | `string`            | Логин для API        | `undefined`           |
| `credentials.password` | `string`            | Пароль для API       | `undefined`           |

### API

MtaConnection автоматически создаёт методы для вызова API-ресурсов:

```ts
const result = await mta.api.resourceName.procedureName(param1, param2);
```

- `resourceName` — название MTA ресурса.
- `procedureName` — название экспортированной серверной функции.
- `param1, param2, ...` — параметры, передаваемые в функцию.

## License / Лицензия

This project is licensed under the [MIT](LICENSE) license. / Этот проект распространяется под лицензией [MIT](LICENSE).
