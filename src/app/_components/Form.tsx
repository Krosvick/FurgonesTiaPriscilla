import React from 'react';
import { FieldValues, UseFormReturn, FieldErrors } from 'react-hook-form';

interface FormProps<T extends FieldValues> {
    methods: UseFormReturn<T>;
    onSubmit: (data: T) => void;
    children: (methods: UseFormReturn<T>, formState: UseFormReturn<T>['formState']) => React.ReactNode;
    className?: string;
}

function Form<T extends FieldValues>({ methods, onSubmit, children, className }: FormProps<T>) {
    const onError = (errors: FieldErrors<T>) => {
        console.log(errors);
    }

    return (
        <form onSubmit={methods.handleSubmit(onSubmit, onError)} className={className}>
            {children(methods, methods.formState)}
        </form>
    );
}

export default Form;