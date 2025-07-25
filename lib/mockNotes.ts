export type Note = {
  id: string;
  title: string;
  date: string;
  preview: string;
  content: string;
};

export const mockNotes: Note[] = [
  {
    id: '1',
    title: 'My first note',
    date: '2025-07-20',
    preview:
      'This is the content of the first note. It has multiple lines and maybe even some formatting.',
    content: `This is the content of the first note. 
It has multiple lines and maybe even some formatting. 
Imagine this being a Markdown or longform note.`,
  },
  {
    id: '2',
    title: 'Grocery list',
    date: '2025-07-24',
    preview:
      'Milk, Bread, Eggs, Cheese, Bananas... And don’t forget to buy chocolate! 🍫',
    content: `- Milk
- Bread
- Eggs
- Cheese
- Bananas

And don’t forget to buy chocolate! 🍫`,
  },
  {
    id: '3',
    title: 'Meeting notes',
    date: '2025-07-23',
    preview: 'Today we discussed the frontend migration plan with key points.',
    content: `Today we discussed the frontend migration plan.

Key points:
- Move to Next.js 15
- Migrate styles to Tailwind
- Refactor state logic with Zustand`,
  },
];
