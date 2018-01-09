import React, { Component } from 'react';
import HighCharts from 'highcharts';
import Api from '../libs/Api';

class Charts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartActions: [
                {
                    name: 'Weekly',
                    key: 'w'
                },
                {
                    name: 'Monthly',
                    key: 'm'
                },
                {
                    name: 'Quartly',
                    key: 'q'
                },
                {
                    name: 'Yearly',
                    key: 'y'
                }
            ],
            activeKey: 1
        };
    }
    componentDidMount() {
          this.makeCharts('m');
      }

    applyPieChart(id, score, title) {
        const pie = HighCharts.chart(id, {
            chart: {
                renderTo: id,
                type: 'pie'
            },

            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: true,
                        formatter() {
                            return (Math.round(this.percentage * 100) / 100) ? `${Math.round(this.percentage * 100) / 100}%` : '';
                        },
                        distance: -20,
                        color: 'white'
                    },
                    size: '90%',
                    innerSize: '90px',
                    showInLegend: false
                }
            },
            title: {

                text: title,
                verticalAlign: 'middle',
                floating: true,
                y: -10,
                style: {

                    color: '#000',
                    fontWeight: 'bold',
                    fontSize: '13px'
                }
            },
            credits: {
                enabled: false
            },
            colors: ['#e96f14', '#3a7e07'],
            series: [{
                data: [
                    ['Pending', (100 - score)],
                    ['Completed', score]
                ]
            }]
        });
        const xpos = '50%';
        const ypos = '53%';
        const circleradius = 10;

        // Render the circle
        pie.renderer.circle(xpos, ypos, circleradius).attr({
            fill: '#fff',
        }).add();
    }

    makeCharts(timeSpan, key) {
        this.setState({ activeKey: key });

        const email = sessionStorage.getItem('email');

        Api.get(`tech/getRequestSummary/${email}/${timeSpan}`).then(resp => {
            const data = resp.req_summ;

            if (data) {
                this.applyPieChart('charts1', data.bf_com, 'Biopharma<br>Ceutical');
                this.applyPieChart('charts2', data.fb_com, 'Food <br>&<br> Beverages');
            }
        }).catch((ex) => {
            console.log(ex);
        });
    }
   

    render() {
        const that = this;
        const activeLink = {
            color: '#f4a028',
            textDecoration: 'underline'
        };
        return (
            <div>
                <div className="chart-bar">
                    <div className="chart-left"><h2>REQUEST SUMMARY</h2></div>

                    <div className="chart-right">
                        <ul className="timeline">
                            {this.state.chartActions.map((value, key) => (
                                    <li style={{ cursor: 'pointer' }} key={key}><a key={key} style={(this.state.activeKey === key) ? activeLink : null} onClick={() => { that.makeCharts(value.key, key); }}>{value.name}</a></li>
                                ))}
                        </ul>
                    </div>
                </div>
                <div>
                    <div id="charts1" className="col-xs-12 col-sm-6 col-md-6" style={{ height: '300px', width: '50%' }} />
                    <div id="charts2" className="col-xs-12 col-sm-6 col-md-6" style={{ height: '300px', width: '50%' }} />
                    <div className="legend">

                        <ul>

                            <li><img src="images/completed.png" alt="" />completed</li>
                            <li><img src="images/pending.png" alt="" />pending</li>
                        </ul>

                    </div>
                </div>
            </div>
        );
    }
}


export default Charts;
