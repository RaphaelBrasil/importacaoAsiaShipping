import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Step from '@mui/material/Step';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import { styled } from '@mui/material/styles';
import StepLabel from '@mui/material/StepLabel';
import CheckIcon from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import { Card, Typography, CardContent } from '@mui/material';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import dataSingle from './../../assets/mockdatasingle.json';

// Custom Step Icon
const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.grey[400],
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundColor: theme.palette.primary.main
  }),
  ...(ownerState.completed && {
    backgroundColor: theme.palette.primary.main
  })
}));

function ColorlibStepIcon(props) {
  const { active, completed, className, icon } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
    4: <DirectionsBoatIcon />
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {completed ? <CheckIcon /> : icons[String(icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
  icon: PropTypes.node
};

// Custom Connector
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: theme.palette.primary.main
    }
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: theme.palette.primary.main
    }
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 4,
    border: 0,
    backgroundColor: theme.palette.grey[400],
    borderRadius: 1
  }
}));

const verificaFreeTime = (data) => {
  // Suponha que data.chegada.free_time e data.embarque.chegada_porto sejam strings no formato 'YYYY-MM-DD'
  const chegadaPorto = new Date(data.embarque.chegada_porto);
  const freeTime = parseInt(data.chegada.free_time); // Converter para número inteiro

  // Verificar se chegadaPorto e freeTime são válidos
  if (!isNaN(chegadaPorto.getTime()) && !isNaN(freeTime)) {
    // Adicionar o tempo livre à data de chegada ao porto
    const prazo = new Date(chegadaPorto.getTime() + freeTime * 24 * 60 * 60 * 1000); // Converter dias para milissegundos
    const dia = prazo.getDate();
    const mes = prazo.getMonth() + 1; // Adicionando 1 porque os meses em JavaScript são baseados em zero
    const ano = prazo.getFullYear();
    return `${dia < 10 ? '0' + dia : dia}/${mes < 10 ? '0' + mes : mes}/${ano}`;
  } else {
    return 'Datas de chegada ou tempo livre inválidos.';
  }
};

const converteData = (data) => {
  // Suponha que data.chegada.free_time e data.embarque.chegada_porto sejam strings no formato 'YYYY-MM-DD'
  const dataConvertida = new Date(data);

  // Verificar se a data é válida
  if (!isNaN(dataConvertida.getTime())) {
    // Obter o dia, mês e ano da data convertida
    const dia = dataConvertida.getDate();
    const mes = dataConvertida.getMonth() + 1; // Adicionando 1 porque os meses em JavaScript são baseados em zero
    const ano = dataConvertida.getFullYear();

    // Formatar a data como "DD/MM/YYYY"
    return `${dia < 10 ? '0' + dia : dia}/${mes < 10 ? '0' + mes : mes}/${ano}`;
  } else {
    return 'Data inválida.';
  }
};

// Componente Personalizado do Stepper
const stepsEmbarque = ['Etapa 1', 'Etapa 2', 'Etapa 3', 'Etapa 4'];
const stepsChegada = ['Etapa 5', 'Etapa 6', 'Etapa 7', 'Etapa 8'];

export default function CustomizedSteppers() {
  const [activeStepEmbarque, setActiveStepEmbarque] = useState(0);
  const [activeStepChegada, setActiveStepChegada] = useState(0);

  const [data] = useState(dataSingle);
  // eslint-disable-next-line no-unused-vars
  const [status, setStatus] = useState();

  const handleNextEmbarque = () => {
    setActiveStepEmbarque((prevActiveStep) => (prevActiveStep === stepsEmbarque.length - 1 ? 0 : prevActiveStep + 1));
  };
  const handleNextChegada = () => {
    setActiveStepChegada((prevActiveStep) => (prevActiveStep === stepsChegada.length - 1 ? 0 : prevActiveStep + 1));
  };

  return (
    <div style={{ display: 'flex', gap: '20px', flexDirection: 'column', justifyContent: 'center' }}>
      <Card>
        <CardContent sx={{ backgroundColor: '#ffd666' }}>
          <Typography variant="h2" gutterBottom>
            <strong>Embarque</strong>
          </Typography>
          <Stack direction="column" spacing={4}>
            <Stepper alternativeLabel activeStep={activeStepEmbarque} connector={<ColorlibConnector />}>
              {stepsEmbarque.map((label, index) => (
                <Step key={label}>
                  <StepLabel StepIconComponent={ColorlibStepIcon} icon={index + 1}>
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
            <Button variant="contained" color="primary" onClick={handleNextEmbarque}>
              {activeStepEmbarque === stepsEmbarque.length - 1 ? 'Reset' : 'Next'}
            </Button>
          </Stack>
        </CardContent>
      </Card>
      <Card>
        <CardContent sx={{ backgroundColor: '#ffd666' }}>
          <Typography variant="h2" gutterBottom>
            <strong>Embarque</strong>
          </Typography>
          <Typography variant="body1">
            <strong>EMPRESA:</strong> {data.embarque.empresa}
            <br />
            <strong>AGENTE DE FRETE:</strong> {data.embarque.agente_frete}
            <br />
            <strong>EXPORT:</strong> {data.embarque.export}
            <br />
            <strong>ARMADOR:</strong> {data.embarque.armador}
            <br />
            <strong>CONTAINER:</strong> {data.embarque.container}
            <br />
            <strong>BL Nº:</strong> {data.embarque.numero_bl}
            <br />
            <strong>BL:</strong> {data.embarque.bl_status ? 'OK' : ''}
            <br />
            <strong>FATURA:</strong> {data.embarque.fatura}
            <br />
            <strong>CHEGADA PORTO:</strong> {converteData(data.embarque.chegada_porto)}
            <br />
          </Typography>
        </CardContent>
      </Card>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Card sx={{ flex: 1, backgroundColor: '#bae7ff' }}>
          <CardContent>
            <Typography variant="h2" gutterBottom>
              <strong>Chegada</strong>
            </Typography>
            <Stack sx={{ width: '100%' }} spacing={4}>
              <Stepper alternativeLabel activeStep={activeStepChegada} connector={<ColorlibConnector />} orientation="horizontal">
                {stepsChegada.map((label, index) => (
                  <Step key={label}>
                    <StepLabel StepIconComponent={ColorlibStepIcon} icon={index + 1}>
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
              <Button variant="contained" color="primary" onClick={handleNextChegada}>
                {activeStepChegada === stepsChegada.length - 1 ? 'Reset' : 'Next'}
              </Button>
            </Stack>
          </CardContent>
        </Card>
        <Card sx={{ display: 'flex', flexDirection: 'column', flex: 1, backgroundColor: '#bae7ff' }}>
          <CardContent>
            <Typography variant="h2" gutterBottom>
              <strong>Chegada</strong>
            </Typography>
            <Typography variant="body1">
              <strong>DOCS:</strong> {data.chegada.documentacao ? 'OK' : ''}
              <br />
              <strong>DATA DI:</strong> {data.chegada.data_di}
              <br />
              <strong>DI Nº:</strong> {data.chegada.numero_di}
              <br />
              <strong>CE PROCESSO:</strong> {data.chegada.ce_processo}
              <br />
              <strong>STATUS:</strong> {data.chegada.status}
              <br />
              <strong>GLME:</strong> {data.chegada.glme ? 'OK' : ''}
              <br />
              <strong>NF_Status:</strong> {data.chegada.nf_status ? 'OK' : ''}
              <br />
              <strong>CIPP AVERB.:</strong> {data.chegada.cipp_averb ? 'OK' : ''}
              <br />
              <strong>CHEGADA NA EMPRESA:</strong> {converteData(data.chegada.chegada_empresa)}
              <br />
              <strong>FREE TIME:</strong> {data.chegada.free_time}
              <br />
              <strong>FREE TIME END:</strong> {verificaFreeTime(data)}
              <br />
              <strong>TRANSP.:</strong> {data.chegada.transportadora}
              <br />
              <strong>NF / CTE:</strong> {data.chegada.nf} / {data.chegada.cte}
              <br />
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
