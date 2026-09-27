# CHAMA App (React Native / Expo)

App mobile consumindo a API do `chama-api`, seguindo as telas validadas no protótipo.

## Como rodar

```bash
npm install
npx expo start
```

Ajuste `API_URL` em `src/api/client.ts` para apontar para a API rodando (por padrão `http://localhost:3333/api/v1`
— em dispositivo físico/emulador, troque `localhost` pelo IP da máquina).

Para o mapa (`src/screens/client/LocationScreen.tsx`) funcionar, preencha a chave do Google Maps em `app.json`
(`ios.config.googleMapsApiKey` e `android.config.googleMaps.apiKey`).

## O que está implementado

- **Autenticação**: login, cadastro, esqueci senha, refresh automático de token (`src/api/client.ts`) e
  armazenamento seguro via `expo-secure-store`
- **Fluxo do contratante completo**: Home → Categorias → Lista de profissionais (com estado vazio) →
  Detalhe → Agendamento → **Localização (Google Maps)** → Confirmação → Pagamento (com estado de falha) →
  Status do pedido → Cancelamento (com aviso da política) → Avaliação
- **Carteira** (`WalletScreen`) reutilizada para contratante e prestador — saldo e extrato reais via API,
  com telas de **Depósito** e **Saque** funcionais
- **Notificações** e **Favoritos** com dados reais da API (favoritar direto na tela do profissional)
- **Suporte** com FAQ expansível, contato por e-mail e links de termos/privacidade
- **Tempo real**: `src/realtime/socket.ts` conecta ao WebSocket do backend (autenticado por JWT); a tela de
  status do pedido (`OrderStatusScreen`) já assina `booking:update` e resincroniza via REST ao receber o evento
- **Chat** e **Central de disputa** (telas funcionais, mensagens/webhook ainda mockados)
- **Lado do prestador**: Dashboard e tela de "Novo pedido recebido" (aceitar/recusar)
- Navegação completa (`src/navigation/`) com todas as 42 telas do protótipo mapeadas — as que ainda não
  têm lógica própria usam `PlaceholderScreen` para não quebrar a navegação (só resta "Serviços" na aba do
  prestador)

## O que falta para produção

- Trocar o `PlaceholderScreen` restante ("Serviços" na aba do prestador) por uma implementação real
- Onboarding (3 telas) e cadastro completo do prestador (hoje só o registro básico existe)
- WebSocket real para chat e status ao vivo (hoje o Chat é local/mockado)
- Tela "Nenhum profissional disponível" e "Falha no pagamento" já existem como estados dentro das telas
  de lista/pagamento — falta o estado "Sem conexão" global (interceptor de rede)
- Push notifications (Firebase Cloud Messaging)
- Listener global de `booking:new_request` para levar o prestador direto à `NewRequestScreen` quando chega
  um pedido com o app aberto (hoje essa tela só é alcançada manualmente, para fins de demonstração)
- Alternância de perfil contratante ⇄ prestador dentro do app (hoje são pilhas de navegação separadas)
