ALUNOS: 
    - PEDRO PARADELA
    - JOÃO PEDRO BARREIRO

# Implementação de Grupos de Alunos por Turma

## Resumo da Implementação

Esta implementação adiciona uma página para gerenciar grupos de alunos por turma, utilizando React Query para buscar dados do banco de dados e localStorage para armazenar os grupos.

## Mudanças no Backend (Spring Boot)

### 1. InscricaoRepository.java
- Adicionado método `findByTurmaId(Long turmaId)` para buscar inscrições por turma

### 2. InscricaoService.java
- Adicionado método `findByTurmaId(Long turmaId)` para retornar inscrições de uma turma

### 3. InscricaoController.java
- Adicionado endpoint GET `/api/inscricoes/turma/{turmaId}` para buscar inscrições por turma

### 4. TurmaService.java
- Adicionado método `getAlunosByTurma(Long turmaId)` que retorna lista de alunos inscritos em uma turma

### 5. TurmaController.java
- Adicionado endpoint GET `/api/turmas/{id}/alunos` para buscar alunos de uma turma específica

## Mudanças no Frontend (React 19)

### 1. Instalação do React Query
- Instalado pacote `@tanstack/react-query`

### 2. index.tsx
- Configurado `QueryClientProvider` para habilitar o React Query em toda a aplicação

### 3. api.ts
- Atualizado método `getAlunosPorTurma()` para usar o novo endpoint `/api/turmas/{id}/alunos`

### 4. GrupoAlunosPage.tsx (NOVA PÁGINA)
Página principal com as seguintes funcionalidades:

#### Funcionalidades:
- **ComboBox de Turmas**: Carrega turmas do banco de dados usando React Query
- **Tabela de Alunos**: Exibe ID, Nome, Email e botão de Ação
- **Botão Incluir/Remover**: 
  - Mostra "Incluir" quando aluno não está no grupo
  - Mostra "Remover" quando aluno está no grupo
  - Muda dinamicamente ao clicar
- **LocalStorage**: 
  - Armazena grupos usando o NOME da turma como chave (ex: "A001", "A002")
  - Persiste dados entre sessões
  - Cada turma tem seu próprio grupo independente

#### Comportamento:
- No primeiro acesso: combo mostra "Selecione uma turma" e tabela vazia
- Ao selecionar turma: busca alunos do banco via React Query
- Ao clicar em Incluir: adiciona aluno ao grupo no localStorage
- Ao clicar em Remover: remove aluno do grupo no localStorage
- Alunos podem estar em múltiplos grupos (várias turmas)

### 5. App.tsx
- Adicionada rota `/grupos` para a nova página

### 6. Navigation.tsx
- Adicionado link "Grupos" na barra de navegação

## Como Usar

1. **Iniciar o Backend**:
   ```bash
   cd backend
   mvnw.cmd spring-boot:run
   ```

2. **Iniciar o Frontend**:
   ```bash
   cd frontend
   npm start
   ```

3. **Acessar a aplicação**:
   - Abrir http://localhost:3000
   - Clicar em "Grupos" na navegação
   - Selecionar uma turma no combo box
   - Ver lista de alunos inscritos
   - Clicar em "Incluir" para adicionar ao grupo
   - Clicar em "Remover" para remover do grupo

## Tecnologias Utilizadas

- **Backend**: Spring Boot, JPA/Hibernate
- **Frontend**: React 19, React Query (TanStack Query), Bootstrap, TypeScript
- **Armazenamento**: PostgreSQL (backend) + localStorage (grupos)

## Endpoints da API

- `GET /api/turmas` - Lista todas as turmas
- `GET /api/turmas/{id}/alunos` - Lista alunos de uma turma específica
- `GET /api/inscricoes/turma/{turmaId}` - Lista inscrições de uma turma

## Observações Importantes

✅ Turmas são carregadas do banco usando React Query
✅ Alunos são carregados do banco usando React Query  
✅ Grupos são armazenados no localStorage usando nome da turma como chave
✅ Um aluno pode estar em vários grupos (diferentes turmas)
✅ Botões mudam de "Incluir" para "Remover" dinamicamente
✅ Interface segue o design especificado na imagem

