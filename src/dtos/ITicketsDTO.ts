import { EnumStatus } from "../constants/enums";

export interface ITicketsDTO {
  id: number;
  solicitante_id: number;
  nome_solicitante: string;
  analista_id: number;
  local_id: number;
  nome_local: string;
  bloco_id: number;
  nome_bloco: string;
  status: EnumStatus;
  tipo: string;
  data: string;
}
