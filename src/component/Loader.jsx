import './loader.css'

const Loader = () => {
    const mainStyle = {
        height: '600px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

    return (
        <div style={mainStyle}>
            <div className="loaderStyle"></div>
        </div>
    );
};

export default Loader;