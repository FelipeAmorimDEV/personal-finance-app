interface CategoryItemProps {
  name: string;
  percentage: number;
  transactionCount: number;
  totalAmount: number;
  color: string;
}

export default function CategoryItem({ 
  name, 
  percentage, 
  transactionCount, 
  totalAmount, 
  color 
}: CategoryItemProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="mb-4">
      {/* Category Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: color }}
          />
          <span className="text-white font-medium text-sm">{name}</span>
        </div>
        <span className="text-white font-medium text-sm">{percentage}%</span>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-[#303452] rounded-full h-2 mb-2">
        <div 
          className="h-2 rounded-full" 
          style={{ 
            backgroundColor: color, 
            width: `${percentage}%` 
          }}
        />
      </div>
      
      {/* Transaction Info */}
      <div className="flex justify-between items-center">
        <span className="text-white text-xs">
          {transactionCount} transaç{transactionCount !== 1 ? 'ões' : 'ão'}
        </span>
        <span className="text-[#34D399] font-semibold text-sm">
          {formatCurrency(totalAmount)}
        </span>
      </div>
    </div>
  );
}
