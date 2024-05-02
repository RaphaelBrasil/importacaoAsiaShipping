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
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: 'linear-gradient( 136deg, rgb(113, 213, 242) 0%, rgb(64, 233, 205) 50%, rgb(35, 135, 138) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
  }),
  ...(ownerState.completed && {
    backgroundImage: 'linear-gradient( 136deg, rgb(113, 213, 242) 0%, rgb(64, 233, 205) 50%, rgb(35, 135, 138) 100%)'
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
      backgroundImage: 'linear-gradient( 95deg, rgb(113, 213, 242) 0%, rgb(64, 233, 205) 50%, rgb(35, 135, 138) 100%)'
    }
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient( 95deg, rgb(113, 213, 242) 0%, rgb(64, 233, 205) 50%, rgb(35, 135, 138) 100%)'
    }
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1
  }
}));

// Componente Personalizado do Stepper
const steps = ['Etapa 1', 'Etapa 2', 'Etapa 3', 'Etapa 4'];

export default function CustomizedSteppers() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep === steps.length - 1 ? 0 : prevActiveStep + 1));
  };

  return (
    <div style={{ display: 'flex', gap: '20px', flexDirection: 'column', justifyContent: 'center' }}>
      <Card>
        <CardContent>
          <Stack sx={{ width: '100%' }} spacing={4}>
            <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel StepIconComponent={ColorlibStepIcon} icon={index + 1}>
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
            <Button variant="contained" color="primary" onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Reset' : 'Next'}
            </Button>
          </Stack>
        </CardContent>
      </Card>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Card sx={{ backgroundColor: '#ADD8E6' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Do Embarque
            </Typography>
            <Typography variant="body1">
              EMPRESA: [Nome da Empresa]
              <br />
              AGENTE DE FRETE: [Agente de Frete]
              <br />
              EXPORT: [Informação Export]
              <br />
              ARMADOR: [Nome do Armador]
              <br />
              CONTAINER: [Número do Container]
              <br />
              BL Nº: [Número do BL]
              <br />
              BL: [BL]
              <br />
              FATURA: [Fatura]
              <br />
              CHEGADA PORTO: [Data de Chegada no Porto]
              <br />
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ backgroundColor: '#FFA500' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Da Chegada
            </Typography>
            <Typography variant="body1">
              DOCS: [Documentos]
              <br />
              DATA DI: [Data DI]
              <br />
              DI Nº: [Número DI]
              <br />
              CE PROCESSO: [CE Processo]
              <br />
              STATUS: [Status]
              <br />
              GLME: [GLME]
              <br />
              NF: [Nota Fiscal]
              <br />
              CIPP AVERB.: [CIPP Averb]
              <br />
              CTE: [CTE]
              <br />
              CHEGADA NA EMPRESA: [Data de Chegada na Empresa]
              <br />
              FREE TIME: [Free Time]
              <br />
              FREE TIME END: [Free Time End]
              <br />
              TRANSP.: [Transportadora]
              <br />
              NF / CTE: [Nota Fiscal / CTE]
              <br />
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
