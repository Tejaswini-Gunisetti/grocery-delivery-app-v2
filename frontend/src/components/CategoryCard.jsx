import React from 'react';

const CategoryCard = ({ category, onClick }) => {
  return (
    <div 
      className="flex flex-col items-center justify-center p-5 rounded-2xl cursor-pointer transition-transform hover:-translate-y-1.5 bg-[#e8f5e9]"
      onClick={onClick}
    >
      <div className="w-20 h-20 rounded-full overflow-hidden mb-3.5">
        <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
      </div>
      <p className="font-medium text-[14px] text-center text-gray-800">{category.name}</p>
    </div>
  );
};

export default CategoryCard;
