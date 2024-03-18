import express, { query } from "express";
import cors from "cors";
import verificacaoLogin from "./middleware/verificacaoLogin";
import verificacaoCriarContas from "./middleware/verificacaoCriarContas";
import bcrypt from "bcrypt";
export const port = 9999;
const app = express();
app.use(cors());

app.use(express.json());

app.listen(port, () => {
  console.log("Servidor esta rodando na porta 9999 !!!");
});

////////////////// Criacao de contas ////////////////////

const criarContas = [];
export default criarContas;

let contador = 1;
app.post("/usuarios", verificacaoCriarContas, async (req, res) => {
  const data = req.body;
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

app.post("/usuario/login", verificacaoLogin, (req, res) => {
  res.status(200).send("Login Bem Sucedido !!!");
});

///////////////////CRIAR-RECADOS/////////////////////////////

const recadosDeUsuarios = [];
let contadorRecados = 1;

app.post("/criarRecados/:email", (req, res) => {
  const data = req.body;
  const emailFiltrado = req.params.email;
  const emailIndex = criarContas.findIndex(
    (conta) => conta.email === emailFiltrado
  );
  if (emailIndex != -1) {
    recadosDeUsuarios.push({
      email: emailFiltrado,
      id: contadorRecados,
      titulo: data.titulo,
      descricao: data.descricao,
    });
    res
      .status(200)
      .json({ message: "Recado criado com sucesso!", data: recadosDeUsuarios });
    contadorRecados++;
  } else {
    return res.status(404).send("Email nao encontrado!!");
  }
});
////////////////  LISTAR USUARIOS /////////////////////

app.get("/usuarios", (req, res) => {
  return res
    .status(200)
    .json({ message: "Usuarios listados :", data: criarContas });
});

////////////////  LISTAR RECADOS-DE-USUARIOS /////////////////////

app.get("/recados/:email", (req, res) => {
  const emailFiltrado = req.params.email;
  const recadosDoUsuario = recadosDeUsuarios.filter(
    (recado) => recado.email === emailFiltrado
  );
  return res
    .status(200)
    .json({ mensagem: "Recados de usuários", data: recadosDoUsuario });
});

////////////////  LISTAR RECADOS-DE-USUARIOS (~PAGINACAO~)/////////////////////

app.get("/recados", (req, res) => {
  try {
    if (recadosDeUsuarios.length === 0) {
      return res.status(400).send({ mensagem: "A lista está vazia" });
    }
    const limit = parseInt(req.query.limit);
    const page = parseInt(req.query.page);
    const recadosPorPaginaPositivo = (page - 1) * limit;

    const recadosPaginados = recadosDeUsuarios.slice(
      recadosPorPaginaPositivo,
      recadosPorPaginaPositivo + limit
    );
    console.log(limit, page, "filtrinho amigo");
    res.status(200).json({
      success: true,
      message: "Recados retornados com sucesso",
      data: recadosPaginados,
      totalRecados: recadosDeUsuarios.length,
      paginaAtual: Math.floor(recadosPorPaginaPositivo / limit) + 1,
      totalPaginas: Math.ceil(recadosDeUsuarios.length / limit),
      quantidadePorPagina: limit,
    });
  } catch (error) {
    res.status(500).send({ mensagem: "Erro interno" });
  }
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
    res.status(404).json({ mensagem: "Email nao encontrado." });
  }
});

///////////////// ATUALIZAR ////////////////////////

app.put("/usuario/atualizar/:email", (req, res) => {
  const emailFiltrado = req.params.email;
  const data = req.body;
  const emailIndex = criarContas.findIndex(
    (conta) => conta.email === emailFiltrado
  );
  if (emailIndex != -1) {
    const atualizarUsuario = criarContas[emailIndex];
    atualizarUsuario.nome = data.nome;
    atualizarUsuario.email = data.email;
    return res
      .status(201)
      .json({ mensagem: "Usuario atualizado com sucesso ", data: data });
  } else {
    return res
      .status(404)
      .send("Email nao encontrado,por favor tente novamente !!!");
  }
});

/////////////////// DELETAR- USUARIO /////////

app.delete("/usuario/delete/:email", (req, res) => {
  const emailFiltrado = req.params.email;
  const emailIndex = criarContas.findIndex(
    (conta) => conta.email === emailFiltrado
  );
  if (emailIndex != -1) {
    const contaRemovida = criarContas.splice(emailIndex, 1);
    return res.status(200).send(" Deletado com Sucesso");
  } else {
    return res.status(404).send("Email nao encontrado,tente novamente !!!");
  }
});
