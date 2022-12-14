import { useState } from "react";
import { UseFormReset } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { RoutesEnum } from "../../constants/routesList";
import { ToastType } from "../../components/Snackbar/enumToast";

import { IFormBlockDTO } from "../../dtos/IBlockDTO";
import BlockService from "../../services/BlockService";
import { IGetBlocksDTOResponse } from "../../services/BlockService/dtos/IGetBlocksDTOResponse";
import { useToast } from "../useToast";
import { useLoading } from "../useLoading";

export function useBlock() {
  const { addToast } = useToast();
  const { loading, setLoading } = useLoading();
  const navigate = useNavigate();

  const blockService = new BlockService();

  const [blocksState, setBlocksState] = useState<IGetBlocksDTOResponse[]>([]);

  const onSubmit = async (
    dataForm: IFormBlockDTO,
    reset: UseFormReset<IFormBlockDTO>
  ) => {
    setLoading(true);

    try {
      if (dataForm.nome === dataForm.confirme_bloco) {
        await blockService.postBlock(dataForm);
        addToast("Bloco cadastrado com sucesso!", ToastType.success);
        navigate(RoutesEnum.ADMIN);
      } else {
        throw new Error("Blocos não coincidem");
      }
    } catch (error) {
      addToast("ERRO!", ToastType.error);
    } finally {
      setLoading(false);
      reset();
    }
  };

  const getBlocks = async () => {
    setLoading(true);

    try {
      const response = await blockService.getBlocks();
      setBlocksState(response);
    } catch (error) {
      addToast("Erro ao buscar dados de blocos", ToastType.error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    setLoading,
    onSubmit,
    blocksState,
    getBlocks,
  };
}
