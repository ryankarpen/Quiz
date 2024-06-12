import Estatistica from '@/components/Estatística'
import styles from '../styles/Resultado.module.css'
import { useRouter } from "next/router"
import Botao from '@/components/Botao'

export default function Resultado(){

    const router = useRouter()

    let total, certas, percentual = 0
    

    if(router.query.total != undefined && router.query.certas != undefined){
        total = +router.query.total
        certas = +router.query.certas
        percentual = Math.round((certas / total) * 100)
    }

    
    return(
        <div className={styles.resultado}>
            <h1>Resultado Final</h1>
            <div style={{display: "flex"}}>
                <Estatistica texto="Perguntas" valor={total}/>
                <Estatistica texto="Certas" valor={certas} corFundo="#9CD2A4"/>
                <Estatistica texto="Percentual" valor={`${percentual}%`} corFundo="#DE6A33"/>
            </div>
            <Botao  href="/" texto='Tentar Novamente'/>
        </div>
    )
}