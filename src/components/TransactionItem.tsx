interface TransactionItemProps {
  name: string;
  category: string;
  description: string;
  date: string;
  amount: string;
  amountColor: 'green' | 'red';
  icon: React.ReactNode;
}

export default function TransactionItem({ 
  name, 
  description, 
  date, 
  amount, 
  amountColor, 
  icon 
}: TransactionItemProps) {
  return (
    <div className="flex items-center py-3">
      <div className="mr-3 h-12 w-12 bg-[#BD434350] rounded-lg flex items-center justify-center">
        {icon}
      </div>
      
      <div className="flex-1">
        <p className="text-white font-medium">{description}</p>
        <p className="text-[#A0AEC0] text-sm">{new Date(date).toLocaleDateString('pt-BR')}</p>
      </div>
      
      <div className="text-right">
        <p className={`font-semibold text-lg ${
          amountColor === 'green' ? 'text-[#6EE7B7]' : 'text-[#EF4444]'
        }`}>
          {amount}
        </p>
      </div>
    </div>
  );
}
