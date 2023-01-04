import { useState } from "react";
import { ToastType } from "../../components/Snackbar/enumToast";
import { EnumStatus } from "../../constants/enums";
import { useLoading } from "../../contexts/LoadingContext";
import { useToast } from "../../contexts/ToastContext";
import { IFormRegisterTicket } from "../../dtos/IRegisterTicketDTO";
import { ITicketsDTO } from "../../dtos/ITicketsDTO";
import TicketsService from "../../services/TicketsService";

export function useTicket() {
  const { addToast } = useToast();
  const { loading, setLoading } = useLoading();

  const ticketsService = new TicketsService();

  const [allTickets, setAllTickets] = useState<ITicketsDTO[]>([]);

  const onSubmitRegisterTicket = (dataForm: IFormRegisterTicket) => {
    setLoading(true);

    setTimeout(() => {
      alert(JSON.stringify(dataForm));
      addToast("Ticket criado com sucesso!", ToastType.success);
      setLoading(false);
    }, 2500);
  };

  const getUnsolvedTickets = async () => {
    setLoading(true);
    try {
      const response = await ticketsService.getTickets();
      setAllTickets(
        response.filter(
          (item) =>
            item.status === EnumStatus.Inicializado ||
            item.status === EnumStatus.Andamento
        )
      );
    } catch (error) {
      addToast("Falha ao buscar dados de tickets", ToastType.error);
    } finally {
      setLoading(false);
    }
  };

  const getResolvedTickets = async () => {
    setLoading(true);
    try {
      const response = await ticketsService.getTickets();
      setAllTickets(
        response.filter(
          (item) =>
            item.status === EnumStatus.Finalizado ||
            item.status === EnumStatus.Cancelado
        )
      );
    } catch (error) {
      addToast("Falha ao buscar dados de tickets", ToastType.error);
    } finally {
      setLoading(false);
    }
  };

  const getTicketsAll = async () => {
    setLoading(true);
    try {
      const response = await ticketsService.getTickets();
      setAllTickets(response);
    } catch (error) {
      addToast("Falha ao buscar dados de tickets", ToastType.error);
    } finally {
      setLoading(false);
    }
  };

  const putTicket = async (
    { analista_id, status, id }: ITicketsDTO,
    isGetTicket: "resolved" | "unsolved" | "all"
  ) => {
    setLoading(true);
    try {
      await ticketsService.putTickets({ analista_id, status, ticket_id: id });
      addToast("Ticket atualizado com sucesso!", ToastType.success);

      if (isGetTicket === "all") {
        await getTicketsAll();
      } else if (isGetTicket === "resolved") {
        await getResolvedTickets();
      } else {
        await getUnsolvedTickets();
      }
    } catch (error) {
      addToast(`Erro ao atualizar ticket!`, ToastType.error);
    }

    setLoading(false);
  };

  return {
    loading,
    setLoading,
    onSubmitRegisterTicket,
    getUnsolvedTickets,
    getResolvedTickets,
    getTicketsAll,
    putTicket,
    allTickets,
  };
}
