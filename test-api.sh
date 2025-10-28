#!/bin/bash

echo "🧪 Testando API CF Support..."
echo ""

# Teste 1: Health check
echo "1️⃣ Health Check"
curl -s http://localhost:3000/ | jq .
echo -e "\n"

# Teste 2: Listar suportes
echo "2️⃣ Listar Suportes"
curl -s http://localhost:3000/api/cfsupport | jq .
echo -e "\n"

# Teste 3: Criar suporte
echo "3️⃣ Criar Suporte"
curl -s -X POST http://localhost:3000/api/cfsupport \
  -H "Content-Type: application/json" \
  -d '{"title":"Teste API","description":"Teste de integração","priority":"high"}' | jq .
echo -e "\n"

echo "✅ Testes concluídos!"

