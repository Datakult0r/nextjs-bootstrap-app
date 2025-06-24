# Supabase Integration Guide

## Setup

1. Create a Supabase account at [supabase.com](https://supabase.com) if you don't have one already.
2. Create a new project in Supabase.
3. Get your project URL and anon key from the API settings page.
4. Update the `.env.local` file with your credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_project_anon_key
   ```

## Usage

### Fetching Data

Use the `useSupabaseData` hook to fetch data from Supabase:

```tsx
import { useSupabaseData } from '../hooks/useSupabase';

interface User {
  id: number;
  name: string;
  email: string;
}

const UserList = () => {
  const { data: users, loading, error } = useSupabaseData<User>('users');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name} - {user.email}</div>
      ))}
    </div>
  );
};
```

### Direct API Access

You can also use the Supabase client directly:

```tsx
import { supabase } from '../libs/supabase';

// Insert data
const { data, error } = await supabase
  .from('table_name')
  .insert({ column: 'value' });

// Update data
const { data, error } = await supabase
  .from('table_name')
  .update({ column: 'new_value' })
  .eq('id', 1);

// Delete data
const { data, error } = await supabase
  .from('table_name')
  .delete()
  .eq('id', 1);
```

## Authentication

To implement authentication:

```tsx
// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'example@email.com',
  password: 'password'
});

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'example@email.com',
  password: 'password'
});

// Sign out
const { error } = await supabase.auth.signOut();
```

## Storage

Working with Supabase Storage:

```tsx
// Upload file
const { data, error } = await supabase.storage
  .from('bucket_name')
  .upload('file_path', file);

// Download file
const { data, error } = await supabase.storage
  .from('bucket_name')
  .download('file_path');
``` 