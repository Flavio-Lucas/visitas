import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, FormControlLabel, Radio, RadioGroup, TextField, TextareaAutosize, Paper, Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { styled } from '@mui/system';
import VisitaModal from '../../components/VisitaModal/VisitaModal';
import { getVisitDetailsById } from '../../services/api';
import { Visit } from '../../models/interfaces/visits.interface';
import { getDateString, getHourString } from '../../utils/dateUtils';

const CustomRadio = styled(Radio)({
  '&.Mui-checked': {
    color: 'black',
  },
  '& .MuiSvgIcon-root': {
    borderRadius: '50%',
  },
});

const ConcluirVisitaPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [entregouChaves, setEntregouChaves] = useState<string>('');
  const [dataSaida, setDataSaida] = useState<string>('');
  const [horarioSaida, setHorarioSaida] = useState<string>('');
  const [ocorrencia, setOcorrencia] = useState<string>('');
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      const data = await getVisitDetailsById(+id);
      setSelectedVisit(data);
    };
    fetchData();
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = {
      entregouChaves,
      dataSaida,
      horarioSaida,
      ocorrencia,
    };

    console.log('Dados do formulário:', formData);

    navigate('/');
  };

  return (
    <Box display="flex" alignItems="center" flexDirection="column" className='visitas-page-container' sx={{ p: 4 }}>
      <Typography variant="h5" color="black" sx={{ fontWeight: 700, fontSize: '1.3rem', marginBottom: '1rem', width: 'fit-content' }}>
        Para concluir, confirme os dados referente à visita <Typography variant="h5" sx={{ fontSize: '1.3rem', fontWeight: 700, color: '#1B7FCC', display: 'inline' }}>{id}</Typography>
      </Typography>

      {!showDetails && <Button
        onClick={() => setShowDetails(true)}
        variant="outlined"
        startIcon={<VisibilityIcon color="info" />}
        sx={{ mb: 4, color: 'gray', borderColor: 'gray' }}
      >
        Visualizar detalhes da visita
      </Button>}
      {showDetails && <Button
        onClick={() => setShowDetails(false)}
        variant="outlined"
        startIcon={<VisibilityOffIcon color="error" />}
        sx={{ mb: 4, color: 'gray', borderColor: 'gray' }}
      >
        Ocultar detalhes da visita
      </Button>}


      {showDetails && <>
        <Box textAlign="center" sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Data e hora da visita agendada
          </Typography>
          <Box display="flex" alignItems="center" justifyContent="center">
            <EventIcon sx={{ mr: 1 }} />
            <Typography variant="body1">
              {selectedVisit?.date && getDateString(selectedVisit?.date)}
            </Typography>
            <AccessTimeIcon sx={{ ml: 2, mr: 1 }} />
            <Typography variant="body1">
              {selectedVisit?.date && getHourString(selectedVisit?.date)}
            </Typography>
          </Box>
        </Box>

        <Paper sx={{ p: 2, mb: 4 }}>
          <Box display="flex" alignItems="center">
            <Box sx={{ mr: 2 }}>
              <img src={selectedVisit?.broker?.avatarUrl} alt="Foto do Corretor" style={{ width: '75px', height: '100px', objectFit: 'cover', borderRadius: '4px' }} />
            </Box>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {selectedVisit?.broker?.name}
              </Typography>
              <Typography variant="body2">
                CPF: <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{selectedVisit?.broker?.cpf}</Typography>
              </Typography>
              <Typography variant="body2">
                Status: <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{selectedVisit?.broker?.status}</Typography>
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Typography variant="h6" sx={{ mb: 2 }}>
          Visitantes e Acompanhantes
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>CPF</TableCell>
                <TableCell>Tipo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedVisit?.visitors?.map((visitante, index) => (
                <TableRow key={index}>
                  <TableCell>{visitante.name}</TableCell>
                  <TableCell>{visitante.cpf}</TableCell>
                  <TableCell>{visitante.isVisitor ? 'Visitante' : 'Acompanhante'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          Blocos / Torres
        </Typography>
        <TableContainer component={Paper} sx={{marginBlock: '2rem'}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Torre</TableCell>
                <TableCell>Unidade</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[selectedVisit?.location].map((location, index) => (
                location && <TableRow key={index}>
                  <TableCell>{location.block}</TableCell>
                  <TableCell>{location.unit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>}

      <form onSubmit={handleSubmit} style={{ alignSelf: 'start', textAlign: 'left', width: '100%' }}>
        <Typography variant="h6" gutterBottom>
          <b>Quem entregou as chaves?</b>
        </Typography>
        <RadioGroup name="entregouChaves" value={entregouChaves} onChange={(e) => setEntregouChaves(e.target.value)}>
          <FormControlLabel control={<CustomRadio />} label="Corretor" value="corretor" />
          <FormControlLabel control={<CustomRadio />} label="Porteiro" value="porteiro" />
          <FormControlLabel control={<CustomRadio />} label="Proprietário" value="proprietario" />
          <FormControlLabel control={<CustomRadio />} label="Síndico" value="sindico" />
        </RadioGroup>

        <Box display="flex" flexDirection="column" width="50%" minWidth="200px">
          <TextField
            label="Data de saída"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={dataSaida}
            onChange={(e) => setDataSaida(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            label="Horário de saída"
            type="time"
            InputLabelProps={{ shrink: true }}
            value={horarioSaida}
            onChange={(e) => setHorarioSaida(e.target.value)}
            sx={{ mt: 2, mb: 4 }}
          />
        </Box>

        <Typography variant="h6" gutterBottom>
          Houve alguma ocorrência? Descreva.
        </Typography>
        <TextareaAutosize
          minRows={4}
          placeholder="Descreva a ocorrência"
          value={ocorrencia}
          onChange={(e) => setOcorrencia(e.target.value)}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box', marginBottom: '16px', minWidth: '200px' }}
        />

        <Box display="flex" justifyContent="space-between">
          <Button color='inherit' variant='contained' onClick={() => navigate('/')}>
            Voltar
          </Button>
          <Button variant="contained" color="success" type="submit">
            Finalizar
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ConcluirVisitaPage;
