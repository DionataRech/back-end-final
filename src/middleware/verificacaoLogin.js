import bcrypt from "bcrypt";
import criarContas from "..";

async function verificacaoLogin(req, res, next) {
  const data = req.body;

  const usuario = criarContas.find((conta) => conta.email === data.email);

  console.log("esse e o usuario da verificacao LOGIN", usuario);

  if (!usuario) {
    console.log("Email não encontrado. Data:", data);
    return res
      .status(404)
      .json("Email não encontrado, por favor, tente novamente!!!");
  }

  const senhaComparada = await bcrypt.compare(data.senha, usuario.senha);

  if (senhaComparada) {
    req.userId = usuario.id;
    console.log("Login Realizado com Sucesso. UserID:", usuario.id);
    next();
  } else {
    console.log("Senha incorreta. Data:", data);
    return res
      .status(404)
      .json("Senha incorreta, por favor, tente novamente!!!");
  }
}

export default verificacaoLogin;
