import criarContas from "..";

let contaLogada = [];

function verificacaoLogin(req, res, next) {
  const data = req.body;

  const loginIndex = criarContas.findIndex(
    (conta) => conta.email === data.email && conta.senha === data.senha
  );

  if (loginIndex !== -1) {
    req.userId = criarContas[loginIndex].id;
    console.log("Login Realizado com Sucesso. UserID:", req.userId);
    return res.status(200).send("Login Realizado com Sucesso");
  } else {
    console.log("Email ou Senha não encontrados. Data:", data);
    return res
      .status(404)
      .send("Email ou Senha não encontrados, por favor, tente novamente!!!");
  }
}

export default verificacaoLogin;
