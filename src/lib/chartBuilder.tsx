
// Radial Bar
const radialTemplate = {
  series: [59],
  options: {
    chart: {
      height: 180,
      type: 'radialBar',
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
         hollow: {
          margin: 0,
          size: '80%',
          background: '#1F2937',
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: 'front',
          dropShadow: {
            enabled: false,
            top: 2,
            left: 0,
            blur: 4,
            opacity: 0.1
          }
        },
        track: {
          background: '',
          strokeWidth: '67%',
          margin: 0, // margin is in pixels
          dropShadow: {
            enabled: false,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35
          }
        },
        dataLabels: {
          show: true,
          name: {
            offsetY: -50,
            show: false,
            color: '#111',
            fontSize: '12px'
          },
          value: {
            formatter: function(val: string) {
              return parseInt(val) + '%';
            },
            offsetY: 8,
            color: '#ddd',
            fontSize: '24px',
            show: true,
          }
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: '',
        type: 'horizontal',
        shadeIntensity: 0.75,
        gradientToColors: ['#FF00CC', '#333399'],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: 'round'
    },
    labels: [''],
  },
};

const barTemplate = {
  chart: {
    background: 'transparent',
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  xaxis: {
    categories: [],
  },
  yaxis: {
    title: {
      text: 'Num Votes'
    }
  },
  theme: {
    mode: 'dark', 
    palette: 'palette4', 
  },
  fill: {
    colors: undefined,
    opacity: 0.85,
    type: 'solid',
    gradient: {
        shade: 'dark',
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: undefined,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 100],
        colorStops: []
    },
    pattern: {
      style: 'verticalLines',
      width: 6,
      height: 6,
      strokeWidth: 2,
    },
  }
}


// Takes in options to determine how the radial bar looks
const radialBarBuilder = (options: any) => {
  const template = JSON.parse(JSON.stringify(radialTemplate));
  template.series = [Number(options.series)];
  template.options.plotOptions.radialBar.track.background = options.trackBackground;
  //template.options.fill.gradient.gradientToColor = options.fillGradientColor;
  return template;
}

// Takes in options to determine how the radial bar looks
const barBuilder = (options: any) => {
  const template = JSON.parse(JSON.stringify(barTemplate));
  template.xaxis.categories = options.timeStamps;
  //template.options.fill.gradient.gradientToColor = options.fillGradientColor;
  return template;
}

const barTypes = {
  radialBarBuilder,
  barBuilder
};

export default barTypes;



