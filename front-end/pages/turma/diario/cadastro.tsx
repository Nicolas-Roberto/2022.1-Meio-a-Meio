import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import React, { useState, ChangeEvent, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Checkbox from "@mui/material/Checkbox";
import {apiRequest} from "../../../util/apiRequest";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import FormHelperText from "@mui/material/FormHelperText";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Moment from "moment";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
const theme = createTheme();

export default function CadastroDiarioDeAula() {
  const [data, setData] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const router = useRouter();
  const [turma, setTurma] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(false);
  
  async function getPraDiarioTurma() {
  const resTurma = await apiRequest.get("turma/" + router.query.turma_id);
    if (resTurma.data) {
      setTurma(resTurma.data);
    }
  }
  useEffect(() => {
    getPraDiarioTurma();
  }, []);


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (handleCheckData()) {
      setClose(true);
      return;
    }
    console.log(data);
    apiRequest
      .post("diario/" + data.turma_id, { ...data })
      .then((result) => {
        setOpen(true);
        router.back()
        console.log("ok");
      })
      .catch((err) => {
        setClose(true);
        console.log("errado", err);
      });
  };
  const handleDate = (e: SelectChangeEvent<HTMLInputElement>) => {
    console.log(e);
    const formatedData = Moment(e).format("yyyy/MM/DD");
    setData({ ...data, dataDiario : formatedData });
  };
  const handleText = (e: ChangeEvent<HTMLInputElement>) => {
    const clearText = e.target.value.replace(/\d/, "");
    setData({ ...data, [e.target.name]: clearText });
    let tempErrors = errors;
    delete tempErrors[e.target.name];
    setErrors(tempErrors);
  };
  const handleCheckData = () => {
    const { dataDiario , turma_id, conteudo, observacao } = data;
    let emptyFields: any = {};
    if (!dataDiario  || dataDiario .length === 0) {
      emptyFields.dataDiario  = "Data Inválida";
    }
    if (!turma_id || turma_id.length === 0) {
      emptyFields.turma_id = "Turma Inválida";
    }
    if (!conteudo || conteudo.length === 0) {
      emptyFields.conteudo = "Conteúdo Inválida";
    }if (!observacao || observacao.length === 0) {
      emptyFields.observacao = "Observações Inválidas";
    }
    if (Object.keys(emptyFields).length > 0) {
      setErrors(emptyFields);
      return 1;
    }
    return 0;
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            <Head>
              <title>Galdi</title>
              <meta name="description" content="Generated by meio a meio" />
            </Head>
          </div>
          <Typography component="h1" variant="h5">
            Cadastro de Diário de Aula
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={1.5}>
            <Grid item xs={3}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    required
                    label="Data"
                    name="dataDiario"
                    inputFormat="dd/MM/yyyy"
                    value={data ? data.dataDiario  : ""}
                    onChange={handleDate}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <FormHelperText error>
                  {errors.dataDiario}
                </FormHelperText>
              </Grid>
              <Grid item xs={3}>
                <FormControl sx={{ m: 0, minWidth: 150 }}>
                  <InputLabel id="turma_id" required>
                    Turma
                  </InputLabel>
                  <Select
                    required
                    fullWidth
                    error={errors.turma_id ? true : false}
                    onChange={(e) =>
                      setData({ ...data, turma_id: e.target.value })
                    }
                    label={"Turma"}
                    value={data ? data.turma_id : ""}
                  >
                    {turma.map((i, index) => (
                      <MenuItem key={index} value={i.id}>
                        {i.nome_turma}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  error={errors.conteudo ? true : false}
                  helperText={errors.conteudo || null}
                  fullWidth
                  id="conteúdo"
                  label="Conteúdo (Descreva aqui o que foi passado durante a aula)"
                  name="conteudo"
                  autoComplete="conteudo"
                  onChange={handleText}
                  value={data ? data.conteudo : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                required
                  fullWidth
                  id="observacao"
                  label="Observações (Notas extras caso queira-se registrar)"
                  name="observacao"
                  autoComplete="observacao"
                  onChange={handleText}
                  value={data ? data.observacao : ""}
                  error={errors.observacao ? true : false}
                  helperText={errors.observacao || null}
                />
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Cadastrar Diário
              </Button>
              <Collapse in={open}>
              <Alert
              severity="success"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                Cadastro realizado com sucesso!
              </Alert>
            </Collapse>
            <Collapse in={close}>
              <Alert
              severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setClose(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                Falha ao cadastrar o diário!
              </Alert>
            </Collapse>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link onClick={() => router.back()} variant="body2">
                    Retornar ao Menu Principal
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
