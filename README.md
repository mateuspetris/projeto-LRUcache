# LRU Cache — Visualizador

Projeto didático que implementa um **LRU Cache (Least Recently Used)** do zero, com visualização em tempo real das operações realizadas.

## O que é um LRU Cache?

Um LRU Cache é uma estrutura de dados que armazena um número limitado de itens na memória. Quando o cache está cheio e um novo item precisa ser inserido, o item **menos recentemente usado** é removido para dar lugar ao novo.

### Como funciona internamente?

A implementação combina duas estruturas:

- **HashMap** — permite busca em O(1) por chave
- **Lista duplamente encadeada** — mantém a ordem de recência dos itens

Cada vez que um item é acessado ou atualizado, ele é movido para o **topo** da lista. Quando o cache está cheio, o item do **fundo** (menos recente) é removido.

HEAD ←→ [mais recente] ←→ [...] ←→ [menos recente] ←→ TAIL

## Tecnologias

**Backend**
- Java 17
- Spring Boot 3
- Maven

**Frontend**
- React + Vite
- Axios

## Como rodar localmente

### Pré-requisitos

- Java 17+
- Node.js 18+
- Maven

### Backend

```bash
# na raiz do projeto
./mvnw spring-boot:run
```

O backend sobe em `http://localhost:8080`

### Frontend

```bash
cd lru-frontend
npm install
npm run dev
```

O frontend sobe em `http://localhost:5173`

## Endpoints da API

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/cache/{key}` | Busca um item (hit ou miss) |
| `PUT` | `/cache/{key}?value={value}` | Insere ou atualiza um item |
| `DELETE` | `/cache/{key}` | Remove um item específico |
| `GET` | `/cache/state` | Retorna o estado completo |
| `DELETE` | `/cache` | Limpa o cache |

## Funcionalidades

- Visualização da lista em ordem de recência em tempo real
- Indicação de **GET HIT** e **GET MISS**
- Indicação de **evicção** quando o cache está cheio
- Histórico completo de operações com horário
- Capacidade configurável (padrão: 5 itens)

## Estrutura do projeto

```
LRU Cache/
├── lru-back/                     # Backend Spring
│   └── main/java/LRUcache/project/
│       ├── core/
│       │   ├── Node.java         # Nó da lista encadeada
│       │   └── LRUCache.java     # Implementação do cache
│       ├── controller/
│       │   └── CacheController.java
│       ├── service/
│       │   └── CacheService.java
│       └── dto/
│           ├── CacheEntryDTO.java
│           └── CacheStateDTO.java
└── lru-frontend/                 # Frontend React
    └── src/
        ├── components/
        │   ├── CacheVisualizer.jsx
        │   ├── ControlPanel.jsx
        │   └── HistoryLog.jsx
        ├── service/
        │   └── cacheApi.js
        └── App.jsx
```

