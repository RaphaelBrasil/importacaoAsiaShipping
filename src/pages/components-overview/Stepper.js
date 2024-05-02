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

// Componente Personalizado do Stepper
const stepsEmbarque = ['Etapa 1', 'Etapa 2', 'Etapa 3', 'Etapa 4'];
const stepsChegada = ['Etapa 5', 'Etapa 6', 'Etapa 7', 'Etapa 8'];

export default function CustomizedSteppers() {
  const [activeStepEmbarque, setActiveStepEmbarque] = useState(0);
  const [activeStepChegada, setActiveStepChegada] = useState(0);
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
            <strong>EMPRESA:</strong> [Nome da Empresa]
            <br />
            <strong>AGENTE DE FRETE:</strong> [Agente de Frete]
            <br />
            <strong>EXPORT:</strong> [Informação Export]
            <br />
            <strong>ARMADOR:</strong> [Nome do Armador]
            <br />
            <strong>CONTAINER:</strong> [Número do Container]
            <br />
            <strong>BL Nº:</strong> [Número do BL]
            <br />
            <strong>BL:</strong> [BL]
            <br />
            <strong>FATURA:</strong> [Fatura]
            <br />
            <strong>CHEGADA PORTO:</strong> [Data de Chegada no Porto]
            <br />
          </Typography>
        </CardContent>
      </Card>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Card sx={{ display: 'flex', flexDirection: 'column', flex: 1, backgroundColor: '#bae7ff' }}>
          <CardContent>
            <Typography variant="h2" gutterBottom>
              <strong>Chegada</strong>
            </Typography>
            <Typography variant="body1">
              <strong>DOCS:</strong> [Documentos]
              <br />
              <strong>DATA DI:</strong> [Data DI]
              <br />
              <strong>DI Nº:</strong> [Número DI]
              <br />
              <strong>CE PROCESSO:</strong> [CE Processo]
              <br />
              <strong>STATUS:</strong> [Status]
              <br />
              <strong>GLME:</strong> [GLME]
              <br />
              <strong>NF:</strong> [Nota Fiscal]
              <br />
              <strong>CIPP AVERB.:</strong> [CIPP Averb]
              <br />
              <strong>CTE:</strong> [CTE]
              <br />
              <strong>CHEGADA NA EMPRESA:</strong> [Data de Chegada na Empresa]
              <br />
              <strong>FREE TIME:</strong> [Free Time]
              <br />
              <strong>FREE TIME END:</strong> [Free Time End]
              <br />
              <strong>TRANSP.:</strong> [Transportadora]
              <br />
              <strong>NF / CTE:</strong> [Nota Fiscal / CTE]
              <br />
            </Typography>
          </CardContent>
        </Card>
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
      </div>
    </div>
  );
}
