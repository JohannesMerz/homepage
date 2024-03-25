import styled from 'styled-components';

const Box = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`;

const Label = styled.div`
  text-align: right;
  width: 40%;
`;

const Input = styled.input`
  width: 60%;
  background-color: white;
  margin: 5px;
  padding: 5px 10px;
  border-radius: 6px;
  border: 2px solid var(--colorPrimary);
`;

export function Field({ className, label, value, onChange, type }) {
  return (
    <Box className={className}>
      <Label>{label}</Label>
      <Input value={value} onChange={onChange} type={type}></Input>
    </Box>
  );
}
