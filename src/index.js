import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import './index.css';

function Day(props){
    let day='';
    if(props.day==0){
        day='今日';
    }else{
        day='明日';
    }

    if(props.api===''){
        return <div>{"情報取得中"}</div>
    }else{
        return(
            <React.Fragment>
                <div>{day}</div>
                <div class='icon'>
                    <img src={props.api.forecasts[props.day].image.url}/>
                </div>
                <div>{'場所：' + props.api.publishingOffice}</div>
                <div>{'発表日時：' + props.api.publicTimeFormatted}</div>
                <div>{'天気：' + props.api.forecasts[props.day].telop}</div>
            </React.Fragment>
        );
    }
}

class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            weather: ''
        }
    }
    componentDidMount(){
        axios.get("https://weather.tsukumijima.net/api/forecast?city=360010")
            .then(res => {
            this.setState({
                weather: res.data
            });
        })
        return 0;
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