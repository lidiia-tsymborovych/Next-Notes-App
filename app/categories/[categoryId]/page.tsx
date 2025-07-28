// 'use client';

// import { useParams } from 'next/navigation';
// import { mockCategories } from '@/lib/getAvailableCategorySuggestions';
// import NoteCard from '@/app/components/NoteCard';
// import NavigationActions from '@/app/components/NavigationActions';

// export default function CategoryNotesPage() {
// const params = useParams();
// const rawCategoryId = params.categoryId;
// const categoryId = Array.isArray(rawCategoryId)
//   ? rawCategoryId[0]
//   : rawCategoryId;

// if (!categoryId) {
//   return <p className='p-6 text-center'>Invalid category</p>;
// }

// const category = mockCategories.find(cat => cat.id === categoryId);

// if (!category) {
//   return <p className='p-6 text-center'>Category not found</p>;
// }

//   return (
//     <main className='flex flex-col gap-6 sm:gap-16 min-h-screen relative'>
//       <div className='flex flex-col gap-2 sm:gap-0 relative'>
//         <div className='absolute top-0 left-0'>
//           <NavigationActions />
//         </div>

//         <h1 className='text-[24px] sm:text-[32px] md:text-[48px] lg:text-[56px] text-center text-[var(--foreground)] font-bold'>
//           {category.name} Notes
//         </h1>
//       </div>

//       {category.notes.length === 0 ? (
//         <p className='text-center text-gray-500 text-lg px-4 sm:px-6'>
//           No notes in this category yet
//         </p>
//       ) : (
//         <div className='flex flex-col gap-4 max-w-260 self-center'>
//           {category.notes.map(note => (
//             <NoteCard
//               key={note.id}
//               note={note}
//               categoryId={categoryId}
//               onEdit={note => {
//                 console.log('Edit note:', note);
//               }}
//               onDelete={id => {
//                 console.log('Delete note ID:', id);
//               }}
//             />
//           ))}
//         </div>
//       )}
//     </main>
//   );
// }
