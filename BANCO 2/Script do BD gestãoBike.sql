-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS gestaoBike;
USE bicicletaria;

-- Tabela de Clientes
CREATE TABLE Clientes (
    idCliente INT PRIMARY KEY AUTO_INCREMENT,
    nomeCliente VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) UNIQUE,
    email VARCHAR(255),
    telefone VARCHAR(20),
    dataNasc DATE
);

-- Tabela de Funcionários
CREATE TABLE Funcionarios (
    idFuncionario INT PRIMARY KEY AUTO_INCREMENT,
    nomeFuncionario VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) UNIQUE,
    dataNasc DATE,
    cargo VARCHAR(100),
    ativo TINYINT(1) DEFAULT 1
);

-- Tabela de Peças
CREATE TABLE Pecas (
    idPeca INT PRIMARY KEY AUTO_INCREMENT,
    codigo VARCHAR(255) UNIQUE NOT NULL,
    nomePeca VARCHAR(255) NOT NULL,
    precoCompra DECIMAL(10, 2) NOT NULL,
    estoque INT NOT NULL DEFAULT 0
);

-- Tabela de Serviços (Adicionada com base no seu formulário)
CREATE TABLE Servicos (
    idServico INT PRIMARY KEY AUTO_INCREMENT,
    nomeServico VARCHAR(255) NOT NULL,
    valor DECIMAL(10,2) NOT NULL
);

-- Tabela de Pagamentos
CREATE TABLE Pagamentos (
    idPagamento INT PRIMARY KEY AUTO_INCREMENT,
    tipoPagamento VARCHAR(255) NOT NULL
);

-- Tabela de Ordens de Serviço
CREATE TABLE Ordens (
    idOrdem INT PRIMARY KEY AUTO_INCREMENT,
    idFuncionario INT NOT NULL,
    idCliente INT NOT NULL,
    idPagamento INT NOT NULL,
    observacao MEDIUMTEXT,
    valor DECIMAL(10, 2),
    
    FOREIGN KEY (idFuncionario) REFERENCES Funcionarios(idFuncionario),
    FOREIGN KEY (idCliente) REFERENCES Clientes(idCliente),
    FOREIGN KEY (idPagamento) REFERENCES Pagamentos(idPagamento)
);

-- Tabela de Itens da Ordem de Serviço (muitos para muitos)
CREATE TABLE ItensOrdens (
    idItensOrdem INT PRIMARY KEY AUTO_INCREMENT,
    idOrdem INT NOT NULL,
    idServico INT NOT NULL,
    quantidade INT NOT NULL,
    
    FOREIGN KEY (idOrdem) REFERENCES Ordens(idOrdem),
    FOREIGN KEY (idServico) REFERENCES Servicos(idServico)
);

-- Tabela de Pedidos
CREATE TABLE Pedidos (
    idPedido INT PRIMARY KEY AUTO_INCREMENT,
    idFuncionario INT NOT NULL,
    idCliente INT NOT NULL,
    idPagamento INT NOT NULL,
    dataEntrega DATE,
    observacao MEDIUMTEXT,
    
    FOREIGN KEY (idFuncionario) REFERENCES Funcionarios(idFuncionario),
    FOREIGN KEY (idCliente) REFERENCES Clientes(idCliente),
    FOREIGN KEY (idPagamento) REFERENCES Pagamentos(idPagamento)
);

-- Tabela de Itens do Pedido (muitos para muitos)
CREATE TABLE ItensPecas (
    idItensPeca INT PRIMARY KEY AUTO_INCREMENT,
    idPedido INT NOT NULL,
    idPeca INT NOT NULL,
    quantidade INT NOT NULL,
    
    FOREIGN KEY (idPedido) REFERENCES Pedidos(idPedido),
    FOREIGN KEY (idPeca) REFERENCES Pecas(idPeca)
);
