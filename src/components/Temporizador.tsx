import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import styles from '../styles/Temporizador.module.css'
interface TemporizadorProps{
    // o atributo key será usado como identificador único de cada questão, para que reinicie a contagem sempre que mudar 
    key: any
    duracao: number
    tempoEsgotado: () => void
}


export default function Temporizador(props: TemporizadorProps){
    return(
        <div className={styles.temporizador}>
            <CountdownCircleTimer 
                duration={props.duracao}
                size={120}
                isPlaying
                onComplete={props.tempoEsgotado}
                colors={["#BCE596","#F7B801","#ED827A"]}
                colorsTime={[6, 3, 0]}
            >
                {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
        </div>
    )
}