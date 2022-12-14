import { useEffect } from "react";
import { CollapseConversation } from "../../../../components/CollapseConversation";
import { _renderBasicTextCell } from "../../../../components/RendersCellTable";
import TableApp from "../../../../components/Table/TableApp";
import { ITypeComponents } from "../../../../components/Table/types";
import { TabContainer } from "../../../../components/Tabs/styles";
import { ITicketsDTO } from "../../../../dtos/ITicketsDTO";
import { useMessage } from "../../../../hooks/network/useMessage";
import { useTicket } from "../../../../hooks/network/useTicket";
import { useAuth } from "../../../../hooks/useAuth";
import {
  arrayRenderInputSearch,
  columnConfig,
  columnLabel,
  columnType,
} from "./constants";

export function MyTicketsTab() {
  const { getTicketsAll, allTickets, loading } = useTicket();
  const { id } = useAuth();
  const { getMessages, messagesState, loadingMessage } = useMessage();

  useEffect(() => {
    getTicketsAll(id);
  }, []);

  const components: ITypeComponents = {
    [columnType.NAME]: _renderBasicTextCell,
    [columnType.BLOCK]: _renderBasicTextCell,
    [columnType.LOCALE]: _renderBasicTextCell,
    [columnType.TYPE]: _renderBasicTextCell,
    [columnType.STATUS]: _renderBasicTextCell,
  };

  return (
    <TabContainer>
      <TableApp
        tableName="table-my-tickets"
        columnConfig={columnConfig}
        components={components}
        data={allTickets}
        isLoading={loading}
        loadingCollapse={loadingMessage}
        renderCellHeader={(key) => columnLabel[key]}
        renderCollapse={(rowData: ITicketsDTO) => (
          <CollapseConversation dataList={messagesState} dataTicket={rowData} />
        )}
        renderInputSearchAndSelect={arrayRenderInputSearch}
        onClickCollapse={(id: number) => getMessages(id)}
      />
    </TabContainer>
  );
}
