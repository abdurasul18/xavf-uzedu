export const chartOption1 = ref({
  series: [
    {
      name: '',
      data: [] as number[],
    },
  ],
  chart: {
    height: 280,
    type: 'line',
    toolbar: {
      show: false,
    },
  },
  colors: ["#FF9500", "#34C771", "#FF2D55", "#007AFF",],
  title: {
    text: '',
    align: 'left',
  },
  legend: {
    position: 'top',
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: [2, 2, 2],
    curve: 'smooth',
  },
  xaxis: {
    type: 'label',
    categories: [] as string[],
    labels: {
      formatter: (v: any) => v,
    } as any,
  },
  tooltip: {
    x: {},
  },
})


export function generateHighChartColumnOpt(title: string, labels: string[], seriesData: number[]) {
  return {
    chart: {
      type: 'column',
      height: 400,
      // options3d: {
      //   enabled: false,
      //   alpha: 3,
      //   beta: 25,
      //   depth: 150,
      // },
    },
    title: {
      text: title,
      align: 'left',
      margin: 50,
    },
    colors: ['#0DD3FF'],
    plotOptions: {
      column: {
        pointPadding: 0.3,
        borderWidth: 0,
        borderRadius: '50%',
        margin: 50
      }
    },
    xAxis: {
      categories: labels,
      labels: {
        skew3d: false,
        padding: 20,
        style: {
          fontSize: '14px',
        },
      },
    },
    yAxis: {
      title: {
        text: '',
        margin: 0,
      },
    },
    tooltip: {
      valueSuffix: '',
    },

    series: [
      {
        name: '',
        data: seriesData,
      },
    ],
  }
}


export function generateHighChartPieOpt(title: string, seriesData: { name: string, y: number, z: number }[]) {
  return {
    chart: {
      type: 'variablepie',
      custom: {},
      width: 300,
      height: 400,
      events: {
        render() {
          const chart = this as any;
          let series = chart.series[0];
          let customLabel = chart.options.chart.custom.label;

          if (!customLabel) {
            customLabel = chart.options.chart.custom.label =
              chart.renderer.label(
               '<span style="font-size:16px">'+`Jami:` + `<strong >${seriesData.map((el: any) => el.y).reduce((a: any, b: any) => a + b, 0)}</strong>` + '</span>'
              )
                .css({
                  color: '#000',
                  fontSize: '10px',
                  textAnchor: 'middle'
                })
                .add();
          }

          const x = series.center[0] + chart.plotLeft,
            y = series.center[1] + chart.plotTop -
              (customLabel.attr('height') / 2);

          customLabel.attr({
            x,
            y
          });
          // Set font size based on chart diameter
          customLabel.css({
            fontSize: `${series.center[2] / 12}px`
          });
        }
      },
      labels: {
        enabled: false
      }
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    title: {
      text: title,
      align: 'left'
    },
    plotOptions: {
      variablepie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false
        },
        showInLegend: true,
        tooltip: {
          pointFormat: '{point.y}'
        }
      }
    },
    legend: {
      enabled: true,
      align: 'center',
      margin: 10,
      padding: 20,
      style: {
        fontSize: '10px'
      }
    },
    series: [{
      minPointSize: 10,
      innerSize: '40%',
      zMin: 0,
      name: '',
      borderRadius: 5,
      data: seriesData,
      colors: [
        '#34c771',
        '#FF9500',
        '#ff2d55',

      ]
    }],
    xAxis: {
      labels: {
        enabled: false
      }
    },
    yAxis: {
      labels: {
        enabled: false
      }
    },
    zAxis: {
      labels: {
        enabled: false
      }
    }

  }
}
