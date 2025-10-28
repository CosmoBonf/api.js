FROM node:18-alpine

# Instalar psql para healthcheck
RUN apk add --no-cache postgresql-client

# Diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN if [ -f package-lock.json ]; then \
      npm ci --omit=dev; \
    else \
      npm install --omit=dev; \
    fi

# Copiar código da aplicação
COPY . .

# Criar diretório de uploads
RUN mkdir -p /app/uploads && chmod 755 /app/uploads

# Expor porta
EXPOSE 3000

# Comando de início
CMD ["npm", "start"]

