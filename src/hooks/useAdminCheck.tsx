import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export function useAdminCheck() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        toast.error('Please login to access admin dashboard');
        navigate('/auth/login');
      } else if (!isAdmin) {
        toast.error('You do not have admin access');
        navigate('/');
      } else {
        setIsChecking(false);
      }
    }
  }, [user, isAdmin, loading, navigate]);

  return { isChecking: loading || isChecking };
}
