import { Control, Controller } from "react-hook-form";
import {
  Asterisco,
  Container,
  ContainerLabel,
  Label,
  StyledTextArea,
} from "./styles";

interface TextAreaProps {
  label?: string;
  required?: boolean;
  placeholder?: string;
  labelColum?: string;
  name?: string;
  control?: Control<any>;
  disabled?: boolean;
}

export function TextArea({
  label,
  required,
  placeholder,
  labelColum,
  name,
  control,
  disabled,
  ...rest
}: TextAreaProps) {
  return (
    <Container isRow={!!label} {...rest}>
      {label && (
        <ContainerLabel>
          <Label>{label}</Label>
          {required && <Asterisco>*</Asterisco>}
        </ContainerLabel>
      )}

      {labelColum && (
        <ContainerLabel>
          <Label>{labelColum}</Label>
          {required && <Asterisco>*</Asterisco>}
        </ContainerLabel>
      )}

      {control ? (
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <StyledTextArea
              onChange={onChange}
              value={value}
              placeholder={placeholder}
              disabled={disabled}
            />
          )}
        />
      ) : (
        <StyledTextArea placeholder={placeholder} disabled={disabled} />
      )}
    </Container>
  );
}
