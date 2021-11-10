import { Container } from "./styles";
import { Summary } from "../Summary";
import { Transactionstable } from '../Transactionstable'

export function Dashboard() {
    return (
        <Container>
            <Summary />
            <Transactionstable/>
        </Container>
    )
}