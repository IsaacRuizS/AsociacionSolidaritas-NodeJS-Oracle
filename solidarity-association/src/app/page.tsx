import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import SavingView from './saving/savingView';

export default async function SavingPage() {
    
    const cookieStore = await cookies();
    const token = cookieStore.get('authToken');

    if (!token) {
        redirect('/login');
    }

    return <SavingView />;
}
