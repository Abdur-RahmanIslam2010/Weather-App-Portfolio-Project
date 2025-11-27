import './Weather.css';

function WeatherCard(props) {
    return (
        <div className='card'>
            <h1>{props.date}</h1>
            <p>{props.weather}</p>
        </div>
    );
}

export default WeatherCard;