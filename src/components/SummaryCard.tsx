interface SummaryCardProps {
  title: string;
  value: string;
  percentage: string;
  percentageColor: 'green' | 'red';
  icon: React.ReactNode;
  bgColor: string;
}

export default function SummaryCard({ 
  title, 
  value, 
  percentage, 
  percentageColor, 
  icon, 
  bgColor 
}: SummaryCardProps) {
  return (
    <div className={`${bgColor} rounded-xl p-4 relative`}>
      <div className="absolute top-4 right-4">
        {icon}
      </div>
      
      <div className="mb-2">
        <h3 className="text-white text-base font-medium">{title}</h3>
      </div>
      
      <div className="mb-2">
        <p className="text-white text-3xl font-bold">{value}</p>
      </div>
      
      <div>
        <p className={`text-sm ${
          percentageColor === 'green' ? 'text-[#6EE7B7]' : 'text-[#EF4444]'
        }`}>
          {percentage}
        </p>
      </div>
    </div>
  );
}
