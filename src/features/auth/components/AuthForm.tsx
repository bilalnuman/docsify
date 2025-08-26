import React, { type ReactNode } from 'react';
import { Controller } from 'react-hook-form';
import InputField from './InputField';
import Button from '../../../components/Button';

export type fieldsType = {
  name: string; label: string; type: string, icon?: ReactNode;
  iconPosition?: "left" | "right";
  placeholder?: string
}
interface AuthFormProps {
  fields: fieldsType[];
  errors: any;
  isSubmitting: boolean;
  control: any;
  onSubmit: () => void;
  buttonText?: string;
  formHeader?: ReactNode
  formFooter?: ReactNode,
  children?: ReactNode,
  className?: string
  enablePasswordToggle?: boolean,
}

const AuthForm: React.FC<AuthFormProps> = ({ fields, errors, isSubmitting, onSubmit, formHeader, formFooter, className, buttonText, control, children }) => {

  return (
    <div className={`bg-white dark:bg-[#1A1B20] sm:p-6 px-0 w-full ${className}`}>
      {formHeader && formHeader}
      <form onSubmit={onSubmit} className="">
        {fields.map((field) => (
          <Controller
            key={field.name}
            control={control}
            name={field.name}
            render={({ field: controllerField }) => (
              <InputField
                fieldMeta={field}
                {...controllerField}
                enablePasswordToggle={field.type === "password" ? true : false}
                label={field.label}
                type={field.type}
                error={errors[field.name]}
                icon={field?.icon}
                iconPosition={field?.iconPosition}
                placeholder={field.placeholder}

              />
            )}
          />
        ))}
        {formFooter && formFooter}
        {buttonText &&
          <Button
            type='submit'
            loading={isSubmitting}
            className='w-full h-11'
          >
            {buttonText}
          </Button>}
        {children}
      </form>
    </div>
  );
};

export default AuthForm;
