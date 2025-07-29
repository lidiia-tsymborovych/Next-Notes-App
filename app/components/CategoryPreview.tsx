// components/CategoryItemCard.tsx
import { categoryIconMap, CategoryWithoutId} from '@/app/types/category';

type Props = {
  category: CategoryWithoutId
  isSelected?: boolean;
  onClick?: () => void;
  isInteractive?: boolean; // якщо true — додаємо cursor, hover і т.д.
};

export default function CategoryItemCard({
  category,
  isSelected = false,
  onClick,
  isInteractive = false,
}: Props) {
  const Icon = categoryIconMap[category.iconName];

  const baseClasses =
    'flex flex-col items-center justify-center gap-2 p-4 rounded-lg border-2 transition-colors';

  const borderClasses = isInteractive
    ? isSelected
      ? 'border-indigo-400'
      : 'border-gray-300 hover:border-indigo-300 cursor-pointer'
    : 'border-gray-300';

  const Wrapper = isInteractive ? 'button' : 'div';

  return (
    <Wrapper
      onClick={onClick}
      className={`${baseClasses} ${borderClasses}`}
      style={{ backgroundColor: category.bgColor }}
      {...(isInteractive ? { type: 'button', 'aria-pressed': isSelected } : {})}
    >
      <Icon size={32} color={category.iconColor} />
      <span className='capitalize font-semibold'>{category.title}</span>
    </Wrapper>
  );
}
