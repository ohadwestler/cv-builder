import { Box, TextField } from "@mui/material";

export interface FieldProps {
  label: string;
  multiline?: boolean;
  fieldKey: string;
  rows?: number;
  onChange: (value: string) => void;
  value: string;
}

const Field: React.FC<FieldProps> = ({
  label,
  multiline = false,
  rows,
  fieldKey,
  onChange,
  value,
}) => (
  <TextField
    key={fieldKey}
    label={label}
    multiline={multiline}
    rows={rows || 1}
    fullWidth
    margin="normal"
    value={value}
    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
  />
);

interface FormStepProps {
  fields: FieldProps[];
}

const FormStep: React.FC<FormStepProps> = ({ fields }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, px: 2 }}>
      <Box component="form" onSubmit={handleSubmit}>
        {fields.map((fieldProps, index: number) => (
          <Field key={index} {...fieldProps} />
        ))}
        
      </Box>
    </Box>
  );
};

export default FormStep;
