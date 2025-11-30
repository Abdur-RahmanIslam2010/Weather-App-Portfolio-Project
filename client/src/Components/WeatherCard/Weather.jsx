import './Weather.css';

function WeatherCard(props) {
    const iconUrl = new URL(props.icon, "http://localhost:8080/icons/");
    return (
        <div className='card'>
            <h2>{props.date}</h2>
            <img src={iconUrl.href} alt={props.weather} width={100} height={100}/>
            <p>{props.weather}</p>
        </div>
    );
}

export default WeatherCard;