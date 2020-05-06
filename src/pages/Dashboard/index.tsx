import React, { useState, useEffect } from 'react';

import { FiChevronDown } from 'react-icons/fi';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import CategoryIcon from '../../components/CategoryIcon';

import formatValue from '../../utils/formatValue';
import formatDate from '../../utils/formatDate';

import { Container, CardContainer, Card, TableContainer } from './styles';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface Balance {
  income: string;
  outcome: string;
  total: string;
}

interface ResponseDTO {
  transactions: Transaction[];
  balance: Balance;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const response = await api.get<ResponseDTO>('transactions');

      const formattedTransactions: Transaction[] = response.data.transactions.map(transaction => {
        const formatted: Transaction = {
          ...transaction,
          formattedDate: formatDate(transaction.created_at),
          formattedValue: formatValue(transaction.value),
        };
        return formatted;
      })

      const formattedBalance: Balance = {
        income: formatValue(parseInt(response.data.balance.income)),
        outcome: formatValue(parseInt(response.data.balance.outcome)),
        total: formatValue(parseInt(response.data.balance.total)),
      }

      setTransactions(formattedTransactions);
      setBalance(formattedBalance);
    }

    loadTransactions();
  },[]);

  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">{balance.income}</h1>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">{balance.outcome}</h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">{balance.total}</h1>
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>
                  Título
                  <FiChevronDown className={'react-icons'}/>
                </th>
                <th>
                  Preço
                  <FiChevronDown className={'react-icons'}/>
                </th>
                <th>
                  Categoria
                  <FiChevronDown className={'react-icons'}/>
                </th>
                <th>
                  Data
                  <FiChevronDown className={'react-icons'}/>
                </th>
              </tr>
            </thead>

            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.id}>
                <td className="title">{transaction.title}</td>
                {transaction.type === 'income'
                  ? <td className="income">{transaction.formattedValue} </td>
                  : <td className="outcome">- {transaction.formattedValue} </td>}
                <td>
                  <CategoryIcon categoryTitle={transaction.category.title} className={'react-icons'}/>
                  {transaction.category.title} </td>
                <td> {transaction.formattedDate} </td>
              </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
