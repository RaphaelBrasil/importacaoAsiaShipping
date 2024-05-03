import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { PieChart } from '@mui/x-charts/PieChart';
import { DataGrid } from '@mui/x-data-grid';
import dataMock from './../../assets/mockdatalist.json';

const convertJsonToRowsAndColumns = (jsonArray) => {
  const columns = [
    { field: 'pedido', headerName: 'Pedido', width: 60 },
    { field: 'embarque_empresa', headerName: 'Empresa de Embarque', width: 150 },
    { field: 'export', headerName: 'Export', width: 75 },
    { field: 'armador', headerName: 'Armador', width: 100 },
    { field: 'container', headerName: 'Container', width: 100 },
    { field: 'numero_bl', headerName: 'Número BL', width: 100 },
    { field: 'chegada_porto', headerName: 'Chegada ao Porto', width: 110 },
    { field: 'documentacao', headerName: 'Documentação', width: 100 },
    { field: 'data_di', headerName: 'Data DI', width: 100 },
    { field: 'numero_di', headerName: 'Número DI', width: 80 },
    { field: 'ce_processo', headerName: 'CE Processo', width: 100 },
    { field: 'status', headerName: 'Status', width: 60 }
  ];

  // Criando um objeto para armazenar as linhas
  const rows = [];

  // Percorrendo cada objeto do JSON
  jsonArray.forEach((item) => {
    // Criando uma linha para o pedido atual
    const row = {
      id: item.pedido,
      pedido: item.pedido,
      embarque_empresa: item.embarque.empresa,
      agente_frete: item.embarque.agente_frete,
      export: item.embarque.export,
      armador: item.embarque.armador,
      container: item.embarque.container,
      numero_bl: item.embarque.numero_bl,
      bl_status: item.embarque.bl_status ? 'Ativo' : 'Inativo',
      fatura: item.embarque.fatura,
      chegada_porto: item.embarque.chegada_porto,
      documentacao: item.chegada.documentacao ? 'Sim' : 'Não',
      data_di: item.chegada.data_di,
      numero_di: item.chegada.numero_di,
      ce_processo: item.chegada.ce_processo,
      status: item.chegada.status,
      glme: item.chegada.glme ? 'Sim' : 'Não',
      nf_status: item.chegada.nf_status ? 'Ativo' : 'Inativo',
      cipp_averb: item.chegada.cipp_averb ? 'Sim' : 'Não',
      chegada_empresa: item.chegada.chegada_empresa,
      free_time: item.chegada.free_time,
      transportadora: item.chegada.transportadora,
      nf: item.chegada.nf,
      cte: item.chegada.cte
    };

    // Adicionando a linha ao array de linhas
    rows.push(row);
  });

  return { columns, rows };
};

// Convertendo o JSON para linhas e colunas

const DashboardDefault = () => {
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [data] = useState(dataMock);
  // eslint-disable-next-line no-unused-vars
  const [selectedRows, setSelectedRows] = useState(dataMock);
  const { columns, rows } = convertJsonToRowsAndColumns(data);

  const countStatus = (data) => {
    const statusCount = {
      Green: 0,
      Yellow: 0,
      Red: 0
    };
    const documentacaoCount = {
      sim: 0,
      nao: 0
    };

    data.forEach((item) => {
      statusCount[item.chegada.status]++;
      item.embarque.chegada_porto ? documentacaoCount['sim']++ : documentacaoCount['nao']++;
    });

    return [statusCount, documentacaoCount];
  };

  const mostraSelecionados = (rowSelection) => {
    const result = data.filter((item) => rowSelection.includes(item.pedido));
    result.length > 0 ? setSelectedRows(result) : setSelectedRows(data);
  };

  // Função para converter o objeto de contagem em um array de objetos
  const convertCountToArray = (countObj) => {
    return Object.keys(countObj).map((key) => ({
      status: key,
      count: countObj[key]
    }));
  };

  const [retornoStatus, retornoDocumentacao] = countStatus(selectedRows);
  const [statusData, setStatusData] = useState(convertCountToArray(retornoStatus));
  const [documentoData, setSocumentoData] = useState(convertCountToArray(retornoDocumentacao));

  // useEffect para atualizar os dados dos gráficos quando as linhas mudarem
  useEffect(() => {
    const [novoRetornoStatus, novoRetornoDocumentacao] = countStatus(selectedRows);
    setStatusData(convertCountToArray(novoRetornoStatus));
    setSocumentoData(convertCountToArray(novoRetornoDocumentacao));

    // Lembre-se de incluir todas as dependências relevantes no array de dependências
  }, [selectedRows]);

  const theme = useTheme();

  return (
    <Card>
      <CardContent>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ marginRight: '20px' }}>
            <Typography>Pedidos em canais</Typography>
            <PieChart
              colors={[theme.palette.success.main, theme.palette.warning.main, theme.palette.error.main]}
              series={[
                {
                  data: statusData.map((item) => ({
                    id: item.status,
                    value: item.count,
                    label: item.status
                  })),
                  innerRadius: 20,
                  outerRadius: 80,
                  paddingAngle: 2,
                  cornerRadius: 5,
                  startAngle: 0,
                  endAngle: 360,
                  cx: 150,
                  cy: 150
                }
              ]}
              width={400}
              height={300}
            />
          </div>
          <div>
            <Typography>Pedidos no porto</Typography>
            <PieChart
              colors={[theme.palette.success.main, theme.palette.warning.main, theme.palette.error.main]}
              series={[
                {
                  data: documentoData.map((item) => ({
                    id: item.status,
                    value: item.count,
                    label: item.status === 'sim' ? 'Chegaram' : 'Não chegaram'
                  })),
                  innerRadius: 20,
                  outerRadius: 80,
                  paddingAngle: 2,
                  cornerRadius: 5,
                  startAngle: 0,
                  endAngle: 360,
                  cx: 150,
                  cy: 150
                }
              ]}
              width={400}
              height={300}
            />
          </div>
          <div>
            <Typography>Minhas Importações</Typography>
            <PieChart
              colors={[theme.palette.success.main, theme.palette.warning.main, theme.palette.error.main]}
              series={[
                {
                  data: statusData.map((item) => ({
                    id: item.status,
                    value: item.count,
                    label: item.status
                  })),
                  innerRadius: 20,
                  outerRadius: 80,
                  paddingAngle: 2,
                  cornerRadius: 5,
                  startAngle: 0,
                  endAngle: 360,
                  cx: 150,
                  cy: 150
                }
              ]}
              width={400}
              height={300}
            />
          </div>
        </div>
        <div style={{ height: 400, width: '80%', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 }
              }
            }}
            pageSizeOptions={[5, 10]}
            onRowSelectionModelChange={(newRowSelectionModel) => {
              setRowSelectionModel(newRowSelectionModel);
              mostraSelecionados(newRowSelectionModel);
              //console.log(newRowSelectionModel);
            }}
            rowSelectionModel={rowSelectionModel}
            checkboxSelection
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardDefault;
