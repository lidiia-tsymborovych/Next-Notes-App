import NoteList from "./NoteList";

export default function NotesPage() {
    return (
      <main className='p-6'>
        <h1 className='mb-4'>Your Notes</h1>
        <NoteList />
      </main>
    );
}