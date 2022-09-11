import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../../styles/Home.module.css";
import Grid from "@mui/material/Grid";
import Layout from "../../../component/layout";
import apiRequest from "../../../util/apiRequest";
import React, { useState, ChangeEvent, useEffect } from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "@mui/material/Link";

export default function PortalDaPresencaTurma() {
  const [presencaTurma, setPresencaTurma] = useState<any>([]);
  const router = useRouter();
  async function getPresencasTurma(){
    const resPresencassTurma = await apiRequest.get("turma/listaPresenca/" + router.query.detalhes);
    if (resPresencassTurma.data) {
      setPresencaTurma(resPresencassTurma.data);
    }
  }
  useEffect(() => {
    getPresencasTurma();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Galdi</title>
        <meta name="description" content="Generated by meio a meio" />
      </Head>
      <Layout>
        <main className={styles.main}>
          <p className={styles.description}>Presenças</p>
          <div
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                <TableCell align="center">Id</TableCell>
                  <TableCell align="center">Data</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {presencaTurma.map((row, index) => (
                    <TableRow key={index} >
                      <TableCell component="th" scope="row" align="center">
                        {row.id}
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        {row.data}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <Button
              variant="outlined"
              onClick={() => router.push({pathname: "listaPresenca/cadastro", query: {turma_id: router.query.id}})}
              sx={{ alignSelf: "center" }}
            >
              Cadastrar
            </Button>
          </div>
        </main>
      </Layout>
    </div>
  );
}
