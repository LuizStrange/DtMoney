import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../servers/api";

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>; // Ele pega os que quero e retira os que nao quero
// type TransactionInput = Pick<Transaction, 'title' | 'amount' |'type' >; pega apenas os escolhidos por mim para exercutar no comando

interface TransactionsProviderProps {
    children: ReactNode;
}

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction:(Transaction: TransactionInput) => Promise<void>;
}

export const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData // basicamente fala ao typescript: | "faz parte sim, seus trouxas." |
    );

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    useEffect(() => {
        api.get('transactions')
        .then(response => setTransactions(response.data.transactions))
    }, []);

    async function createTransaction(transactionInput: TransactionInput) {
        const response = await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date(),
        })

        const { transaction } = response.data;

        setTransactions([
            ...transactions, // cria um novo vetor e adicionar os que ja existe
            transaction,
        ]);


    }

    return (
        <TransactionsContext.Provider value={{ transactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    );
}

export function useTransactions() {
    const context = useContext(TransactionsContext);

    return context;
}