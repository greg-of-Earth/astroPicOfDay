// import marsImage from "../assets/mars.jpeg"

export default function Main(props) {
    const { handleToggleModal, data } = props
    return (
        <div className="imgContainer">
            <img onClick={handleToggleModal} src={data.hdurl} alt={data?.title || 'bg-img'} className="bckImage"/>
        </div>
    )
}