import React from 'react';

import { GiCoffeeCup } from 'react-icons/gi';
import { BsThreeDots } from 'react-icons/bs';

interface CategoryIconProps {
  categoryTitle: string;
  className ?: string;
}

const CategoryIcon: React.FC<CategoryIconProps> = ({ categoryTitle = 'Others', className }: CategoryIconProps) => {
  switch (categoryTitle) {
    case 'Others':
      return <BsThreeDots className={className} />;

    case 'Food':
      return <GiCoffeeCup className={className} />;

    default:
      return <BsThreeDots className={className} />;
  }
};

export default CategoryIcon;
