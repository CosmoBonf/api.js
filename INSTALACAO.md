# 📘 Guia de Instalação e Operação - API CF Support

## 📋 Pré-requisitos

- Docker instalado
- Docker Compose instalado
- NPM/Node.js (para desenvolvimento local)

### Verificar Instalação

```bash
# Verificar Docker
docker --version
docker-compose --version

# Verificar Node (opcional)
node --version
npm --version
```

---

## 🚀 Instalação Completa

### Passo 1: Preparar Diretórios

```bash
# Criar diretórios de volume
sudo mkdir -p /home/cf/docker/postgres
sudo mkdir -p /home/cf/docker/uploads

# Definir permissões
sudo chmod 755 /home/cf/docker/postgres
sudo chmod 755 /home/cf/docker/uploads
```

### Passo 2: Iniciar a Aplicação

```bash
# Opção 1: Usando NPM (recomendado)
npm run docker

# Opção 2: Usando Docker Compose diretamente
docker-compose up -d
```

### Passo 3: Aguardar Inicialização

Aguarde aproximadamente 30 segundos para o PostgreSQL estar pronto e a API inicializar.

```bash
# Ver logs em tempo real
npm run docker:logs

# Ou
docker-compose logs -f
```

### Passo 4: Verificar se está rodando

```bash
# Ver containers rodando
docker ps

# Testar API
curl http://localhost:3000/

# Resposta esperada:
# {"message":"API CF Support","version":"1.0.0","endpoints":{...}}
```

---

## ▶️ Comandos Básicos

### Iniciar / Parar

```bash
# Iniciar em background
npm run docker
# ou: docker-compose up -d

# Parar containers
npm run docker:down
# ou: docker-compose down

# Iniciar e ver logs ao mesmo tempo
docker-compose up

# Parar e remover volumes (CUIDADO: apaga dados!)
docker-compose down -v
```

### Visualizar Logs

```bash
# Logs da API
docker-compose logs -f api

# Logs do PostgreSQL
docker-compose logs -f postgres

# Logs de tudo
docker-compose logs -f

# Últimas 100 linhas
docker-compose logs --tail=100
```

### Reiniciar Serviços

```bash
# Reiniciar só a API
docker-compose restart api

# Reiniciar tudo
docker-compose restart

# Rebuild da imagem (após mudar código)
docker-compose build api
docker-compose up -d
```

---

## 🔧 Manutenção

### Acessar o Banco de Dados

```bash
# Via Docker exec
docker exec -it cfsupport_db psql -U postgres -d cfsupport

# Dentro do psql:
\dt                    # Listar tabelas
SELECT * FROM cfsupport;  # Ver registros
\q                     # Sair
```

### Backup do Banco

```bash
# Criar backup
docker exec cfsupport_db pg_dump -U postgres cfsupport > backup.sql

# Restaurar backup
cat backup.sql | docker exec -i cfsupport_db psql -U postgres -d cfsupport
```

### Limpar Volumes

```bash
# Parar containers
docker-compose down

# Remover volumes (APAGA DADOS!)
docker volume ls
docker volume rm apijs_postgres_data

# OU remover tudo (mais seguro)
docker-compose down -v
```

### Reinstalar do Zero

```bash
# 1. Parar tudo
docker-compose down -v

# 2. Limpar diretórios
sudo rm -rf /home/cf/docker/postgres/*
sudo rm -rf /home/cf/docker/uploads/*

# 3. Reiniciar
docker-compose up -d

# 4. Verificar logs
docker-compose logs -f
```

---

## 🧪 Testar a API

### Usando cURL

```bash
# 1. Verificar se está rodando
curl http://localhost:3000/

# 2. Listar suportes
curl http://localhost:3000/api/cfsupport

# 3. Criar suporte
curl -X POST http://localhost:3000/api/cfsupport \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Problema no sistema",
    "description": "Sistema travando",
    "priority": "high",
    "status": "open"
  }'

# 4. Buscar por ID
curl http://localhost:3000/api/cfsupport/1

# 5. Atualizar suporte
curl -X PUT http://localhost:3000/api/cfsupport/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "closed"}'

# 6. Deletar suporte
curl -X DELETE http://localhost:3000/api/cfsupport/1
```

### Usando Script de Teste

```bash
# Executar testes automáticos (requer jq instalado)
./test-api.sh

# Instalar jq se necessário
sudo apt install jq  # Ubuntu/Debian
```

---

## 📡 Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/` | Info da API |
| `GET` | `/api/cfsupport` | Listar suportes |
| `GET` | `/api/cfsupport?page=1&limit=10` | Listar com paginação |
| `GET` | `/api/cfsupport/:id` | Buscar por ID |
| `POST` | `/api/cfsupport` | Criar suporte |
| `PUT` | `/api/cfsupport/:id` | Atualizar suporte |
| `DELETE` | `/api/cfsupport/:id` | Deletar suporte |

---

## 🐛 Troubleshooting

### Container não inicia

```bash
# Ver logs detalhados
docker-compose logs api

# Verificar se PostgreSQL está pronto
docker-compose logs postgres

# Restart manual
docker-compose restart api
```

### Erro de conexão com banco

```bash
# Verificar se PostgreSQL está rodando
docker ps | grep postgres

# Verificar variáveis de ambiente
docker-compose config

# Verificar health check
docker inspect cfsupport_db | grep -A 10 Health
```

### Porta 3000 já em uso

```bash
# Verificar quem está usando a porta
sudo lsof -i :3000

# Parar processo
sudo kill <PID>

# Ou mudar porta no docker-compose.yml
# ports:
#   - "3001:3000"
```

### Dados não persistem

```bash
# Verificar volumes
docker volume ls
docker volume inspect apijs_postgres_data

# Verificar diretório
ls -la /home/cf/docker/postgres

# Dar permissões corretas
sudo chown -R $(id -u):$(id -g) /home/cf/docker
```

### Resetar senha do banco

```bash
# Editar docker-compose.yml, mudar POSTGRES_PASSWORD
# Depois:
docker-compose down -v
docker-compose up -d
```

---

## 📊 Monitoramento

### Status dos Containers

```bash
# Ver status
docker-compose ps

# Ver uso de recursos
docker stats

# Ver portas
docker-compose port api 3000
docker-compose port postgres 5432
```

### Verificar API

```bash
# Health check
curl http://localhost:3000/

# Ver suportes
curl http://localhost:3000/api/cfsupport

# Contar registros
docker exec cfsupport_db psql -U postgres -d cfsupport -c "SELECT COUNT(*) FROM cfsupport;"
```

---

## 🔐 Segurança

### Mudar Credenciais

1. Edite `docker-compose.yml`:
```yaml
environment:
  POSTGRES_PASSWORD: sua_senha_forte
  DB_PASSWORD: sua_senha_forte
```

2. Reinicie:
```bash
docker-compose down -v
docker-compose up -d
```

### Configurar CORS

Edite `docker-compose.yml`:
```yaml
environment:
  CORS_ORIGIN: 'https://seu-dominio.com'
```

Reinicie:
```bash
docker-compose restart api
```

---

## 📝 Desenvolvimento

### Executar Localmente (sem Docker)

```bash
# 1. Instalar dependências
npm install

# 2. Configurar .env
cp env.example .env
# Editar .env com credenciais do PostgreSQL

# 3. Banco precisa estar rodando no Docker
npm run docker  # Só o postgres

# 4. Executar API localmente
npm run dev
```

### Debug da API

```bash
# Entrar no container
docker exec -it cfsupport_api sh

# Dentro do container:
ls -la
cat package.json
tail -f logs/app.log  # se houver logs
```

---

## 📞 Suporte

### Logs Importantes

```bash
# Logs da API
docker-compose logs api

# Logs do PostgreSQL
docker-compose logs postgres

# Últimos erros
docker-compose logs --tail=50 | grep ERROR
```

### Informações do Sistema

```bash
# Versões
docker-compose version
docker version

# Espaço em disco
df -h
docker system df

# Limpar espaço
docker system prune -a
```

---

## ✅ Checklist de Instalação

- [ ] Docker instalado
- [ ] Docker Compose instalado
- [ ] Diretórios criados em `/home/cf/docker/`
- [ ] Containers iniciados com `npm run docker`
- [ ] Logs verificados - sem erros
- [ ] API responde em `http://localhost:3000`
- [ ] Teste de criação funcionando
- [ ] Backup configurado (opcional)

---

**Versão**: 1.0.0  
**Última atualização**: 2024-10-28

