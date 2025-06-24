import { useState, useEffect } from 'react';
import { supabase } from '../libs/supabase';

export const useSupabaseData = <T>(
  tableName: string,
  options?: {
    columns?: string;
    filter?: { column: string; value: any };
  }
) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        let query = supabase
          .from(tableName)
          .select(options?.columns || '*');
          
        if (options?.filter) {
          query = query.eq(options.filter.column, options.filter.value);
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        
        setData(data as T[]);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tableName, options?.columns, options?.filter]);

  return { data, loading, error };
}; 