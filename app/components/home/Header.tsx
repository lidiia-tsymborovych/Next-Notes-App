import { useRouter } from 'next/navigation';
import { ArrowLeft, Home, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useUserStore } from '@/lib/store/user-store';

interface HeaderProps {
  isHomePage?: boolean;
}

export const Header = ({ isHomePage = false }: HeaderProps) => {
  const router = useRouter();
  const { user, logout, loading } = useUserStore();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const btnClass =
    'flex items-center gap-1 py-2 text-sm text-[#8c92c1] hover:text-[#6a61d2] transition-colors';

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        backdrop-blur-sm bg-white/30
        border-b border-white/20
        shadow-sm
        h-14
        flex justify-center
        items-center
      `}
    >
      <div className='w-full max-w-7xl px-4 sm:px-8 flex justify-between items-center'>
        {!isHomePage ? (
          <div className='flex items-center gap-4'>
            <button
              onClick={() => router.back()}
              className={btnClass}
              aria-label='Go back'
            >
              <ArrowLeft className='w-4 h-4' /> Back
            </button>
            <button
              onClick={() => router.push('/')}
              className={btnClass}
              aria-label='Go home'
            >
              <Home className='w-4 h-4' /> Home
            </button>
          </div>
        ) : (
          <div className='w-[120px]' />
        )}

        <div className='flex items-baseline gap-6'>
          {loading ? (
            <Loader2 className='animate-spin w-4 h-4 text-muted-foreground' />
          ) : user ? (
            <>
              <p className='text-sm text-[var(--foreground)] whitespace-nowrap flex items-baseline gap-1'>
                <span className='opacity-60 mr-1 hidden sm:inline'>
                  logged in as
                </span>
                <strong className='text-indigo-700 tracking-wide hidden shidden sm:inline text-xs'>
                  {user.name.toUpperCase()}
                </strong>
              </p>

              <Button
                size='sm'
                variant='outline'
                onClick={handleLogout}
                className='h-7 px-3 py-1 text-sm text-violet-600 border-violet-500 hover:bg-violet-50 hover:text-violet-700 transition-all duration-150'
              >
                <LogOut className='w-4 h-4 mr-1' /> Log out
              </Button>
            </>
          ) : (
            <p className='text-sm text-gray-500 italic opacity-60'>
              Not logged in 👻
            </p>
          )}
        </div>
      </div>
    </header>
  );
};
