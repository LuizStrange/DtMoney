import { Container } from "./styles";
import entradaimg from '../../assets/join.svg'
import saidaimg from '../../assets/exit.svg'
import totalimg from '../../assets/Total.svg'
import { useTransactions } from "../../hooks/useTransactions";

export function Summary() {
    const { transactions } = useTransactions();

    const summary = transactions.reduce((acc, transaction) => {
        if(transaction.type === 'deposit') {
            acc.deposits += transaction.amount;
            acc.total += transaction.amount;
        } else {
            acc.withdraws += transaction.amount;
            acc.total -= transaction.amount;
        }

        return acc;
    }, {
        deposits: 0,
        withdraws: 0,
        total: 0,
    })
    return (
        <Container>
            <div>
                <header>
                    <p>Entrada</p>
                    <img src={entradaimg} alt="Entrada" />
                </header>
                <strong>R$ {summary.deposits}</strong>
            </div>
            <div>
                <header>
                    <p>Saída</p>
                    <img src={saidaimg} alt="saida" />
                </header>
                <strong>R$ -{summary.withdraws}</strong>
            </div>
            <div className="heighlight-background">
                <header>
                    <p>Total</p>
                    <img src={totalimg} alt="total" />
                </header>
                <strong>R$ {summary.total}</strong>
            </div>
        </Container>
    )
}