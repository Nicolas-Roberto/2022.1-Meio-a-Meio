import React, { useState, ChangeEvent, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Head from "next/head";
import { useRouter } from "next/router";
import {apiRequest} from "../../util/apiRequest";
import { Select, MenuItem, Collapse, Alert, IconButton, FormHelperText } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import CloseIcon from "@mui/icons-material/Close";

const theme = createTheme();

export default function Cadastro() {
  const [data, setData] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const router = useRouter();
  const [professor, setProfessor] = useState<any>([]);
  const [curso, setCurso] = useState<any>([]);
  const [errorMessage, setErrorMessage] = useState<any>("");
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(false);
  async function getDadosParaEditarDisciplina() {
    const resProfessor = await apiRequest.get("professor");
    const resCurso = await apiRequest.get("curso");
    if (resProfessor.data) {
      setProfessor(resProfessor.data);
    }
    if (resCurso.data) {
      setCurso(resCurso.data);
    } else {
    }
  }
  useEffect(() => {
    getDadosParaEditarDisciplina();
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (handleCheckData()) {
      return;
    }
    apiRequest
      .post("disciplina", { ...data })
      .then((result) => {
        router.back();
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        setClose(true);
      });
  };
  const handleText = (e: ChangeEvent<HTMLInputElement>) => {
    const clearText = e.target.value.replace(/\d/, "");
    setData({ ...data, [e.target.name]: clearText });
    let tempErrors = errors;
    delete tempErrors[e.target.name];
    setErrors(tempErrors);
  };

  const handleNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const clearNumber = e.target.value.replace(/\D/, "");
    const stringToNumber = parseInt(clearNumber);
    setData({ ...data, [e.target.name]: stringToNumber});
  };

  const handleCheckData = () => {
    const { nome_disciplina, carga_horaria, curso } = data;
    let emptyFields: any = {};

    if (!nome_disciplina || nome_disciplina.length === 0) {
      emptyFields.nome_disciplina = "Nome Vazio";
    }
    if (!carga_horaria || carga_horaria.length === 0) {
      emptyFields.carga_horaria = "Carga Horaria Vazia";
    }
    if (!curso || curso.length === 0) {
      emptyFields.curso = "Curso Vazio";
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
            Insira os dados cadastrais da disciplina
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  error={errors.nome_disciplina ? true : false}
                  helperText={errors.nome_disciplina || null}
                  fullWidth
                  id="nome_disciplina"
                  label="Nome da Disciplina"
                  name="nome_disciplina"
                  autoComplete="nome_disciplina"
                  onChange={handleText}
                  value={data ? data.nome_disciplina : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  error={errors.carga_horaria ? true : false}
                  helperText={errors.carga_horaria || null}
                  fullWidth
                  id="carga_horaria"
                  label="Carga Horária"
                  name="carga_horaria"
                  onChange={handleNumber}
                  value={data ? data.carga_horaria : ""}
                  type="number"
                />
              </Grid><Grid item xs={12}>
                <TextField
                  fullWidth
                  id="localizacao"
                  label="Localização"
                  name="localizacao"
                  onChange={handleText}
                  value={data ? data.localizacao : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="professor">
                  Professor
                </InputLabel>
                <Select
                  fullWidth
                  onChange={(e) =>
                    setData({ ...data, professor: e.target.value })
                  }
                  label={"Professor"}
                  value={data ? data.professor : null}
                >
                  {professor.map((i, index) => (
                    <MenuItem key={index} value={i.id}>
                      {i.nome_completo}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="curso" required>
                  Curso
                </InputLabel>
                <Select
                  required
                  fullWidth
                  error={errors.curso ? true : false}
                  onChange={(e) =>
                    setData({ ...data, curso: e.target.value })
                  }
                  label={"Curso"}
                  value={data ? data.curso : null}
                >
                  {curso.map((i, index) => (
                    <MenuItem key={index} value={i.id}>
                      {i.nome}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error>
                  {errors.curso}
                </FormHelperText>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastrar Disciplina
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
                {errorMessage}
              </Alert>
            </Collapse>
            <Grid container justifyContent="center">
              <Grid item>
                <Link onClick={() => router.back()} variant="body2">
                  Retornar ao Menu Principal
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}