import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import FormStep from '@/components/UserCvForm/Form';
import { Field } from '@/components/UserCvForm/stpes';
import { updateField } from '@/redux/cvFormSlice';
import { PersonalDetails } from '@/redux/cvFormSlice';

interface FieldsFormProps {
  fields: Field[];
}

const FieldsForm: React.FC<FieldsFormProps> = ({ fields }) => {
  const dispatch = useDispatch();
  const {personalDetails} = useSelector((state: RootState) => state.form); // replace "form" with your actual slice name in rootReducer

  const handleFieldChange = (fieldKey: keyof PersonalDetails, value: string) => {
    dispatch(updateField({ field: fieldKey, value }));
  };

  const renderedFields = fields.map((field) => ({
    ...field,
    onChange: (value: string) => handleFieldChange(field.fieldKey as keyof PersonalDetails, value),
    multiline: Boolean(field.multiline),
    value: personalDetails[field.fieldKey as keyof PersonalDetails] || '',
  }));

  return <FormStep fields={renderedFields} />;
};

export default FieldsForm;
