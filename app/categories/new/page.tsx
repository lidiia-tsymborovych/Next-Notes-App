'use client';

import { CategoryForm } from '@/app/components/CategoryForm/CategoryForm';
import NavigationActions from '@/app/components/NavigationActions';

// import { useEffect, useState } from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import { HexColorPicker } from 'react-colorful';
// import {
//   categoryIconMap,
//   CategoryName,
//   defaultCategoryColors,
// } from '@/app/types/category';
// import { Note } from '@/app/types/note';

// export interface CategoryForm {
//   title: string;
//   bgColor: string;
//   iconColor: string;
//   notes: Note[];
// }

// type FormValues = {
//   title: string;
//   iconId: CategoryName;
//   bgColor: string;
//   iconColor: string;
// };

// export default function CategoryFormComponent({
//   onSubmit,
// }: {
//   onSubmit: (data: CategoryForm) => void;
// }) {
//   const {
//     register,
//     control,
//     watch,
//     setValue,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<FormValues>({
//     defaultValues: {
//       title: '',
//       iconId: 'work',
//       bgColor: defaultCategoryColors.work.bgColor,
//       iconColor: defaultCategoryColors.work.iconColor,
//     },
//   });

//   const [step, setStep] = useState<'initial' | 'bg' | 'icon' | 'done'>(
//     'initial'
//   );

//   const selectedIconId = watch('iconId');
//   const bgColor = watch('bgColor');
//   const iconColor = watch('iconColor');

//   // При зміні іконки скидаємо кольори до дефолтів і скидаємо крок назад
//   useEffect(() => {
//     const colors = defaultCategoryColors[selectedIconId];
//     if (colors) {
//       setValue('bgColor', colors.bgColor);
//       setValue('iconColor', colors.iconColor);
//     }
//     setStep('initial');
//   }, [selectedIconId, setValue]);

//   const IconComponent = categoryIconMap[selectedIconId];

//   const onNextIcon = () => setStep('icon');
//   const onFinishCustomization = () => setStep('done');

//   const onReset = () => {
//     reset({
//       title: '',
//       iconId: 'work',
//       bgColor: defaultCategoryColors.work.bgColor,
//       iconColor: defaultCategoryColors.work.iconColor,
//     });
//     setStep('initial');
//   };

//   const submitHandler = (data: FormValues) => {
//     onSubmit({
//       title: data.title,
//       bgColor: data.bgColor,
//       iconColor: data.iconColor,
//       notes: [],
//     });
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(submitHandler)}
//       className='max-w-md mx-auto p-6 space-y-6 bg-white rounded shadow'
//     >
//       {/* Title */}
//       <div>
//         <label className='block mb-1 font-semibold' htmlFor='title'>
//           Category title
//         </label>
//         <input
//           id='title'
//           {...register('title', { required: 'Category title is required' })}
//           className={`w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 ${
//             errors.title
//               ? 'border-red-500 focus:ring-red-500'
//               : 'focus:ring-blue-400'
//           }`}
//           placeholder='Enter category title'
//           disabled={step !== 'initial'}
//         />
//         {errors.title && (
//           <p className='text-red-500 text-sm mt-1'>{errors.title.message}</p>
//         )}
//       </div>

//       {/* Icon Select */}
//       <div>
//         <label className='block mb-1 font-semibold' htmlFor='iconId'>
//           Choose Icon
//         </label>
//         <select
//           id='iconId'
//           {...register('iconId')}
//           className='w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
//           disabled={step !== 'initial'}
//         >
//           {Object.keys(categoryIconMap).map(key => (
//             <option key={key} value={key}>
//               {key.charAt(0).toUpperCase() + key.slice(1)}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Customize & Pickers */}
//       {step === 'initial' && (
//         <button
//           type='button'
//           className='w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition'
//           onClick={() => {
//             if (!watch('title').trim()) {
//               alert('Please enter category title before customizing');
//               return;
//             }
//             setStep('bg');
//           }}
//         >
//           Customize
//         </button>
//       )}

//       {IconComponent && (
//         <div className='flex justify-center mt-4'>
//           <div
//             className='w-16 h-16 flex items-center justify-center rounded-full border'
//             style={{ backgroundColor: bgColor }}
//             aria-label='Live icon preview'
//           >
//             <IconComponent size={28} style={{ color: iconColor }} />
//           </div>
//         </div>
//       )}

//       {step === 'bg' && (
//         <div className='space-y-4'>
//           <Controller
//             name='bgColor'
//             control={control}
//             render={({ field }) => (
//               <div>
//                 <label className='block mb-1 font-semibold'>
//                   Background color
//                 </label>
//                 <HexColorPicker color={field.value} onChange={field.onChange} />
//                 <input
//                   type='text'
//                   value={field.value}
//                   onChange={e => field.onChange(e.target.value)}
//                   className='mt-1 w-full border rounded px-2 py-1'
//                   placeholder='#RRGGBB'
//                 />
//               </div>
//             )}
//           />
//           <button
//             type='button'
//             className='w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition'
//             onClick={onNextIcon}
//           >
//             Next
//           </button>
//         </div>
//       )}

//       {step === 'icon' && (
//         <div className='space-y-4'>
//           <Controller
//             name='iconColor'
//             control={control}
//             render={({ field }) => (
//               <div>
//                 <label className='block mb-1 font-semibold'>Icon color</label>
//                 <HexColorPicker color={field.value} onChange={field.onChange} />
//                 <input
//                   type='text'
//                   value={field.value}
//                   onChange={e => field.onChange(e.target.value)}
//                   className='mt-1 w-full border rounded px-2 py-1'
//                   placeholder='#RRGGBB'
//                 />
//               </div>
//             )}
//           />
//           <button
//             type='button'
//             className='w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition'
//             onClick={onFinishCustomization}
//           >
//             Finish Customization
//           </button>
//         </div>
//       )}

//       {/* Preview + Final submit */}
//       {step === 'done' && (
//         <>
//           <div className='flex items-center gap-4'>
//             {IconComponent && (
//               <div
//                 className='w-16 h-16 flex items-center justify-center rounded shadow'
//                 style={{ backgroundColor: bgColor }}
//                 aria-label='Category preview'
//               >
//                 <IconComponent size={24} style={{ color: iconColor }} />
//               </div>
//             )}
//             <div className='flex-1'>
//               <p>
//                 <b>Title:</b> {watch('title')}
//               </p>
//               <p>
//                 <b>Icon:</b>{' '}
//                 {selectedIconId.charAt(0).toUpperCase() +
//                   selectedIconId.slice(1)}
//               </p>
//               <p>
//                 <b>Background Color:</b> {bgColor}
//               </p>
//               <p>
//                 <b>Icon Color:</b> {iconColor}
//               </p>
//             </div>
//           </div>

//           <div className='flex gap-4 mt-4'>
//             <button
//               type='submit'
//               className='flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition'
//             >
//               Add Category
//             </button>
//             <button
//               type='button'
//               onClick={onReset}
//               className='flex-1 bg-gray-400 hover:bg-gray-500 text-white py-3 rounded-lg transition'
//             >
//               Reset
//             </button>
//           </div>
//         </>
//       )}
//     </form>
//   );
// }

export default function CategoryFormPage() {
  return (
    <main className='flex flex-col gap-8 min-h-screen relative'>
      <div className='flex flex-col gap-2 sm:gap-0 relative'>
        <NavigationActions />

        <h1 className='text-[24px] sm:text-[32px] md:text-[48px] lg:text-[56px] text-center text-[var(--foreground)] font-bold'>
          Create Your own Category
        </h1>
      </div>

      <CategoryForm />
    </main>
  );
}
