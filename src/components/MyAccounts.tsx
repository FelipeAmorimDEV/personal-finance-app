import { Account } from '@/types/dashboard';
import AccountCard from './AccountCard';

interface MyAccountsProps {
  accounts: Account[];
}

export default function MyAccounts({ accounts }: MyAccountsProps) {
  return (
    <div className="mb-8">
      <h2 className="text-white font-bold text-lg mb-4">Minhas Contas</h2>
      <div className="space-y-3">
        {accounts.map((account) => (
          <AccountCard
            key={account.id}
            name={account.name}
            balance={account.balance}
          />
        ))}
      </div>
    </div>
  );
}
