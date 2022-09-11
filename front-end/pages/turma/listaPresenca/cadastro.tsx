import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import apiRequest from "../../../util/apiRequest";
import Checkbox from "@mui/material/Checkbox";
import { DatePicker } from "@mantine/dates";
import styles from "../../../styles/listapresenca.module.css";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "../../../component/layout";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";

export default function CadastroListaPresenca() {
  const [alunos, setAlunoTurma] = useState([]);
  const [alunosPresentes, setAlunosPresentes] = useState([]);
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(false);
  const [errorMessage, setErrorMessage] = useState<any>("");

  const router = useRouter();
  console.log(router.query.turma_id);
  async function getAlunosTurma() {
    const resAlunosTurma = await apiRequest.get(
      "turma/alunos/" + router.query.turma_id
    );
    console.log(resAlunosTurma);
    if (resAlunosTurma.data) {
      setAlunoTurma(resAlunosTurma.data);
    }
  }
  useEffect(() => {
    getAlunosTurma();
  }, []);

  const handleCheck = (id) => {
    const jaExiste = alunosPresentes.find((i) => i === id);
    console.log(jaExiste);
    if (jaExiste) {
      const listaFiltrada = alunosPresentes.filter((i) => i !== id);
      setAlunosPresentes(listaFiltrada);
      return;
    }
    setAlunosPresentes([...alunosPresentes, id]);
  };
  return (
    <div>
      <Head>
        <title>Galdi</title>
        <meta name="description" content="Generated by meio a meio" />
      </Head>
      {/* <Layout> */}
      <div className={styles.datepickerContainer}>
        <DatePicker
          placeholder="Escolha uma data"
          label="Dia da aula"
          withAsterisk
        />
      </div>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell align="right">ID</TableCell>
            <TableCell align="right">Presente</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {alunos.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.nome_completo}
              </TableCell>
              <TableCell align="right">{row.id}</TableCell>
              <TableCell align="right">
                <Checkbox
                  onClick={() => handleCheck(row.id)}
                  checked={
                    alunosPresentes.find((i) => i === row.id) ? true : false
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={styles.buttonContainer}>
        <Button variant="outlined">Lançar lista de presença</Button>
        </div>
        <div>
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
            <Link href="/turma/detalhes" variant="body2">
              Retornar ao Menu Principal
            </Link>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
