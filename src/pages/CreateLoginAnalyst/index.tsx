import { useForm } from "react-hook-form";

import { Buttons, Form, Main, FormRight } from "./styles";

import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import Tooltip from "@mui/material/Tooltip";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import { RoutesEnum } from "../../constants/routesList";
import { fieldsLogin, IFormLogin, schemaLogin } from "../../dtos/ILoginDTO";
import { Loading } from "../../components/Loading";
import { useLoginAnalyst } from "../../hooks/network/useLoginAnalyst";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import {
  fieldsRegisterAnalyst,
  IFormRegisterAnalyst,
  schemaRegisterAnalyst,
} from "../../dtos/IRegisterAnalystDTO";

export function CreateLoginAnalystc() {
  const formIdLogin = "form-login";
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<IFormLogin>({
    // resolver: yupResolver(schemaLogin),
    defaultValues: {
      [fieldsLogin.EMAIL]: "",
      [fieldsLogin.PASSWORD]: "",
    },
  });

  const formIdRegisterAnalyst = "form-register-analyst";
  const {
    handleSubmit: handleSubmitRegister,
    control: controlRegister,
    formState: { isValid: isValidRegister },
  } = useForm<IFormRegisterAnalyst>({
    // resolver: yupResolver(schemaRegisterAnalyst),
    defaultValues: {
      [fieldsRegisterAnalyst.SETOR]: "",
      [fieldsRegisterAnalyst.MATRICULA]: "",
      [fieldsRegisterAnalyst.NOME]: "",
      [fieldsRegisterAnalyst.EMAIL]: "",
      [fieldsRegisterAnalyst.SENHA]: "",
      [fieldsRegisterAnalyst.CONFIRMAR_SENHA]: "",
    },
  });

  const navigate = useNavigate();

  const { loading, onSubmitRegisterAnalyst, onSubmitLogin, setLoading } =
    useLoginAnalyst();

  return (
    <>
      <Loading open={loading} handleClose={() => setLoading(false)} />
      <Header typeScreen="loginAnalyst" />
      <Main>
        <Form
          key={formIdLogin}
          id={formIdLogin}
          onSubmit={handleSubmit((data: IFormLogin) => onSubmitLogin(data))}
        >
          <Input
            labelColum="Email"
            type="email"
            required
            placeholder="Digite seu email"
            name={fieldsLogin.EMAIL}
            control={control}
          />
          <Input
            labelColum="Senha"
            type="password"
            required
            placeholder="Digite sua senha"
            name={fieldsLogin.PASSWORD}
            control={control}
          />
          <Button type="submit" form={formIdLogin} disabled={!isValid}>
            Entrar
          </Button>
        </Form>

        <FormRight
          key={formIdRegisterAnalyst}
          id={formIdRegisterAnalyst}
          onSubmit={handleSubmitRegister((data: IFormRegisterAnalyst) => {
            console.log("eitaaaaa");
            onSubmitRegisterAnalyst(data);
          })}
        >
          <Select
            label="Setor Responsável"
            required
            options={["Manutenção TI", "Manutenção Elétrica"]}
            name={fieldsRegisterAnalyst.SETOR}
            control={controlRegister}
          />
          <Input
            label="Matrícula"
            required
            mask="9999999999"
            name={fieldsRegisterAnalyst.MATRICULA}
            control={controlRegister}
          />
          <Input
            label="Nome completo"
            required
            name={fieldsRegisterAnalyst.NOME}
            control={controlRegister}
          />
          <Input
            label="Email"
            type="email"
            required
            name={fieldsRegisterAnalyst.EMAIL}
            control={controlRegister}
          />
          <Input
            label="Senha"
            type="password"
            required
            name={fieldsRegisterAnalyst.SENHA}
            control={controlRegister}
          />
          <Input
            label="Confirmar senha"
            type="password"
            required
            name={fieldsRegisterAnalyst.CONFIRMAR_SENHA}
            control={controlRegister}
          />
          <Buttons>
            <Button
              type="submit"
              form={formIdRegisterAnalyst}
              // disabled={!isValidRegister}
            >
              Registrar
            </Button>
            <Button onClick={() => navigate(RoutesEnum.LOGIN)} type="button">
              Cancelar
            </Button>
          </Buttons>
        </FormRight>
      </Main>
      <Footer>
        <Tooltip title="Caso não tenha um número de matrícula, você deve entrar em contato com o Administrador do Sistema para que crie sua matrícula. Você pode entrar em contato com o Administrador pelo email: yasmin.carvalho@unifei.edu.br ou telefone: (35)984128112">
          <ContactSupportIcon fontSize="large" />
        </Tooltip>
      </Footer>
    </>
  );
}
