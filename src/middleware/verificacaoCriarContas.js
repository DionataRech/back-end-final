import criarContas from "..";

function verificacaoCriarContas(req, res, next) {
  const data = req.body;
  if (criarContas.find((nomeConta) => nomeConta.email === data.email)) {
    res.status(409).send("Email ja cadastrado ! Use outro email.");
  } else {
    return next();
  }
}

export default verificacaoCriarContas;
