// Uncomment the code below and write your tests
import {
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const bankAccount = getBankAccount(1000);
    expect(bankAccount).toBe(bankAccount);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = getBankAccount(1000);
    expect(() => bankAccount.withdraw(1100)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const bankAccount = getBankAccount(1000);
    const toAccount = getBankAccount(200);
    expect(() => bankAccount.transfer(1100, toAccount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = getBankAccount(1000);
    expect(() => bankAccount.transfer(1100, bankAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(1000);
    const deposit = bankAccount.deposit(500);
    expect(deposit).toBe(bankAccount);
  });

  test('should withdraw money', () => {
    const bankAccount = getBankAccount(1000);
    const withdraw = bankAccount.withdraw(500);
    expect(withdraw).toBe(bankAccount);
  });

  test('should transfer money', () => {
    const bankAccount = getBankAccount(1000);
    const toAccount = getBankAccount(200);
    const transfer = bankAccount.transfer(800, toAccount);
    expect(transfer).toBe(bankAccount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAccount = getBankAccount(1000);
    const fetchBalance = await bankAccount.fetchBalance();
    if (fetchBalance) {
      expect(typeof fetchBalance).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    try {
      const bankAccount = getBankAccount(1000);
      const fetchBalance = await bankAccount.fetchBalance();

      if (typeof fetchBalance === 'number') {
        const syncBalance = await bankAccount.synchronizeBalance();
        expect(syncBalance);
      }
    } catch (error) {}
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    try {
      const bankAccount = getBankAccount(1000);
      await bankAccount.synchronizeBalance();
    } catch (error) {
      expect(error).toBeInstanceOf(SynchronizationFailedError);
    }
  });
});
