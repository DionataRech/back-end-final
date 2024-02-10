import express from "express";
import cors from "cors";
import verificacaoLogin from "./middleware/verificacaoLogin";
import verificacaoCriarContas from "./middleware/verificacaoCriarContas";
export const port = 6666;
const app = express();
app.use(express.json());

app.listen(port, () => {
  console.log("Servidor esta rodando na porta 6666 !!!");
});

// //////////////// login ///////////////////////////////

app.post("/login", verificacaoLogin, (req, res) => {
  res.status(200).send("Login Bem Sucessido !!!");
  console.log(verificacaoLogin);
});

//////////////////-USUARIO-LOGADO-///////////////////////

app.get("usuarioLogado", verificacaoLogin, (req, res) => {
  res.status(200).json({
    mensagem: "O usuario que esta atualmente logado ",
    data: loginIndex,
  });
});

////////////////// Criacao de contas ////////////////////

const criarContas = [];
export default criarContas;

let contador = 1;
app.post("/usuarios", verificacaoCriarContas, (req, res) => {
  const data = req.body;
  criarContas.push({
    id: contador,
    nome: data.nome,
    email: data.email,
    senha: data.senha,
  });
  contador++;
  res.status(201).json({ mensagem: "Usuario cadastrado com sucesso !!!" });
});
///////////////////CRIAR-RECADOS/////////////////////////////

app.post("/criarRecados", verificacaoLogin, (req, res) => {
  const data = req.body;

  if (!req.userId) {
    return res.status(401).send("Usuário não autenticado");
  }
  recadosDeUsuarios.push({
    //   ● Dados de um recado:
    id: req.userId,
    titulo: data.titulo,
    descricao: data.descricao,
  });
  console.log(req.userId);
  console.log(contador.id);
  res
    .status(200)
    .json({ message: "Usuarios listados :", data: recadosDeUsuarios });
});
////////////////  LISTAR USUARIOS /////////////////////

app.get("/usuarios", (req, res) => {
  res.status(200).json({ message: "Usuarios listados :", data: criarContas });
});

////////////////  LISTAR RECADOS-DE-USUARIOS /////////////////////

const recadosDeUsuarios = [];

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
