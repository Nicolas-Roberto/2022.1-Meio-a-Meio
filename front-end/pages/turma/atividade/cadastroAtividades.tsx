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
import apiRequest from "../../../util/apiRequest";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import FormHelperText from "@mui/material/FormHelperText";
const theme = createTheme();

export default function CadastroAtividades({
  listaTurmas: listaTurmas,
  error,
}) {
  const [data, setData] = useState<any>({isTest: false});
  const [errors, setErrors] = useState<any>({});
  const router = useRouter();
  const [turma, setTurma] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(false);

  useEffect(() => {
    if (listaTurmas) {
      setTurma(listaTurmas);
    }
    console.log(listaTurmas);
    console.log(error);
    //erros
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (handleCheckData()) {
      setClose(true);
      return;
    }
    console.log(data);
    apiRequest
      .post("atividade/" + data.turma_id, { ...data })
      .then((result) => {
        setOpen(true);
        router.push("portal");
        console.log("ok");
      })
      .catch((err) => {
        setClose(true);
        console.log("errado", err);
      });
  };
  const handleText = (e: ChangeEvent<HTMLInputElement>) => {
    const clearText = e.target.value.replace(/\d/, "");
    setData({ ...data, [e.target.name]: clearText });
    let tempErrors = errors;
    delete tempErrors[e.target.name];
    setErrors(tempErrors);
  };
  const handleCheckData = () => {
    const {
      nome,
      turma_id,
    } = data;
    let emptyFields: any = {};
    if (!nome || nome.length === 0) {
      emptyFields.nome_atividade = "Atividade Inválida";
    }
    if (!turma_id || turma_id.length === 0) {
      emptyFields.turma_id = "Turma Inválida";
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
            {/* <Image src= "/images/logo.jpeg" width= '600px' height= '150px'/> */}
          </div>
          <Typography component="h1" variant="h5">
            Cadastro de Atividades
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <TextField
                  required
                  error={errors.nome_atividade ? true : false}
                  helperText={errors.nome_atividade || null}
                  fullWidth
                  id="nome"
                  label="Atividade"
                  name="nome"
                  autoComplete="nome"
                  onChange={handleText}
                  value={data ? data.nome_atividade : ""}
                />
              </Grid>
              <Grid item xs={4}>
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
                        {i.nome}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText error>
                  {errors.turma_id}
                </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={2.5}>
                <FormControl fullWidth>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Prova?"
                    onChange={(e) => setData({ ...data, isTest: e.target.checked })}
                    value={data ? data.isTest : null}
                  />
                </FormControl>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Cadastrar Atividade
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
                Falha ao cadastrar a atividade!
              </Alert>
            </Collapse>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link href="portal" variant="body2">
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
export async function getServerSideProps() {
  const resTurma = await apiRequest.get("turma");
  if (!resTurma || !resTurma.data) {
    return { props: { error: "Falha ao carregar conteúdo" } };
  }

  return {
    props: {
      listaTurmas: resTurma.data,
      error: null,
    },
  };
}