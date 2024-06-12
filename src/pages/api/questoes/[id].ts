import type { NextApiRequest, NextApiResponse } from "next";
import questoes from "../bancoDeQuestoes";


export default function handler(
    req: NextApiRequest, 
    res: NextApiResponse
){

   let idSelecionado = req.query.id
   let id: number = 0


   if (typeof idSelecionado === "string"){
     id = parseInt(idSelecionado)
   }
   

   const unicaQuestaoOuNada =  questoes.filter(questao => questao.id === id)



   if(unicaQuestaoOuNada.length === 1){

        const questaoSelecionada = unicaQuestaoOuNada[0].embaralharRespostas()
        res.status(200).json(questaoSelecionada.paraObjeto())

   } else{

        res.status(404).send("Questão não encontrada")
   }

}