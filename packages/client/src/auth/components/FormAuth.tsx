import { useForm } from "react-hook-form";
import { useMutationLogin } from "../stores/useMutationAuth";
import { useCallback } from "react";

const FormAuth = () => {
    const { 
        register, 
        handleSubmit,
        formState: { errors }
     } = useForm();

     const login = useMutationLogin();

     const onSubmit = useCallback(
        async (submitData: any) => {
            try {
                await login.mutateAsync({
                    username: submitData.username,
                    password: submitData.password,
                });
            } catch (error) {
                console.error(error);
                alert('로그인에 실패했습니다.');
            }
        },
        [login]
     )
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-2">
            <input 
                {...register('username', { required: true })} 
                id="username"
                placeholder="Username"
                type="text"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.username && <span>This field is required</span>}
        </div>
        
        <div className="mt-2">
            <input 
                {...register('password', { required: true })}
                id="password"
                placeholder="Password"
                type="password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.password && <span>This field is required</span>}
        </div>
        
        <button type="submit">Submit</button>
        </form>
    );
}

export default FormAuth;