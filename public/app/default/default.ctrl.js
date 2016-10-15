angular.module('app').controller('DefaultController',['$scope', 'mySocket', '$http', function($scope, mySocket, $http) {
  var vm = this;
  var historyUpdated = false;
  vm.temp;
  vm.numberOfSaples;
  
  mySocket.on('tempUpdate', function(sample) {

        var jsonData = JSON.parse(sample);
        var value = parseFloat(jsonData.value);
        var time = new Date(jsonData.time);
        vm.temp=value;
        vm.chartGauage.series[0].data[0] = value;
       
        if(vm.chart.series[0].data.length < 5000){
            // vm.chartConfig.series[0].data.push({x:time , y:value});
            vm.chart.series[0].addPoint({x:time , y:value});
        }
        else{
            // vm.chartConfig.series[0].data.shift();
            // vm.chartConfig.series[0].data.push({x:time , y:value});
            vm.chart.series[0].addPoint({x:time , y:value}, true, true);
        }
        vm.numberOfSaples=vm.chart.series[0].data.length;
     // }

  });
  mySocket.on('tempHistory', function(samples){
      if (!historyUpdated)
      {
          var data = new Array();
          var jsonData = JSON.parse(samples);
          var lastValue = parseFloat(jsonData[jsonData.length-1].value);

          jsonData.forEach(function(element) {
              var yValue = parseFloat(element.value);
              var xDate = new Date(element.time);
              data.push({x:xDate, y:yValue});
          }, this);
          vm.numberOfSaples=data.length;
        //   vm.chartConfig.series[0].data =data;
          
          vm.chart.series[0].setData(data);
          vm.chartGauage.series[0].data[0] = lastValue;
          historyUpdated = true;
      }
  }
  );


 vm.chart = new Highcharts.Chart( {
      chart:{
          renderTo: 'container',
            type: 'line',
            zoomType: 'xy'
      },
      title: {
        text: 'Temperature Data'
      },
      xAxis:{
          type: 'datetime'
      },
        yAxis: {
            title: {
                text: 'Temperature (C)'
            },
            min:0          
        },
        
      series: [{
        name: 'Temperature in livingroom',
        turboThreshold:0,
        data: []
      }]
    });




  vm.name = "DefaultController";
  vm.chartConfig = {
        chart: {
            type: 'line',
            animation: false,
            reflow: false
        },
        title: {
            text: 'Temperature in livingroom'
        },
        subtitle: {
            text: 'By the TV'
        },
        xAxis: {
            type: 'datetime',
            title: {
                text: 'Time'
            }
        },
        yAxis: {
            title: {
                text: 'Temperature (C)'
            },
            min:0          
        },

        // tooltip: {
        //     headerFormat: '<b>{series.name}</b><br>',
        //     pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
        // },

        tooltip: {
            enabled: false,
            animation: false
        },
        exporting: {
            enabled:false
        },
        credits: {
            enabled: false
        },

        plotOptions: {
            line: { animation: false, enableMouseTracking: false, stickyTracking: true, shadow: false, dataLabels: { style: { textShadow: false } } }
        },

        series: [{
            name: 'Temperature in livingroom',
            turboThreshold:0,
            data: []
        }]
    };

  vm.chartGauage = {
        options: {
            chart: {
                type: 'gauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false
            },
            pane: {
                
                size: '100%',
                startAngle: -150,
                endAngle: 150,
                background: {
                    backgroundColor:'#EEE',
                    innerRadius: '60%',
                    outerRadius: '100%',
                    shape: 'arc'
                }
            },

        },
        series: [{
            data: [],
            dataLabels: {
	        	format: '<div align=center style="text-align:center"><span style="font-size:20px;color:black">{y}</span><br/></div>'
	        },
   
        }],
        title: {
            text: 'Temp',
            y: 10
        },
        yAxis: {
            currentMin: 0,
            currentMax: 40,
            title: {
                y: 140
            },      
			lineWidth: 0,
            tickInterval: 5,
            tickPixelInterval: 400,
            tickWidth: 0,
            labels: {
                y: 15
            }   
        },
        loading: false
    }

}]);