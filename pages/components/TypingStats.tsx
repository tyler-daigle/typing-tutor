interface Props {
    stats: {
        totalWords: number;
        correctWords: number;
        wpm: number;    
    }
}

export default function TypingStats({stats}: Props) {
    return (
        <div>
            <h3>Stats</h3>
        </div>
    )
}