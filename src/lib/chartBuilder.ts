// Used to different charts for solid-apexcharts

// Radial Bar
const radialTemplate = {
  options: {
    chart: {
      height: 125,
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
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24
          }
        },
        track: {
          background: '#fff',
          strokeWidth: '67%',
          margin: 0, // margin is in pixels
          dropShadow: {
            enabled: true,
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
              return parseInt(val);
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
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: ['#ABE5A1'],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: 'round'
    },
    labels: ['Percent'],
  },
};

// Takes in options to determine how the radial bar looks
export default function radialBarBuilder(options: any) {
  return radialTemplate;
}
