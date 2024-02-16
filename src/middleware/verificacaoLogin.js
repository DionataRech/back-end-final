import bcrypt from "bcrypt";
import criarContas from "..";

async function verificacaoLogin(req, res, next) {
  const data = req.body;

  const usuario = criarContas.find((conta) => conta.email === data.email);

  if (!usuario) {
    return res
      .status(404)
      .json("Email ou senha incorretos, por favor, tente novamente!!!");
  }

  const senhaComparada = await bcrypt.compare(data.senha, usuario.senha);

  if (senhaComparada) {
    next();
  } else {
    return res
      .status(404)
      .json("Email ou senha incorretos, por favor, tente novamente!!!");
  }
}

export default verificacaoLogin;
