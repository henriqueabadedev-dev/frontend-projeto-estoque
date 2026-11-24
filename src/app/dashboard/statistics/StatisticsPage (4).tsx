"use client";

import styles from "./StatisticsPage.module.css";
import ReactECharts from "echarts-for-react";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/pt-br";
import { ObterDadosCard } from "@/app/services/DadosCard";

dayjs.extend(utc);
dayjs.locale("pt-br");

type ResumoPeriodo = {
  receita: number;
  custo: number;
  lucro: number;
  totalVendas: number;
  unidadesVendidas: number;
};

// R$ 1.234,56
const formatBRL = (valor: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(valor) || 0);

// R$ 700 / R$ 1,2 mil (eixos dos gráficos)
const formatBRLEixo = (valor: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(Number(valor) || 0);

// 1.234
const formatInt = (valor: number) =>
  new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 }).format(
    Number(valor) || 0
  );

// Centavos -> reais, aceitando number ou string (Decimal do Prisma vem como string)
const centavos = (valor: unknown) => (Number(valor) || 0) / 100;

// Aceita "2026-09-27" e "2026-09-27T00:00:00.000Z" sem deslocar o dia por fuso
const formatDia = (dia: string) => dayjs.utc(dia).format("DD MMM");

// Série do gráfico de linha (dadosLine)
const montarLinha = (dadosLine: any[] = []) => ({
  datas: dadosLine.map((item) => formatDia(item.data)),
  valores: dadosLine.map((item) => centavos(item.total)),
});

export default function StatisticsPage() {
  const [total, setTotal] = useState<number>(0);
  const [lucro, setLucro] = useState<number>(0);
  const [NomeProduto, setNomeProduto] = useState<string>("");
  const [quantidadeVendido, setQuantidadeVendido] = useState<number>(0);
  const [CategoriaArr, setCategoriaArr] = useState<any[]>([]);
  const [dadosLineData, setDadosLineData] = useState<any[]>([]);
  const [dadosLineTotal, setDadosLineDataTotal] = useState<any[]>([]);
  const [maisVendidosNomes, setMaisVendidosNomes] = useState<any[]>([]);
  const [maisVendidosQuantidade, setMaisVendidosQuantidade] = useState<any[]>(
    []
  );
  const [baixoEstoque, setBaixoEstoque] = useState<any[]>([]);
  const [mediaDiaria, setMediaDiaria] = useState(0);
  const [dadosLineChartDespesaReceita, setDadosLineChartDespesaReceita] =
    useState<any[]>([]);
  const [totalVendas, setTotalVendas] = useState(0);
  const [inputDate1, setInputdate1] = useState("");
  const [inputDate2, setInputdate2] = useState("");
  const [isClear, setIsClear] = useState(false);
  const [erroFiltro, setErroFiltro] = useState("");

  // Resumo do período selecionado (null = nenhum filtro aplicado)
  const [resumoPeriodo, setResumoPeriodo] = useState<ResumoPeriodo | null>(
    null
  );

  // Evita que a resposta de uma busca antiga sobrescreva a do filtro atual
  const requisicaoId = useRef(0);

  const aplicarLinha = (dadosLine: any[] = []) => {
    const { datas, valores } = montarLinha(dadosLine);
    setDadosLineData(datas);
    setDadosLineDataTotal(valores);
  };

  const barOptions = {
    title: { text: "Total Vendas e Custos Totais", left: "center" },
    tooltip: {
      trigger: "axis",
      valueFormatter: (valor: number) => formatBRL(valor),
    },
    legend: { data: ["Venda", "Custo"], top: 30 },
    xAxis: {
      type: "category",
      data: dadosLineChartDespesaReceita[0],
    },
    yAxis: {
      type: "value",
      axisLabel: { formatter: (v: number) => formatBRLEixo(v) },
    },
    series: [
      {
        name: "Venda",
        type: "bar",
        data: dadosLineChartDespesaReceita[1],
        itemStyle: { color: "#7c3aed" },
      },
      {
        name: "Custo",
        type: "bar",
        data: dadosLineChartDespesaReceita[2],
        itemStyle: { color: "#FFBB28" },
      },
    ],
  };

  const verticalBarOptions = {
    title: { text: "Top Produtos Vendidos", left: "center" },
    tooltip: {
      trigger: "axis",
      valueFormatter: (valor: number) => `${formatInt(valor)} unid.`,
    },
    xAxis: {
      type: "category",
      data: maisVendidosNomes,
      axisLabel: { rotate: 30 },
    },
    yAxis: {
      type: "value",
      minInterval: 1,
      axisLabel: { formatter: (v: number) => formatInt(v) },
    },
    series: [
      {
        name: "Vendas",
        type: "bar",
        data: maisVendidosQuantidade,
        itemStyle: { color: "#7c3aed" },
      },
    ],
  };

  const lineOptions = {
    title: { text: "Receita Diária", left: "center" },
    tooltip: {
      trigger: "axis",
      valueFormatter: (valor: number) => formatBRL(valor),
    },
    xAxis: { type: "category", data: dadosLineData },
    yAxis: {
      type: "value",
      axisLabel: { formatter: (v: number) => formatBRLEixo(v) },
    },
    series: [
      {
        name: "Receita",
        data: dadosLineTotal,
        type: "line",
        smooth: true,
        areaStyle: { color: "#6C47FF33" },
        lineStyle: { color: "#7c3aed" },
      },
    ],
  };

  const pieOptions = {
    title: { text: "Categorias de produtos mais vendidos", left: "center" },
    tooltip: {
      trigger: "item",
      // Neutro de propósito: mostra quantidade e percentual, sem assumir unidade
      formatter: (params: any) =>
        `${params.marker} ${params.name}: ${formatInt(params.value)} (${Number(
          params.percent
        ).toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%)`,
    },
    legend: {
      bottom: 20,
    },
    series: [
      {
        name: "Categorias",
        type: "pie",
        radius: "50%",
        center: ["50%", "45%"],
        data: CategoriaArr,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.2)",
          },
        },
        itemStyle: {
          color: (params: any) => {
            const colors = [
              "#d7263d",
              "#1b998b",
              "#ff6f59",
              "#3a86ff",
              "#8338ec",
              "#fb5607",
              "#06d6a0",
              "#ef476f",
              "#ffbe0b",
            ];
            return colors[params.dataIndex % colors.length];
          },
        },
      },
    ],
  };

  const HandleDateInput = async () => {
    const id = ++requisicaoId.current;

    try {
      const response: any = await ObterDadosCard(inputDate1, inputDate2);
      if (id !== requisicaoId.current) return; // resposta de um filtro antigo

      aplicarLinha(response?.dadosLine);

      // Resumo só do intervalo selecionado
      const r = response?.resumoPeriodo;
      if (!r) {
        console.warn("Back não retornou resumoPeriodo", response);
        setResumoPeriodo(null);
        return;
      }

      setResumoPeriodo({
        receita: centavos(r.receita),
        custo: centavos(r.custo),
        lucro: centavos(r.lucro),
        totalVendas: Number(r.totalVendas) || 0,
        unidadesVendidas: Number(r.unidadesVendidas) || 0,
      });
    } catch (erro) {
      console.error("Erro ao buscar dados do período:", erro);
      if (id === requisicaoId.current) setResumoPeriodo(null);
    }
  };

  const ObterDadosC = async () => {
    const id = requisicaoId.current;

    try {
      const response: any = await ObterDadosCard(inputDate1, inputDate2);
      const dados = response?.dados || {};

      setTotal(centavos(dados.totalProdutos));
      setLucro(centavos(dados.lucro?.[0]?.sum));
      setNomeProduto(dados.maisVendido || "N/A");
      setQuantidadeVendido(Number(dados.quantidadeMaisVendido) || 0);
      setTotalVendas(Number(dados.totalVendas) || 0);

      // Contagem por categoria (não é dinheiro, não divide por 100)
      setCategoriaArr(
        (dados.ArrCategoria || []).map((item: any) => ({
          value: Number(item.total) || 0,
          name: item.categoria || "Sem categoria",
        }))
      );

      // Só atualiza a linha se nenhum filtro/limpar começou nesse meio tempo
      if (id === requisicaoId.current) {
        aplicarLinha(response?.dadosLine);
      }

      setMaisVendidosNomes(
        (dados.produtosMaisVendidos || []).map((p: any) => p.nomeProduto)
      );
      setMaisVendidosQuantidade(
        (dados.produtosMaisVendidos || []).map((p: any) => Number(p.qtd) || 0)
      );

      setBaixoEstoque(dados.baixoEstoque || []);
      setMediaDiaria(centavos(dados.mediaDiaria));

      // Barras: ordena por data (aceita o back em qualquer ordem) e usa
      // dayjs.utc para não deslocar o dia por fuso
      const dias = [...(dados.graficoDias || [])].sort((a: any, b: any) =>
        String(a.dia).localeCompare(String(b.dia))
      );
      setDadosLineChartDespesaReceita([
        dias.map((item: any) => formatDia(item.dia)),
        dias.map((item: any) => centavos(item.receita_do_dia)),
        dias.map((item: any) => centavos(item.despesas_do_dia)),
      ]);
    } catch (erro) {
      console.error("Erro ao buscar dados do dashboard:", erro);
    }
  };

  const HandleClearDate = async () => {
    requisicaoId.current++; // descarta resposta pendente do filtro
    setInputdate1("");
    setInputdate2("");
    setResumoPeriodo(null);
    setErroFiltro("");
    setIsClear(true);
  };

  useEffect(() => {
    if (inputDate1 && inputDate2) {
      if (inputDate1 > inputDate2) {
        // YYYY-MM-DD compara certo como string
        requisicaoId.current++;
        setResumoPeriodo(null);
        setErroFiltro("A data inicial não pode ser maior que a data final.");
      } else {
        setErroFiltro("");
        HandleDateInput();
      }
    }
    if (isClear) {
      ObterDadosC();
      setIsClear(false);
    }
  }, [inputDate1, inputDate2, isClear]);

  useEffect(() => {
    ObterDadosC();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dashboard - Estatísticas</h1>

      <div className={styles.filterBar}></div>

      <div className={styles.cards}>
        <div className={styles.card2}>
          <h2>Total de vendas</h2>
          <h2>{formatBRL(total)}</h2>
          <p>Total de vendas realizadas até hoje: {formatInt(totalVendas)}</p>
        </div>
        <div className={styles.card}>
          <h2>Ticket médio</h2>
          <h2>{formatBRL(mediaDiaria)}</h2>
          <p>Valor médio por venda.</p>
        </div>
        <div className={styles.card}>
          <h2>Lucro total</h2>
          <h2>{formatBRL(lucro)}</h2>
          <p>Lucro total até agora.</p>
        </div>
        <div className={styles.card}>
          <h2>Produto mais vendido.</h2>
          <h2>{NomeProduto}</h2>
          <span>Quantidade: {formatInt(quantidadeVendido)}</span>
        </div>
      </div>

      <div className={styles.charts}>
        <div className={styles.chartContainer}>
          <ReactECharts option={barOptions} style={{ height: "300px" }} />
        </div>
        <div className={styles.chartContainer}>
          <ReactECharts
            option={verticalBarOptions}
            style={{ height: "300px" }}
          />
        </div>
        <div className={styles.chartContainer}>
          <ReactECharts option={pieOptions} style={{ height: "300px" }} />
        </div>
      </div>

      <div className={styles.chartsEstoq}>
        <div className={styles.chartContainerEstoq}>
          <div className={styles.reposicao}>
            <h2 className={styles.reposicaoTitle}>
              📦 Produtos com Baixo Estoque
            </h2>
            {baixoEstoque.filter((item: any) => item.quantidade < 10).length >
            0 ? (
              <ul className={styles.reposicaoList}>
                {baixoEstoque
                  .filter((item: any) => item.quantidade < 10)
                  .map((item: any) => (
                    <li key={item.id} className={styles.reposicaoItem}>
                      <span className={styles.nomeProduto}>
                        {item.nomeProduto}
                      </span>
                      <span className={styles.quantidade}>
                        {formatInt(item.quantidade)} unid.
                      </span>
                    </li>
                  ))}
              </ul>
            ) : (
              <p className={styles.semReposicao}>
                ✅ Nenhum produto em baixo estoque
              </p>
            )}
          </div>
        </div>
      </div>

      <div className={styles.sla}>
        <div className={styles.clear}>
          <button onClick={() => HandleClearDate()} className={styles.button}>
            Limpar
          </button>
        </div>
        <div className={styles.dates}>
          <label>De</label>
          <input
            value={inputDate1}
            onChange={(e) => setInputdate1(e.target.value)}
            type="date"
            className={styles.inputdDate}
          />
          <label>Ate</label>
          <input
            value={inputDate2}
            onChange={(e) => setInputdate2(e.target.value)}
            type="date"
            className={styles.inputdDate}
          />
        </div>
      </div>

      {erroFiltro && (
        <p style={{ color: "#d7263d", textAlign: "center", margin: "8px 0" }}>
          {erroFiltro}
        </p>
      )}

      {/* Resumo do período: aparece só com filtro válido e resumo vindo do back */}
      {resumoPeriodo && (
        <div className={styles.cards}>
          <div className={styles.card}>
            <h2>Receita do período</h2>
            <h2>{formatBRL(resumoPeriodo.receita)}</h2>
            <p>{formatInt(resumoPeriodo.totalVendas)} vendas no período</p>
          </div>
          <div className={styles.card}>
            <h2>Custo do período</h2>
            <h2>{formatBRL(resumoPeriodo.custo)}</h2>
            <p>Soma das despesas do período.</p>
          </div>
          <div className={styles.card}>
            <h2>Lucro do período</h2>
            <h2>{formatBRL(resumoPeriodo.lucro)}</h2>
            <p>Lucro no intervalo selecionado.</p>
          </div>
          <div className={styles.card}>
            <h2>Produtos vendidos</h2>
            <h2>{formatInt(resumoPeriodo.unidadesVendidas)}</h2>
            <p>Total de unidades no período.</p>
          </div>
        </div>
      )}

      <div className={styles.chartsEstoq}>
        <div className={styles.chartContainerLine}>
          <ReactECharts option={lineOptions} style={{ height: "330px" }} />
        </div>
      </div>
    </div>
  );
}
