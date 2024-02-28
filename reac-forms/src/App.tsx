import './styles/global.css';
import { useState } from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

const createUserFormSchema = z.object({
  name: z.string()
  .nonempty('O nome é obrigatório')
  .transform(name => name.toUpperCase()),
  email: z.string().email().nonempty('O email é obrigatório').email('Formato de email invalido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

type createUserFormData = z.infer<typeof createUserFormSchema>;

function App() {

  const [output, setOutput] = useState('');
  const {
    register, 
    handleSubmit, 
    formState: {errors}
  } = useForm<createUserFormData>(
    {
      resolver: zodResolver(createUserFormSchema),
    }
  );

  // console.log(formState);

  function createUser(data: any) {
    setOutput(JSON.stringify(data, null, 2));
    console.log(data);
  }

  return (
    <main className="h-screen border-zinc-600 shadow-sm flex items-center justify-center flex-col gap-10">
      <form 
      onSubmit={handleSubmit(createUser)}
      className='flex flex-col gap-4 w-full max-w-xs px-3'>
        
        <div className='flex flex-col gap-1'>
          <label htmlFor='name'>Name</label>
          <input 
          type='name' 
          className='border border-zinc-200 shadow-sm rounded h-10'
          {...register('name')}
          />
          {errors.name && <span className='text-rose-600'>{errors.name.message}</span>}
        </div>
        
        <div className='flex flex-col gap-1'>
          <label htmlFor='email'>E-mail</label>
          <input 
          type='email' 
          className='border border-zinc-200 shadow-sm rounded h-10'
          {...register('email')}
          />
          {errors.email && <span className='text-rose-600'>{errors.email.message}</span>}
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor='password'>Password</label>
          <input 
          type='password' 
          className='border border-zinc-200 shadow-sm rounded h-10'
          {...register('password')}
          />
        {errors.password && <span className='text-rose-600'>{errors.password.message}</span>}
        </div>
        
        <button 
        type='submit'
        className='bg-rose-600 rounded font-semibold text-white h-10 hover:bg-emerald-600 transition-colors duration-1000 w-full'
        >
          Salvar</button>
      </form>
      <pre>
        {output}
      </pre>
      </main>
  );
}

export default App;
