CREATE TABLE `GASTOS_CUSTOS` (
  `token_openai` number(15.2),
  `api_whatsapp` number(15.2),
  `api_zapster` number(15.2),
  `servidor_nuvem` number(15.2),
  `chatgpt` number(15.2),
  `salario` number(15.2),
  `taxa` number(15.2),
  `impostos` number(15.2),
  `infraestrutura` number(15.2),
  `data` datetime
);

CREATE TABLE `BOTS_CRIADOS` (
  `nome` varchar2,
  `descricao` text,
  `setor` varchar2(30),
  `data` datetime
);

CREATE TABLE `DOR_CLIENTE` (
  `cliente_id` number(15.2),
  `nome` varchar2,
  `sobrenome` varchar2,
  `telefone` varchar2,
  `email` varchar2,
  `nome_empresa` varchar2,
  `descricao` text
);

CREATE TABLE `NOSSAS_VENDAS` (
  `nome` varchar2,
  `descricao` text,
  `setor` varchar2(30),
  `preco` number(15.2),
  `cliente_id` number(15.2),
  `data` datetime
);
