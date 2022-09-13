import Head from "next/head";
import styles from "../../styles/Home.module.css";
import Layout from "../../component/layout";
import {apiRequest} from "../../util/apiRequest";
import { useRouter } from "next/router";
import React, { useState, ChangeEvent, useEffect, useContext } from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { AuthContext } from "../../context/AuthContext";
import { parseCookies } from "nookies";
import { getAPIClient } from "../../util/axios";

export default function PerfilAdministrador() {
  const [administrador, setAdm] = useState<any>([]);
  const router = useRouter();
  const { user } = useContext(AuthContext);

  return (
    <div className={styles.container}>
      <Head>
        <title>Galdi</title>
        <meta name="description" content="Generated by meio a meio" />
      </Head>
      <Layout>
        <main className={styles.main}>
          <p className={styles.description}>Seu Perfil</p>
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
                  <TableCell align="left" variant="head">
                    Nome
                  </TableCell>
                  <TableCell align="right">
                    {user.nome_completo}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left" variant="head">
                    Matrícula
                  </TableCell>
                  <TableCell align="right">
                    {user.matricula || ""}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left" variant="head">
                    Celular
                  </TableCell>
                  <TableCell align="right">{user.celular}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left" variant="head">
                    CPF
                  </TableCell>
                  <TableCell align="right">{user.cpf}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left" variant="head">
                    Data de Nascimento
                  </TableCell>
                  <TableCell align="right">
                    {user.data_de_nascimento}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left" variant="head">
                    RG/RNE
                  </TableCell>
                  <TableCell align="right">{user.rg_rne}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left" variant="head">
                    Email
                  </TableCell>
                  <TableCell align="right">{user.email}</TableCell>
                </TableRow>
                <TableRow
                  sx={{ display: "flex", flexDirection: "column" }}
                ></TableRow>
              </TableHead>
            </Table>
          </div>
        </main>
      </Layout>
    </div>
  );
}
