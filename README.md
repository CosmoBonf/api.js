# API CF Support

Backend API REST em Node.js com Express, PostgreSQL e Docker.

> 📖 **Documentação completa**: Veja [INSTALACAO.md](./INSTALACAO.md) para guia detalhado de instalação, comandos e troubleshooting.

## 🚀 Início Rápido

```bash
# 1. Criar diretórios de volume
mkdir -p /home/cf/docker/postgres /home/cf/docker/uploads

# 2. Iniciar tudo
npm run docker

# 3. Ver logs
npm run docker:logs
```

**Pronto!** API em `http://localhost:3000`

## 🐳 Docker

### Comandos NPM
- `npm run docker` - Iniciar containers
- `npm run docker:down` - Parar containers
- `npm run docker:logs` - Ver logs

### Estrutura de Volumes
```
/home/cf/docker/
├── postgres/    # Dados PostgreSQL
└── uploads/     # Arquivos uploadados
```

### Como Funciona
- **postgres**: Porta `5432`, dados em `/home/cf/docker/postgres`
- **api**: Porta `3000`, uploads em `/home/cf/docker/uploads`

## 📡 Rotas da API

- `GET /` - Info da API
- `GET /api/cfsupport` - Listar suportes
- `GET /api/cfsupport/:id` - Buscar por ID
- `POST /api/cfsupport` - Criar suporte
- `PUT /api/cfsupport/:id` - Atualizar
- `DELETE /api/cfsupport/:id` - Deletar

## 📝 Exemplo de Uso

```bash
# Criar suporte
curl -X POST http://localhost:3000/api/cfsupport \
  -H "Content-Type: application/json" \
  -d '{"title":"Teste","description":"Descrição"}'

# Listar suportes
curl http://localhost:3000/api/cfsupport
```

## 🛠️ Tecnologias

- Express.js - Framework web
- PostgreSQL - Banco de dados relacional
- CORS - Controle de acesso
- Docker Compose - Containerização

## 📚 Documentação

- [INSTALACAO.md](./INSTALACAO.md) - Guia completo de instalação e comandos
- [Exemplos de uso](#-exemplo-de-uso) - Testar a API com cURL

## 📞 Suporte

Para comandos avançados, troubleshooting e manutenção, consulte o [INSTALACAO.md](./INSTALACAO.md).

# Ver logs
docker-compose logs -f api

# Parar
docker-compose down

# Reiniciar
docker-compose restart

# Status
docker ps | grep cfsupport