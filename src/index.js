import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import './index.css';

const url="https://weather.tsukumijima.net/api/forecast?city=360010"

function Day(props){
    return(
        <React.Fragment>
            <div>{props.api.forecasts[props.day].dataLabel}</div>
            <div class='icon'>
                <img src={props.api.forecasts[props.day].image.url}/>
            </div>
            <div>{'場所：' + props.api.publicTimeFormatted}</div>
            <div>{'i発表日時：' + props.api.publishingOffice}</div>
            <div>{'天気：' + props.api.forecasts[props.day].telop}</div>
        </React.Fragment>
    );
}

class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            weather: ''
        }
    }
    componentDidMount() {
        axios.get(url).then(res => {
            this.setState({
                weather: res.data
            });
        })
    }

    renderDay(i){
        return(
            <Day
                api={this.state.weather}
                day={i}
            />
        );
    }
    render() {
        return (
            <div class='weather'>
                <div class='day'>
                    {this.renderDay(0)}
                </div>
                <div className='day'>
                    {this.renderDay(1)}
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Weather/>, document.getElementById("root"));