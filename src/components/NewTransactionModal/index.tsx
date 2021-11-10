import Modal from 'react-modal';
import closeimg from '../../assets/close.svg';
import incomeimg from '../../assets/join.svg';
import outcomeimg from '../../assets/exit.svg';
import { Container, TransactionTypeContainer, RadioBox } from './styles';
import { FormEvent, useState } from 'react';
import { TransactionsContext, useTransactions } from '../../hooks/useTransactions';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose:  () => void;
}

export function NewTransactionModal({isOpen, onRequestClose }: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('deposit');

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault()

    await createTransaction({
      title,
      amount,
      category,
      type,
    })

    setTitle('');
    setAmount(0);
    setCategory('');
    setType('deposit');
    onRequestClose();
  }
    return (
        <Modal 
          isOpen={isOpen} 
          onRequestClose={onRequestClose}
          overlayClassName="react-modal-overlay"
          ariaHideApp={false}
          className="react-modal-content"
        >
          <button 
            type="button" 
            onClick={onRequestClose}
            className="react-modal-close"
            >
              <img src={closeimg} alt="Fechar modal" />
           </button>
              <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar transação</h2>

                <input 
                  placeholder="titulo"
                  value={title}
                  onChange={event => setTitle(event.target.value)}
                 />

                <input 
                  type="number" 
                  placeholder="Valor" 
                  value={amount}
                  onChange={event => setAmount(Number(event.target.value))}
                />

                <TransactionTypeContainer>
                  <RadioBox
                    type="button"
                    onClick={() => { setType('deposit');}}
                    isActive={type === "deposit"}
                    activeColor="green"
                  >
                    <img src={incomeimg} alt="entrada" />
                    <span>entrada</span>
                  </RadioBox>
                  <RadioBox
                    type="button"
                    onClick={() => { setType('withdraw');}}
                    isActive={type === "withdraw"}
                    activeColor="red"
                  >
                    <img src={outcomeimg} alt="saida" />
                    <span>Saída</span>
                  </RadioBox>
                </TransactionTypeContainer>

                <input 
                  placeholder="Categoria" 
                  value={category}
                  onChange={event => setCategory(event.target.value)}
                />

                <button type="submit">Cadastrar</button>
                </Container>
      </Modal>
    )
}