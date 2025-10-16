import { TransactionByCategory } from '@/types/dashboard';
import CategoryItem from './CategoryItem';

interface ExpensesByCategoryProps {
  transactionsByCategory: TransactionByCategory[];
}

export default function ExpensesByCategory({ transactionsByCategory }: ExpensesByCategoryProps) {
  // Cores para as categorias
  const categoryColors = [
    '#EF4444', // Red
    '#3B82F6', // Blue
    '#10B981', // Green
    '#8B5CF6', // Purple
    '#F59E0B', // Orange
    '#EC4899', // Pink
  ];

  // Filtrar apenas transações do tipo "expense" (gastos)
  const expenseTransactions = transactionsByCategory.filter(transaction => transaction.type === 'expense');

  // Agrupar transações por categoria e calcular totais
  const categoryTotals = expenseTransactions.reduce((acc, transaction) => {
    const categoryId = transaction.categoryId;
    const categoryName = transaction.categoryName;
    
    if (!acc[categoryId]) {
      acc[categoryId] = {
        name: categoryName,
        totalAmount: 0,
        transactionCount: 0,
        color: categoryColors[Object.keys(acc).length % categoryColors.length]
      };
    }
    
    acc[categoryId].totalAmount += transaction.amount;
    acc[categoryId].transactionCount += 1;
    
    return acc;
  }, {} as Record<string, {
    name: string;
    totalAmount: number;
    transactionCount: number;
    color: string;
  }>);

  // Calcular total geral para calcular percentuais
  const totalExpenses = Object.values(categoryTotals).reduce((sum, category) => sum + category.totalAmount, 0);

  // Converter para array e calcular percentuais
  const categoriesWithPercentages = Object.values(categoryTotals).map(category => ({
    ...category,
    percentage: totalExpenses > 0 ? Math.round((category.totalAmount / totalExpenses) * 100) : 0
  }));

  // Ordenar por valor total (maior primeiro)
  const sortedCategories = categoriesWithPercentages.sort((a, b) => b.totalAmount - a.totalAmount);

  return (
    <div className="px-4 bg-[#31375A] rounded-lg p-4 mt-8">
      <h2 className="text-white font-bold text-lg mb-4">Gastos por Categoria</h2>
      <div>
        {sortedCategories.map((category, index) => (
          <CategoryItem
            key={index}
            name={category.name}
            percentage={category.percentage}
            transactionCount={category.transactionCount}
            totalAmount={category.totalAmount}
            color={category.color}
          />
        ))}
      </div>
    </div>
  );
}
