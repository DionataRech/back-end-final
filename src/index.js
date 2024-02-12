import express from "express";
import cors from "cors";
import verificacaoLogin from "./middleware/verificacaoLogin";
import verificacaoCriarContas from "./middleware/verificacaoCriarContas";
import bcrypt from "bcrypt";
export const port = 6666;
const app = express();
app.use(express.json());

app.listen(port, () => {
  console.log("Servidor esta rodando na porta 6666 !!!");
});

////////////////// Criacao de contas ////////////////////

const criarContas = [];

export default criarContas;

let contador = 1;
app.post("/usuarios", verificacaoCriarContas, async (req, res) => {
  const data = req.body;
  const senha = data.senha;
  const hashSenha = await bcrypt.hash(data.senha, 10);
  criarContas.push({
    id: contador,
    nome: data.nome,
    email: data.email,
    senha: hashSenha,
  });
  contador++;
  res.status(201).json({ mensagem: "Usuario cadastrado com sucesso !!!" });
});

// //////////////// login ///////////////////////////////

app.post("/usuarioLogin", verificacaoLogin, async (req, res) => {
  res.status(200).send("Login Bem Sucedido !!!");
});

////////////////-USUARIO-LOGADO-///////////////////////

app.get("/usuarioLogado", verificacaoLogin, (req, res) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({
      message: "Usuário não autenticado",
    });
  }

  const usuario = criarContas.find((user) => user.id === userId);

  if (!usuario) {
    return res.status(404).json({
      message: "Usuário não encontrado. Faça o login para obter informações.",
    });
  }

  res.status(200).json({
    mensagem: "O usuário que está atualmente logado",
    data: {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
    },
  });
});

///////////////////CRIAR-RECADOS/////////////////////////////

const recadosDeUsuarios = [];

app.post("/criarRecados", verificacaoLogin, (req, res) => {
  const data = req.body;

  const userId = req.userId;

  if (!userId) {
    return res.status(401).send("Usuário não autenticado");
  }

  recadosDeUsuarios.push({
    id: userId,
    titulo: data.titulo,
    descricao: data.descricao,
  });

  res
    .status(200)
    .json({ message: "Recado criado com sucesso!", data: recadosDeUsuarios });
});
////////////////  LISTAR USUARIOS /////////////////////

app.get("/usuariosListados", (req, res) => {
  return res
    .status(200)
    .json({ message: "Usuarios listados :", data: criarContas });
});

////////////////  LISTAR RECADOS-DE-USUARIOS /////////////////////

app.get("/recados/:email", (req, res) => {
  return res
    .status(200)
    .json({ mensagem: "Recados de usuarios", data: recadosDeUsuarios });
});

////////////////  FILTRAR USUARIOS /////////////////////

app.get("/usuarios/:email", (req, res) => {
  const emailFiltrado = req.params.email;
  const emailIndex = criarContas.findIndex(
    (conta) => conta.email === emailFiltrado
  );
  if (emailIndex !== -1) {
    res
      .status(200)
      .json({ mensagem: "Seu email filtrado e", data: emailFiltrado });
  } else {
    res.status(404).json({ mensagem: "Email não encontrado." });
  }
});
