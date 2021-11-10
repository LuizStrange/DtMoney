import { Globalstyle } from "./styles/global";
import { Header } from './components/header/index'
import { Dashboard } from './components/Dashboard'
import { useState } from "react";
import { NewTransactionModal } from './components/NewTransactionModal';
 import { TransactionsProvider } from './hooks/useTransactions';

export function App() {
  const [ isNewTransactionModalOpen, setisNewTransactionModalOpen] = useState(false);

    function handleOpenisTransactionModal() {
        setisNewTransactionModalOpen(true);
    }

    function handleCloseisTransactionModal() {
        setisNewTransactionModalOpen(false);
    }

  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenisTransactionModal}/>
      <Dashboard />
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseisTransactionModal}
      />
      <Globalstyle />
    </TransactionsProvider>
  )
}
