import './styles.css';

const LoadingSpinner = ({ height, width }) => {
    return (
        <div className='spinner' style={{ height: height, width: width }}></div>
    )
};

export default LoadingSpinner;