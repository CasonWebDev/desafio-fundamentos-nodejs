import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import Balance from '../models/Balance';
import Operation from '../factories/Operation';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(
    { title, value, type }: Request,
    balance: Balance,
  ): Transaction {
    const transaction = new Transaction({ title, value, type });
    const Calcule = Operation(type);

    const alteredBalance = new Calcule(balance, value);

    const createdTransaction = this.transactionsRepository.create(
      transaction,
      alteredBalance.calcular(),
    );
    return createdTransaction;
  }
}

export default CreateTransactionService;
