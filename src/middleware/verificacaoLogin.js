import bcrypt from "bcrypt";
import criarContas from "..";

async function verificacaoLogin(req, res, next) {
  const data = req.body;

  const usuario = criarContas.find((conta) => conta.email === data.email);

  console.log("esse e o usuario da verificacao LOGIN", usuario);

  if (!usuario) {
    console.log("Email nao encontrado. Data:", data);
    return res
      .status(404)
      .json("Email nao encontrado, por favor, tente novamente!!!");
  }

  const senhaComparada = await bcrypt.compare(data.senha, usuario.senha);

  if (senhaComparada) {
    console.log("Login Realizado com Sucesso. UserID:");
    next();
  } else {
    console.log("Senha incorreta. Data:", data);
    return res
      .status(404)
      .json("Senha incorreta, por favor, tente novamente!!!");
  }
}

export default verificacaoLogin;
