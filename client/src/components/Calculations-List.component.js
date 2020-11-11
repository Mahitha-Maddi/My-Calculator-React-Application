import React, { Component } from 'react';
import axios from 'axios';

export default class CalculationsList extends Component {
    constructor(props) {
        super(props);

        this.onChangeOperand1 = this.onChangeOperand1.bind(this);
        this.onChangeOperand2 = this.onChangeOperand2.bind(this);
        this.onChangeOperator = this.onChangeOperator.bind(this);
        this.getData = this.getData.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            operand1: '',
            operand2: '',
            operator: '',
            calculations: [],
            latestTimeStamp: ''
        }
    }
    intervalID;

    componentDidMount() {
        axios.get('http://localhost:5000/calculations')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        calculations: response.data,
                        latestTimeStamp: response.data[0].createdAt
                    });
                }
            });
        this.setState({
            operand1: 'Enter operand 1',
            operand2: 'Enter operand 2',
            operator: '+',

        });

        this.intervalID = setInterval(this.getData, 5000);

    }

    getData = () => {
        // do something to fetch data from a remote API.
        // const lasttime='';
        axios.get('http://localhost:5000/calculations')
            .then(response => {
                if (response.data.length > 0) {
                    if (this.state.latestTimeStamp !== response.data[0].createdAt) {
                        this.setState({
                            latestTimeStamp: response.data[0].createdAt
                        });
                        window.location.reload();
                    }

                }
            });
    }

    onChangeOperand1(e) {
      
        this.setState({
            operand1: e.target.value
        });
    }

    onChangeOperand2(e) {
        this.setState({
            operand2: e.target.value
        });
    }
    onChangeOperator(e) {
        this.setState({
            operator: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const operand11=this.state.operand1;
        const operand12=this.state.operand2;
        if(operand11.match(/^[a-zA-Z]+$/)){
            window.location = '/';
            return;
        }
        if(operand12.match(/^[a-zA-Z]+$/)){
            window.location = '/';
            return;
        }

        const calculation = {
            operand1: this.state.operand1,
            operand2: this.state.operand2,
            operator: this.state.operator

        }
        console.log(calculation)

        axios.post('http://localhost:5000/calculations', calculation)
            .then(res => console.log(res.data));

        window.location = '/';

    }

    componentWillUnmount() {
        /*
          stop getData() from continuing to run even
          after unmounting this component
        */
        clearInterval(this.intervalID);
    }

    render() {
        return (
            <div>
                <h3>Welcome to calculations page!!</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Operand1: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.operand1}
                            onChange={this.onChangeOperand1}
                        />
                    </div >

                    <div className="form-group">
                        <label>Operand2: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.operand2}
                            onChange={this.onChangeOperand2}
                        />
                    </div>

                    <div className="form-group">
                        <label>Operator: </label>
                        <select
                            required
                            className="form-control"
                            value={this.state.operator}
                            onChange={this.onChangeOperator}>
                            <option value="+">+</option>
                            <option value="-">-</option>
                            <option value="*">*</option>
                            <option value="/">/</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="calculate" className="btn btn-primary" />
                    </div>
                </form>
                <table border='1' >
                    <thead>
                        <tr>
                            <th>Operand 1</th>
                            <th>Operand 2</th>
                            <th>Operator</th>
                            <th>Result</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.state.calculations.map(function (calc) {
                                return <tr key={calc._id}>
                                    <td>{calc.operand1}</td>
                                    <td>{calc.operand2}</td>
                                    <td>{calc.operator}</td>
                                    <td>{calc.result}</td>
                                </tr>
                            })

                        }
                    </tbody>

                </table>
            </div>
        )
    }
}