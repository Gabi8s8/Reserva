/*
    index (listALL): listagem de sessões
    store (add): criar uma sessão
    show (list): quando queremos listar uma UNICA sessão
    update: quando queremos alterar alguma sessão
    destroy (delete): quando queremos deletar uma sessão
*/

import User from '../models/User'
import * as Yup from 'yup' //carrega todas as funções do yup

class SessionController {
    async store(req, res) { //async = não sincronizado,tem que esperar
        const schema = Yup.object().shape({
            email: Yup.string().email().required(), //verificar email
        })
        const { email } = req.body
        if(!(await schema.isValid(req.body))) { //executa a validação do email
            return res.status(400).json({ error: 'Falha na validação'})
        }
        let user = await User.findOne({ email }) //findOne = procurar o email
        if(!user) {
            user = await User.create({ email }) //se não tiver usuario cadastrado, ent cria
        }
        return res.json(user)
    }
}

export default new SessionController()
// não pode correr risco de alterar = const
// não vou usar em lugar nenhum mais dps = let