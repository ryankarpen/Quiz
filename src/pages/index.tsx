import styles from "@/styles/Home.module.css";
import QuestaoModel from "@/model/questao";
import { useEffect, useState } from "react";
import Questionario from "@/components/Questionario";
import { useRouter } from "next/router";


const BASE_URL = "https://quiznext.vercel.app/api"


export default function Home() {

  const router = useRouter()

  const [idsDasQuestoes, setIdsDasquestoes] = useState<number[]>([])
  const [questao, setQuestao] = useState<QuestaoModel>()
  const [respostasCertas, setRespostasCertas] = useState<number>(0)

  async function carregarIdsDasQuestoes(){
    const resp = await fetch(`${BASE_URL}/questionario`)
    const idsDasQuestoes = await resp.json()
    setIdsDasquestoes(idsDasQuestoes)
  }


  async function carregarQuestao(idQuestao: number){
    const resp = await fetch(`${BASE_URL}/questoes/${idQuestao}`)
    const json = await resp.json()
    const novaQuestao = QuestaoModel.criarUsandoObjeto(json) /* como foi criado como um método estático não precisamos instanciar um objeto para utilizá-lo */
    setQuestao(novaQuestao)
  }

  useEffect(() => {
    carregarIdsDasQuestoes() 
  }, [])


  useEffect(() => {
    idsDasQuestoes.length > 0 && carregarQuestao(idsDasQuestoes[0])
  }, [idsDasQuestoes])


  function questaoRespondida(questaoRespondida: QuestaoModel){
    setQuestao(questaoRespondida)
    const certa = questaoRespondida.acertou
    setRespostasCertas(respostasCertas + (certa ? 1 : 0))
  }

  
  function idProximaPergunta(){
      let id = 0
      if(questao){
        id = questao.id
      }
      const proximoIndice = idsDasQuestoes.indexOf(id) + 1
      return idsDasQuestoes[proximoIndice]
  }


  function irPraProximoPasso(){
    const proximoId = idProximaPergunta()
    proximoId ? irPraProximaQuestao(proximoId) : finalizar()
  }


  function irPraProximaQuestao(proximoId: number){
    carregarQuestao(proximoId)
  }


  function finalizar(){
    router.push({
      pathname: "/resultado",
      query: {
        total: idsDasQuestoes.length,
        certas: respostasCertas
      }
    })
  }


  return questao ? (
      <Questionario
        questao={questao}
        ultima={idProximaPergunta() === undefined}
        questaoRespondida={questaoRespondida}
        irPraProximoPasso={irPraProximoPasso}
      />
  ) : false 
}
      

