import Transaction from '../models/Transaction';
import Balance from '../models/Balance';

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface TransactionReturn {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };
  }

  public all(): TransactionReturn {
    return {
      transactions: this.transactions,
      balance: this.balance,
    };
  }

  public getBalance(): Balance {
    return this.balance;
  }

  public create(
    { title, value, type }: TransactionDTO,
    balance: Balance,
  ): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);
    this.balance = balance;

    return transaction;
  }
}

export default TransactionsRepository;
